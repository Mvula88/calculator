'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Mail, Lock, Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check for messages from redirect
    const msg = searchParams.get('message')
    const redirectEmail = searchParams.get('email')
    const sessionId = searchParams.get('session_id')
    const paymentStatus = searchParams.get('payment_status')
    const redirectTo = searchParams.get('redirectTo')

    console.log('Login page params:', { msg, redirectEmail, sessionId, paymentStatus, redirectTo })

    if (msg === 'account-exists' && redirectEmail) {
      setMessage('You already have an account. Please login to access your purchase.')
      setEmail(redirectEmail)
    }

    // If coming from successful payment
    if (paymentStatus === 'success' && sessionId) {
      setMessage('Payment successful! Please login to access your portal.')
    }
  }, [searchParams])

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    console.log('Starting login process...')
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      console.log('Attempting login for:', email.toLowerCase())

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password
      })

      console.log('Login response:', { user: data?.user?.email, error: error?.message })

      if (error) {
        console.error('Login failed:', error)
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.')
        } else {
          setError(error.message)
        }
        setLoading(false)
        return
      }

      // After successful login, always go to portal
      // In your system: authentication = payment completed
      if (data.user) {
        console.log('User logged in successfully:', data.user.email)

        // Get redirect URL from params or default to /portal
        const redirectTo = searchParams.get('redirectTo') || '/portal'
        console.log('Redirect target:', redirectTo)

        // Check if user needs to complete setup
        if (data.user.user_metadata?.needs_password_reset) {
          console.log('User needs password reset, redirecting to setup...')
          window.location.href = '/auth/setup-account'
        } else {
          // ALWAYS go to portal for authenticated users
          // (they can't be authenticated without paying in your flow)
          console.log('Login successful, redirecting to:', redirectTo)

          // Immediate redirect - don't wait for entitlement check
          window.location.href = redirectTo

          // Try to link orphaned entitlements in background (non-blocking)
          // This will complete even after redirect
          console.log('Checking for orphaned entitlements in background...')
          supabase
            .from('entitlements')
            .select('*')
            .eq('email', data.user.email?.toLowerCase())
            .eq('active', true)
            .maybeSingle()
            .then(({ data: entitlement, error: entError }) => {
              console.log('Background entitlement check:', { found: !!entitlement, error: entError })

              if (entitlement && !entitlement.user_id) {
                // Link the entitlement to the user if not already linked
                console.log('Linking entitlement to user in background...')
                supabase
                  .from('entitlements')
                  .update({ user_id: data.user.id })
                  .eq('id', entitlement.id)
                  .then(() => {
                    console.log('Background: Linked entitlement to user:', data.user.email)
                  })
                  .catch(err => {
                    console.error('Background: Failed to link entitlement:', err)
                  })
              }
            })
            .catch(err => {
              console.error('Background entitlement check failed:', err)
            })
        }
      } else {
        console.log('No user data returned from login')
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Unexpected login error:', err)
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to IMPOTA
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access your import calculator
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {message && (
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">{message}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
                <form onSubmit={handlePasswordLogin}>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{error}</span>
                      </div>
                      {error.includes('Redirect failed') && (
                        <Link
                          href="/portal"
                          className="text-sm text-blue-600 hover:underline mt-2 block"
                        >
                          Click here to go to the portal →
                        </Link>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-password">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email-password"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                          autoFocus
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
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </div>
                </form>
            </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-center text-gray-600">
            Just purchased a guide?{' '}
            <Link 
              href="/auth/setup-account" 
              className="text-blue-600 hover:underline font-medium"
            >
              Set up your password
            </Link>
          </p>
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              Haven't purchased yet?{' '}
              <Link 
                href="/na/guide" 
                className="text-blue-600 hover:underline font-medium"
              >
                View pricing
              </Link>
            </p>
            <Link 
              href="/" 
              className="text-xs text-gray-600 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}