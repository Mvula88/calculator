'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'

export default function SouthAfricaThankYouPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Auto-redirect to portal after 10 seconds
    const timer = setTimeout(() => {
      router.push('/portal')
    }, 10000)
    
    return () => clearTimeout(timer)
  }, [router])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Thank You for Your Purchase!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. You now have access to the 
            Durban Port Import Guide.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-700">
              Check your email for your receipt and access instructions.
            </p>
          </div>
          
          <Button asChild size="lg" className="w-full">
            <Link href="/portal">
              Access Your Import Portal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <p className="text-xs text-gray-500 mt-6">
            You'll be automatically redirected in a few seconds...
          </p>
        </Card>
      </div>
    </main>
  )
}