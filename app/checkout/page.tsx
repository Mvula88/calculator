'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCountry } from '@/lib/country-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { country } = useCountry()
  
  useEffect(() => {
    // Redirect to appropriate country guide (new checkout flow)
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
  }, [router, country])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Redirecting to checkout...</h2>
        <p className="text-gray-600">Please wait a moment</p>
      </div>
    </div>
  )
}