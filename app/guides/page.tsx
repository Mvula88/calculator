'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GuidesPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to portal guide (requires entitlement)
    router.push('/portal/guide')
  }, [router])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Redirecting to guides...</h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  )
}