'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDeviceFingerprint, generateSessionToken } from '@/lib/device-fingerprint'
import { toast } from 'sonner'

export function useDeviceAuth() {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    checkDeviceAuthorization()
  }, [])
  
  async function checkDeviceAuthorization() {
    try {
      // Get or create session token
      let sessionToken = localStorage.getItem('session_token')
      if (!sessionToken) {
        sessionToken = generateSessionToken()
        localStorage.setItem('session_token', sessionToken)
      }
      
      // Get device fingerprint
      const deviceInfo = getDeviceFingerprint()
      
      // Check with server
      const response = await fetch('/api/auth/device-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceFingerprint: deviceInfo.fingerprint,
          deviceType: deviceInfo.type,
          sessionToken
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (data.reason === 'device_limit_exceeded') {
          toast.error(data.error || 'Device limit exceeded')
          // Redirect to error page or logout
          router.push('/device-limit-exceeded')
        } else if (data.reason === 'concurrent_session') {
          toast.warning('You have been logged out from another device')
        } else {
          toast.error('Device authorization failed')
        }
        setIsAuthorized(false)
      } else {
        setIsAuthorized(true)
      }
    } catch (error) {
      console.error('Device check error:', error)
      toast.error('Failed to verify device')
      setIsAuthorized(false)
    } finally {
      setIsChecking(false)
    }
  }
  
  return { isChecking, isAuthorized, checkDeviceAuthorization }
}