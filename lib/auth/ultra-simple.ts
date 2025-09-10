'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useUltraSimpleAuth() {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check multiple sources for authentication
    const checkAccess = () => {
      console.log('[UltraSimple] Checking access...')
      
      // Check 1: Cookie
      const cookies = document.cookie.split('; ')
      const sessionCookie = cookies.find(c => c.startsWith('impota_session='))
      
      if (sessionCookie) {
        console.log('[UltraSimple] Found cookie!')
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
            setHasAccess(true)
            setLoading(false)
            return
          }
        } catch (e) {
          console.error('[UltraSimple] Cookie parse error:', e)
        }
      }
      
      // Check 2: LocalStorage
      const stored = localStorage.getItem('impota_session')
      if (stored) {
        console.log('[UltraSimple] Found localStorage!')
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
            setHasAccess(true)
            setLoading(false)
            return
          }
        } catch (e) {
          console.error('[UltraSimple] LocalStorage parse error:', e)
        }
      }
      
      // Check 3: URL params (for direct access)
      const urlParams = new URLSearchParams(window.location.search)
      const sessionParam = urlParams.get('session')
      if (sessionParam) {
        console.log('[UltraSimple] Found session in URL!')
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
      console.log('[UltraSimple] No access found, redirecting to login')
      setHasAccess(false)
      setLoading(false)
      router.push('/portal/login')
    }
    
    // Check immediately and after a delay
    checkAccess()
    const timer = setTimeout(checkAccess, 500)
    
    return () => clearTimeout(timer)
  }, [router])

  return { hasAccess, loading, userEmail }
}