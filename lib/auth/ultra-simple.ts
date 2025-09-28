'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useUltraSimpleAuth() {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [userTier, setUserTier] = useState<'mistake' | 'mastery'>('mistake')
  const router = useRouter()

  useEffect(() => {
    // Check multiple sources for authentication
    const checkAccess = () => {

      // Check 1: Cookie
      const cookies = document.cookie.split('; ')
      const sessionCookie = cookies.find(c => c.startsWith('impota_session='))

      if (sessionCookie) {

        try {
          const value = decodeURIComponent(sessionCookie.split('=')[1])
          const session = JSON.parse(value)
          if (session.email) {
            // Clean up email display if it's a session-based email
            const email = session.email
            let cleanEmail = email
            if (email.startsWith('user_cs_test_') || (email.startsWith('user_') && email.endsWith('@impota.com'))) {
              cleanEmail = 'Portal User'
            }
            setUserEmail(cleanEmail)
            setUserTier(session.tier || 'mistake')
            setHasAccess(true)
            setLoading(false)
            return
          }
        } catch (e) {

        }
      }

      // Check 2: LocalStorage
      const stored = localStorage.getItem('impota_session')
      if (stored) {

        try {
          const session = JSON.parse(stored)
          if (session.email) {
            // Clean up email display if it's a session-based email
            const email = session.email
            let cleanEmail = email
            if (email.startsWith('user_cs_test_') || (email.startsWith('user_') && email.endsWith('@impota.com'))) {
              cleanEmail = 'Portal User'
            }
            setUserEmail(cleanEmail)
            setUserTier(session.tier || 'mistake')
            setHasAccess(true)
            setLoading(false)
            return
          }
        } catch (e) {

        }
      }

      // Check 3: URL params (for direct access)
      const urlParams = new URLSearchParams(window.location.search)
      const sessionParam = urlParams.get('session')
      if (sessionParam) {

        // Store it and grant access
        const session = {
          email: 'user@example.com',
          sessionId: sessionParam,
          activated: true,
          createdAt: new Date().toISOString()
        }
        localStorage.setItem('impota_session', JSON.stringify(session))
        setUserEmail(session.email)
        setHasAccess(true)
        setLoading(false)
        return
      }

      // No access found

      setHasAccess(false)
      setLoading(false)
      router.push('/portal/login')
    }

    // Check immediately and after a delay
    checkAccess()
    const timer = setTimeout(checkAccess, 500)

    return () => clearTimeout(timer)
  }, [router])

  return { hasAccess, loading, userEmail, userTier }
}