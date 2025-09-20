'use client'

import { useState, useEffect } from 'react'
import { X, Clock, TrendingDown, Zap, AlertTriangle, Gift, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
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
  }, [hasShown, isVisible])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fadeIn"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slideUp overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-full animate-pulse">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">WAIT! Don't Leave Empty-Handed!</h2>
            </div>

            <div className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">50% OFF Launch Sale Ending in {timeLeft}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Savings highlight */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Gift className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg text-green-900">
                    Save N$1,500 - Limited Time Offer
                  </p>
                  <p className="text-green-800 mt-1">
                    50% launch discount - Regular price N$2,999
                  </p>
                </div>
              </div>
            </div>

            {/* What you'll miss */}
            <div className="space-y-3">
              <p className="font-semibold text-gray-900">You're about to miss:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">
                    <strong>Multi-Country Calculator</strong> - For NA, ZA, BW & ZM imports
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">
                    <strong>Import Documentation Guide</strong> - Templates and examples
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">
                    <strong>Japan Auction Guide</strong> - Understanding auction sheets
                  </span>
                </li>
              </ul>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl text-gray-400 line-through">N$2,999</span>
                <span className="text-4xl font-bold text-green-600">N$1,499</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Sale ends October 31, 2025</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link href="/purchase" onClick={handleClose}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg">
                  Claim 50% Discount Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <button
                onClick={handleClose}
                className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                No thanks, I'll pay full price later
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instant Access
              </div>
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  )
}