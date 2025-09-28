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

    // ONLY check the entitlements table - ignore auth completely
    const { data: existingEntitlements, error } = await supabase
      .from('entitlements')
      .select('id, email, active, tier, country')
      .eq('email', normalizedEmail)
      .eq('active', true)

    // Also check for common typo: @email.com vs @gmail.com
    let additionalCheck = null
    if (normalizedEmail.includes('@gmail.com')) {
      const emailVariant = normalizedEmail.replace('@gmail.com', '@email.com')
      const { data } = await supabase
        .from('entitlements')
        .select('id, email, active, tier, country')
        .eq('email', emailVariant)
        .eq('active', true)
      additionalCheck = data
    }

    const allEntitlements = [
      ...(existingEntitlements || []),
      ...(additionalCheck || [])
    ]

    if (error && error.code !== 'PGRST116') {

      return NextResponse.json(
        { error: 'Failed to check email' },
        { status: 500 }
      )
    }

    const exists = allEntitlements && allEntitlements.length > 0

    return NextResponse.json({
      exists,
      message: exists
        ? 'You have already purchased a guide with this email. Please login to access your portal.'
        : null,
      debug: {
        method: 'strict_entitlements_only',
        foundCount: allEntitlements?.length || 0,
        foundEmails: allEntitlements?.map(e => e.email) || []
      }
    })

  } catch (error) {

    return NextResponse.json(
      {
        error: 'Failed to check email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}