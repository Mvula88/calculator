import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Check if user exists in entitlements table (this is our source of truth)
    const { data: existingEntitlement, error: entitlementError } = await supabase
      .from('entitlements')
      .select('id, email, active')
      .eq('email', normalizedEmail)
      .eq('active', true)
      .maybeSingle()

    if (entitlementError && entitlementError.code !== 'PGRST116') {
      console.error('Database error checking entitlements:', entitlementError)
    }

    // Also check if user exists in auth system
    let userExistsInAuth = false
    try {
      const { data: { user } } = await supabase.auth.getUser()

      // Try to sign in with just the email to see if account exists
      // This won't actually sign them in without password, but tells us if account exists
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: false
        }
      })

      // If error includes "User not found" or similar, account doesn't exist
      // If no error or different error, account likely exists
      userExistsInAuth = !signInError || !signInError.message?.includes('not found')
    } catch (authCheckError) {
      console.log('Auth check error (expected):', authCheckError)
    }

    const exists = !!(existingEntitlement || userExistsInAuth)

    console.log('Email check for:', normalizedEmail, {
      hasEntitlement: !!existingEntitlement,
      hasAuthAccount: userExistsInAuth,
      exists
    })

    return NextResponse.json({
      exists,
      message: exists
        ? 'An account with this email already exists. Please login to access your portal.'
        : null
    })

  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    )
  }
}