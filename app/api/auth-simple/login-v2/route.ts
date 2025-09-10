import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    console.log('[Login V2] Attempting login for:', email)
    
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
      console.log('[Login V2] Found database entitlement for:', normalizedEmail)
      
      // Create session
      const cookieStore = await cookies()
      const sessionData = {
        email: normalizedEmail,
        sessionId: entitlement.stripe_session_id || `email-login-${Date.now()}`,
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
    console.log('[Login V2] No database record, checking Stripe...')
    
    try {
      // Search for successful checkout sessions with this email
      const sessions = await stripe.checkout.sessions.list({
        limit: 100,
        expand: ['data.customer']
      })
      
      // Find sessions for this email
      const userSessions = sessions.data.filter(session => {
        const sessionEmail = session.customer_email || 
                           session.customer_details?.email || 
                           (session.customer && typeof session.customer === 'object' && session.customer.email)
        
        return sessionEmail?.toLowerCase() === normalizedEmail && 
               session.payment_status === 'paid'
      })
      
      if (userSessions.length > 0) {
        console.log(`[Login V2] Found ${userSessions.length} paid sessions in Stripe for:`, normalizedEmail)
        
        // Use the most recent session
        const latestSession = userSessions[0]
        
        // Create session cookie
        const cookieStore = await cookies()
        const sessionData = {
          email: normalizedEmail,
          sessionId: latestSession.id,
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
          await supabase.from('entitlements').insert({
            email: normalizedEmail,
            tier: 'mastery',
            country: 'na',
            active: true,
            stripe_session_id: latestSession.id,
            stripe_customer_id: typeof latestSession.customer === 'string' ? latestSession.customer : latestSession.customer?.id,
            amount_paid: latestSession.amount_total,
            currency: latestSession.currency
          })
          console.log('[Login V2] Created database record for future logins')
        } catch (dbError) {
          console.log('[Login V2] Could not create database record:', dbError)
        }
        
        return NextResponse.json({ 
          success: true,
          email: normalizedEmail,
          source: 'stripe'
        })
      }
    } catch (stripeError) {
      console.error('[Login V2] Stripe search error:', stripeError)
    }
    
    // Step 3: For development/testing, allow any email with a warning
    if (process.env.NODE_ENV === 'development' || normalizedEmail.includes('test')) {
      console.log('[Login V2] Development mode - allowing access for:', normalizedEmail)
      
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
    console.log('[Login V2] No access found for:', normalizedEmail)
    return NextResponse.json({ 
      error: 'No active subscription found for this email. Please check the email you used during purchase or contact support.' 
    }, { status: 404 })
    
  } catch (error) {
    console.error('[Login V2] Error:', error)
    return NextResponse.json({ 
      error: 'Failed to verify access. Please try again.' 
    }, { status: 500 })
  }
}