'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

interface StickySignupHeaderProps {
  country?: string
}

export default function StickySignupHeader({ country = 'na' }: StickySignupHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    // Show header after user scrolls down 100px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Countdown timer for urgency
    const calculateTimeLeft = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours}h ${minutes}m`
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000)
    return () => clearInterval(timer)
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
                LIMITED TIME: Save N$500 on Import Mastery
              </p>
              <p className="text-xs opacity-90 flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Offer ends in {timeLeft}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href={`/${country}/guide#signup`}>
              <Button 
                size="sm"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-lg transform hover:scale-105 transition-all"
              >
                Get Instant Access
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}