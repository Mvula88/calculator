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

      // Check if this is the first purchase (calculator_pro)
      if (productId === 'calculator_pro') {
        // Create or update user record
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (!existingUser) {
          // Get user details from auth
          const { data: authUser } = await supabase.auth.admin.getUserById(userId)
          
          // Create user record with payment info
          await supabase
            .from('users')
            .insert({
              id: userId,
              email: authUser?.user?.email || session.customer_email,
              full_name: authUser?.user?.user_metadata?.full_name,
              phone: authUser?.user?.user_metadata?.phone,
              payment_date: new Date().toISOString(),
              payment_amount: session.amount_total! / 100,
              stripe_customer_id: session.customer as string
            })
        }
      }

      // Record the purchase
      await supabase
        .from('purchases')
        .insert({
          user_id: userId,
          product_type: productId,
          amount: session.amount_total! / 100,
          stripe_payment_intent: session.payment_intent as string
        })

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