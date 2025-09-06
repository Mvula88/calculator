import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email } = await req.json()
    
    if (!sessionId || !email) {
      return NextResponse.json({ error: 'Missing session ID or email' }, { status: 400 })
    }

    // Use service client to bypass RLS
    const supabase = createServiceClient()
    
    // Verify the payment session exists
    const { data: entitlement, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .single()
    
    if (error || !entitlement) {
      return NextResponse.json({ error: 'Invalid session or payment not found' }, { status: 404 })
    }
    
    // Set a temporary session cookie for portal access
    const cookieStore = await cookies()
    cookieStore.set('portal_session', JSON.stringify({
      email: entitlement.email,
      tier: entitlement.tier,
      country: entitlement.country,
      sessionId: sessionId
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })
    
    return NextResponse.json({ 
      success: true,
      entitlement: {
        email: entitlement.email,
        tier: entitlement.tier,
        country: entitlement.country
      }
    })
  } catch (error) {
    console.error('Portal access error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}