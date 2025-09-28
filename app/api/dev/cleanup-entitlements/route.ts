import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, keepLatest = true } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Get all entitlements for this email
    const { data: entitlements, error: fetchError } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!entitlements || entitlements.length <= 1) {
      return NextResponse.json({
        message: 'No duplicate entitlements found',
        count: entitlements?.length || 0
      })
    }

    // Keep the best entitlement (prefer mastery over mistake, then latest)
    let entitlementToKeep

    // First check if there's a mastery tier
    const masteryEntitlement = entitlements.find(e => e.tier === 'mastery')
    if (masteryEntitlement) {
      entitlementToKeep = masteryEntitlement
    } else {
      // Otherwise keep the most recent one
      entitlementToKeep = entitlements[0]
    }

    // Deactivate all others
    const idsToDeactivate = entitlements
      .filter(e => e.id !== entitlementToKeep.id)
      .map(e => e.id)

    const { error: updateError } = await supabase
      .from('entitlements')
      .update({ active: false })
      .in('id', idsToDeactivate)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${idsToDeactivate.length} duplicate entitlements`,
      kept: {
        id: entitlementToKeep.id,
        tier: entitlementToKeep.tier,
        created_at: entitlementToKeep.created_at
      },
      deactivated: idsToDeactivate.length
    })

  } catch (error) {

    return NextResponse.json({ 
      error: 'Failed to clean entitlements',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to check duplicates without fixing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { data: entitlements, error } = await supabase
    .from('entitlements')
    .select('*')
    .eq('email', email.toLowerCase())
    .order('active', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const activeCount = entitlements?.filter(e => e.active).length || 0
  const totalCount = entitlements?.length || 0

  return NextResponse.json({
    email,
    totalEntitlements: totalCount,
    activeEntitlements: activeCount,
    hasDuplicates: activeCount > 1,
    entitlements: entitlements?.map(e => ({
      id: e.id,
      tier: e.tier,
      active: e.active,
      created_at: e.created_at,
      stripe_session_id: e.stripe_session_id
    }))
  })
}