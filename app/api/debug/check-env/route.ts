import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const nodeEnv = process.env.NODE_ENV
  const vercelUrl = process.env.VERCEL_URL

  return NextResponse.json({
    NEXT_PUBLIC_APP_URL: appUrl || 'NOT SET',
    NODE_ENV: nodeEnv || 'NOT SET',
    VERCEL_URL: vercelUrl || 'NOT SET',
    expectedSuccessUrl: `${appUrl || 'NOT SET'}/auth/create-account?session_id=TEST_SESSION_ID`,
    expectedCancelUrl: `${appUrl || 'NOT SET'}/packages`,
    timestamp: new Date().toISOString()
  })
}