import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createServiceClient } from '@/lib/supabase/server'
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
      const userId = session.metadata?.user_id || null
      const productId = session.metadata?.product_id
      const country = session.metadata?.country || 'na'
      const tier = session.metadata?.tier || 'mistake'
      const email = session.customer_email || session.metadata?.email
      
      if (!email) {
        console.error('Missing email in checkout session')
        break
      }

      console.log('Processing payment for:', { 
        userId, 
        email, 
        productId, 
        country, 
        tier,
        amount: session.amount_total
      })

      // Create entitlement record (PRIMARY ACCESS CONTROL)
      const entitlementData = {
        user_id: userId,
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

      // Send confirmation email (optional - implement if needed)
      // await sendConfirmationEmail(email, tier, country)

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