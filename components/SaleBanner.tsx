'use client'

import { useState, useEffect } from 'react'
import { X, Clock, TrendingDown, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setIsAuthenticated(true)
          setIsVisible(false) // Hide banner for authenticated users
        }
      } catch (error) {
        // If there's an error checking auth, show the banner
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Sale ends on Oct 31, 2025
    const saleEndDate = new Date('2025-10-31T23:59:59')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = saleEndDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else {
        setTimeLeft('Sale Ended')
        clearInterval(timer)
      }
    }, 60000) // Update every minute

    // Initial calculation
    const now = new Date()
    const difference = saleEndDate.getTime() - now.getTime()
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft(`${days}d ${hours}h ${minutes}m`)
    }

    return () => clearInterval(timer)
  }, [])

  // Don't show banner for authenticated users or while checking auth
  if (!isVisible || isAuthenticated || checkingAuth) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-slide"></div>
      </div>

      <div className="relative px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            {/* Flash Icon */}
            <div className="hidden sm:block">
              <Zap className="h-6 w-6 animate-pulse" />
            </div>

            {/* Main Message */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <span className="font-bold text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  LIMITED TIME: $49 USD
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="text-sm sm:text-base">
                  <span className="font-semibold">Save $30</span> - Regular Price $79
                </span>
                <span className="hidden md:inline">•</span>
                <span className="text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Ends in: <span className="font-mono font-bold">{timeLeft}</span>
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-slide {
          animation: slide 3s linear infinite;
        }
      `}</style>
    </div>
  )
}