'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const selectedPackage = searchParams.get('package') || 'mistake'
      const country = searchParams.get('country') || 'na'
      
      const supabase = createClient()
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Redirect to checkout
        try {
          const response = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              country,
              tier: selectedPackage,
              productId: selectedPackage
            })
          })

          const checkoutData = await response.json()
          
          if (checkoutData.url) {
            window.location.href = checkoutData.url
          } else {
            router.push('/packages')
          }
        } catch (error) {
          console.error('Failed to create checkout:', error)
          router.push('/packages')
        }
      } else {
        // Not authenticated, redirect to register
        router.push('/register')
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Preparing your checkout...</p>
      </div>
    </div>
  )
}