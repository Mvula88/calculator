import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createServiceClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { sendWelcomeEmail, sendPurchaseConfirmation } from '@/lib/email/send-email'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    console.error('Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  if (!endpointSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // USE SERVICE CLIENT TO BYPASS RLS - CRITICAL!
  const supabase = createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Extract metadata with validation
      const productId = session.metadata?.product_id
      const country = session.metadata?.country || 'na'
      const tier = session.metadata?.tier || 'mistake'
      const email = session.customer_email || session.metadata?.email
      
      // Validate tier
      if (!['mistake', 'mastery'].includes(tier)) {
        console.error('Invalid tier:', tier)
        return NextResponse.json({ received: true }) // Don't fail webhook
      }
      
      if (!email) {
        console.error('Missing email in checkout session')
        break
      }

      console.log('Processing payment for:', { 
        email, 
        productId, 
        country, 
        tier,
        amount: session.amount_total
      })

      // Check if user already exists (don't create automatically)
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
      const existingUser = users?.find(u => u.email?.toLowerCase() === email.toLowerCase())
      
      const userId = existingUser?.id
      
      // Don't create user automatically - they'll create account after payment
      if (!userId) {
        console.log('User account not found for:', email, '- will be created after payment')
      }

      // Use idempotency key if available to prevent duplicates
      const idempotencyKey = session.metadata?.idempotency_key || 
        session.payment_intent?.toString() || 
        session.id
      
      // CRITICAL: Check if we've already processed this webhook
      const { data: processedWebhook } = await supabase
        .from('entitlements')
        .select('*')
        .eq('stripe_session_id', session.id)
        .single()
      
      if (processedWebhook) {
        console.log('Webhook already processed for session:', session.id)
        return NextResponse.json({ received: true })
      }
      
      // Check for existing active entitlement first to prevent duplicates
      const { data: existingEntitlement } = await supabase
        .from('entitlements')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('active', true)
        .eq('tier', tier) // Check for same tier
        .single()

      if (existingEntitlement) {
        console.log('Active entitlement already exists for:', email)
        
        // If upgrading from mistake to mastery, update the existing entitlement
        if (existingEntitlement.tier === 'mistake' && tier === 'mastery') {
          const { error: updateError } = await supabase
            .from('entitlements')
            .update({
              tier: 'mastery',
              amount_paid: session.amount_total,
              currency: session.currency,
              stripe_session_id: session.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingEntitlement.id)
          
          if (updateError) {
            console.error('Failed to upgrade entitlement:', updateError)
          } else {
            console.log('Upgraded entitlement to mastery for:', email)
          }
        } else {
          console.log('Skipping duplicate entitlement creation for:', email)
        }
      } else {
        // Create new entitlement record (PRIMARY ACCESS CONTROL)
        const entitlementData = {
          user_id: userId || null,
          email: email.toLowerCase(),
          tier: tier,
          country: country,
          stripe_session_id: session.id,
          amount_paid: session.amount_total,
          currency: session.currency,
          idempotency_key: idempotencyKey
        }

        // Use upsert to handle race conditions
        const { data: entitlement, error: entitlementError } = await supabase
          .from('entitlements')
          .upsert(entitlementData, {
            onConflict: 'stripe_session_id', // Unique constraint on session ID
            ignoreDuplicates: true
          })
          .select()
          .single()

        if (entitlementError) {
          console.error('Failed to create entitlement:', entitlementError)
          // Don't fail the webhook - log for manual recovery
          console.error('Manual recovery needed for:', entitlementData)
        } else {
          console.log('Entitlement created successfully:', entitlement.id)
          
          // Send purchase confirmation email
          const currency = session.currency?.toUpperCase() || 'USD'
          await sendPurchaseConfirmation(
            email, 
            tier as 'mistake' | 'mastery',
            session.amount_total || 0,
            currency
          )
          console.log('Purchase confirmation email sent to:', email)
        }
      }

      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('Checkout session expired:', session.id)
      break
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment succeeded:', paymentIntent.id)
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', paymentIntent.id)
      
      // Log for monitoring but don't auto-deactivate (could be temporary failure)
      if (paymentIntent.metadata?.email) {
        console.log('Payment failed for:', paymentIntent.metadata.email)
        // Consider sending notification to admin for manual review
      }
      break
    }
    
    case 'charge.dispute.created': {
      const dispute = event.data.object as Stripe.Dispute
      console.log('Dispute created:', dispute.id)
      
      // Flag entitlement for review
      if (dispute.metadata?.email) {
        const { error } = await supabase
          .from('entitlements')
          .update({ 
            active: false,
            notes: `Dispute created: ${dispute.id}` 
          })
          .eq('email', dispute.metadata.email.toLowerCase())
        
        if (error) {
          console.error('Failed to flag entitlement for dispute:', error)
        }
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}