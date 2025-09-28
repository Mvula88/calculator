import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { stripe } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email: providedEmail } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
    }

    // Retrieve the session from Stripe to get the email
    let email = providedEmail
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)

      // Use email from Stripe session if available
      if (stripeSession.customer_email) {
        email = stripeSession.customer_email
      } else if (stripeSession.customer_details?.email) {
        email = stripeSession.customer_details.email
      }

      // Verify payment was successful
      if (stripeSession.payment_status !== 'paid') {
        return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
      }
    } catch (stripeError) {

      // Continue with provided email if Stripe lookup fails
    }

    if (!email) {
      return NextResponse.json({ error: 'Unable to determine email for session' }, { status: 400 })
    }

    // Use service client to bypass RLS
    const supabase = createServiceClient()
    const authClient = await createClient()

    // Verify the payment session exists
    const { data: entitlement, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .eq('email', email.toLowerCase())
      .single()

    if (error || !entitlement) {
      return NextResponse.json({ error: 'Invalid session or payment not found' }, { status: 404 })
    }

    // Check if user exists and try to auto-login
    let autoLoginSuccess = false

    if (entitlement.user_id) {
      // User was created during payment, try to sign them in
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
      const user = users?.find(u => u.id === entitlement.user_id)

      if (user && user.email) {
        // Generate a new magic link for immediate login
        const { data: magicLink, error: linkError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: user.email,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/portal`
          }
        })

        if (!linkError && magicLink) {
          // Extract the token from the magic link URL
          const url = new URL(magicLink.properties.action_link)
          const token = url.searchParams.get('token')
          const type = url.searchParams.get('type')

          if (token && type) {
            // Verify the token and create a session
            const { data: sessionData, error: sessionError } = await authClient.auth.verifyOtp({
              token_hash: token,
              type: type as any
            })

            if (!sessionError && sessionData.session) {
              autoLoginSuccess = true

            }
          }
        }
      }
    }

    // Set a temporary session cookie for portal access
    const cookieStore = await cookies()
    cookieStore.set('portal_session', JSON.stringify({
      email: entitlement.email,
      tier: entitlement.tier,
      country: entitlement.country,
      sessionId: sessionId
    }), {
      httpOnly: false, // Allow JavaScript to read it for client-side checks
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/' // Ensure it's available site-wide
    })

    return NextResponse.json({ 
      success: true,
      autoLogin: autoLoginSuccess,
      entitlement: {
        email: entitlement.email,
        tier: entitlement.tier,
        country: entitlement.country,
        hasAccount: !!entitlement.user_id
      }
    })
  } catch (error) {

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}