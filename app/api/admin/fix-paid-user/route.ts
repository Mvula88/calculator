import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Secret key to prevent unauthorized access
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-in-production'

/**
 * Fix users who paid but were never created in Supabase Auth
 * This handles the case where:
 * 1. User paid via Stripe
 * 2. Webhook created entitlement
 * 3. User never completed registration flow
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, adminSecret, sendPasswordReset = true } = body

    // Verify admin secret
    if (adminSecret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!email) {
      return NextResponse.json({
        error: 'Missing required field: email'
      }, { status: 400 })
    }

    const supabase = createServiceClient()
    const normalizedEmail = email.toLowerCase().trim()

    // 1. Check if entitlement exists
    const { data: entitlement, error: entitlementError } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('active', true)
      .single()

    if (entitlementError || !entitlement) {
      return NextResponse.json({
        error: 'No active entitlement found for this email. User may not have paid.',
        details: entitlementError?.message
      }, { status: 404 })
    }

    // 2. Check if user already exists in Auth
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      return NextResponse.json({
        error: 'Failed to check existing users',
        details: listError.message
      }, { status: 500 })
    }

    const existingUser = users?.find(u => u.email?.toLowerCase() === normalizedEmail)

    if (existingUser) {
      // User exists, just link the entitlement
      if (entitlement.user_id === existingUser.id) {
        return NextResponse.json({
          success: true,
          message: 'User already exists and is linked to entitlement',
          user: {
            id: existingUser.id,
            email: existingUser.email
          },
          entitlement
        })
      }

      // Update entitlement with user_id
      const { error: updateError } = await supabase
        .from('entitlements')
        .update({ user_id: existingUser.id })
        .eq('id', entitlement.id)

      if (updateError) {
        return NextResponse.json({
          error: 'Failed to link existing user to entitlement',
          details: updateError.message
        }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Existing user linked to entitlement',
        user: {
          id: existingUser.id,
          email: existingUser.email
        },
        entitlement
      })
    }

    // 3. User doesn't exist - create them
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      email_confirm: true, // Auto-confirm email since they already paid
      user_metadata: {
        added_by: 'admin_fix',
        tier: entitlement.tier,
        country: entitlement.country,
        payment_recovered: true,
        stripe_session_id: entitlement.stripe_session_id
      }
    })

    if (authError) {
      return NextResponse.json({
        error: 'Failed to create auth user',
        details: authError.message
      }, { status: 500 })
    }

    if (!authUser.user) {
      return NextResponse.json({
        error: 'User creation returned no user data'
      }, { status: 500 })
    }

    // 4. Link entitlement to new user
    const { error: updateError } = await supabase
      .from('entitlements')
      .update({
        user_id: authUser.user.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', entitlement.id)

    if (updateError) {
      return NextResponse.json({
        error: 'User created but failed to link entitlement',
        details: updateError.message,
        userId: authUser.user.id
      }, { status: 500 })
    }

    // 5. Send password reset email so user can set their password
    let passwordResetSent = false
    if (sendPasswordReset) {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password`
        }
      )

      if (!resetError) {
        passwordResetSent = true
      }
    }

    return NextResponse.json({
      success: true,
      message: 'User created and linked to existing entitlement',
      user: {
        id: authUser.user.id,
        email: authUser.user.email
      },
      entitlement: {
        id: entitlement.id,
        tier: entitlement.tier,
        country: entitlement.country,
        amount_paid: entitlement.amount_paid
      },
      passwordResetSent
    })

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to fix user'
    }, { status: 500 })
  }
}
