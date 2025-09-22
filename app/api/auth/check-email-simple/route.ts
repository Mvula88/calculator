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

    console.log('Checking email:', normalizedEmail)

    // Only check the entitlements table - this is our source of truth
    // If someone has an active entitlement, they've already paid
    const { data: existingEntitlement, error } = await supabase
      .from('entitlements')
      .select('id, email, active, tier, country')
      .eq('email', normalizedEmail)
      .eq('active', true)
      .limit(1)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.error('Database error checking email:', error)
      return NextResponse.json(
        { error: 'Failed to check email' },
        { status: 500 }
      )
    }

    const exists = !!existingEntitlement

    console.log('Email check result:', {
      email: normalizedEmail,
      exists,
      entitlement: existingEntitlement ? {
        tier: existingEntitlement.tier,
        country: existingEntitlement.country
      } : null
    })

    return NextResponse.json({
      exists,
      message: exists
        ? 'You have already purchased a guide with this email. Please login to access your portal.'
        : null,
      entitlement: exists ? {
        tier: existingEntitlement.tier,
        country: existingEntitlement.country
      } : null
    })

  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    )
  }
}