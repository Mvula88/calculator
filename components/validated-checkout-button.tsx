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

  async function checkEmailExists(emailToCheck: string): Promise<boolean> {
    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToCheck })
      })

      const data = await res.json()
      return data.exists
    } catch (error) {
      console.error('Error checking email:', error)
      return false
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
    const emailExists = await checkEmailExists(email)

    setCheckingEmail(false)

    if (emailExists) {
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
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  if (showEmailInput && requireEmail) {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-white shadow-lg">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Enter Your Email</h3>
          <p className="text-sm text-gray-600">
            We'll check if you already have an account before proceeding to payment
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
              <AlertDescription className="text-blue-800">
                <strong>Account Already Exists!</strong>
                <p className="mt-2">
                  You already have an account with this email address. Please login to access your portal and avoid duplicate payments.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/auth/login?email=${encodeURIComponent(email)}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Login to Your Account
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
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