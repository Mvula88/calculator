import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const cookieStore = await cookies()
    
    // Check for our simple session cookie
    const sessionCookie = cookieStore.get('impota_session')
    
    if (!sessionCookie) {
      return NextResponse.json({ hasAccess: false, user: null })
    }
    
    try {
      const session = JSON.parse(sessionCookie.value)
      
      // Validate session has required fields
      if (!session.email || !session.sessionId) {
        return NextResponse.json({ hasAccess: false, user: null })
      }
      
      // Verify the session is valid in database
      const supabase = createServiceClient()
      const { data: entitlement } = await supabase
        .from('entitlements')
        .select('*')
        .eq('email', session.email.toLowerCase())
        .eq('active', true)
        .single()
      
      if (!entitlement) {
        // Session exists but no valid entitlement
        return NextResponse.json({ hasAccess: false, user: null })
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