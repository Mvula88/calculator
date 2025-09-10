import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    console.log('[Login] Attempting login for:', email)
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    // Check if user has an active entitlement
    const supabase = createServiceClient()
    const { data: entitlement, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .single()
    
    if (error || !entitlement) {
      console.log('[Login] No entitlement found for:', email)
      return NextResponse.json({ 
        error: 'No active subscription found for this email. Please check your email or contact support.' 
      }, { status: 404 })
    }
    
    console.log('[Login] Found entitlement:', {
      email: entitlement.email,
      tier: entitlement.tier,
      country: entitlement.country
    })
    
    // Create session cookie
    const cookieStore = await cookies()
    const sessionData = {
      email: email.toLowerCase(),
      sessionId: `email-login-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    cookieStore.set('impota_session', JSON.stringify(sessionData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })
    
    return NextResponse.json({ 
      success: true,
      email: email.toLowerCase(),
      tier: entitlement.tier,
      country: entitlement.country
    })
    
  } catch (error) {
    console.error('[Login] Error:', error)
    return NextResponse.json({ 
      error: 'Failed to verify access. Please try again.' 
    }, { status: 500 })
  }
}