'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

export default function SimpleThankYouContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      grantAccess(sessionId)
    } else {
      setStatus('error')
      setErrorMessage('No payment session found')
    }
  }, [searchParams])
  
  async function grantAccess(sessionId: string) {
    try {
      console.log('Granting access for session:', sessionId)
      
      const res = await fetch('/api/auth-simple/grant-access-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      const data = await res.json()
      console.log('Grant access response:', data)
      
      if (res.ok && data.success) {
        setStatus('success')
        // Redirect to portal after 2 seconds
        setTimeout(() => {
          window.location.href = '/portal'
        }, 2000)
      } else {
        console.error('Grant access failed:', data)
        setStatus('error')
        setErrorMessage(data.error || 'Failed to activate your access')
      }
    } catch (error) {
      console.error('Grant access error:', error)
      setStatus('error')
      setErrorMessage('Connection error. Please refresh the page and try again.')
    }
  }
  
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Setting up your access...</h2>
            <p className="text-gray-600">Please wait while we activate your portal</p>
          </div>
        </Card>
      </main>
    )
  }
  
  if (status === 'error') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Setup Failed</h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <p className="text-sm text-gray-500">
              Please contact support@impota.com with your payment receipt
            </p>
          </div>
        </Card>
      </main>
    )
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="p-8 max-w-md">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          
          <h1 className="text-2xl font-bold mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your portal access has been activated.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-700">
              Check your email for your receipt
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Redirecting to your portal...
            </p>
            
            <Button asChild size="lg" className="w-full">
              <a href="/portal">
                Go to Portal Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}