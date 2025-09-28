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
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [userTier, setUserTier] = useState<'mistake' | 'mastery' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Get user's entitlements - check by both user_id and email
          const { data: entitlements } = await supabase
            .from('entitlements')
            .select('tier')
            .or(`user_id.eq.${user.id},email.eq.${user.email}`)
            .eq('active', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          setUserTier(entitlements?.tier || null)
        }
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)

      if (session?.user) {
        // Get user's entitlements - check by both user_id and email
        const { data: entitlements } = await supabase
          .from('entitlements')
          .select('tier')
          .or(`user_id.eq.${session.user.id},email.eq.${session.user.email}`)
          .eq('active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        setUserTier(entitlements?.tier || null)
      } else {
        setUserTier(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
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
    signOut
  }
}