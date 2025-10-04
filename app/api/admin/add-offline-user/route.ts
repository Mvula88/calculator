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

    // Create Supabase auth user (so they can set password later)
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        added_by: 'admin',
        payment_method: paymentMethod || 'offline',
        offline_payment: true,
        full_name: email.split('@')[0] // Use email prefix as default name
      }
    })

    if (authError && !authError.message.includes('already been registered')) {
      return NextResponse.json({
        error: `Failed to create auth account: ${authError.message}`
      }, { status: 500 })
    }

    // Get the created user's ID (or find existing user)
    let userId = authUser?.user?.id
    if (!userId) {
      // If user already existed, get their ID
      const { data: existingUser } = await supabase.auth.admin.listUsers()
      const foundUser = existingUser?.users?.find(u => u.email === normalizedEmail)
      userId = foundUser?.id
    }

    // Create entitlement for offline payment
    const { data: entitlement, error: createError } = await supabase
      .from('entitlements')
      .insert({
        email: normalizedEmail,
        user_id: userId, // Link to auth user
        tier: tier as 'mistake' | 'mastery',
        country: country,
        active: true,
        stripe_session_id: `offline_${Date.now()}_${paymentMethod || 'cash'}`, // Mark as offline payment
        amount_paid: amount ? parseInt(amount.replace(/[^0-9]/g, '')) : null,
        currency: 'NAD',
        created_at: new Date().toISOString()
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
