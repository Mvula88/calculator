'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

function WelcomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFallback, setShowFallback] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const sessionId = searchParams.get('session_id')
  const paymentStatus = searchParams.get('payment_status')

  const addDebug = (msg: string) => {
    console.log(`[Welcome] ${msg}`)
    setDebugInfo(prev => [...prev, `${new Date().toISOString().split('T')[1].split('.')[0]} - ${msg}`])
  }

  useEffect(() => {
    addDebug(`Page loaded with: paymentStatus=${paymentStatus}, sessionId=${sessionId}`)

    // Show fallback button after 3 seconds if still stuck
    const fallbackTimer = setTimeout(() => {
      addDebug('Showing fallback button after 3 seconds')
      setShowFallback(true)
    }, 3000)

    async function redirect() {
      try {
        // If payment successful, go to portal
        if (paymentStatus === 'success') {
          addDebug('Payment successful, attempting redirect to portal...')
          // Use window.location for more reliable redirect
          window.location.href = '/portal'
          return
        }

        // Check if user is logged in
        addDebug('Checking authentication status...')
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
          addDebug(`Auth check error: ${error.message}`)
        }

        if (user) {
          // User logged in, go to portal
          addDebug(`User authenticated (${user.email}), redirecting to portal...`)
          window.location.href = '/portal'
        } else if (sessionId) {
          // Have session but no user, go to register
          addDebug('No user but have session, redirecting to register...')
          window.location.href = `/auth/register?session_id=${sessionId}&payment_status=${paymentStatus || ''}`
        } else {
          // No user and no session, go to login
          addDebug('No user or session, redirecting to login...')
          window.location.href = '/auth/login'
        }
      } catch (error) {
        addDebug(`Error during redirect: ${error}`)
        setShowFallback(true)
      }
    }

    redirect()

    return () => clearTimeout(fallbackTimer)
  }, [sessionId, paymentStatus])

  // Loading screen with debug info and fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading Portal...</h2>
          <p className="text-gray-600">Redirecting you now...</p>
          {paymentStatus === 'success' && (
            <p className="text-sm text-green-600 mt-2">Payment successful!</p>
          )}

          {/* Show fallback button after 3 seconds */}
          {showFallback && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-orange-600">Taking longer than expected...</p>
              <Button
                onClick={() => window.location.href = '/portal'}
                className="w-full"
              >
                Go to Portal Now
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/auth/login'}
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          )}

          {/* Debug info */}
          {debugInfo.length > 0 && (
            <div className="mt-4 text-left bg-gray-100 rounded p-2 max-h-32 overflow-y-auto">
              <p className="text-xs font-mono text-gray-600">Debug Log:</p>
              {debugInfo.map((info, i) => (
                <p key={i} className="text-xs font-mono text-gray-500">{info}</p>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  )
}