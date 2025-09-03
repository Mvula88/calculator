'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Calculator, Shield } from 'lucide-react'

export default function LoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectedFrom = searchParams.get('redirectedFrom')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Redirect to dashboard or originally requested page
    router.push(redirectedFrom || '/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your calculator</p>
        </div>

        {redirectedFrom && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to access the calculator and premium features
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access your premium import calculator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert className="bg-red-50 border-red-300">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/register" className="text-blue-600 hover:underline">
                    Create account (N$499)
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Secure authentication with Supabase</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Badge variant="outline" className="px-4 py-2">
            MEMBERS ONLY PLATFORM
          </Badge>
          <p className="text-xs text-gray-500 mt-2">
            No free tier • No trial • Serious importers only
          </p>
        </div>
      </div>
    </div>
  )
}