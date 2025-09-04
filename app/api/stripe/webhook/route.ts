import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      const userId = session.metadata?.user_id
      const productId = session.metadata?.product_id
      
      if (!userId || !productId) {
        console.error('Missing metadata in checkout session')
        break
      }

      // Record the purchase directly (no need for users table)
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: userId,
          product_type: productId,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          amount: session.amount_total || 0,
          currency: session.currency || 'nad',
          status: 'active',
          purchased_at: new Date().toISOString(),
          metadata: {
            customer_email: session.customer_email,
            customer_name: session.customer_details?.name,
            country: session.metadata?.country || 'namibia'
          }
        })
      
      if (purchaseError) {
        console.error('Error creating purchase record:', purchaseError)
      } else {
        console.log(`Purchase record created for user ${userId}, product ${productId}`)
      }

      // Send confirmation email (would implement with React Email)
      console.log(`Payment successful for user ${userId}, product ${productId}`)
      
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error('Payment failed:', paymentIntent.last_payment_error?.message)
      break
    }

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}