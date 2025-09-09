'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export interface AuthUser {
  id: string
  email: string
  created_at: string
}

export interface Entitlement {
  id: string
  user_id: string | null
  email: string
  country: string
  tier: 'mistake' | 'mastery'
  active: boolean
  created_at: string
  product_id?: string
  stripe_customer_id?: string
  stripe_session_id?: string
}

export function useAuth(options?: { 
  requireAuth?: boolean
  requireEntitlement?: boolean
  redirectTo?: string 
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        throw userError
      }

      if (!authUser) {
        // Check for portal session cookie (post-payment access)
        const portalSessionCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('portal_session='))
        
        if (portalSessionCookie) {
          // User has portal access via payment but no Supabase account
          // Try to get entitlement directly
          if (options?.requireEntitlement) {
            const response = await fetch('/api/auth/entitlement')
            
            if (response.ok) {
              const { entitlement: userEntitlement } = await response.json()
              
              if (userEntitlement) {
                // Set a pseudo-user for portal access
                setUser({
                  id: 'portal-session',
                  email: userEntitlement.email,
                  created_at: new Date().toISOString()
                })
                setEntitlement(userEntitlement)
                setLoading(false)
                return
              }
            }
          }
        }
        
        if (options?.requireAuth) {
          const redirectPath = options.redirectTo || '/portal'
          router.push(`/auth/login?redirect=${encodeURIComponent(redirectPath)}`)
        }
        setLoading(false)
        return
      }

      const userData: AuthUser = {
        id: authUser.id,
        email: authUser.email!,
        created_at: authUser.created_at
      }
      setUser(userData)

      // Store user email for watermark if needed
      if (typeof window !== 'undefined' && authUser.email) {
        window.localStorage.setItem('userEmail', authUser.email)
      }

      // Check entitlement through API endpoint
      if (options?.requireEntitlement) {
        const response = await fetch('/api/auth/entitlement')
        
        if (!response.ok) {
          if (response.status === 404) {
            // No entitlement found
            router.push('/purchase')
            return
          }
          throw new Error('Failed to fetch entitlement')
        }

        const { entitlement: userEntitlement } = await response.json()
        
        if (!userEntitlement) {
          router.push('/purchase')
          return
        }

        setEntitlement(userEntitlement)
      }
    } catch (err) {
      console.error('Error checking auth:', err)
      setError(err instanceof Error ? err.message : 'Authentication error')
      
      if (options?.requireAuth) {
        const redirectPath = options.redirectTo || '/portal'
        router.push(`/auth/login?redirect=${encodeURIComponent(redirectPath)}`)
      }
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setEntitlement(null)
      router.push('/')
    } catch (err) {
      console.error('Error signing out:', err)
      setError(err instanceof Error ? err.message : 'Sign out error')
    }
  }

  async function refreshAuth() {
    await checkAuth()
  }

  return {
    user,
    entitlement,
    loading,
    error,
    signOut,
    refreshAuth,
    isAuthenticated: !!user,
    hasEntitlement: !!entitlement,
    isMastery: entitlement?.tier === 'mastery'
  }
}