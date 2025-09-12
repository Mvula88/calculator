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

export function useAuthImmediate(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [userTier, setUserTier] = useState<'mistake' | 'mastery' | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    let authTimeout: NodeJS.Timeout

    const checkAuth = async () => {
      console.log('[useAuthImmediate] Starting check...')
      
      // Set a hard timeout of 3 seconds
      authTimeout = setTimeout(() => {
        if (mounted && loading) {
          console.log('[useAuthImmediate] Auth check timed out, assuming no user')
          setLoading(false)
          setError('Auth check timed out')
        }
      }, 3000)

      try {
        // Check for Supabase cookies first (immediate)
        const hasAuthCookie = document.cookie.split('; ').some(cookie => 
          cookie.startsWith('sb-') || cookie.includes('supabase')
        )
        
        if (!hasAuthCookie) {
          console.log('[useAuthImmediate] No auth cookies found')
          if (mounted) {
            setLoading(false)
            clearTimeout(authTimeout)
          }
          return
        }

        console.log('[useAuthImmediate] Auth cookies found, attempting to get session...')
        
        // Dynamic import to avoid blocking
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        
        // Use Promise.race to ensure we don't wait forever
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 2000)
        )
        
        try {
          const result = await Promise.race([sessionPromise, timeoutPromise]) as any
          
          if (!mounted) return
          
          if (result?.data?.session?.user) {
            console.log('[useAuthImmediate] Session found:', result.data.session.user.email)
            setUser(result.data.session.user)
            
            // Try to get tier but don't wait long
            try {
              const tierPromise = supabase
                .from('entitlements')
                .select('tier')
                .eq('user_id', result.data.session.user.id)
                .single()
              
              const tierTimeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Tier timeout')), 1000)
              )
              
              const tierResult = await Promise.race([tierPromise, tierTimeout]) as any
              
              if (tierResult?.data?.tier) {
                setUserTier(tierResult.data.tier)
              }
            } catch (e) {
              console.log('[useAuthImmediate] Could not get tier (non-critical)')
            }
          } else {
            console.log('[useAuthImmediate] No session in result')
          }
        } catch (e) {
          console.log('[useAuthImmediate] Session check failed:', e)
          setError('Could not verify session')
        }
        
        if (mounted) {
          setLoading(false)
          clearTimeout(authTimeout)
        }
      } catch (error) {
        console.error('[useAuthImmediate] Error:', error)
        if (mounted) {
          setError(String(error))
          setLoading(false)
          clearTimeout(authTimeout)
        }
      }
    }
    
    // Start auth check immediately
    checkAuth()
    
    return () => {
      mounted = false
      if (authTimeout) clearTimeout(authTimeout)
    }
  }, [])

  const signOut = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {
      console.error('[useAuthImmediate] Sign out error:', error)
    }
    setUser(null)
    setUserTier(null)
    
    // Clear cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      if (name.startsWith('sb-')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      }
    })
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