'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertTriangle, CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'

interface ValidatedCheckoutButtonProps {
  tier?: 'mastery'
  country?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  requireEmail?: boolean
}

export default function ValidatedCheckoutButton({
  tier = 'mastery',
  country = 'na',
  children,
  className,
  variant,
  size,
  requireEmail = true
}: ValidatedCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)

  async function checkEmailExists(emailToCheck: string): Promise<{ exists: boolean; message?: string; error?: string }> {
    try {
      // Use strict check - ONLY checks entitlements table, not auth
      const res = await fetch('/api/auth/check-email-strict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToCheck })
      })

      const data = await res.json()

      if (data.error) {

        // Don't return false on error - be safe and assume account might exist
        return {
          exists: true,
          error: 'Unable to verify email. To avoid duplicate payments, please try logging in first.',
          message: 'Unable to verify email. To avoid duplicate payments, please try logging in first.'
        }
      }

      return {
        exists: data.exists,
        message: data.message || (data.exists ? 'An account with this email already exists.' : null)
      }
    } catch (error) {

      // On network error, be safe and suggest login
      return {
        exists: true,
        error: 'Connection error. Please try logging in first to avoid duplicate payments.',
        message: 'Connection error. Please try logging in first to avoid duplicate payments.'
      }
    }
  }

  async function handleInitialClick() {
    if (!requireEmail) {
      // If email not required, proceed directly to checkout
      await proceedToCheckout()
      return
    }

    // Show email input modal
    setShowEmailInput(true)
  }

  async function handleEmailSubmit() {
    if (!email) {
      setEmailError('Please enter your email address')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setCheckingEmail(true)
    setEmailError('')

    // Check if email already exists
    const checkResult = await checkEmailExists(email)

    setCheckingEmail(false)

    // Handle API errors
    if (checkResult.error) {
      setEmailError(checkResult.error)
      return
    }

    // If email exists, show warning
    if (checkResult.exists) {
      setEmailError('exists')
      return
    }

    // Email doesn't exist, proceed to checkout
    await proceedToCheckout(email)
  }

  async function proceedToCheckout(userEmail?: string) {
    setLoading(true)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: country,
          tier: tier,
          productId: `${country}-guide`,
          email: userEmail || email
        })
      })

      const { url, error } = await res.json()

      if (error) {
        alert(`Error: ${error}`)
        setLoading(false)
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {

      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  if (showEmailInput && requireEmail) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Enter Your Email</h3>
          <p className="text-sm text-gray-600">
            We'll check if you already have an account before proceeding to payment
          </p>
          <p className="text-xs text-gray-500">
            Access is created automatically after successful payment
          </p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError('')
              }}
              placeholder="your@email.com"
              className="pl-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEmailSubmit()
                }
              }}
            />
          </div>

          {emailError === 'exists' ? (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                <strong>Account Already Exists!</strong>
                <p className="mt-1 text-xs">
                  You already have an account with this email address. Please login to access your portal and avoid duplicate payments.
                </p>
                <div className="mt-2 flex flex-col sm:flex-row gap-2">
                  <Link href={`/auth/login?email=${encodeURIComponent(email)}`} className="flex-1">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Login to Your Account
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowEmailInput(false)
                      setEmail('')
                      setEmailError('')
                    }}
                  >
                    Use Different Email
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : emailError && emailError.includes('Cannot verify') ? (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Verification Issue</strong>
                <p className="mt-2">{emailError}</p>
                <p className="mt-2 text-sm">
                  To avoid duplicate payments, please check if you already have an account by trying to login first.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/auth/login?email=${encodeURIComponent(email)}`}>
                    <Button size="sm" variant="outline">
                      Try Login First
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => handleEmailSubmit()}
                  >
                    Retry Check
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : emailError ? (
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600">
                {emailError}
              </AlertDescription>
            </Alert>
          ) : null}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleEmailSubmit}
            disabled={checkingEmail || loading}
            className="flex-1"
          >
            {checkingEmail ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting to Stripe...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Continue to Payment
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowEmailInput(false)
              setEmail('')
              setEmailError('')
            }}
            disabled={checkingEmail || loading}
            className="bg-white hover:bg-gray-100 text-gray-900 border-gray-300"
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={handleInitialClick}
      disabled={loading}
      className={className}
      variant={variant}
      size={size}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        children
      )}
    </Button>
  )
}