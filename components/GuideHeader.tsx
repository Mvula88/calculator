'use client'

import { BadgeCheck, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import HeaderCountrySelector from '@/components/HeaderCountrySelector'

interface GuideHeaderProps {
  country: string
  trusted?: string
  primaryColor?: string
  secondaryColor?: string
}

export default function GuideHeader({ 
  country, 
  trusted = '12,847+ Importers',
  primaryColor = 'blue-600',
  secondaryColor = 'purple-600'
}: GuideHeaderProps) {
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

          {/* Right Section - Login and Country Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/auth/login">
              <Button 
                variant="default" 
                size="sm" 
                className={`flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r ${currentGradient} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 font-semibold rounded-lg border border-white/20`}
              >
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Already Paid?</span>
                <span className="font-bold">Login</span>
              </Button>
            </Link>
            <HeaderCountrySelector country={country} />
          </div>
        </div>
      </div>
    </header>
  )
}