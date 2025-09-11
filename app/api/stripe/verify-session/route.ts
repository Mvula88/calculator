import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }
    
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer']
    })
    
    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }
    
    // Extract metadata
    const email = session.customer_email || session.metadata?.email
    const tier = session.metadata?.tier as 'mistake' | 'mastery'
    const country = session.metadata?.country || 'namibia'
    
    if (!email || !tier) {
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      )
    }
    
    // Check if user already exists in Supabase Auth
    const supabase = createServiceClient()
    const { data: { users } } = await supabase.auth.admin.listUsers()
    const existingUser = users?.find(u => u.email?.toLowerCase() === email.toLowerCase())
    
    // Get amount paid
    const amount = session.amount_total ? session.amount_total / 100 : 0
    
    return NextResponse.json({
      email,
      tier,
      country,
      amount,
      userExists: !!existingUser,
      sessionId
    })
  } catch (error: any) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify session' },
      { status: 500 }
    )
  }
}