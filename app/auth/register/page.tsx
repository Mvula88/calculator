'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, CheckCircle, Lock, Mail, User, CreditCard } from 'lucide-react'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchingEmail, setFetchingEmail] = useState(false)

  // Check if user is coming from payment or package selection
  const sessionId = searchParams.get('session_id')
  const paymentStatus = searchParams.get('payment_status')
  const isFromPayment = paymentStatus === 'success' && sessionId

  // Check if user is coming from package selection (pre-checkout)
  const selectedPackage = searchParams.get('package')
  const selectedCountry = searchParams.get('country')
  const checkoutPending = searchParams.get('checkout') === 'pending'
  const isPreCheckout = checkoutPending && selectedPackage

  // Fetch email from payment session
  useEffect(() => {
    async function fetchEmailFromSession() {
      if (sessionId && !email) {
        setFetchingEmail(true)
        try {
          // Call API to get email from Stripe session
          const res = await fetch('/api/stripe/session-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
          })

          const data = await res.json()
          if (data.email) {
            setEmail(data.email)

          }
          if (data.customerName) {
            setFullName(data.customerName)

          }
        } catch (error) {

        } finally {
          setFetchingEmail(false)
        }
      }
    }

    fetchEmailFromSession()
  }, [sessionId])

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName,
          // Store payment info in user metadata for immediate access
          has_paid: isFromPayment || isPreCheckout, // They're in payment flow
          payment_session_id: sessionId || null,
          tier: 'mastery', // Single tier now
          payment_status: paymentStatus || 'pending'
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // After successful registration, sign the user in automatically
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password
      })

      if (signInError) {

        // Even if auto-login fails, show success and redirect to login
        setSuccess(true)
        setTimeout(() => {
          router.push(`/auth/login?email=${encodeURIComponent(email)}&message=Registration successful. Please login.`)
        }, 2000)
        return
      }

      // Verify session is established
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {

        await supabase.auth.refreshSession()
      }

      setSuccess(true)

      // If coming from package selection, proceed to checkout
      if (isPreCheckout) {
        // Call checkout API
        setTimeout(async () => {
          const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              country: selectedCountry || 'na',
              tier: selectedPackage,
              productId: `${selectedCountry || 'na'}-guide`
            })
          })

          const { url, error } = await res.json()

          if (error) {
            alert(`Error: ${error}`)
            router.push('/na/guide')
            return
          }

          if (url) {
            window.location.href = url
          }
        }, 2000)
      } else if (isFromPayment) {
        // Coming back from payment - user is now signed in, go directly to portal

        setTimeout(() => {
          // Use replace for clean navigation with fresh session
          window.location.replace('/portal')
        }, 2000)
      } else {
        // Regular registration
        setTimeout(() => {
          router.push('/na/guide')
        }, 2000)
      }
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold">
              Account Created Successfully!
            </CardTitle>
            <CardDescription>
              {isPreCheckout
                ? 'Logging you in and redirecting to secure checkout...'
                : isFromPayment
                  ? 'Logging you in and redirecting to your portal...'
                  : 'Please check your email to verify your account. You\'ll be redirected to our import guides...'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          {isFromPayment && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-800">Payment successful!</p>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Create your account to access your purchase
              </p>
            </div>
          )}
          {isPreCheckout && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">
                  {selectedPackage === 'mastery' ? 'Import Mastery - N$1,999' : 'Essential Guide - N$499'}
                </p>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Create your account, then proceed to checkout
              </p>
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center">
            {isFromPayment ? 'Complete Your Registration' : isPreCheckout ? 'Create Your Account' : 'Join IMPOTA'}
          </CardTitle>
          <CardDescription className="text-center">
            {isFromPayment
              ? 'One more step to access your import guides'
              : isPreCheckout
                ? 'Step 1 of 2: Create account before payment'
                : 'Start importing cars smarter today'}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email
                {fetchingEmail && (
                  <span className="ml-2 text-xs text-blue-600">(Loading from payment...)</span>
                )}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={fetchingEmail ? "Loading..." : "your@email.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={fetchingEmail}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <p className="text-sm text-center text-gray-600">
              {isFromPayment ? 'Already registered?' : 'Already have an account?'}{' '}
              <Link
                href={isFromPayment ? `/auth/login?session_id=${sessionId}&payment_status=success` : '/auth/login'}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}