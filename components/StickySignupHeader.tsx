'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Shield } from 'lucide-react'
import Link from 'next/link'

interface StickySignupHeaderProps {
  country?: string
}

export default function StickySignupHeader({ country = 'na' }: StickySignupHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  // Currency and pricing based on country
  const pricing = {
    na: { 
      currency: 'N$', 
      mistakePrice: '499',
      masteryPrice: '1,999'
    },
    za: { 
      currency: 'R',
      mistakePrice: '499',
      masteryPrice: '1,999'
    },
    bw: { 
      currency: 'P',
      mistakePrice: '404',
      masteryPrice: '1,618'
    },
    zm: { 
      currency: 'K',
      mistakePrice: '500',
      masteryPrice: '2,000'
    }
  }
  
  const countryPricing = pricing[country as keyof typeof pricing] || pricing.na

  useEffect(() => {
    // Show header after user scrolls down 100px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium">
                🚀 Import Mastery Guide - Save Thousands on Every Import
              </p>
              <p className="text-xs opacity-90 flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Join 12,847+ successful importers
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href={`/register?country=${country}&package=mistake`}>
              <Button 
                size="sm"
                variant="outline"
                className="bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20 text-xs sm:text-sm"
              >
                Mistake Guide - {countryPricing.currency}{countryPricing.mistakePrice}
              </Button>
            </Link>
            <Link href={`/register?country=${country}&package=mastery`}>
              <Button 
                size="sm"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-lg transform hover:scale-105 transition-all text-xs sm:text-sm"
              >
                Import Mastery - Save {countryPricing.currency}{countryPricing.masterySaving}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}