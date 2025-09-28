'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  email: string
  entitlement: {
    tier: 'mistake' | 'mastery'
    country: string
  } | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  checkAccess: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
    try {
      setLoading(true)

      // Simply check if user has access via our API
      const response = await fetch('/api/auth-simple/check')

      if (response.ok) {
        const data = await response.json()
        if (data.hasAccess && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {

      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      await fetch('/api/auth-simple/signout', { method: 'POST' })
      setUser(null)
      router.push('/')
    } catch (error) {

    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, checkAccess, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useSimpleAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within SimpleAuthProvider')
  }
  return context
}

// Simple hook for pages that require authentication
export function useRequireAuth(redirectTo: string = '/purchase') {
  const { user, loading } = useSimpleAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [loading, user, router, redirectTo])

  return { user, loading }
}