'use client'
import Link from 'next/link'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function PortalLoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email) {
      setMessage('Please enter your email')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      // Try the new v2 endpoint that checks both database and Stripe
      const res = await fetch('/api/auth-simple/login-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Successfully logged in
        setStatus('success')
        setMessage('Access granted! Redirecting to portal...')

        // Redirect to portal
        setTimeout(() => {
          window.location.href = '/portal'
        }, 1500)
      } else {
        setStatus('error')
        setMessage(data.error || 'Email not found. Please use the email you used during purchase.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Connection error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mb-4">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Access Your Portal</h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Enter the email you used to purchase the import guide
          </p>
          <p className="text-xs text-gray-500 mt-2">
            We'll check both our database and Stripe for your purchase
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="mt-1"
              required
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg flex items-start gap-2 text-xs sm:text-sm ${
              status === 'error' ? 'bg-red-50 text-red-700' :
              status === 'success' ? 'bg-green-50 text-green-700' :
              'bg-blue-50 text-blue-700'
            }`}>
              {status === 'error' && <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />}
              {status === 'success' && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />}
              <span>{message}</span>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full text-sm sm:text-base"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Checking...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Access Granted
              </>
            ) : (
              <>
                <Mail className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Access Portal
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Don't have access? <Link href="/purchase" className="text-blue-600 hover:underline">Purchase the guide</Link>
          </p>
        </div>
      </Card>
    </main>
  )
}