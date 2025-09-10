'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function DirectThankYouContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('processing')
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // Try to get the email from the Stripe session
      fetch('/api/auth-simple/grant-access-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.email) {
          // Store the session with proper email
          const session = {
            email: data.email,
            sessionId: sessionId,
            timestamp: Date.now()
          }
          
          // Set in localStorage
          localStorage.setItem('impota_session', JSON.stringify(session))
          
          // Set cookie
          document.cookie = `impota_session=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=2592000; samesite=lax${window.location.protocol === 'https:' ? '; secure' : ''}`
          
          console.log('[Thank You] Session stored with email:', data.email)
          
          // Redirect with email
          setTimeout(() => {
            window.location.replace(`/portal/activate-simple?session=${sessionId}&email=${encodeURIComponent(data.email)}`)
          }, 500)
        } else {
          // Fallback without email
          console.log('[Thank You] No email found, redirecting with session only')
          window.location.replace(`/portal/activate-simple?session=${sessionId}`)
        }
      })
      .catch(err => {
        console.error('[Thank You] Error fetching session:', err)
        // Fallback redirect
        window.location.replace(`/portal/activate-simple?session=${sessionId}`)
      })
    } else {
      // No session, go to login
      setStatus('no-session')
      setTimeout(() => {
        window.location.replace('/portal/login')
      }, 2000)
    }
  }, [searchParams])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="p-8 max-w-md">
        <div className="text-center">
          {status === 'processing' ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                <p className="text-gray-600">Setting up your portal access...</p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
              <p className="text-gray-600">Taking you to the login page...</p>
            </>
          )}
        </div>
      </Card>
    </main>
  )
}