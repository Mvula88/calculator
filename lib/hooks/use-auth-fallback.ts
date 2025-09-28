'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

interface UseAuthReturn {
  user: User | null
  userEmail: string
  userTier: 'mistake' | 'mastery' | null
  hasAccess: boolean
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
}

export function useAuthFallback(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [userTier, setUserTier] = useState<'mistake' | 'mastery' | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Try to get auth from Supabase, but if it fails, check for session cookies
    const checkAuth = async () => {

      try {
        // First try Supabase
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()

        // Try to get session first (faster)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {

          // Fall back to cookie check
          checkCookieAuth()
          return
        }

        if (session?.user) {

          setUser(session.user)

          // Try to get entitlements
          try {
            const { data: entitlements } = await supabase
              .from('entitlements')
              .select('tier')
              .eq('user_id', session.user.id)
              .single()

            if (entitlements) {
              setUserTier(entitlements.tier)
            }
          } catch (e) {

          }
        } else {

        }

        setLoading(false)
      } catch (error) {

        // Fall back to cookie check
        checkCookieAuth()
      }
    }

    const checkCookieAuth = () => {
      // Check for auth cookies as fallback
      const cookies = document.cookie.split('; ')
      for (const cookie of cookies) {
        if (cookie.startsWith('sb-')) {
          // Found Supabase cookie

          // Can't decode it without the session, but at least we know auth might exist
          setError('Auth session found but could not connect to Supabase')
          setLoading(false)
          return
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const signOut = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {

    }
    setUser(null)
    setUserTier(null)
  }

  return {
    user,
    userEmail: user?.email || '',
    userTier,
    hasAccess: !!user && !!userTier,
    loading,
    error,
    signOut
  }
}