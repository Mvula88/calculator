'use client'

import WelcomeOnboarding from '@/components/portal/WelcomeOnboarding'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function StartHerePage() {
  const router = useRouter()
  const { user, userEmail, loading } = useAuthImmediate()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirectTo=/portal/start-here')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeOnboarding
        userEmail={userEmail || 'Portal User'}
      />
    </div>
  )
}
