import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({
        error: 'Not authenticated',
        details: userError?.message
      }, { status: 401 })
    }

    // Query entitlements multiple ways to debug

    // 1. By user_id only
    const { data: byUserId, error: error1 } = await supabase
      .from('entitlements')
      .select('*')
      .eq('user_id', user.id)
      .eq('active', true)

    // 2. By email only
    const { data: byEmail, error: error2 } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', user.email?.toLowerCase())
      .eq('active', true)

    // 3. Combined (as middleware does)
    const { data: combined, error: error3 } = await supabase
      .from('entitlements')
      .select('*')
      .or(`user_id.eq.${user.id},email.eq.${user.email?.toLowerCase()}`)
      .eq('active', true)

    // 4. All entitlements for this email (including inactive)
    const { data: allForEmail, error: error4 } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', user.email?.toLowerCase())

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      entitlements: {
        by_user_id: {
          count: byUserId?.length || 0,
          data: byUserId,
          error: error1?.message
        },
        by_email: {
          count: byEmail?.length || 0,
          data: byEmail,
          error: error2?.message
        },
        combined: {
          count: combined?.length || 0,
          data: combined,
          error: error3?.message
        },
        all_for_email: {
          count: allForEmail?.length || 0,
          data: allForEmail,
          error: error4?.message
        }
      },
      recommendations: {
        has_access: (combined?.length || 0) > 0,
        needs_linking: byEmail?.length > 0 && byEmail[0]?.user_id !== user.id,
        message: combined?.length > 0
          ? '✅ User has valid entitlements'
          : byEmail?.length > 0
            ? '⚠️ Entitlement found but not linked to user ID'
            : allForEmail?.length > 0
              ? '❌ Entitlements found but not active'
              : '❌ No entitlements found for this email'
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Server error',
      details: error.message
    }, { status: 500 })
  }
}