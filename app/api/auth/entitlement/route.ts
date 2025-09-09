import { NextResponse, NextRequest } from 'next/server'
import { AuthService } from '@/lib/auth/server-service'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await AuthService.getUser()
    
    // If no Supabase user, check for portal session cookie
    if (!user) {
      const cookieStore = await cookies()
      const portalSessionCookie = cookieStore.get('portal_session')
      
      if (portalSessionCookie) {
        try {
          const portalSession = JSON.parse(portalSessionCookie.value)
          
          if (portalSession.email && portalSession.sessionId) {
            // User has valid portal session from payment
            // Get their entitlement directly from the database
            const entitlement = await AuthService.getUserEntitlement(portalSession.email)
            
            if (entitlement) {
              return NextResponse.json({
                user: {
                  id: 'portal-session',
                  email: portalSession.email,
                  created_at: new Date().toISOString()
                },
                entitlement,
                error: null
              })
            }
          }
        } catch (e) {
          console.error('Invalid portal session cookie:', e)
        }
      }
      
      return NextResponse.json(
        { error: 'Not authenticated', user: null, entitlement: null },
        { status: 401 }
      )
    }
    
    // Get user's entitlement
    const entitlement = await AuthService.getUserEntitlement(user.email, user.id)
    
    if (!entitlement) {
      // User is authenticated but has no entitlement
      return NextResponse.json(
        { 
          error: 'No entitlement found', 
          user,
          entitlement: null 
        },
        { status: 404 }
      )
    }
    
    // Success - user has entitlement
    return NextResponse.json({ 
      user,
      entitlement,
      error: null 
    })
  } catch (error) {
    console.error('Error fetching entitlement:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        user: null,
        entitlement: null 
      },
      { status: 500 }
    )
  }
}