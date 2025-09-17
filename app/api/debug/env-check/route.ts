import { NextResponse } from 'next/server'

export async function GET() {
  // Only show in development or with proper auth in production
  const isDev = process.env.NODE_ENV === 'development'

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    app_url: {
      configured: !!process.env.NEXT_PUBLIC_APP_URL,
      value: isDev ? process.env.NEXT_PUBLIC_APP_URL : (process.env.NEXT_PUBLIC_APP_URL ? 'SET (hidden in production)' : 'NOT SET'),
      expected: 'https://impota.com'
    },
    stripe: {
      publishable_key: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secret_key: !!process.env.STRIPE_SECRET_KEY,
      webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
    },
    supabase: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    },
    recommendation: !process.env.NEXT_PUBLIC_APP_URL
      ? '⚠️ CRITICAL: Set NEXT_PUBLIC_APP_URL=https://impota.com in Vercel/deployment environment variables!'
      : '✅ App URL is configured'
  })
}