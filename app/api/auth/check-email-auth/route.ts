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

    console.log('[EMAIL CHECK AUTH] Checking email:', normalizedEmail)

    // Method 1: Check entitlements table
    let hasEntitlement = false
    try {
      const { data: entitlements, error: entError } = await supabase
        .from('entitlements')
        .select('id, email, active')
        .eq('email', normalizedEmail)
        .eq('active', true)

      hasEntitlement = !!(entitlements && entitlements.length > 0)
      console.log('[EMAIL CHECK AUTH] Entitlements found:', entitlements?.length || 0)
    } catch (e) {
      console.error('[EMAIL CHECK AUTH] Error checking entitlements:', e)
    }

    // Method 2: Try to get all users and check manually
    // This is a workaround since we can't use admin.listUsers without service key
    let hasAuthAccount = false
    try {
      // Try signing in with OTP to check if user exists
      // This won't actually send an OTP in test mode
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: false, // Important: don't create user
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
        }
      })

      // If we get "User not found" error, account doesn't exist
      // If we get no error or a different error (like rate limit), account likely exists
      if (otpError) {
        console.log('[EMAIL CHECK AUTH] OTP check error:', otpError.message)
        // Check if error indicates user doesn't exist
        hasAuthAccount = !otpError.message.toLowerCase().includes('not found') &&
                        !otpError.message.toLowerCase().includes('not exist') &&
                        !otpError.message.toLowerCase().includes('no user')
      } else {
        // No error means OTP was sent, so user exists
        hasAuthAccount = true
      }
    } catch (e) {
      console.error('[EMAIL CHECK AUTH] Error checking auth:', e)
    }

    // Method 3: Check if we can query public profiles or users table
    let hasProfile = false
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', normalizedEmail)
        .limit(1)

      hasProfile = !!(profiles && profiles.length > 0)
    } catch (e) {
      // profiles table might not exist, that's ok
    }

    const exists = hasEntitlement || hasAuthAccount || hasProfile

    console.log('[EMAIL CHECK AUTH RESULT]', {
      email: normalizedEmail,
      hasEntitlement,
      hasAuthAccount,
      hasProfile,
      exists
    })

    return NextResponse.json({
      exists,
      message: exists
        ? 'An account already exists with this email. Please login to your account to access your portal and avoid duplicate payments.'
        : null,
      details: {
        hasEntitlement,
        hasAuthAccount,
        hasProfile
      }
    })

  } catch (error) {
    console.error('[EMAIL CHECK AUTH] Fatal error:', error)
    return NextResponse.json(
      {
        error: 'Failed to check email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}