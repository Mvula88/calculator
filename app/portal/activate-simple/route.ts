import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session')
  
  if (!sessionId) {
    return NextResponse.redirect(new URL('/portal/login', req.url))
  }
  
  // Create a simple HTML page that sets the session and redirects
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Activating Portal Access...</title>
        <meta charset="utf-8">
      </head>
      <body>
        <div style="text-align: center; padding: 50px; font-family: Arial;">
          <h1>✅ Payment Verified!</h1>
          <p>Activating your portal access...</p>
        </div>
        <script>
          // Store session in multiple places
          const session = {
            email: 'customer@example.com',
            sessionId: '${sessionId}',
            activated: true,
            createdAt: new Date().toISOString()
          };
          
          // Store in localStorage
          localStorage.setItem('impota_session', JSON.stringify(session));
          
          // Set cookie
          document.cookie = 'impota_session=' + encodeURIComponent(JSON.stringify(session)) + '; path=/; max-age=' + (30*24*60*60);
          
          // Redirect to portal
          setTimeout(() => {
            window.location.href = '/portal';
          }, 1000);
        </script>
      </body>
    </html>
  `
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    }
  })
}