'use client'

import { useState, useEffect } from 'react'
import { X, Clock, Sparkles, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'

interface ExitIntentPopupProps {
  country?: 'na' | 'za' | 'bw' | 'zm'
}

export default function ExitIntentPopup({ country: propCountry }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()

  // Detect country from URL path
  const getCountryFromPath = () => {
    if (pathname.startsWith('/za')) return 'za'
    if (pathname.startsWith('/bw')) return 'bw'
    if (pathname.startsWith('/zm')) return 'zm'
    if (pathname.startsWith('/na')) return 'na'
    return propCountry || null
  }

  const country = getCountryFromPath()

  // Don't show popup on landing page or pages without a country
  const isLandingPage = pathname === '/' || (!country && !pathname.includes('/guide'))

  // Universal USD pricing for all countries
  const currencies = {
    na: { symbol: '$', price: '49', originalPrice: '79' },
    za: { symbol: '$', price: '49', originalPrice: '79' },
    bw: { symbol: '$', price: '49', originalPrice: '79' },
    zm: { symbol: '$', price: '49', originalPrice: '79' }
  }

  const currency = country ? currencies[country as keyof typeof currencies] : currencies.na

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setIsAuthenticated(true)
        return // Don't show popup for logged-in users
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Don't show popup for authenticated users
    if (isAuthenticated) {
      return
    }

    // Don't show popup on landing page
    if (isLandingPage) {
      return
    }

    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem('exitIntentShown')
    if (shown) {
      setHasShown(true)
      return
    }

    // Calculate time left for sale
    const calculateTimeLeft = () => {
      const saleEndDate = new Date('2025-10-31T23:59:59')
      const now = new Date()
      const difference = saleEndDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        return `${days} days, ${hours} hours`
      }
      return 'Soon'
    }

    setTimeLeft(calculateTimeLeft())

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    // Mobile detection - show after 30 seconds of inactivity
    let mobileTimer: NodeJS.Timeout
    const handleMobileIntent = () => {
      if (!hasShown && !isVisible && window.innerWidth < 768) {
        mobileTimer = setTimeout(() => {
          setIsVisible(true)
          setHasShown(true)
          sessionStorage.setItem('exitIntentShown', 'true')
        }, 30000) // Show after 30 seconds
      }
    }

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave)
    handleMobileIntent()

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (mobileTimer) clearTimeout(mobileTimer)
    }
  }, [hasShown, isVisible, isAuthenticated, isLandingPage])

  // Don't render anything for authenticated users or on landing page
  if (isAuthenticated || !isVisible || isLandingPage) return null

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <>
      {/* Backdrop with smooth animation */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9998] animate-fadeIn"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Professional Modal - Mobile Optimized */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-3 sm:p-6 lg:p-8 overflow-y-auto safe-padding-top safe-padding-bottom" role="dialog" aria-modal="true">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xl mx-auto my-auto animate-scaleUp overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
          {/* Elegant Header - Mobile Optimized */}
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white">
            {/* Close Button - Touch Optimized */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-touch min-w-touch p-2.5 sm:p-2 bg-black/20 hover:bg-black/30 active:bg-black/40 rounded-full transition-all duration-200 group border border-white/30"
              aria-label="Close offer"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Discount Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>LIMITED TIME OFFER</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Save 50% Today
            </h2>
            <p className="text-white/90 text-base sm:text-lg">
              Launch pricing ends {timeLeft.includes('day') ? `in ${timeLeft.split(',')[0]}` : 'soon'}
            </p>
          </div>

          {/* Content - Scrollable - Mobile Optimized */}
          <div className="p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            {/* Price Display - Mobile Optimized */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                <span className="text-2xl sm:text-3xl text-gray-400 line-through font-light">{currency.symbol}{currency.originalPrice}</span>
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">{currency.symbol}{currency.price}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Offer expires October 31, 2025
              </p>
            </div>

            {/* What's Included - Clear Value Proposition */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">LIFETIME ACCESS INCLUDES:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Accurate Duty Calculator</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Verified Agents</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Complete Import Guide</p>
                  </div>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-800 font-medium">
                  ✨ BONUS: Japan auction access guide, shipping contacts, all documents & templates
                </p>
              </div>
            </div>

            {/* Action Buttons - Touch Optimized */}
            <div className="space-y-3 pt-2">
              <ValidatedCheckoutButton
                tier="mastery"
                country={country || 'na'}
                className="w-full min-h-touch-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-semibold py-4 sm:py-6 px-6 text-base sm:text-lg shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 group"
              >
                <span>Get Instant Access</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </ValidatedCheckoutButton>

              <button
                onClick={handleClose}
                className="w-full min-h-touch text-gray-500 hover:text-gray-700 active:text-gray-800 text-sm sm:text-base font-medium transition-colors duration-200 py-3"
              >
                Continue to website
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 border-t pt-4">
              <Lock className="h-3.5 w-3.5" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleUp {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  )
}