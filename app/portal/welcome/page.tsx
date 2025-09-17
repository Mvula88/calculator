'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2, Clock, ArrowRight, Package, AlertCircle } from 'lucide-react'
import Link from 'next/link'

function WelcomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'checking' | 'success' | 'waiting' | 'error' | 'redirecting'>('checking')
  const [attempts, setAttempts] = useState(0)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const sessionId = searchParams.get('session_id')
  const paymentStatus = searchParams.get('payment_status')

  // Log the parameters for debugging
  console.log('Welcome page loaded with:', { sessionId, paymentStatus })

  useEffect(() => {
    const checkAccess = async () => {
      // Quick check if user is already authenticated
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // If user is already logged in and this is from a payment, just go to portal
      if (user && paymentStatus === 'success') {
        console.log('User already authenticated after payment, going to portal')
        router.replace('/portal')
        return
      }

      // If we have payment parameters but no user, need to register
      if (!user && paymentStatus === 'success' && sessionId) {
        console.log('Payment successful but no user, redirecting to register')
        router.replace(`/auth/register?session_id=${sessionId}&payment_status=success`)
        return
      }

      // If we have payment parameters, check entitlements with retry
      if (sessionId) {
        console.log('Payment redirect detected, checking entitlement...')
        setStatus('waiting')
        await checkEntitlement()
      } else {
        // No payment parameters - immediately redirect based on current state
        console.log('No payment parameters, checking existing access...')
        setStatus('redirecting')

        if (user) {
          // User is logged in, go to portal
          console.log('User logged in, redirecting to portal')
          router.replace('/portal')
        } else {
          console.log('No user logged in, redirecting to login')
          router.replace('/auth/login')
        }
      }
    }

    checkAccess()
  }, [sessionId, paymentStatus, router])
  

  const checkEntitlement = async () => {
    const maxAttempts = 30 // Check for up to 30 seconds (webhook can be slow)

    const checkAccess = async () => {
      try {
        const supabase = createClient()

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()

        // If no user is logged in and we have a successful payment
        if (!user && sessionId && paymentStatus === 'success') {
          // Extract email from session if possible, or redirect to register
          console.log('No user logged in after payment, redirecting to register')
          router.push(`/auth/register?session_id=${sessionId}&payment_status=success`)
          return true
        }

        if (user) {
          setUserEmail(user.email || null)
        }

        // Check for entitlement by session ID first (most reliable after payment)
        if (sessionId) {
          const { data: sessionEntitlement } = await supabase
            .from('entitlements')
            .select('*')
            .eq('stripe_session_id', sessionId)
            .eq('active', true)
            .single()

          if (sessionEntitlement) {
            console.log('Found entitlement by session ID')

            // If entitlement exists but not linked to user, link it
            if (user && !sessionEntitlement.user_id && sessionEntitlement.email === user.email?.toLowerCase()) {
              await supabase
                .from('entitlements')
                .update({ user_id: user.id })
                .eq('id', sessionEntitlement.id)
              console.log('Linked entitlement to user')
            }

            setStatus('success')
            setTimeout(() => {
              router.push('/portal')
            }, 2000)
            return true
          }
        }

        // Check for entitlement using both email and user_id
        if (user?.email) {
          const { data: entitlements } = await supabase
            .from('entitlements')
            .select('*')
            .or(`email.eq.${user.email.toLowerCase()},user_id.eq.${user.id}`)
            .eq('active', true)
            .order('created_at', { ascending: false })
            .limit(1)

          if (entitlements && entitlements.length > 0) {
            console.log('Found entitlement by email/user_id')
            setStatus('success')
            setTimeout(() => {
              router.push('/portal')
            }, 2000)
            return true
          }
        }

        return false
      } catch (error) {
        console.error('Error checking entitlement:', error)
        return false
      }
    }
    
    // Initial check
    const hasAccess = await checkAccess()
    
    if (!hasAccess && attempts < maxAttempts) {
      setStatus('waiting')
      // Keep checking every second
      const interval = setInterval(async () => {
        setAttempts(prev => prev + 1)
        const found = await checkAccess()
        
        if (found || attempts >= maxAttempts - 1) {
          clearInterval(interval)
          if (!found) {
            setStatus('error')
          }
        }
      }, 1000)
      
      return () => clearInterval(interval)
    } else if (!hasAccess) {
      setStatus('error')
    }
  }
  
  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verifying Your Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your purchase...</p>
          </div>
        </Card>
      </div>
    )
  }
  
  if (status === 'waiting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">Processing Your Order</h2>
            <p className="text-gray-600 mb-4">
              Your payment was successful! We're setting up your account access...
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>This usually takes just a few seconds ({30 - attempts}s remaining)</span>
            </div>
            {userEmail && (
              <p className="text-xs text-gray-500 mt-4">
                Setting up access for: {userEmail}
              </p>
            )}
          </div>
        </Card>
      </div>
    )
  }
  
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to IMPOTA!</h2>
            <p className="text-gray-600 mb-6">
              Your account is ready. Redirecting to your portal...
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Package className="h-5 w-5" />
              <span className="font-semibold">Access Granted</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
  
  // Error state
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Setup Taking Longer Than Expected</h2>
          <p className="text-gray-600 mb-6">
            Your payment was successful, but we're having trouble setting up your access automatically.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <p className="text-sm font-semibold text-blue-900 mb-2">What to do:</p>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Check your email for confirmation</li>
                <li>2. Try logging in with your email</li>
                <li>3. Your access will be activated within 5 minutes</li>
              </ol>
            </div>
            
            <div className="flex flex-col gap-3">
              {sessionId ? (
                <Link href={`/auth/register?session_id=${sessionId}&payment_status=success`}>
                  <Button className="w-full">
                    Create Your Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/portal">
                  <Button className="w-full">
                    Try Accessing Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
            
            {sessionId && (
              <p className="text-xs text-gray-500">
                Session ID: {sessionId.substring(0, 20)}...
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  )
}