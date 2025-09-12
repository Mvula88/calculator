'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
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

export function useAuthSimple(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [userTier, setUserTier] = useState<'mistake' | 'mastery' | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    console.log('[useAuthSimple] Starting auth check...')

    const checkAuth = async () => {
      try {
        const supabase = createClient()
        
        // Get user without timeout - let it complete naturally
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (!mounted) return

        if (userError) {
          console.error('[useAuthSimple] User error:', userError)
          setError(userError.message)
          setLoading(false)
          return
        }

        console.log('[useAuthSimple] User:', user?.email)
        setUser(user)

        // Only get entitlements if we have a user
        if (user) {
          try {
            const { data: entitlements, error: entError } = await supabase
              .from('entitlements')
              .select('tier')
              .eq('user_id', user.id)
              .single()

            if (!mounted) return
            
            if (entError) {
              console.log('[useAuthSimple] No entitlements found (this is OK):', entError.message)
              // Not having entitlements is OK - user might not have purchased yet
              setUserTier(null)
            } else {
              console.log('[useAuthSimple] User tier:', entitlements?.tier)
              setUserTier(entitlements?.tier || null)
            }
          } catch (e) {
            console.error('[useAuthSimple] Entitlements error:', e)
            setUserTier(null)
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('[useAuthSimple] Auth error:', error)
        if (mounted) {
          setError(String(error))
          setLoading(false)
        }
      }
    }

    checkAuth()

    return () => {
      mounted = false
    }
  }, [])

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setUserTier(null)
    } catch (error) {
      console.error('[useAuthSimple] Sign out error:', error)
    }
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