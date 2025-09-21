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
import { AlertTriangle, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
import { AuthSkeleton } from '@/components/skeletons/AuthSkeleton'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password
      })

      if (error) {
        setError(error.message.includes('Invalid login credentials')
          ? 'Invalid email or password. Please try again.'
          : error.message)
        setLoading(false)
        return
      }

      if (data.user && data.session) {
        // For users needing password reset
        if (data.user.user_metadata?.needs_password_reset) {
          window.location.href = '/auth/setup-account'
          return
        }

        // SUCCESS - Force session refresh and redirect
        console.log('Login successful, establishing session...')

        // Get fresh session to ensure it's properly set
        const { data: { session: freshSession } } = await supabase.auth.getSession()

        if (freshSession) {
          console.log('Session confirmed, redirecting to portal...')
          // Use replace to ensure clean navigation
          window.location.replace('/portal')
        } else {
          console.error('Session not established properly')
          setError('Authentication issue. Please try logging in again.')
          setLoading(false)
          // Refresh auth state
          await supabase.auth.refreshSession()
        }
      } else {
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Login error:', err)
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
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
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
    <Suspense fallback={<AuthSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}