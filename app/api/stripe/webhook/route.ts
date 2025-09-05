import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createClient, createServiceClient } from '@/lib/supabase/server'
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

  // Use service client to bypass RLS for webhook operations
  const supabase = createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Extract metadata
      const userId = session.metadata?.user_id || null
      const productId = session.metadata?.product_id
      const country = session.metadata?.country || 'na'
      const tier = session.metadata?.tier || 'mistake'
      const email = session.customer_email || session.metadata?.email || session.customer_details?.email
      
      if (!productId || !email) {
        console.error('Missing critical metadata in checkout session:', {
          productId,
          email,
          customer_email: session.customer_email,
          metadata_email: session.metadata?.email,
          customer_details_email: session.customer_details?.email
        })
        break
      }

      console.log('Processing payment for:', { userId, email, productId, country, tier })

      // 1. Record the purchase (keep existing table)
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: userId || null, // Can be null for guest checkouts
          product_type: productId,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          amount: session.amount_total || 0,
          currency: session.currency || 'zar',
          status: 'active',
          purchased_at: new Date().toISOString(),
          metadata: {
            customer_email: email,
            customer_name: session.customer_details?.name,
            country: country,
            tier: tier
          }
        })
      
      if (purchaseError) {
        console.error('Error creating purchase record:', purchaseError)
      } else {
        console.log('Purchase record created')
      }

      // 2. Create entitlement for portal access
      const entitlementData = {
        user_id: userId || null,
        email: email.toLowerCase(),
        country: country,
        tier: tier,
        stripe_payment_intent_id: session.payment_intent as string,
        active: true
      }
      
      console.log('Creating entitlement with data:', entitlementData)
      
      const { data: entitlementResult, error: entitlementError } = await supabase
        .from('entitlements')
        .insert(entitlementData)
        .select()

      if (entitlementError) {
        console.error('Error creating entitlement:', {
          error: entitlementError,
          data: entitlementData
        })
        // Try to understand what went wrong
        if (entitlementError.code === '23505') {
          console.error('Duplicate entitlement - might already exist')
        }
      } else {
        console.log(`Entitlement created successfully:`, entitlementResult)
      }

      // 3. Send confirmation email (you can implement with Resend/SendGrid)
      console.log(`Payment successful for ${email}, product ${productId}`)
      
      // Optional: Create/update user account if email exists
      if (email && !userId) {
        // Check if user exists with this email
        const { data: existingUser } = await supabase
          .from('auth.users')
          .select('id')
          .eq('email', email.toLowerCase())
          .single()

        if (existingUser) {
          // Update entitlement with user_id
          await supabase
            .from('entitlements')
            .update({ user_id: existingUser.id })
            .eq('email', email.toLowerCase())
            .eq('stripe_payment_intent_id', session.payment_intent as string)
        }
      }
      
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error('Payment failed:', paymentIntent.last_payment_error?.message)
      break
    }

    case 'customer.subscription.deleted': {
      // Handle subscription cancellation if needed in future
      const subscription = event.data.object as Stripe.Subscription
      console.log('Subscription cancelled:', subscription.id)
      break
    }

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}