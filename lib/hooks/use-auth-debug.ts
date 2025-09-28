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
  signOut: () => Promise<void>
  debugInfo: {
    userChecked: boolean
    entitlementsChecked: boolean
    error: string | null
  }
}

export function useAuthDebug(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [userTier, setUserTier] = useState<'mistake' | 'mastery' | null>(null)
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState({
    userChecked: false,
    entitlementsChecked: false,
    error: null as string | null
  })

  useEffect(() => {
    let mounted = true

    const initAuth = async () => {

      try {
        const supabase = createClient()

        // Get current user

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (!mounted) return

        if (userError) {

          setDebugInfo(prev => ({ ...prev, error: userError.message }))
          setLoading(false)
          return
        }

        setUser(user)
        setDebugInfo(prev => ({ ...prev, userChecked: true }))

        if (user) {
          // Get user's entitlements

          const { data: entitlements, error: entError } = await supabase
            .from('entitlements')
            .select('tier')
            .eq('user_id', user.id)
            .single()

          if (!mounted) return

          if (entError) {

            // Not having entitlements is not a critical error
            setUserTier(null)
          } else {

            setUserTier(entitlements?.tier || null)
          }

          setDebugInfo(prev => ({ ...prev, entitlementsChecked: true }))
        } else {

          setUserTier(null)
        }
      } catch (error) {

        setDebugInfo(prev => ({ ...prev, error: String(error) }))
      } finally {
        if (mounted) {

          setLoading(false)
        }
      }
    }

    initAuth()

    return () => {
      mounted = false
    }
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setUserTier(null)
  }

  return {
    user,
    userEmail: user?.email || '',
    userTier,
    hasAccess: !!user && !!userTier,
    loading,
    signOut,
    debugInfo
  }
}