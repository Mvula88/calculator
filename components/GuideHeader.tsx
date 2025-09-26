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
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image 
                src="/impota-logo.png" 
                alt="IMPOTA" 
                width={150} 
                height={40}
                className="h-8 sm:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Right Section - Buttons and Country Selector */}
          <div className="flex items-center gap-3">
            {user ? (
              // User is logged in - show portal access only
              <Link href="/portal" className="group">
                <Button
                  size="sm"
                  className={`font-bold text-sm px-4 py-2 bg-gradient-to-r ${currentGradient} shadow-lg group-hover:scale-105 transition-all duration-300`}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Access Portal
                  <Sparkles className="ml-2 h-3 w-3 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            ) : (
              // Not logged in - show both Member Login and Get Started buttons
              <>
                <Link href="/auth/login" className="group">
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-bold text-sm px-4 py-2 border-2 hover:scale-105 transition-all duration-300"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Member Login
                  </Button>
                </Link>

                <Link href={`/${country}/guide#pricing`} className="group">
                  <Button
                    size="sm"
                    className={`font-bold text-sm px-4 py-2 bg-gradient-to-r ${currentGradient} shadow-lg group-hover:scale-105 transition-all duration-300`}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Get Started
                    <Sparkles className="ml-2 h-3 w-3 group-hover:rotate-12 transition-transform" />
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