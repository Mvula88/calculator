'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RecoverPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState<any>(null)

  const handleRecover = async () => {
    setStatus('checking')
    setMessage('Attempting to recover your session...')

    try {
      const supabase = createClient()

      // Sign out first to clear bad session
      await supabase.auth.signOut()
      setMessage('Cleared old session...')

      // Get fresh session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        throw new Error(`Session error: ${sessionError.message}`)
      }

      if (!session) {
        setStatus('error')
        setMessage('No active session. Please log in again.')
        setDetails({ needsLogin: true })

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
        return
      }

      // Check user exists
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error(`User error: ${userError?.message || 'No user found'}`)
      }

      setMessage(`Found user: ${user.email}`)

      // Check entitlements
      const { data: entitlements, error: entError } = await supabase
        .from('entitlements')
        .select('*')
        .or(`user_id.eq.${user.id},email.eq.${user.email?.toLowerCase()}`)
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (entError) {

      }

      setDetails({
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        },
        entitlement: entitlements ? {
          tier: entitlements.tier,
          active: entitlements.active,
          linked: entitlements.user_id === user.id
        } : null
      })

      if (entitlements) {
        setStatus('success')
        setMessage('Session recovered! Redirecting to portal...')

        // Link entitlement if needed
        if (!entitlements.user_id && user.email) {
          await supabase
            .from('entitlements')
            .update({ user_id: user.id })
            .eq('email', user.email.toLowerCase())
            .is('user_id', null)
        }

        setTimeout(() => {
          router.push('/portal')
        }, 2000)
      } else {
        setStatus('error')
        setMessage('No active entitlements found for your account.')
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.message || 'Recovery failed')
      setDetails({ error: error.toString() })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Session Recovery</CardTitle>
          <CardDescription>
            Fix authentication issues and recover your access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'idle' && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will clear your current session and attempt to recover your access.
                  You may need to log in again.
                </AlertDescription>
              </Alert>
              <Button onClick={handleRecover} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Recover Session
              </Button>
            </>
          )}

          {status === 'checking' && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="font-semibold">{message}</p>
              {details && (
                <div className="mt-4 text-left bg-gray-50 p-3 rounded text-xs">
                  <pre>{JSON.stringify(details, null, 2)}</pre>
                </div>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {message}
                </AlertDescription>
              </Alert>
              {details && (
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <pre>{JSON.stringify(details, null, 2)}</pre>
                </div>
              )}
              <div className="space-y-2">
                <Button onClick={handleRecover} variant="outline" className="w-full">
                  Try Again
                </Button>
                <Button onClick={() => router.push('/auth/login')} className="w-full">
                  Go to Login
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}