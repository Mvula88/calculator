'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Mail, Lock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import Image from 'next/image'

function RegisterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMethod, setAuthMethod] = useState<'password' | 'magic-link'>('password')
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  
  // Get package and country from query params (passed from previous step)
  const selectedPackage = searchParams.get('package') || 'mistake'
  const country = searchParams.get('country') || 'na'

  const packageInfo = {
    mistake: { name: 'Mistake Guide', price: 'N$499' },
    mastery: { name: 'Import Mastery', price: 'N$1,999' }
  }

  const handlePasswordSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Sign up with email and password
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            country,
            pending_package: selectedPackage
          }
        }
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // Store user info for checkout
        sessionStorage.setItem('user_email', email)
        sessionStorage.setItem('user_id', data.user.id)
        
        // Redirect to Stripe checkout
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            country,
            tier: selectedPackage,
            productId: selectedPackage
          })
        })

        const checkoutData = await response.json()
        
        if (checkoutData.url) {
          window.location.href = checkoutData.url
        } else {
          throw new Error('Failed to create checkout session')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Get base URL for redirect
      const baseUrl = window.location.origin
      
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${baseUrl}/auth/callback?package=${selectedPackage}&country=${country}`,
          data: {
            country,
            pending_package: selectedPackage
          }
        }
      })

      if (magicLinkError) throw magicLinkError

      setMagicLinkSent(true)
      
      // Store email for later checkout
      sessionStorage.setItem('user_email', email)
      sessionStorage.setItem('pending_package', selectedPackage)
      sessionStorage.setItem('pending_country', country)
      
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              We've sent a magic link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ol className="text-sm space-y-2 text-gray-600">
                <li>1. Click the link in your email</li>
                <li>2. You'll be signed in automatically</li>
                <li>3. Complete your purchase of {packageInfo[selectedPackage as keyof typeof packageInfo].name}</li>
                <li>4. Get instant access to your materials</li>
              </ol>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setMagicLinkSent(false)}
            >
              Use a different email
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IMPOTA
              </span>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Already have an account? Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="w-16 h-1 bg-blue-600"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Step 1 of 3 - Set up your account to purchase {packageInfo[selectedPackage as keyof typeof packageInfo].name}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Selected package reminder */}
            <div className="bg-blue-50 p-3 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected package:</p>
                  <p className="font-semibold">{packageInfo[selectedPackage as keyof typeof packageInfo].name}</p>
                </div>
                <p className="text-xl font-bold text-blue-600">
                  {packageInfo[selectedPackage as keyof typeof packageInfo].price}
                </p>
              </div>
            </div>

            <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as 'password' | 'magic-link')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
              </TabsList>
              
              <TabsContent value="password">
                <form onSubmit={handlePasswordSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Choose a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 6 characters
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Continue to Payment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="magic-link">
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <Label htmlFor="email-magic">Email</Label>
                    <Input
                      id="email-magic"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you a secure link to sign in
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending magic link...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Magic Link
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Benefits reminder */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">What you'll get:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Instant access after payment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">30-day money-back guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Lifetime access to materials</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          🔒 Your information is secure and encrypted
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  )
}