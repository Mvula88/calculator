'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { CheckCircle, AlertCircle } from 'lucide-react'

function ActivateSimpleContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const sessionId = searchParams.get('session') || searchParams.get('session_id')
    const email = searchParams.get('email')

    if (!sessionId) {
      // No session provided, redirect to login
      router.replace('/portal/login')
      return
    }

    // Check if session already exists with proper email
    let existingSession = null
    const storedSession = localStorage.getItem('impota_session')
    if (storedSession) {
      try {
        existingSession = JSON.parse(storedSession)
      } catch (e) {}
    }

    // Create a session object with proper email
    const session = {
      email: email || existingSession?.email || 'Portal User',
      sessionId: sessionId,
      timestamp: Date.now()
    }

    // Set the session in both localStorage and cookie
    try {
      // Set in localStorage
      localStorage.setItem('impota_session', JSON.stringify(session))

      // Set cookie (non-httpOnly so JavaScript can access it)
      document.cookie = `impota_session=${encodeURIComponent(JSON.stringify(session))}; path=/; max-age=2592000; samesite=lax${window.location.protocol === 'https:' ? '; secure' : ''}`

      // Small delay to ensure cookie is set
      setTimeout(() => {
        router.replace('/portal')
      }, 100)
    } catch (error) {

    }
  }, [searchParams, router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <Card className="p-8 max-w-md">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Activating Portal Access</h1>
          <p className="text-gray-600">Setting up your access...</p>
        </div>
      </Card>
    </main>
  )
}

export default function ActivateSimplePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </Card>
      </main>
    }>
      <ActivateSimpleContent />
    </Suspense>
  )
}