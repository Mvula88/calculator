'use client'

import { useState, useEffect } from 'react'
import { User, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Wordmark from '@/components/Wordmark'
import { Button } from '@/components/ui/button'
import HeaderCountrySelector from '@/components/HeaderCountrySelector'
import { createClient } from '@/lib/supabase/client'

interface GuideHeaderProps {
  country: string
  trusted?: string
  primaryColor?: string
  secondaryColor?: string
  showCountrySelector?: boolean
}

export default function GuideHeader({
  country,
  showCountrySelector = true,
}: GuideHeaderProps) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUser(user)
    }
    checkUser()
  }, [])

  const getStartedLink = !showCountrySelector
    ? '/#countries'
    : `/${country}/guide#pricing`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200/80 safe-padding-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo + mono tagline */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Link
              href="/"
              className="flex items-center flex-shrink-0 active:opacity-70 transition-opacity"
            >
              <Wordmark className="text-2xl sm:text-3xl md:text-4xl" />
            </Link>
            <span className="hidden md:inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 truncate">
              <span className="h-px w-6 bg-zinc-300" />
              Import education
            </span>
          </div>

          {/* Right: nav + country selector */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <Link href="/portal">
                <Button
                  size="sm"
                  className="group h-9 px-4 sm:h-10 sm:px-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-colors text-xs sm:text-sm"
                >
                  <span className="hidden xs:inline">Access </span>Portal
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            ) : (
              <>
                {/* Login — text link on desktop, icon button on mobile */}
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors px-2"
                >
                  Login
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/auth/login" className="sm:hidden">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0 rounded-full border border-zinc-200 hover:bg-zinc-50"
                    aria-label="Login"
                  >
                    <User className="h-4 w-4 text-zinc-700" />
                  </Button>
                </Link>

                <Link href={getStartedLink}>
                  <Button
                    size="sm"
                    className="group h-9 px-4 sm:h-10 sm:px-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-colors text-xs sm:text-sm whitespace-nowrap"
                  >
                    <span className="hidden xs:inline">Get </span>Started
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </>
            )}

            {showCountrySelector && <HeaderCountrySelector country={country} />}
          </div>
        </div>
      </div>
    </header>
  )
}
