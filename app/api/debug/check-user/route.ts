import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    // Get email from query parameter
    const email = req.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json({
        error: 'Please provide email parameter',
        usage: 'Add ?email=your-email@example.com to the URL'
      })
    }

    // Use service role client to bypass RLS
    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Check for user in auth.users table
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
    const authUser = users?.find(u => u.email?.toLowerCase() === email.toLowerCase())

    // Check for entitlements
    const { data: entitlements, error: entError } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })

    // Get active entitlement
    const activeEntitlement = entitlements?.find(e => e.active === true)

    return NextResponse.json({
      email: email.toLowerCase(),
      auth_user: {
        exists: !!authUser,
        id: authUser?.id,
        email: authUser?.email,
        created_at: authUser?.created_at,
        last_sign_in: authUser?.last_sign_in_at
      },
      entitlements: {
        total_count: entitlements?.length || 0,
        active_count: entitlements?.filter(e => e.active).length || 0,
        list: entitlements?.map(e => ({
          id: e.id,
          tier: e.tier,
          active: e.active,
          user_id: e.user_id,
          stripe_session_id: e.stripe_session_id?.substring(0, 20) + '...',
          created_at: e.created_at,
          amount_paid: e.amount_paid,
          currency: e.currency
        }))
      },
      diagnosis: {
        has_account: !!authUser,
        has_entitlements: (entitlements?.length || 0) > 0,
        has_active_entitlement: !!activeEntitlement,
        entitlement_linked: activeEntitlement?.user_id === authUser?.id,
        issues: [
          !authUser && 'No user account found - need to create account',
          authUser && !entitlements?.length && 'No entitlements found - payment may not have processed',
          authUser && activeEntitlement && !activeEntitlement.user_id && 'Entitlement not linked to user account',
          authUser && activeEntitlement && activeEntitlement.user_id !== authUser.id && 'Entitlement linked to different user'
        ].filter(Boolean),
        recommendations: !authUser
          ? 'Create an account with this email address'
          : !entitlements?.length
            ? 'Check if payment was made with this email. Contact support if payment was made.'
            : !activeEntitlement
              ? 'Entitlements exist but none are active. Contact support.'
              : activeEntitlement.user_id !== authUser.id
                ? 'Entitlement needs to be linked to your user account. This should happen automatically on login.'
                : '✅ Everything looks good - try logging in again'
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Server error',
      details: error.message
    }, { status: 500 })
  }
}