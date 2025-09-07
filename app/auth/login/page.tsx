'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Mail, Send, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)


  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMagicLinkSent(false)

    const supabase = createClient()

    // Note: We'll send the magic link regardless of entitlement status
    // The middleware will handle access control after login
    // This allows users who paid to always get a magic link

    // Send magic link with proper redirect URL through callback
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      : `${window.location.origin}/auth/callback`
    
    const { error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        emailRedirectTo: redirectUrl,
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMagicLinkSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to IMPOTA
          </CardTitle>
          <CardDescription className="text-center">
            Sign in with your email to access your import portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {magicLinkSent ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Check Your Email!</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Click the link in your email to sign in. The link expires in 1 hour.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setMagicLinkSent(false)
                  setEmail('')
                }}
              >
                Try Different Email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>No password needed!</strong><br />
                    Enter the email you used when purchasing and we'll send you a secure login link.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Use the same email address you used when purchasing
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? 'Sending...' : 'Send Login Link'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/auth/register" 
              className="text-blue-600 hover:underline font-medium"
            >
              Create one
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