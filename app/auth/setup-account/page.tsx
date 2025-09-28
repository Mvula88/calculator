'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Lock, Loader2, AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react'

export default function SetupAccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState<'verify' | 'password'>('verify')

  // Password validation
  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
    { met: /[!@#$%^&*]/.test(password), text: 'One special character (!@#$%^&*)' }
  ]

  const isPasswordValid = passwordRequirements.every(req => req.met)
  const passwordsMatch = password === confirmPassword && password !== ''

  useEffect(() => {
    // Check if user is already logged in via magic link or has session
    checkExistingSession()
  }, [])

  async function checkExistingSession() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      setEmail(user.email || '')
      // If user is logged in and doesn't need password reset, redirect
      if (!user.user_metadata?.needs_password_reset) {
        router.push('/portal')
      } else {
        // User is logged in but needs to set password
        setStep('password')
      }
    }
  }

  async function handleVerifyEmail(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    // Send OTP to email
    const { error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        shouldCreateUser: false // Don't create user, they should exist from payment
      }
    })

    if (error) {
      setError('Email not found. Please use the email you used when purchasing.')
      setLoading(false)
      return
    }

    setStep('password')
    setLoading(false)
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault()

    if (!isPasswordValid) {
      setError('Please meet all password requirements')
      return
    }

    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()

    // First verify the OTP if we have one
    if (verificationCode && step === 'password') {
      const { data, error: otpError } = await supabase.auth.verifyOtp({
        email: email.toLowerCase(),
        token: verificationCode,
        type: 'email'
      })

      if (otpError) {
        setError('Invalid verification code. Please check your email.')
        setLoading(false)
        return
      }
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    // Update user metadata to mark setup as complete
    await supabase.auth.updateUser({
      data: { 
        needs_password_reset: false,
        setup_completed: true,
        setup_completed_at: new Date().toISOString()
      }
    })

    setSuccess(true)

    // Redirect to calculator after 2 seconds
    setTimeout(() => {
      router.push('/portal')
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Account Setup Complete!</h2>
              <p className="text-gray-600 mb-4">
                Your password has been set successfully.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to your calculator...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Complete Your Account Setup
          </CardTitle>
          <CardDescription className="text-center">
            {step === 'verify' 
              ? 'Verify your email to set up your password'
              : 'Create a secure password for your account'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'verify' ? (
            <form onSubmit={handleVerifyEmail}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                  <p className="text-sm text-green-800">
                    <strong>Thank you for your purchase!</strong><br />
                    Enter your email to set up your account password.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    Use the email address you used when purchasing
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending verification code...
                    </>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSetPassword}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {!verificationCode && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Check your email for a verification code (6 digits)
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
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
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Password requirements */}
                <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Password must have:</p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                      <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                  {password && confirmPassword && (
                    <div className="flex items-center gap-2 pt-1 border-t">
                      {passwordsMatch ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                        Passwords match
                      </span>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !isPasswordValid || !passwordsMatch}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting password...
                    </>
                  ) : (
                    'Set Password & Continue'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>

        <CardFooter>
          <p className="text-xs text-center text-gray-500 w-full">
            Having trouble?{' '}
            <a href="mailto:support@impota.com" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}