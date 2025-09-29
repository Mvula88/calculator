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

    // Only check the entitlements table - this is our source of truth
    // If someone has an active entitlement, they've already paid
    const { data: existingEntitlements, error, count } = await supabase
      .from('entitlements')
      .select('id, email, active, tier, country, created_at', { count: 'exact' })
      .eq('email', normalizedEmail)
      .eq('active', true)

    if (error) {

      // Don't fail silently - if we can't check, we should block payment to be safe
      if (error.code !== 'PGRST116') { // PGRST116 is "not found" which is ok
        return NextResponse.json(
          {
            error: 'Cannot verify email status. Please try again or contact support.',
            debugInfo: {
              code: error.code,
              message: error.message
            }
          },
          { status: 500 }
        )
      }
    }

    const exists = existingEntitlements && existingEntitlements.length > 0

    return NextResponse.json({
      exists,
      message: exists
        ? 'You have already purchased a guide with this email. Please login to access your portal to avoid duplicate payments.'
        : null,
      entitlement: exists && existingEntitlements[0] ? {
        tier: existingEntitlements[0].tier,
        country: existingEntitlements[0].country
      } : null,
      debug: {
        emailChecked: normalizedEmail,
        foundCount: existingEntitlements?.length || 0
      }
    })

  } catch (error) {

    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    )
  }
}