'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectTestPage() {
  const router = useRouter()

  useEffect(() => {

    setTimeout(() => {
      router.push('/auth/create-account?session_id=test')
    }, 3000)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirect Test Page</h1>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Loading...'}</p>
        <p className="mt-4">Redirecting to /auth/create-account in 3 seconds...</p>
      </div>
    </div>
  )
}