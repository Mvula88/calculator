'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function DirectThankYouContent() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // Immediately redirect to portal activation with session
      console.log('[Thank You] Redirecting to portal activation with session:', sessionId)
      
      // Use replace to prevent back button issues
      window.location.replace(`/portal/activate-simple?session=${sessionId}`)
    } else {
      // No session, go to login
      window.location.replace('/portal/login')
    }
  }, [searchParams])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="p-8 max-w-md">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
            <p className="text-gray-600">Activating your portal access...</p>
          </div>
        </div>
      </Card>
    </main>
  )
}