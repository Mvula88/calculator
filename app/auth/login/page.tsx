'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, Lock, Mail, Send, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [activeTab, setActiveTab] = useState('password')

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    })

    if (error) {
      // If password login fails, suggest magic link
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. If you purchased access but haven\'t set a password, use the "Email Login" tab.')
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      // Check if user has entitlement
      const { data: entitlement } = await supabase
        .from('entitlements')
        .select('id, tier')
        .eq('email', email.toLowerCase())
        .eq('active', true)
        .single()

      if (entitlement) {
        router.push('/portal')
      } else {
        // No entitlement - redirect to guide page
        router.push('/na/guide')
      }
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMagicLinkSent(false)

    const supabase = createClient()

    // First check if user has an entitlement
    const { data: entitlement } = await supabase
      .from('entitlements')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .eq('active', true)
      .single()

    if (!entitlement) {
      setError('No active purchase found for this email. Please check your email or purchase access first.')
      setLoading(false)
      return
    }

    // Send magic link
    const { error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/portal`,
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
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access your import portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password Login</TabsTrigger>
              <TabsTrigger value="magic">Email Login</TabsTrigger>
            </TabsList>
            
            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handlePasswordLogin}>
                {error && activeTab === 'password' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-password">Email</Label>
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
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="magic" className="space-y-4">
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
                  {error && activeTab === 'magic' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Perfect for customers who purchased access!</strong><br />
                        Enter your email and we'll send you a secure login link - no password needed.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-magic">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email-magic"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {loading ? 'Sending...' : 'Send Magic Link'}
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>
          </Tabs>
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
          <p className="text-xs text-center text-gray-500">
            Purchased access? Use the "Email Login" tab to sign in without a password.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}