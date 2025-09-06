import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createServiceClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

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
      
      // Extract metadata
      const productId = session.metadata?.product_id
      const country = session.metadata?.country || 'na'
      const tier = session.metadata?.tier || 'mistake'
      const email = session.customer_email || session.metadata?.email
      
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

      // First, check if user already exists by listing users with email filter
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
      const existingUser = users?.find(u => u.email?.toLowerCase() === email.toLowerCase())
      
      let userId = existingUser?.id

      // If user doesn't exist, create one
      if (!userId) {
        // Generate a random password (user will reset it later)
        const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!'
        
        // Create user account
        const { data: newUser, error: userError } = await supabase.auth.admin.createUser({
          email: email,
          password: tempPassword,
          email_confirm: true, // Auto-confirm email since they paid
          user_metadata: {
            country: country,
            tier: tier,
            stripe_session_id: session.id
          }
        })

        if (userError) {
          console.error('Failed to create user:', userError)
          // Still create entitlement without user_id for manual recovery
        } else {
          userId = newUser.user.id
          console.log('User account created:', userId)
          
          // Generate a magic link for auto-login
          const { data: magicLink, error: linkError } = await supabase.auth.admin.generateLink({
            type: 'magiclink',
            email: email,
            options: {
              redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/portal`
            }
          })
          
          if (linkError) {
            console.error('Failed to generate magic link:', linkError)
          } else {
            // Store the magic link token for auto-login from thank you page
            console.log('Magic link generated for auto-login')
          }
        }
      }

      // Create entitlement record (PRIMARY ACCESS CONTROL)
      const entitlementData = {
        user_id: userId || null,
        email: email.toLowerCase(),
        tier: tier,
        country: country,
        active: true,
        stripe_session_id: session.id,
        amount_paid: session.amount_total,
        currency: session.currency
      }

      const { data: entitlement, error: entitlementError } = await supabase
        .from('entitlements')
        .insert(entitlementData)
        .select()
        .single()

      if (entitlementError) {
        console.error('Failed to create entitlement:', entitlementError)
        // Don't fail the webhook - log for manual recovery
        console.error('Manual recovery needed for:', entitlementData)
      } else {
        console.log('Entitlement created successfully:', entitlement.id)
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
      
      // Could update entitlement status if needed
      if (paymentIntent.metadata?.email) {
        const { error } = await supabase
          .from('entitlements')
          .update({ active: false })
          .eq('email', paymentIntent.metadata.email.toLowerCase())
          .eq('stripe_session_id', paymentIntent.metadata.session_id)
        
        if (error) {
          console.error('Failed to deactivate entitlement:', error)
        }
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}