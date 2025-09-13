'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function PackagesPage() {
  const router = useRouter()

  useEffect(() => {
    // Use replace to avoid adding to history and prevent loops
    // Add a small delay to ensure the redirect happens after render
    const timer = setTimeout(() => {
      router.replace('/portal')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to portal...</p>
      </div>
    </div>
  )
}