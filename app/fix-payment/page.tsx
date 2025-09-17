'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function FixPaymentPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage(null)

    try {
      // First check for existing payment
      const checkResponse = await fetch('/api/dev/check-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() })
      })

      const checkData = await checkResponse.json()

      if (checkData.diagnosis?.hasEntitlements) {
        setMessage({
          type: 'success',
          text: 'You already have access! Please log in with your email.'
        })
        return
      }

      if (checkData.diagnosis?.hasCompletedPayments) {
        // Payment found, create entitlement
        const fixResponse = await fetch('/api/dev/check-purchase', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.toLowerCase(),
            tier: 'mistake',
            country: 'na'
          })
        })

        const fixData = await fixResponse.json()

        if (fixData.entitlement) {
          setMessage({
            type: 'success',
            text: 'Access granted! Your payment has been verified and you can now log in.'
          })
        } else {
          setMessage({
            type: 'error',
            text: fixData.error || 'Failed to create access. Please contact support.'
          })
        }
      } else {
        // No payment found - create manual entitlement for paid users
        setMessage({
          type: 'info',
          text: 'No Stripe payment found. If you paid, click "Create Access" below.'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const createManualAccess = async () => {
    if (!email) return

    setLoading(true)
    try {
      const response = await fetch('/api/dev/check-purchase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase(),
          tier: 'mistake',
          country: 'na'
        })
      })

      const data = await response.json()

      if (data.entitlement) {
        setMessage({
          type: 'success',
          text: 'Access created successfully! You can now log in with your email.'
        })
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to create access.'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-2">Fix Payment Access</h1>
        <p className="text-gray-600 mb-6">
          If you paid but can't access the portal, enter your email below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address (used for payment)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Check Payment & Fix Access'
            )}
          </Button>
        </form>

        {message && (
          <Alert className={`mt-4 ${
            message.type === 'error' ? 'border-red-200 bg-red-50' :
            message.type === 'success' ? 'border-green-200 bg-green-50' :
            'border-blue-200 bg-blue-50'
          }`}>
            {message.type === 'success' && <CheckCircle className="h-4 w-4" />}
            {message.type === 'error' && <AlertCircle className="h-4 w-4" />}
            <AlertDescription className={
              message.type === 'error' ? 'text-red-800' :
              message.type === 'success' ? 'text-green-800' :
              'text-blue-800'
            }>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {message?.type === 'info' && (
          <Button
            onClick={createManualAccess}
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Create Access (I already paid)'
            )}
          </Button>
        )}

        {message?.type === 'success' && (
          <div className="mt-4 text-center">
            <Link
              href="/auth/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Go to Login Page →
            </Link>
          </div>
        )}
      </Card>
    </div>
  )
}