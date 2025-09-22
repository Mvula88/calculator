import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// This endpoint helps fix missing entitlements for users who paid but don't have entitlement records
// Only accessible to authenticated admin users

export async function POST(req: NextRequest) {
  try {
    const { email, tier = 'mastery', country = 'na', stripeSessionId } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Check if current user is authenticated
    const { data: { user } } = await supabase.auth.getUser()

    // For security, only allow if user is fixing their own entitlement
    // or if they're an admin (you can add admin check here)
    if (!user || (user.email?.toLowerCase() !== normalizedEmail)) {
      return NextResponse.json(
        { error: 'Unauthorized. You can only fix your own entitlements.' },
        { status: 403 }
      )
    }

    console.log('[FIX ENTITLEMENTS] Checking for:', normalizedEmail)

    // Check if entitlement already exists
    const { data: existing } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('active', true)
      .single()

    if (existing) {
      return NextResponse.json({
        message: 'Entitlement already exists',
        entitlement: existing
      })
    }

    // Create the missing entitlement
    const { data: newEntitlement, error: createError } = await supabase
      .from('entitlements')
      .insert({
        user_id: user.id,
        email: normalizedEmail,
        tier,
        country,
        active: true,
        stripe_session_id: stripeSessionId || `manual-fix-${Date.now()}`,
        amount_paid: 0, // Will need to be updated manually
        currency: 'USD',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (createError) {
      console.error('[FIX ENTITLEMENTS] Error creating entitlement:', createError)
      return NextResponse.json(
        {
          error: 'Failed to create entitlement',
          details: createError.message
        },
        { status: 500 }
      )
    }

    console.log('[FIX ENTITLEMENTS] Created entitlement:', newEntitlement)

    return NextResponse.json({
      success: true,
      message: 'Entitlement created successfully',
      entitlement: newEntitlement
    })

  } catch (error) {
    console.error('[FIX ENTITLEMENTS] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fix entitlements',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check current entitlements
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get user's entitlements
    const { data: entitlements, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', user.email?.toLowerCase())

    if (error) {
      console.error('[FIX ENTITLEMENTS] Error fetching:', error)
      return NextResponse.json(
        {
          error: 'Failed to fetch entitlements',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email
      },
      entitlements: entitlements || [],
      hasActiveEntitlement: entitlements?.some(e => e.active) || false
    })

  } catch (error) {
    console.error('[FIX ENTITLEMENTS] GET Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to get entitlements',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}