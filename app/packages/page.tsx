'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function PackagesPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'checking' | 'no-access' | 'redirecting'>('checking')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    let mounted = true

    async function checkAccess() {
      try {
        const supabase = createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        console.log('[Packages] Checking access for user:', user?.email, 'ID:', user?.id)
        console.log('[Packages] Auth error:', userError)

        if (!mounted) return

        // Special handling for JWT user not found error
        if (userError?.message?.includes('User from sub claim in JWT does not exist')) {
          console.log('[Packages] JWT user not found - clearing session')
          await supabase.auth.signOut()

          if (mounted) {
            setStatus('no-access')
            // Force page reload to clear bad state
            setTimeout(() => {
              window.location.href = '/auth/login'
            }, 1000)
          }
          return false
        }

        if (userError || !user) {
          console.log('[Packages] No user logged in:', userError)
          setStatus('no-access')
          return false
        }

        setUserEmail(user.email || null)

        // Check for entitlements by both user_id AND email
        console.log('[Packages] Querying entitlements for:', user.email, 'or user_id:', user.id)

        const { data: entitlements, error } = await supabase
          .from('entitlements')
          .select('*')
          .or(`user_id.eq.${user.id},email.eq.${user.email?.toLowerCase()}`)
          .eq('active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        console.log('[Packages] Entitlements query result:', entitlements, 'Error:', error)

        if (error) {
          console.error('[Packages] Error querying entitlements:', error)
          // Don't return false, continue to show no-access state
        }

        if (!mounted) return

        if (entitlements?.tier) {
          console.log('[Packages] Found entitlement:', entitlements)
          setStatus('redirecting')

          // Also try to link the entitlement if it's not linked yet
          if (!entitlements.user_id && user.email) {
            console.log('[Packages] Linking orphaned entitlement to user')
            const { error: updateError } = await supabase
              .from('entitlements')
              .update({ user_id: user.id })
              .eq('email', user.email.toLowerCase())
              .is('user_id', null)

            if (updateError) {
              console.error('[Packages] Error linking entitlement:', updateError)
            }
          }

          setTimeout(() => {
            router.push('/portal')
          }, 1000)
          return true
        }

        console.log('[Packages] No entitlements found for user')
        return false
      } catch (error) {
        console.error('[Packages] Unexpected error:', error)
        return false
      }
    }

    // Initial check
    checkAccess().then(hasAccess => {
      if (!hasAccess && mounted && attempts < 5) {
        // Keep checking for a few seconds (webhook might be processing)
        const interval = setInterval(async () => {
          if (!mounted) {
            clearInterval(interval)
            return
          }

          setAttempts(prev => prev + 1)
          const found = await checkAccess()

          if (found || attempts >= 4) {
            clearInterval(interval)
            if (!found && mounted) {
              setStatus('no-access')
            }
          }
        }, 2000)

        return () => {
          clearInterval(interval)
        }
      } else if (!hasAccess && mounted) {
        setStatus('no-access')
      }
    })

    return () => {
      mounted = false
    }
  }, [router, attempts])

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Checking Your Access</h2>
            <p className="text-gray-600">
              Please wait while we verify your purchase...
              {attempts > 0 && ` (Attempt ${attempts + 1}/5)`}
            </p>
          </div>
        </Card>
      </div>
    )
  }

  if (status === 'redirecting') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Verified!</h2>
            <p className="text-gray-600">
              Redirecting you to your portal...
            </p>
          </div>
        </Card>
      </div>
    )
  }

  // No access state
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Active Package Found</h2>

          {userEmail ? (
            <>
              <p className="text-gray-600 mb-6">
                We couldn't find an active package for {userEmail}.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">Possible reasons:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your payment is still being processed (can take 1-2 minutes)</li>
                  <li>• You used a different email for payment</li>
                  <li>• Your purchase was made more than 30 days ago</li>
                </ul>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full"
                  variant="outline"
                >
                  Refresh & Check Again
                </Button>
                <Link href="/auth/login">
                  <Button className="w-full">
                    Try Different Email
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="ghost" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Please log in to access your purchased content.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">
                  Log In
                </Button>
              </Link>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}