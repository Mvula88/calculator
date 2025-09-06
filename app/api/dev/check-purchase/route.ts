import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil'
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Check for existing entitlements
    const { data: entitlements, error: entError } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })

    // Check Stripe for recent sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
    })

    const userSessions = sessions.data.filter(
      session => session.customer_details?.email?.toLowerCase() === email.toLowerCase()
    )

    // Check for completed sessions that should have created entitlements
    const completedSessions = userSessions.filter(
      session => session.payment_status === 'paid' && session.status === 'complete'
    )

    // If user has completed payment but no entitlement, create it
    if (completedSessions.length > 0 && (!entitlements || entitlements.length === 0)) {
      const latestSession = completedSessions[0]
      
      // Extract metadata from session
      const tier = latestSession.metadata?.tier || 'mistake'
      const country = latestSession.metadata?.country || 'na'

      // Create the missing entitlement
      const { data: newEntitlement, error: createError } = await supabase
        .from('entitlements')
        .insert({
          email: email.toLowerCase(),
          tier: tier,
          country: country,
          active: true,
          stripe_session_id: latestSession.id,
          amount_paid: latestSession.amount_total,
          currency: latestSession.currency,
          user_id: null // Will be linked when user logs in
        })
        .select()
        .single()

      if (createError) {
        return NextResponse.json({
          error: 'Failed to create entitlement',
          details: createError.message,
          stripeSession: latestSession.id
        }, { status: 500 })
      }

      return NextResponse.json({
        message: 'Entitlement created successfully!',
        entitlement: newEntitlement,
        stripeSession: latestSession.id,
        action: 'CREATED_MISSING_ENTITLEMENT'
      })
    }

    return NextResponse.json({
      entitlements: entitlements || [],
      stripeSessions: {
        total: userSessions.length,
        completed: completedSessions.length,
        sessions: userSessions.map(s => ({
          id: s.id,
          status: s.status,
          payment_status: s.payment_status,
          amount: s.amount_total,
          currency: s.currency,
          created: new Date(s.created * 1000).toISOString(),
          metadata: s.metadata
        }))
      },
      diagnosis: {
        hasEntitlements: entitlements && entitlements.length > 0,
        hasCompletedPayments: completedSessions.length > 0,
        needsManualFix: completedSessions.length > 0 && (!entitlements || entitlements.length === 0)
      }
    })

  } catch (error) {
    console.error('Error checking purchase:', error)
    return NextResponse.json({ 
      error: 'Failed to check purchase',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Manual fix endpoint
export async function PUT(request: NextRequest) {
  try {
    const { email, tier = 'mistake', country = 'na' } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Create manual entitlement
    const { data, error } = await supabase
      .from('entitlements')
      .insert({
        email: email.toLowerCase(),
        tier: tier,
        country: country,
        active: true,
        stripe_session_id: `manual_fix_${Date.now()}`,
        amount_paid: tier === 'mastery' ? 299900 : 49900,
        currency: country === 'na' ? 'nad' : 'zar',
        user_id: null
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Manual entitlement created successfully',
      entitlement: data
    })

  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create manual entitlement',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}