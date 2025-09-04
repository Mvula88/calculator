'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCountry } from '@/lib/country-context'
import { createClient } from '@/lib/supabase/client'

export default function PricingPage() {
  const router = useRouter()
  const { country } = useCountry()
  
  useEffect(() => {
    const checkAndRedirect = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if user has entitlement
        const { data: entitlement } = await supabase
          .from('entitlements')
          .select('id')
          .eq('email', user.email?.toLowerCase())
          .eq('active', true)
          .limit(1)
          .maybeSingle()
        
        if (entitlement) {
          // User has entitlement - redirect to portal
          router.push('/portal')
          return
        }
      }
      
      // Redirect to appropriate country funnel
      const countryCode = country.code.toLowerCase()
      if (countryCode === 'na' || countryCode === 'namibia') {
        router.push('/na/guide')
      } else if (countryCode === 'za' || countryCode === 'south-africa') {
        router.push('/za/guide')
      } else if (countryCode === 'bw' || countryCode === 'botswana') {
        router.push('/na/guide') // Botswana uses Namibia route
      } else if (countryCode === 'zm' || countryCode === 'zambia') {
        router.push('/za/guide') // Zambia can use either route
      } else {
        router.push('/na/guide') // Default to Namibia
      }
    }
    
    checkAndRedirect()
  }, [router, country])
  
  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Redirecting to pricing...</h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  )
}