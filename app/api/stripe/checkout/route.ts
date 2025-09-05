import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'

// Normalize country codes
function normalizeCountry(country: string): 'na' | 'za' | 'bw' | 'zm' {
  const countryMap: Record<string, 'na' | 'za' | 'bw' | 'zm'> = {
    'namibia': 'na',
    'na': 'na',
    'south-africa': 'za',
    'south_africa': 'za',
    'za': 'za',
    'botswana': 'bw',
    'bw': 'bw',
    'zambia': 'zm',
    'zm': 'zm'
  }
  return countryMap[country.toLowerCase()] || 'na'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { country, tier, productId, email } = body
    
    console.log('Checkout request:', { country, tier, productId, email })
    
    // Validate tier
    if (!tier || !['mistake', 'mastery'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }
    
    // Validate email
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    // Normalize country
    const normalizedCountry = normalizeCountry(country || 'na')
    
    // Get user from Supabase (optional - can work without auth for funnel)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    // Get the Stripe price ID based on country and tier
    const getPriceId = (country: string, tier: string): string => {
      const priceMap: Record<string, Record<string, string>> = {
        na: {
          mistake: process.env.STRIPE_PRODUCT_NA_MISTAKE!,
          mastery: process.env.STRIPE_PRODUCT_NA_MASTERY!
        },
        za: {
          mistake: process.env.STRIPE_PRODUCT_ZA_MISTAKE!,
          mastery: process.env.STRIPE_PRODUCT_ZA_MASTERY!
        },
        bw: {
          mistake: process.env.STRIPE_PRODUCT_BW_MISTAKE!,
          mastery: process.env.STRIPE_PRODUCT_BW_MASTERY!
        },
        zm: {
          mistake: process.env.STRIPE_PRODUCT_ZM_MISTAKE!,
          mastery: process.env.STRIPE_PRODUCT_ZM_MASTERY!
        }
      }
      
      const priceId = priceMap[country]?.[tier]
      if (!priceId) {
        throw new Error(`No price ID found for ${country} ${tier}`)
      }
      return priceId
    }
    
    // Get the price ID for this checkout
    const priceId = getPriceId(normalizedCountry, tier)
    
    // Create Stripe checkout session with fixed price ID
    const sessionConfig: any = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      metadata: {
        user_id: user?.id || '',
        product_id: productId || tier,
        country: normalizedCountry,
        tier: tier,
        email: email.toLowerCase()
      },
      customer_email: email.toLowerCase(),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${normalizedCountry}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${normalizedCountry}/guide`
    }
    
    // Create the session
    const session = await stripe.checkout.sessions.create(sessionConfig)
    
    console.log('Created checkout session:', session.id)
    
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    })
    
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}