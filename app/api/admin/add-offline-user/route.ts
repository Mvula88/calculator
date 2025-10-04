import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Secret key to prevent unauthorized access
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-in-production'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, tier, country, adminSecret, paymentMethod, amount } = body

    // Verify admin secret
    if (adminSecret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate required fields
    if (!email || !tier || !country) {
      return NextResponse.json({
        error: 'Missing required fields: email, tier, country'
      }, { status: 400 })
    }

    // Validate tier
    if (!['mistake', 'mastery'].includes(tier)) {
      return NextResponse.json({
        error: 'Invalid tier. Must be "mistake" or "mastery"'
      }, { status: 400 })
    }

    // Validate country
    if (!['na', 'za', 'bw', 'zm'].includes(country)) {
      return NextResponse.json({
        error: 'Invalid country. Must be "na", "za", "bw", or "zm"'
      }, { status: 400 })
    }

    const supabase = createServiceClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already has active access
    const { data: existing } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('active', true)
      .single()

    if (existing) {
      return NextResponse.json({
        error: 'User already has active access',
        entitlement: existing
      }, { status: 400 })
    }

    // Create entitlement for offline payment
    const { data: entitlement, error: createError } = await supabase
      .from('entitlements')
      .insert({
        email: normalizedEmail,
        tier: tier as 'mistake' | 'mastery',
        country: country,
        active: true,
        stripe_session_id: `offline_${Date.now()}`, // Mark as offline payment
        stripe_customer_id: null,
        created_at: new Date().toISOString(),
        metadata: {
          payment_method: paymentMethod || 'offline',
          amount: amount || null,
          added_by: 'admin',
          added_at: new Date().toISOString()
        }
      })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({
        error: 'Failed to create entitlement',
        details: createError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Access granted to ${normalizedEmail}`,
      entitlement
    })

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to add user'
    }, { status: 500 })
  }
}
