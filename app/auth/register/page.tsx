'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Check, AlertTriangle, Calculator, Lock } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // After successful signup, redirect to checkout for payment
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left side - Value Proposition */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Join Serious Importers
            </h1>
            <p className="text-xl text-gray-600">
              Get instant access to the complete import calculator and insider secrets
            </p>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle>What You'll Get Immediately</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-semibold">Complete Calculator Access</p>
                  <p className="text-sm text-gray-600">All 27 hidden costs revealed</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-semibold">Import Master Guide</p>
                  <p className="text-sm text-gray-600">Step-by-step process & documents</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-semibold">Verified Agent List</p>
                  <p className="text-sm text-gray-600">Avoid my N$45,000 mistake</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-semibold">WhatsApp Support</p>
                  <p className="text-sm text-gray-600">Direct access to me</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="mt-6 bg-yellow-50 border-yellow-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>No Free Trial</strong> - This platform is for serious importers only. 
              N$499 one-time payment required after registration.
            </AlertDescription>
          </Alert>
        </div>

        {/* Right side - Registration Form */}
        <div>
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <Badge className="bg-red-500 text-white">NO FREE TIER</Badge>
              </div>
              <CardDescription>
                Step 1 of 2: Account details (payment next)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+264 81 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">For WhatsApp support access</p>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                {error && (
                  <Alert className="bg-red-50 border-red-300">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Continue to Payment →'}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Next step: N$499 payment for full access
                    </p>
                  </div>
                </div>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    <span>Secure Payment</span>
                  </div>
                  <span>•</span>
                  <span>30-Day Money Back</span>
                  <span>•</span>
                  <span>Lifetime Access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}