'use client'

import { useState, useEffect } from 'react'
import { BadgeCheck, User, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
  trusted = 'Real Import Experience, Real Guidance',
  primaryColor = 'blue-600',
  secondaryColor = 'purple-600',
  showCountrySelector = true
}: GuideHeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  // Dynamic gradient based on country
  const gradients = {
    na: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    za: 'from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700',
    bw: 'from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700',
    zm: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
  }

  const currentGradient = gradients[country as keyof typeof gradients] || gradients.na

  // Get Started button link logic
  // On landing page (showCountrySelector is false), link to countries section
  // On guide pages (showCountrySelector is true), link to pricing section
  const getStartedLink = !showCountrySelector
    ? '/#countries'  // Landing page: go to country selection
    : `/${country}/guide#pricing` // Guide pages: go to pricing section

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm fixed top-0 left-0 right-0 z-50 safe-padding-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center min-h-touch active:opacity-70 transition-opacity">
              <Image
                src="/impota-logo.png"
                alt="IMPOTA"
                width={150}
                height={40}
                className="h-8 sm:h-10 md:h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right Section - Buttons and Country Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              // User is logged in - show portal access only
              <Link href="/portal" className="group">
                <Button
                  size="sm"
                  className={`font-bold text-sm sm:text-base min-h-touch px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r ${currentGradient} shadow-lg group-hover:scale-105 transition-all duration-300 active:scale-95`}
                >
                  <Crown className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline">Access </span>Portal
                  <Sparkles className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            ) : (
              // Not logged in - show both Member Login and Get Started buttons
              <>
                <Link href="/auth/login" className="group mobile-only">
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-bold text-sm min-h-touch px-3 py-2.5 border-2 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/auth/login" className="group desktop-only">
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-bold text-sm sm:text-base min-h-touch px-4 py-2.5 sm:px-5 sm:py-3 border-2 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Login
                  </Button>
                </Link>

                <Link href={getStartedLink} className="group">
                  <Button
                    size="sm"
                    className={`font-bold text-sm sm:text-base min-h-touch px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r ${currentGradient} shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap`}
                  >
                    <Crown className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden xs:inline">Get </span>Started
                    <Sparkles className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform" />
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