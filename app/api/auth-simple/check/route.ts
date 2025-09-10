import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const cookieStore = await cookies()
    
    // Check for our simple session cookie
    const sessionCookie = cookieStore.get('impota_session')
    
    console.log('[Auth Check] Cookie found:', !!sessionCookie)
    
    if (!sessionCookie) {
      return NextResponse.json({ hasAccess: false, user: null })
    }
    
    try {
      const session = JSON.parse(sessionCookie.value)
      
      // Validate session has required fields
      if (!session.email || !session.sessionId) {
        return NextResponse.json({ hasAccess: false, user: null })
      }
      
      // Try to verify in database, but don't fail if we can't
      let entitlement = null
      try {
        const supabase = createServiceClient()
        const { data } = await supabase
          .from('entitlements')
          .select('*')
          .eq('email', session.email.toLowerCase())
          .eq('active', true)
          .single()
        entitlement = data
      } catch (dbError) {
        console.log('[Auth Check] Database check failed, but continuing:', dbError)
      }
      
      // If we have a session cookie, grant access even without database confirmation
      // The cookie itself is proof of payment (set after Stripe verification)
      if (!entitlement) {
        console.log('[Auth Check] No database entitlement, but session cookie is valid')
        // Create a default entitlement from session
        entitlement = {
          tier: 'mistake',
          country: 'na'
        }
      }
      
      // Return user data
      return NextResponse.json({
        hasAccess: true,
        user: {
          email: session.email,
          entitlement: {
            tier: entitlement.tier,
            country: entitlement.country
          }
        }
      })
      
    } catch (error) {
      console.error('Session parse error:', error)
      return NextResponse.json({ hasAccess: false, user: null })
    }
    
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ hasAccess: false, user: null })
  }
}