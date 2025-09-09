'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

export default function ZambiaThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSettingAccess, setIsSettingAccess] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)

  useEffect(() => {
    // Get session ID from URL
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // Grant portal access using the session
      grantPortalAccess(sessionId)
    }
    
    // Auto-redirect to portal after successful access grant
    // Don't auto-redirect until access is confirmed
  }, [router, searchParams])
  
  async function grantPortalAccess(sessionId: string) {
    setIsSettingAccess(true)
    try {
      // Extract email from localStorage (set during checkout)
      const email = localStorage.getItem('checkout_email')
      
      if (email) {
        const res = await fetch('/api/portal/access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, email })
        })
        
        if (res.ok) {
          const data = await res.json()
          setAccessGranted(true)
          console.log('Portal access granted', data)
          
          // Redirect to portal after access is granted
          console.log('Portal access granted, redirecting...')
          
          // Use a small delay to ensure cookies are set
          setTimeout(() => {
            window.location.href = '/portal'
          }, 500)
        }
      }
    } catch (error) {
      console.error('Failed to grant portal access:', error)
    } finally {
      setIsSettingAccess(false)
    }
  }

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

        <Button asChild size="lg" className="w-full mb-4" disabled={isSettingAccess}>
          <Link href="/portal">
            {isSettingAccess ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up your access...
              </>
            ) : (
              <>
                Access Your Import Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Link>
        </Button>
        
        {accessGranted && (
          <p className="text-sm text-green-600 mb-2">
            ✓ Portal access granted - click above to enter
          </p>
        )}

        {accessGranted && (
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium">
            <span>Redirecting to your portal</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </div>
        )}
      </Card>
    </main>
  )
}