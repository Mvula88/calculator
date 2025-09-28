'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface SimpleUser {
  email: string
}

export interface SimpleEntitlement {
  email: string
  country: string
  tier: 'mistake' | 'mastery'
  active: boolean
}

export function useSimpleAuth(options?: { 
  requireAuth?: boolean
  requireEntitlement?: boolean
  redirectTo?: string 
}) {
  const [user, setUser] = useState<SimpleUser | null>(null)
  const [entitlement, setEntitlement] = useState<SimpleEntitlement | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Add a small delay to ensure cookies are set
    const timer = setTimeout(() => {
      checkAuth()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  async function checkAuth() {
    try {
      setLoading(true)

      // Check for session cookie
      const sessionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('impota_session='))

      if (!sessionCookie) {

        // Try localStorage as fallback
        const storedSession = localStorage.getItem('impota_session')
        if (storedSession) {
          try {
            const session = JSON.parse(storedSession)
            if (session.email) {

              setUser({ email: session.email })
              setEntitlement({
                email: session.email,
                country: 'na',
                tier: 'mistake',
                active: true
              })
              setLoading(false)
              return
            }
          } catch (e) {

          }
        }

        if (options?.requireAuth) {
          // Instead of going to purchase, go to login
          router.push('/portal/login')
        }
        setLoading(false)
        return
      }

      // Parse session
      try {
        const sessionValue = decodeURIComponent(sessionCookie.split('=')[1])
        const session = JSON.parse(sessionValue)

        if (session.email) {
          // Set user
          setUser({ email: session.email })

          // Check entitlement if required
          if (options?.requireEntitlement) {
            const response = await fetch('/api/auth-simple/check')

            if (response.ok) {
              const data = await response.json()

              if (data.hasAccess && data.user?.entitlement) {
                setEntitlement({
                  email: data.user.email,
                  country: data.user.entitlement.country,
                  tier: data.user.entitlement.tier,
                  active: true
                })
              } else {
                // No entitlement - go to login instead of purchase

                router.push('/portal/login')
                return
              }
            } else {

              router.push('/portal/login')
              return
            }
          }
        } else {
          if (options?.requireAuth) {
            router.push(options.redirectTo || '/purchase')
          }
        }
      } catch (e) {

        if (options?.requireAuth) {
          router.push(options.redirectTo || '/purchase')
        }
      }
    } catch (error) {

      if (options?.requireAuth) {
        router.push(options.redirectTo || '/purchase')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    entitlement,
    loading,
    isAuthenticated: !!user,
    hasEntitlement: !!entitlement,
    isMastery: entitlement?.tier === 'mastery'
  }
}