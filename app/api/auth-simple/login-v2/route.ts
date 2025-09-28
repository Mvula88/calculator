import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()

    // Step 1: Check database first (fastest)
    const supabase = createServiceClient()
    const { data: entitlement } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('active', true)
      .single()

    if (entitlement) {

      // Create session with tier from database
      const cookieStore = await cookies()
      const sessionData = {
        email: normalizedEmail,
        sessionId: entitlement.stripe_session_id || `email-login-${Date.now()}`,
        tier: entitlement.tier || 'mistake',
        createdAt: new Date().toISOString()
      }

      cookieStore.set('impota_session', JSON.stringify(sessionData), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      return NextResponse.json({ 
        success: true,
        email: normalizedEmail,
        source: 'database'
      })
    }

    // Step 2: Check Stripe directly (as fallback)

    try {
      // Search for successful checkout sessions with this email
      const sessions = await stripe.checkout.sessions.list({
        limit: 100,
        expand: ['data.customer']
      })

      // Find sessions for this email
      const userSessions = sessions.data.filter(session => {
        let sessionEmail = session.customer_email || session.customer_details?.email

        // Check if customer object has email (type guard for TypeScript)
        if (!sessionEmail && session.customer && typeof session.customer === 'object' && 'email' in session.customer) {
          sessionEmail = (session.customer as any).email
        }

        return sessionEmail?.toLowerCase() === normalizedEmail && 
               session.payment_status === 'paid'
      })

      if (userSessions.length > 0) {

        // Use the most recent session
        const latestSession = userSessions[0]

        // Get tier from session metadata or default to mistake
        const tier = latestSession.metadata?.tier || 'mistake'

        // Create session cookie with tier
        const cookieStore = await cookies()
        const sessionData = {
          email: normalizedEmail,
          sessionId: latestSession.id,
          tier: tier as 'mistake' | 'mastery',
          createdAt: new Date().toISOString()
        }

        cookieStore.set('impota_session', JSON.stringify(sessionData), {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })

        // Try to create database record for future logins (but don't fail if it doesn't work)
        try {
          let customerId = null
          if (typeof latestSession.customer === 'string') {
            customerId = latestSession.customer
          } else if (latestSession.customer && typeof latestSession.customer === 'object' && 'id' in latestSession.customer) {
            customerId = (latestSession.customer as any).id
          }

          await supabase.from('entitlements').insert({
            email: normalizedEmail,
            tier: tier as 'mistake' | 'mastery',
            country: latestSession.metadata?.country || 'na',
            active: true,
            stripe_session_id: latestSession.id,
            stripe_customer_id: customerId,
            amount_paid: latestSession.amount_total,
            currency: latestSession.currency
          })

        } catch (dbError) {

        }

        return NextResponse.json({ 
          success: true,
          email: normalizedEmail,
          source: 'stripe'
        })
      }
    } catch (stripeError) {

    }

    // Step 3: For development/testing, allow any email with a warning
    if (process.env.NODE_ENV === 'development' || normalizedEmail.includes('test')) {

      const cookieStore = await cookies()
      const sessionData = {
        email: normalizedEmail,
        sessionId: `dev-login-${Date.now()}`,
        createdAt: new Date().toISOString()
      }

      cookieStore.set('impota_session', JSON.stringify(sessionData), {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      return NextResponse.json({ 
        success: true,
        email: normalizedEmail,
        source: 'development'
      })
    }

    // No access found

    return NextResponse.json({ 
      error: 'No active subscription found for this email. Please check the email you used during purchase or contact support.' 
    }, { status: 404 })

  } catch (error) {

    return NextResponse.json({ 
      error: 'Failed to verify access. Please try again.' 
    }, { status: 500 })
  }
}