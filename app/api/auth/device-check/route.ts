import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { checkDeviceLimit, enforceSessionLimit } from '@/lib/device-enforcement'

export async function POST(request: NextRequest) {
  try {
    const { deviceFingerprint, deviceType, sessionToken } = await request.json()
    
    if (!deviceFingerprint || !deviceType || !sessionToken) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Check device limit
    const deviceCheck = await checkDeviceLimit(user.id, deviceFingerprint, deviceType)
    
    if (!deviceCheck.allowed) {
      return NextResponse.json(
        { 
          allowed: false,
          error: deviceCheck.message,
          reason: deviceCheck.reason
        },
        { status: 403 }
      )
    }
    
    // Enforce single session
    const sessionEnforced = await enforceSessionLimit(user.id, sessionToken, deviceFingerprint)
    
    if (!sessionEnforced) {
      return NextResponse.json(
        { 
          allowed: false,
          error: 'Failed to establish session',
          reason: 'session_error'
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      allowed: true,
      message: 'Device authorized and session established'
    })
    
  } catch (error) {
    console.error('Device check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get device counts
    const { data: devices, error } = await supabase
      .from('user_devices')
      .select('device_type')
      .eq('user_id', user.id)
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch devices' },
        { status: 500 }
      )
    }
    
    const phoneCount = devices.filter(d => d.device_type === 'phone').length
    const computerCount = devices.filter(d => d.device_type === 'computer').length
    
    return NextResponse.json({
      phoneCount,
      computerCount,
      phonesRemaining: 2 - phoneCount,
      computersRemaining: 2 - computerCount,
      totalDevices: phoneCount + computerCount,
      maxDevices: 4
    })
    
  } catch (error) {
    console.error('Device count error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}