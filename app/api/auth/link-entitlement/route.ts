import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, email, sessionId } = await req.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Find the entitlement created by the webhook
    const { data: entitlement, error: fetchError } = await supabase
      .from('entitlements')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !entitlement) {

      return NextResponse.json(
        { error: 'No purchase found for this email' },
        { status: 404 }
      )
    }

    // Update the entitlement with the user ID
    const { error: updateError } = await supabase
      .from('entitlements')
      .update({ 
        user_id: userId,
        updated_at: new Date().toISOString()
      })
      .eq('id', entitlement.id)

    if (updateError) {

      return NextResponse.json(
        { error: 'Failed to link purchase to account' },
        { status: 500 }
      )
    }

    // Update user profile with tier information
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: email.toLowerCase(),
        tier: entitlement.tier,
        country: entitlement.country,
        updated_at: new Date().toISOString()
      })

    if (profileError) {

      // Non-critical error, continue
    }

    return NextResponse.json({
      success: true,
      tier: entitlement.tier,
      country: entitlement.country
    })
  } catch (error: any) {

    return NextResponse.json(
      { error: error.message || 'Failed to link entitlement' },
      { status: 500 }
    )
  }
}