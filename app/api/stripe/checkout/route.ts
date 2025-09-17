import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createClient } from '@/lib/supabase/server'
import { paymentRateLimit } from '@/lib/rate-limit'
import crypto from 'crypto'

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
  // Rate limiting
  const rateLimitResult = await paymentRateLimit(req)
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.reset 
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toISOString()
        }
      }
    )
  }
  
  try {
    const body = await req.json()
    const { country, tier, productId, email, isUpgrade } = body
    
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
      // Map environment variable names
      const envVarName = `STRIPE_PRODUCT_${country.toUpperCase()}_${tier.toUpperCase()}`
      const priceId = process.env[envVarName]
      
      console.log('Looking for env var:', envVarName)
      console.log('Found price ID:', priceId)
      
      // Fallback to hardcoded values if env vars not available
      const fallbackPrices: Record<string, Record<string, string>> = {
        na: {
          mistake: 'price_1S3tjDK8Avs5uFkK6aBQNdWx',
          mastery: 'price_1S3u8ZK8Avs5uFkKvpjaeLYA'
        },
        za: {
          mistake: 'price_1S3tkXK8Avs5uFkKTXRCJJuk',
          mastery: 'price_1S3u9pK8Avs5uFkKNAxA1GdK'
        },
        bw: {
          mistake: 'price_1S3toYK8Avs5uFkKKRXTeM0g',
          mastery: 'price_1S3uC8K8Avs5uFkKxL54iq8Q'
        },
        zm: {
          mistake: 'price_1S3txCK8Avs5uFkKcxVrjVWP',
          mastery: 'price_1S3uDaK8Avs5uFkKusc8RdlK'
        }
      }
      
      const finalPriceId = priceId || fallbackPrices[country]?.[tier]
      
      if (!finalPriceId) {
        console.error('Available env vars:', Object.keys(process.env).filter(k => k.startsWith('STRIPE')))
        throw new Error(`No price ID found for ${country} ${tier}. Env var ${envVarName} = ${priceId}`)
      }
      
      return finalPriceId
    }
    
    // Get the price ID for this checkout
    const priceId = getPriceId(normalizedCountry, tier)
    
    // Generate idempotency key for this request with timestamp to ensure uniqueness
    const timestamp = Date.now()
    const idempotencyKey = crypto
      .createHash('sha256')
      .update(`${email}-${tier}-${country}-${timestamp}`)
      .digest('hex')
    
    // Get the base URL - prefer actual host to handle www redirects properly
    const host = req.headers.get('host')
    const protocol = req.headers.get('x-forwarded-proto') || 'https'

    // Use actual host if available to match the current domain (www or non-www)
    let baseUrl = host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_APP_URL

    if (!baseUrl) {
      baseUrl = 'http://localhost:3000'
      console.log('Warning: No host header or env var, using localhost')
    } else {
      console.log('Using base URL:', baseUrl, '(from:', host ? 'host header' : 'env var', ')')
    }
    
    // Remove trailing slash if present
    baseUrl = baseUrl.replace(/\/$/, '')
    
    // Use environment variable with proper fallback
    // After successful payment, if user exists redirect to portal, else to login
    const successUrl = user
      ? `${baseUrl}/portal/welcome?session_id={CHECKOUT_SESSION_ID}&payment_status=success`
      : `${baseUrl}/auth/login?session_id={CHECKOUT_SESSION_ID}&payment_status=success`
    const cancelUrl = `${baseUrl}/packages?payment_status=canceled`
    
    console.log('=== STRIPE CHECKOUT URLS ===')
    console.log('Base URL:', baseUrl)
    console.log('Success URL:', successUrl)
    console.log('Cancel URL:', cancelUrl)
    console.log('Is Upgrade:', isUpgrade)
    console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL || 'NOT SET - USING FALLBACK')
    console.log('=========================')
    
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
        email: email.toLowerCase(),
        idempotency_key: idempotencyKey
      },
      customer_email: email.toLowerCase(),
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_intent_data: {
        metadata: {
          idempotency_key: idempotencyKey
        }
      }
    }
    
    // Create the session with idempotency
    const session = await stripe.checkout.sessions.create(
      sessionConfig,
      {
        idempotencyKey: idempotencyKey
      }
    )
    
    console.log('=== CREATED STRIPE SESSION ===')
    console.log('Session ID:', session.id)
    console.log('Session success_url:', session.success_url)
    console.log('Session cancel_url:', session.cancel_url)
    console.log('URLs passed to Stripe:')
    console.log('  - success_url:', successUrl)
    console.log('  - cancel_url:', cancelUrl)
    console.log('==============================')
    
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
      debug: {
        success_url: session.success_url,
        cancel_url: session.cancel_url
      }
    })
    
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}