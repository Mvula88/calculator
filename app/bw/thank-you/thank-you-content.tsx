'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight, Loader2 } from 'lucide-react'
export default function BotswanaThankYouContent() {
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
      // Extract email from localStorage (optional - API will get from Stripe if not provided)
      const email = localStorage.getItem('checkout_email')
      // Always call the API, even without email (API will retrieve from Stripe)
      const res = await fetch('/api/portal/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, email })
      })
      if (res.ok) {
        const data = await res.json()
        setAccessGranted(true)
        // Redirect to portal after access is granted
        // Use a small delay to ensure cookies are set
        setTimeout(() => {
          window.location.href = '/portal'
        }, 500)
      } else {
        const error = await res.json()
        setAccessGranted(false)
      }
    } catch (error) {
    } finally {
      setIsSettingAccess(false)
    }
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-blue-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Re a leboga! Thank You!
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. You now have access to the 
            Gaborone Import Guide.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-700">
              Check your email for your receipt and access instructions.
            </p>
          </div>
          <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSettingAccess}>
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
            <p className="text-sm text-blue-600 mt-2">
              ✓ Portal access granted - click above to enter
            </p>
          )}
          {accessGranted && (
            <p className="text-xs text-gray-500 mt-6">
              Redirecting to your portal...
            </p>
          )}
        </Card>
      </div>
    </main>
  )
}