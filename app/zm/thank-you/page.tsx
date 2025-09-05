'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ZambiaThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to portal after 3 seconds
    const timer = setTimeout(() => {
      router.push('/portal')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-6">
      <Card className="max-w-2xl mx-auto p-8 text-center border-0 shadow-xl">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Your Walvis Bay Import Guide is ready
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            What happens next:
          </h2>
          <div className="space-y-2 text-green-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Access your guide instantly in the portal</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Download all cost calculators and forms</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Get updates on Zambian import regulations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Start saving K45,000+ on your imports</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium">
          <span>Redirecting to your portal</span>
          <ArrowRight className="h-4 w-4 animate-pulse" />
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          You'll be redirected automatically in 3 seconds...
        </p>
      </Card>
    </main>
  )
}