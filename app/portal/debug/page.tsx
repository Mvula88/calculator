'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { User, Session } from '@supabase/supabase-js'

interface DebugStatus {
  checking: boolean
  user: User | null
  session: Session | null
  error: string | null
  entitlements: any | null
  envVars: {
    url: string
    anon: string
  }
}

export default function DebugPage() {
  const [status, setStatus] = useState<DebugStatus>({
    checking: true,
    user: null,
    session: null,
    error: null,
    entitlements: null,
    envVars: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
      anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING'
    }
  })

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    console.log('[Debug] Starting auth check...')
    setStatus((prev: DebugStatus) => ({ ...prev, checking: true }))
    
    try {
      const supabase = createClient()
      
      // Check session
      console.log('[Debug] Getting session...')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('[Debug] Session error:', sessionError)
        setStatus((prev: DebugStatus) => ({ 
          ...prev, 
          checking: false, 
          error: `Session error: ${sessionError.message}` 
        }))
        return
      }
      
      console.log('[Debug] Session:', session)
      
      // Check user
      console.log('[Debug] Getting user...')
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.error('[Debug] User error:', userError)
        setStatus((prev: DebugStatus) => ({ 
          ...prev, 
          checking: false, 
          session,
          error: `User error: ${userError.message}` 
        }))
        return
      }
      
      console.log('[Debug] User:', user)
      
      // Check entitlements if we have a user
      let entitlements = null
      if (user) {
        console.log('[Debug] Getting entitlements for user:', user.id)
        const { data, error } = await supabase
          .from('entitlements')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        if (error) {
          console.log('[Debug] Entitlements error (not critical):', error)
        } else {
          console.log('[Debug] Entitlements:', data)
          entitlements = data
        }
      }
      
      setStatus({
        checking: false,
        user,
        session,
        entitlements,
        error: null,
        envVars: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
          anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING'
        }
      })
      
    } catch (error) {
      console.error('[Debug] Unexpected error:', error)
      setStatus((prev: DebugStatus) => ({ 
        ...prev, 
        checking: false, 
        error: `Unexpected error: ${String(error)}` 
      }))
    }
  }

  async function testSignIn() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'testpassword'
    })
    console.log('[Debug] Sign in result:', { data, error })
    await checkAuth()
  }

  async function testSignOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    console.log('[Debug] Sign out result:', { error })
    await checkAuth()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2">Environment Variables</h2>
          <p>SUPABASE_URL: {status.envVars.url}</p>
          <p>SUPABASE_ANON_KEY: {status.envVars.anon}</p>
        </div>
        
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2">Status</h2>
          <p>Checking: {status.checking ? 'Yes' : 'No'}</p>
          <p>Error: {status.error || 'None'}</p>
        </div>
        
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2">Session</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(status.session, null, 2)}
          </pre>
        </div>
        
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2">User</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(status.user, null, 2)}
          </pre>
        </div>
        
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2">Entitlements</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(status.entitlements, null, 2)}
          </pre>
        </div>
        
        <div className="flex gap-4">
          <Button onClick={checkAuth} disabled={status.checking}>
            Refresh Status
          </Button>
          <Button onClick={testSignOut} variant="outline">
            Test Sign Out
          </Button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm">
          Open browser console (F12) to see detailed logs
        </p>
      </div>
    </div>
  )
}