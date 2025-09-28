import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Get email from query params for testing
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    // First, check if we can access the entitlements table at all
    const { data: allEntitlements, error: allError, count } = await supabase
      .from('entitlements')
      .select('*', { count: 'exact' })
      .limit(10)

    if (allError) {

      return NextResponse.json({
        error: 'Cannot access entitlements table',
        details: allError.message,
        code: allError.code
      }, { status: 500 })
    }

    // If email provided, check for that specific email
    let specificEntitlement = null
    if (email) {
      const { data, error } = await supabase
        .from('entitlements')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('active', true)

      if (!error) {
        specificEntitlement = data
      }
    }

    return NextResponse.json({
      success: true,
      totalEntitlements: count,
      sampleEntitlements: allEntitlements,
      emailProvided: email,
      emailEntitlements: specificEntitlement,
      emailExists: specificEntitlement && specificEntitlement.length > 0
    })

  } catch (error) {

    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const supabase = await createClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Check multiple ways
    const checks = {
      entitlements: null as any,
      entitlementsError: null as any,
      authCheck: null as any,
      authError: null as any
    }

    // Check 1: Entitlements table
    const { data: entData, error: entError } = await supabase
      .from('entitlements')
      .select('id, email, active, tier, country, created_at')
      .eq('email', normalizedEmail)
      .eq('active', true)

    checks.entitlements = entData
    checks.entitlementsError = entError

    // Check 2: Try auth check (may fail, that's ok)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      checks.authCheck = { currentUser: user?.email }
    } catch (e) {
      checks.authError = e
    }

    const exists = !!(entData && entData.length > 0)

    return NextResponse.json({
      email: normalizedEmail,
      exists,
      checks,
      message: exists
        ? `Found ${entData.length} active entitlement(s) for this email`
        : 'No active entitlements found for this email'
    })

  } catch (error) {

    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}