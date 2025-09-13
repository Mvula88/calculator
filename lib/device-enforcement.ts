import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'

export interface DeviceCheckResult {
  allowed: boolean
  reason?: 'device_limit_exceeded' | 'concurrent_session' | 'unknown_error'
  message?: string
}

export async function checkDeviceLimit(
  userId: string,
  deviceFingerprint: string,
  deviceType: 'phone' | 'computer'
): Promise<DeviceCheckResult> {
  const supabase = await createClient()
  
  try {
    // Check if device already exists
    const { data: existingDevice } = await supabase
      .from('user_devices')
      .select('id')
      .eq('user_id', userId)
      .eq('device_fingerprint', deviceFingerprint)
      .single()
    
    if (existingDevice) {
      // Update last_active for existing device
      await supabase
        .from('user_devices')
        .update({ last_active: new Date().toISOString() })
        .eq('id', existingDevice.id)
      
      return { allowed: true }
    }
    
    // Count devices of this type
    const { count } = await supabase
      .from('user_devices')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('device_type', deviceType)
    
    if (count && count >= 2) {
      return {
        allowed: false,
        reason: 'device_limit_exceeded',
        message: `You have reached the maximum limit of 2 ${deviceType}s. Total limit is 2 phones and 2 computers.`
      }
    }
    
    // Add new device
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] || 
                     headersList.get('x-real-ip') || 
                     'unknown'
    
    const { error } = await supabase
      .from('user_devices')
      .insert({
        user_id: userId,
        device_fingerprint: deviceFingerprint,
        device_type: deviceType,
        device_name: getDeviceName(userAgent),
        user_agent: userAgent,
        ip_address: ipAddress
      })
    
    if (error) {
      console.error('Error adding device:', error)
      return {
        allowed: false,
        reason: 'unknown_error',
        message: 'Failed to register device'
      }
    }
    
    return { allowed: true }
  } catch (error) {
    console.error('Device check error:', error)
    return {
      allowed: false,
      reason: 'unknown_error',
      message: 'Device verification failed'
    }
  }
}

export async function enforceSessionLimit(
  userId: string,
  sessionToken: string,
  deviceFingerprint: string
): Promise<boolean> {
  const supabase = await createClient()
  
  try {
    // Get IP address
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] || 
                     headersList.get('x-real-ip') || 
                     'unknown'
    
    // Delete all other sessions for this user
    await supabase
      .from('active_sessions')
      .delete()
      .eq('user_id', userId)
      .neq('session_token', sessionToken)
    
    // Upsert current session
    const { error } = await supabase
      .from('active_sessions')
      .upsert({
        user_id: userId,
        session_token: sessionToken,
        device_fingerprint: deviceFingerprint,
        ip_address: ipAddress,
        last_activity: new Date().toISOString()
      }, {
        onConflict: 'session_token'
      })
    
    return !error
  } catch (error) {
    console.error('Session enforcement error:', error)
    return false
  }
}

export async function validateSession(sessionToken: string): Promise<boolean> {
  const supabase = await createClient()
  
  try {
    const { data } = await supabase
      .from('active_sessions')
      .select('id, last_activity')
      .eq('session_token', sessionToken)
      .single()
    
    if (!data) return false
    
    // Check if session is still active (within last 24 hours)
    const lastActivity = new Date(data.last_activity)
    const now = new Date()
    const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60)
    
    if (hoursSinceActivity > 24) {
      // Session expired, remove it
      await supabase
        .from('active_sessions')
        .delete()
        .eq('id', data.id)
      return false
    }
    
    // Update last activity
    await supabase
      .from('active_sessions')
      .update({ last_activity: now.toISOString() })
      .eq('id', data.id)
    
    return true
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

function getDeviceName(userAgent: string): string {
  if (/iPhone/.test(userAgent)) return 'iPhone'
  if (/iPad/.test(userAgent)) return 'iPad'
  if (/Android/.test(userAgent)) return 'Android'
  if (/Windows/.test(userAgent)) return 'Windows PC'
  if (/Mac/.test(userAgent)) return 'Mac'
  if (/Linux/.test(userAgent)) return 'Linux PC'
  return 'Unknown Device'
}