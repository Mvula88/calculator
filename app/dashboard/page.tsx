'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardPage() {
  const router = useRouter()
  
  useEffect(() => {
    const checkEntitlementAndRedirect = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Not logged in - redirect to login
        router.push('/auth/login')
        return
      }
      
      // Check if user has entitlement (new system)
      const { data: entitlement } = await supabase
        .from('entitlements')
        .select('id, tier, country')
        .eq('email', user.email?.toLowerCase())
        .eq('active', true)
        .limit(1)
        .maybeSingle()
      
      if (entitlement) {
        // User has entitlement - redirect to portal
        router.push('/portal')
      } else {
        // No entitlement - redirect to country-specific guide
        // Check user's country from cookie or default
        const userCountry = document.cookie
          .split('; ')
          .find(row => row.startsWith('user-country='))
          ?.split('=')[1] || 'namibia'
        
        if (userCountry.includes('namibia') || userCountry.includes('na')) {
          router.push('/na/guide')
        } else if (userCountry.includes('south-africa') || userCountry.includes('za')) {
          router.push('/za/guide')
        } else {
          router.push('/na/guide') // Default
        }
      }
    }
    
    checkEntitlementAndRedirect()
  }, [router])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Checking access...</h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  )
}