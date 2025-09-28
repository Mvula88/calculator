import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ 
      error: 'Please provide a session_id query parameter',
      example: '/api/stripe/verify-urls?session_id=cs_test_...'
    })
  }

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      sessionId: session.id,
      success_url: session.success_url,
      cancel_url: session.cancel_url,
      payment_status: session.payment_status,
      status: session.status,
      created: new Date(session.created * 1000).toISOString(),
      metadata: session.metadata,
      customer_email: session.customer_email,
      amount_total: session.amount_total ? session.amount_total / 100 : null,
      currency: session.currency,
      mode: session.mode
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      type: error.type 
    }, { status: 400 })
  }
}