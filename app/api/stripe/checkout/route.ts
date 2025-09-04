import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRODUCTS } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'
import { getStripePrice } from '@/lib/stripe/pricing'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, country = 'namibia' } = body
    
    console.log('Checkout request:', { productId, country })
    
    // Get product details
    const product = Object.values(PRODUCTS).find(p => p.id === productId)
    if (!product) {
      console.error('Product not found:', productId)
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

    // Create Stripe customer (simplified - don't store in users table)
    let customerId: string
    
    try {
      // Always create a new customer for simplicity
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: {
          supabase_user_id: user.id
        }
      })
      customerId = customer.id
      console.log('Created Stripe customer:', customerId)
    } catch (customerError) {
      console.error('Error creating Stripe customer:', customerError)
      // If customer creation fails, proceed without customer ID
      customerId = ''
    }

    // Create checkout session configuration
    const sessionConfig: any = {
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success&product=${productId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
      metadata: {
        user_id: user.id,
        product_id: productId,
        country: country
      }
    }
    
    // Only add customer if we have one
    if (customerId) {
      sessionConfig.customer = customerId
    }

    // Get dynamic price based on country
    const dynamicPrice = getStripePrice(productId as any, country)
    
    console.log('Dynamic price:', dynamicPrice)
    
    // Always use dynamic pricing based on country
    sessionConfig.line_items = [{
      price_data: {
        currency: dynamicPrice.currency,
        product_data: {
          name: product.name,
          description: product.description,
          metadata: {
            product_id: product.id,
            country: country
          }
        },
        unit_amount: dynamicPrice.amount,
      },
      quantity: 1,
    }]

    console.log('Creating Stripe session with config:', JSON.stringify(sessionConfig, null, 2))

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log('Session created:', session.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error details:', error)
    
    // Return more detailed error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}