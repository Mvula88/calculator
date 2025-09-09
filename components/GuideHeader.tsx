'use client'

import { BadgeCheck, Ship, User } from 'lucide-react'
import Link from 'next/link'
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
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br from-${primaryColor} to-${secondaryColor} p-2 rounded-xl shadow-lg`}>
              <Ship className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <div className={`font-bold text-xl sm:text-2xl bg-gradient-to-r from-${primaryColor} to-${secondaryColor} bg-clip-text text-transparent`}>
                IMPOTA
              </div>
              <div className="text-xs text-gray-500 font-medium hidden sm:block">Import Mastery Platform</div>
            </div>
          </div>

          {/* Center Trust Badge - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Trusted by {trusted}</span>
          </div>

          {/* Right Section - Login and Country Selector */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/auth/login">
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md text-xs sm:text-sm px-3 sm:px-4"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Already Paid?</span>
                <span>Login</span>
              </Button>
            </Link>
            <HeaderCountrySelector />
          </div>
        </div>
      </div>
    </header>
  )
}