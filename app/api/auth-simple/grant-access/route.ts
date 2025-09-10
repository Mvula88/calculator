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
    
    // Get metadata from Stripe session
    const metadata = stripeSession.metadata || {}
    const tier = metadata.tier || 'mistake'
    const country = metadata.country || 'na'
    
    // Verify or create entitlement in database
    const supabase = createServiceClient()
    
    // First try to find existing entitlement
    let { data: entitlement } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .single()
    
    if (!entitlement) {
      // Create new entitlement since payment was successful
      console.log('Creating new entitlement for:', email, { tier, country, sessionId })
      
      const { data: newEntitlement, error: createError } = await supabase
        .from('entitlements')
        .insert({
          email: email.toLowerCase(),
          tier: tier as 'mistake' | 'mastery',
          country: country,
          active: true,
          stripe_session_id: sessionId,
          stripe_customer_id: stripeSession.customer as string || null,
          created_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (createError) {
        console.error('Failed to create entitlement:', createError)
        // Try to update existing inactive entitlement
        const { data: updatedEntitlement } = await supabase
          .from('entitlements')
          .update({
            active: true,
            stripe_session_id: sessionId,
            tier: tier as 'mistake' | 'mastery',
            country: country
          })
          .eq('email', email.toLowerCase())
          .select()
          .single()
        
        if (!updatedEntitlement) {
          return NextResponse.json({ 
            error: 'Failed to create entitlement. Please contact support with your receipt.' 
          }, { status: 500 })
        }
        entitlement = updatedEntitlement
      } else {
        entitlement = newEntitlement
      }
    } else {
      // Update existing entitlement with session ID if not set
      if (!entitlement.stripe_session_id) {
        await supabase
          .from('entitlements')
          .update({ stripe_session_id: sessionId })
          .eq('id', entitlement.id)
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