'use client'

import { useEffect } from 'react'
import { useDeviceAuth } from '@/hooks/useDeviceAuth'
import { Loader2 } from 'lucide-react'

export default function DeviceProtectedLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isChecking, isAuthorized } = useDeviceAuth()
  
  // Check session periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      checkSessionValidity()
    }, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  async function checkSessionValidity() {
    const sessionToken = localStorage.getItem('session_token')
    if (!sessionToken) {
      window.location.href = '/login'
      return
    }
    
    try {
      const response = await fetch('/api/auth/validate-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken })
      })
      
      if (!response.ok) {
        // Session invalid, redirect to login
        localStorage.removeItem('session_token')
        window.location.href = '/login?reason=session_expired'
      }
    } catch (error) {
      console.error('Session check error:', error)
    }
  }
  
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying device authorization...</p>
        </div>
      </div>
    )
  }
  
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-4">Device Limit Reached</h2>
          <p className="text-red-700 mb-4">
            You have reached the maximum device limit for your account:
          </p>
          <ul className="list-disc list-inside text-red-700 mb-4">
            <li>Maximum 2 phones allowed</li>
            <li>Maximum 2 computers allowed</li>
          </ul>
          <p className="text-red-700 text-sm">
            To use this device, please logout from another device or contact support.
          </p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}