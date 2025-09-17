'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

function WelcomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const paymentStatus = searchParams.get('payment_status')

  useEffect(() => {
    async function redirect() {
      // If payment successful, go to portal
      if (paymentStatus === 'success') {
        console.log('Payment successful, redirecting to portal')
        router.replace('/portal')
        return
      }

      // Check if user is logged in
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // User logged in, go to portal
        console.log('User authenticated, redirecting to portal')
        router.replace('/portal')
      } else if (sessionId) {
        // Have session but no user, go to register
        console.log('No user but have session, redirecting to register')
        router.replace(`/auth/register?session_id=${sessionId}&payment_status=${paymentStatus || ''}`)
      } else {
        // No user and no session, go to login
        console.log('No user or session, redirecting to login')
        router.replace('/auth/login')
      }
    }

    redirect()
  }, [sessionId, paymentStatus, router])

  // Simple loading screen
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