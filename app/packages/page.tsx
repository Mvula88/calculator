'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function PackagesPage() {
  useEffect(() => {
    // Multiple redirect attempts to ensure it works
    // Try window.location.replace first (no back button)
    if (typeof window !== 'undefined') {
      window.location.replace('/portal')
    }
  }, [])

  // Also add a backup redirect in case useEffect doesn't fire
  if (typeof window !== 'undefined') {
    window.location.replace('/portal')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to portal...</p>
        <p className="text-sm text-gray-500 mt-2">
          If you are not redirected, <a href="/portal" className="text-blue-600 underline">click here</a>
        </p>
      </div>
    </div>
  )
}