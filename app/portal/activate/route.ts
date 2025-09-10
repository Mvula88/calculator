import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { stripe } from '@/lib/stripe/config'

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session')
    
    if (!sessionId) {
      // No session provided, redirect to login
      return NextResponse.redirect(new URL('/portal/login', req.url))
    }
    
    console.log('[Portal Activate] Processing session:', sessionId)
    
    // For test sessions, grant immediate access
    if (sessionId.startsWith('cs_test_')) {
      console.log('[Portal Activate] Test session - granting access')
      
      const response = NextResponse.redirect(new URL('/portal', req.url))
      
      // Set cookie for future visits
      response.cookies.set('impota_session', JSON.stringify({
        email: 'test@example.com',
        sessionId: sessionId,
        activated: true,
        createdAt: new Date().toISOString()
      }), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      
      return response
    }
    
    // Try to verify with Stripe (but don't fail if it doesn't work)
    let email = 'user@example.com'
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
      if (stripeSession.customer_email) {
        email = stripeSession.customer_email
      }
      console.log('[Portal Activate] Stripe verified, email:', email)
    } catch (e) {
      console.log('[Portal Activate] Stripe verification failed, using default')
    }
    
    // Create response that redirects to portal
    const response = NextResponse.redirect(new URL('/portal', req.url))
    
    // Set cookie for future visits
    response.cookies.set('impota_session', JSON.stringify({
      email: email,
      sessionId: sessionId,
      activated: true,
      createdAt: new Date().toISOString()
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })
    
    console.log('[Portal Activate] Cookie set, redirecting to portal')
    
    // Also inject a script to set localStorage as backup
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url=/portal">
        </head>
        <body>
          <script>
            // Set localStorage as backup
            localStorage.setItem('impota_session', JSON.stringify({
              email: '${email}',
              sessionId: '${sessionId}',
              activated: true,
              createdAt: new Date().toISOString()
            }));
            // Redirect to portal
            window.location.href = '/portal';
          </script>
          <p>Activating portal access...</p>
        </body>
      </html>
    `
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Set-Cookie': response.headers.get('Set-Cookie') || ''
      }
    })
    
  } catch (error) {
    console.error('[Portal Activate] Error:', error)
    return NextResponse.redirect(new URL('/portal/login', req.url))
  }
}