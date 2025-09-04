import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'
import { getStripePrice } from '@/lib/stripe/pricing'

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

// Get price based on country and tier
function getTierPrice(country: 'na' | 'za' | 'bw' | 'zm', tier: 'mistake' | 'mastery') {
  const prices = {
    na: {
      mistake: { amount: 49900, currency: 'nad', display: 'N$499' },
      mastery: { amount: 199900, currency: 'nad', display: 'N$1,999' }
    },
    za: {
      mistake: { amount: 49900, currency: 'zar', display: 'R499' },
      mastery: { amount: 249900, currency: 'zar', display: 'R2,499' }
    },
    bw: {
      mistake: { amount: 49900, currency: 'bwp', display: 'P499' },
      mastery: { amount: 199900, currency: 'bwp', display: 'P1,999' }
    },
    zm: {
      mistake: { amount: 99900, currency: 'zmw', display: 'K999' },
      mastery: { amount: 399900, currency: 'zmw', display: 'K3,999' }
    }
  }
  return prices[country][tier]
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { country, tier, productId } = body
    
    console.log('Checkout request:', { country, tier, productId })
    
    // Validate tier
    if (!tier || !['mistake', 'mastery'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }
    
    // Normalize country
    const normalizedCountry = normalizeCountry(country || 'na')
    
    // Get user from Supabase (optional - can work without auth for funnel)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    // Get price for tier and country
    const price = getTierPrice(normalizedCountry, tier as 'mistake' | 'mastery')
    
    // Product names based on tier
    const productNames = {
      mistake: `${normalizedCountry === 'na' ? 'Walvis Bay' : normalizedCountry === 'za' ? 'Durban' : 'Import'} Mistake Guide`,
      mastery: 'Import Mastery + Calculator Access'
    }
    
    // Create Stripe checkout session
    const sessionConfig: any = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: price.currency === 'nad' ? 'zar' : price.currency, // Stripe doesn't support NAD, use ZAR
          product_data: {
            name: productNames[tier as 'mistake' | 'mastery'],
            description: tier === 'mistake' 
              ? 'Avoid costly port mistakes with this essential guide'
              : 'Complete import system with calculator, agents directory, and priority support',
            metadata: {
              product_id: productId || tier,
              country: normalizedCountry,
              tier: tier
            }
          },
          unit_amount: price.amount,
        },
        quantity: 1,
      }],
      metadata: {
        user_id: user?.id || '',
        product_id: productId || tier,
        country: normalizedCountry,
        tier: tier,
        email: user?.email || ''
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${normalizedCountry}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${normalizedCountry}/${tier === 'mistake' ? 'guide' : 'upsell'}`
    }
    
    // Add customer email if available
    if (user?.email) {
      sessionConfig.customer_email = user.email
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