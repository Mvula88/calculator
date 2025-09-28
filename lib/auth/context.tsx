'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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

interface AuthContextType {
  user: AuthUser | null
  entitlement: Entitlement | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
  refreshAuth: () => Promise<void>
  isAuthenticated: boolean
  hasEntitlement: boolean
  isMastery: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await checkAuth()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setEntitlement(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
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
        setUser(null)
        setEntitlement(null)
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
      try {
        const response = await fetch('/api/auth/entitlement')

        if (response.ok) {
          const { entitlement: userEntitlement } = await response.json()
          setEntitlement(userEntitlement)
        } else {
          setEntitlement(null)
        }
      } catch (err) {

        setEntitlement(null)
      }
    } catch (err) {

      setError(err instanceof Error ? err.message : 'Authentication error')
      setUser(null)
      setEntitlement(null)
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

      setError(err instanceof Error ? err.message : 'Sign out error')
    }
  }

  async function refreshAuth() {
    await checkAuth()
  }

  const value: AuthContextType = {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}