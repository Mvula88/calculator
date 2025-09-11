import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    routes: {
      packages: '/packages - Package selection page',
      checkoutEmail: '/checkout/email - Email collection page',
      createAccount: '/auth/create-account - Post-payment account creation',
      testRedirect: '/test-redirect - Debug page for testing redirects'
    },
    deploymentTime: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
    message: 'If /packages returns 404, deployment may still be in progress'
  })
}