import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const host = req.headers.get('host')
  const protocol = req.headers.get('x-forwarded-proto') || 'https'

  let baseUrl = process.env.NEXT_PUBLIC_APP_URL
  let source = 'environment variable'

  if (!baseUrl) {
    if (host) {
      baseUrl = `${protocol}://${host}`
      source = 'constructed from headers'
    } else {
      baseUrl = 'http://localhost:3000'
      source = 'fallback to localhost'
    }
  }

  baseUrl = baseUrl?.replace(/\/$/, '') || ''

  const successUrl = `${baseUrl}/portal?session_id={CHECKOUT_SESSION_ID}&payment_status=success`
  const cancelUrl = `${baseUrl}/portal?payment_status=canceled`

  return NextResponse.json({
    debug: {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
      host: host,
      protocol: protocol,
      baseUrl: baseUrl,
      source: source,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      recommendation: !process.env.NEXT_PUBLIC_APP_URL
        ? 'CRITICAL: Set NEXT_PUBLIC_APP_URL=https://www.impota.com in your production environment variables!'
        : 'Environment variable is set correctly'
    }
  })
}