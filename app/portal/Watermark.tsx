'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Watermark() {
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    const supabase = createClient()
    
    // Get current user
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setEmail(data.user.email)
      }
    })
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email) {
        setEmail(session.user.email)
      }
    })
    
    return () => subscription.unsubscribe()
  }, [])
  
  if (!email) return null
  
  return (
    <>
      {/* Main watermark - diagonal across screen */}
      <div className="fixed inset-0 pointer-events-none select-none z-50">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="rotate-[-30deg] opacity-[0.08]">
            <div className="text-6xl md:text-8xl font-bold text-gray-900 whitespace-nowrap">
              {email}
            </div>
            <div className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mt-4">
              Licensed to {email}
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner watermarks for screenshots */}
      <div className="fixed top-4 right-4 pointer-events-none select-none z-50 opacity-20">
        <div className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
          {email}
        </div>
      </div>
      
      <div className="fixed bottom-4 left-4 pointer-events-none select-none z-50 opacity-20">
        <div className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
          Purchased for: {email}
        </div>
      </div>
    </>
  )
}