import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    const { email, tier = 'mastery', country = 'na' } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Note: We'll set user_id to null for test entitlements
    // When the user logs in with this email, the entitlement will still work
    // because we also match by email
    const userId = null

    // Check if entitlement already exists
    const { data: existing } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .single()

    if (existing) {
      return NextResponse.json({ 
        message: 'Entitlement already exists',
        entitlement: existing 
      })
    }

    // Create entitlement
    const { data, error } = await supabase
      .from('entitlements')
      .insert({
        user_id: userId,
        email: email.toLowerCase(),
        tier: tier,
        country: country,
        active: true,
        stripe_session_id: `test_${Date.now()}`,
        amount_paid: tier === 'mastery' ? 299900 : 49900,
        currency: country === 'na' ? 'nad' : country === 'za' ? 'zar' : 'usd'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating entitlement:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Test entitlement created successfully',
      entitlement: data 
    })

  } catch (error) {
    console.error('Failed to create entitlement:', error)
    return NextResponse.json({ 
      error: 'Failed to create entitlement',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to check existing entitlements
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('entitlements')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('active', true)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ entitlements: data || [] })
}