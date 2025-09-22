import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// This version ONLY checks entitlements table, not auth system
// Use this if you want to allow emails that have no entitlements, even if they tried before

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

    console.log('[EMAIL CHECK STRICT] Checking ONLY entitlements for:', normalizedEmail)

    // ONLY check the entitlements table - ignore auth completely
    const { data: existingEntitlements, error } = await supabase
      .from('entitlements')
      .select('id, email, active, tier, country')
      .eq('email', normalizedEmail)
      .eq('active', true)

    if (error && error.code !== 'PGRST116') {
      console.error('[EMAIL CHECK STRICT] Database error:', error)
      return NextResponse.json(
        { error: 'Failed to check email' },
        { status: 500 }
      )
    }

    const exists = existingEntitlements && existingEntitlements.length > 0

    console.log('[EMAIL CHECK STRICT RESULT]', {
      email: normalizedEmail,
      hasActiveEntitlement: exists,
      entitlementCount: existingEntitlements?.length || 0
    })

    return NextResponse.json({
      exists,
      message: exists
        ? 'You have already purchased a guide with this email. Please login to access your portal.'
        : null,
      debug: {
        method: 'strict_entitlements_only',
        foundCount: existingEntitlements?.length || 0
      }
    })

  } catch (error) {
    console.error('[EMAIL CHECK STRICT] Fatal error:', error)
    return NextResponse.json(
      {
        error: 'Failed to check email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}