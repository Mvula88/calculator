'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import WelcomeOnboarding from '@/components/portal/WelcomeOnboarding'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'

export default function StartHerePage() {
  const router = useRouter()
  const { user, userEmail, loading } = useAuthImmediate()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirectTo=/portal/start-here')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">Loading</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Redirecting to login
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <WelcomeOnboarding userEmail={userEmail || 'Portal User'} />
    </div>
  )
}
