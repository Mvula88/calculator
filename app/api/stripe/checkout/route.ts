import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRODUCTS } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'
import { getStripePrice } from '@/lib/stripe/pricing'

export async function POST(req: NextRequest) {
  try {
    const { productId, country = 'namibia' } = await req.json()
    
    // Get product details
    const product = Object.values(PRODUCTS).find(p => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    }

    // Get user from Supabase
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already purchased this product
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_type', productId)
      .single()

    if (existingPurchase) {
      return NextResponse.json({ error: 'Product already purchased' }, { status: 400 })
    }

    // Create or get Stripe customer
    let customerId: string
    
    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (userData?.stripe_customer_id) {
      customerId = userData.stripe_customer_id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id
        }
      })
      customerId = customer.id
      
      // Update user with Stripe customer ID
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Create checkout session using Price ID if available
    const sessionConfig: any = {
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success&product=${productId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
      metadata: {
        user_id: user.id,
        product_id: productId
      }
    }

    // Get dynamic price based on country
    const dynamicPrice = getStripePrice(productId as any, country)
    
    // Always use dynamic pricing based on country
    sessionConfig.line_items = [{
      price_data: {
        currency: dynamicPrice.currency,
        product_data: {
          name: product.name,
          description: `${product.description} (${dynamicPrice.display})`,
          metadata: {
            product_id: product.id,
            country: country
          }
        },
        unit_amount: dynamicPrice.amount,
      },
      quantity: 1,
    }]

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}