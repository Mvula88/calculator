import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createServiceClient } from '@/lib/supabase/server'

/**
 * Sets a password on an existing Supabase user that was pre-created by the
 * Stripe webhook on successful payment.
 *
 * Flow:
 *   1. Stripe webhook fires on `checkout.session.completed` and calls
 *      `supabase.auth.admin.createUser({ email, email_confirm: true })` — this
 *      creates an account with no password.
 *   2. The user is redirected to /auth/register?session_id=…&payment_status=success
 *      and tries to set their password via the client-side `signUp` call,
 *      which fails with "User already registered".
 *   3. The register page falls back to this endpoint, passing the session_id
 *      as proof of payment plus the chosen password / full name.
 *   4. We verify the Stripe session is paid, find the existing Supabase user
 *      by the email recorded on that session, and `admin.updateUserById` the
 *      password onto that user. The client then signs in normally.
 */
export async function POST(req: NextRequest) {
  try {
    const { sessionId, password, fullName } = await req.json()

    if (!sessionId || !password) {
      return NextResponse.json(
        { error: 'sessionId and password are required' },
        { status: 400 },
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 },
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed for this session' },
        { status: 400 },
      )
    }

    const email = session.customer_email || (session.metadata?.email as string | undefined)
    if (!email) {
      return NextResponse.json({ error: 'Session has no email' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: list, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 })
    }

    const user = list.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (!user) {
      return NextResponse.json(
        { error: 'No account found for this payment. Contact support@impota.com.' },
        { status: 404 },
      )
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password,
      user_metadata: {
        ...user.user_metadata,
        full_name: fullName || user.user_metadata?.full_name,
        has_paid: true,
        payment_session_id: sessionId,
        tier: 'mastery',
        payment_status: 'paid',
      },
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ email, userId: user.id })
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Failed to complete registration' },
      { status: 500 },
    )
  }
}
