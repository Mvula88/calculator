import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
    }
    
    // Get the Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
    
    // Verify payment was successful
    if (stripeSession.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }
    
    // Get customer email
    const email = stripeSession.customer_email || stripeSession.customer_details?.email
    
    if (!email) {
      return NextResponse.json({ error: 'No email found in session' }, { status: 400 })
    }
    
    // Verify entitlement exists in database
    const supabase = createServiceClient()
    const { data: entitlement } = await supabase
      .from('entitlements')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .single()
    
    if (!entitlement) {
      // Try to find by email only (in case webhook hasn't fired yet)
      const { data: emailEntitlement } = await supabase
        .from('entitlements')
        .select('*')
        .eq('email', email.toLowerCase())
        .eq('active', true)
        .single()
      
      if (!emailEntitlement) {
        return NextResponse.json({ error: 'No entitlement found' }, { status: 404 })
      }
    }
    
    // Create session cookie
    const cookieStore = await cookies()
    const sessionData = {
      email: email.toLowerCase(),
      sessionId: sessionId,
      createdAt: new Date().toISOString()
    }
    
    cookieStore.set('impota_session', JSON.stringify(sessionData), {
      httpOnly: false, // Allow JS access for client-side checks
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })
    
    return NextResponse.json({ 
      success: true,
      email: email.toLowerCase()
    })
    
  } catch (error) {
    console.error('Grant access error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to grant access' 
    }, { status: 500 })
  }
}