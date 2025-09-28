import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get the email from the session
    const email = session.customer_email || session.customer_details?.email || null

    return NextResponse.json({
      email,
      customerName: session.customer_details?.name || null
    })

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message || 'Failed to fetch session details' },
      { status: 500 }
    )
  }
}