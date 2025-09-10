import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()
    
    console.log('[Grant Access V2] Processing session:', sessionId)
    
    if (!sessionId) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing session ID' 
      }, { status: 400 })
    }
    
    // Step 1: Verify with Stripe
    let stripeSession
    try {
      stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
      console.log('[Grant Access V2] Stripe session found:', {
        id: stripeSession.id,
        payment_status: stripeSession.payment_status,
        customer_email: stripeSession.customer_email
      })
    } catch (stripeError: any) {
      console.error('[Grant Access V2] Stripe error:', stripeError.message)
      
      // For test mode, we'll allow access anyway
      if (sessionId.startsWith('cs_test_')) {
        console.log('[Grant Access V2] Test mode - allowing access')
        
        // Create a test session cookie
        const cookieStore = await cookies()
        cookieStore.set('impota_session', JSON.stringify({
          email: 'test@example.com',
          sessionId: sessionId,
          createdAt: new Date().toISOString()
        }), {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        })
        
        return NextResponse.json({ 
          success: true,
          email: 'test@example.com',
          message: 'Test mode access granted'
        })
      }
      
      return NextResponse.json({ 
        success: false,
        error: 'Invalid payment session' 
      }, { status: 400 })
    }
    
    // Step 2: Check payment status
    if (stripeSession.payment_status !== 'paid') {
      console.log('[Grant Access V2] Payment not completed:', stripeSession.payment_status)
      return NextResponse.json({ 
        success: false,
        error: 'Payment not completed' 
      }, { status: 400 })
    }
    
    // Step 3: Get email
    const email = stripeSession.customer_email || 
                  stripeSession.customer_details?.email || 
                  'default@example.com'
    
    console.log('[Grant Access V2] Using email:', email)
    
    // Step 4: Try to work with database (but don't fail if it doesn't work)
    try {
      const supabase = createServiceClient()
      
      // Try to find or create entitlement
      const { data: existingEntitlement } = await supabase
        .from('entitlements')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()
      
      if (!existingEntitlement) {
        // Try to create new entitlement
        const metadata = stripeSession.metadata || {}
        const newEntitlement = {
          email: email.toLowerCase(),
          tier: (metadata.tier || 'mistake') as 'mistake' | 'mastery',
          country: metadata.country || 'na',
          active: true,
          stripe_session_id: sessionId,
          stripe_customer_id: stripeSession.customer as string || null
        }
        
        console.log('[Grant Access V2] Creating entitlement:', newEntitlement)
        
        const { error: insertError } = await supabase
          .from('entitlements')
          .insert(newEntitlement)
        
        if (insertError) {
          console.error('[Grant Access V2] Database insert error:', insertError)
          // Don't fail - continue to grant access anyway
        }
      } else {
        console.log('[Grant Access V2] Entitlement already exists')
      }
    } catch (dbError: any) {
      console.error('[Grant Access V2] Database error (non-fatal):', dbError.message)
      // Continue anyway - we verified payment with Stripe
    }
    
    // Step 5: Create session cookie (this is what actually grants access)
    const cookieStore = await cookies()
    const sessionData = {
      email: email.toLowerCase(),
      sessionId: sessionId,
      createdAt: new Date().toISOString()
    }
    
    cookieStore.set('impota_session', JSON.stringify(sessionData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })
    
    console.log('[Grant Access V2] Session cookie set for:', email)
    
    return NextResponse.json({ 
      success: true,
      email: email.toLowerCase(),
      message: 'Access granted successfully'
    })
    
  } catch (error: any) {
    console.error('[Grant Access V2] Unexpected error:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Failed to grant access' 
    }, { status: 500 })
  }
}