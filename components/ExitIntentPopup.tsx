'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Clock, ArrowRight, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ExitIntentPopupProps {
  country: string
}

export default function ExitIntentPopup({ country }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  const pricing = {
    na: { currency: 'N$', extraSaving: '200' },
    za: { currency: 'R', extraSaving: '200' },
    bw: { currency: 'P', extraSaving: '160' },
    zm: { currency: 'K', extraSaving: '200' }
  }

  const countryPricing = pricing[country as keyof typeof pricing] || pricing.na

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves the viewport from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        
        // Start countdown timer
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              setIsVisible(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }

    // Add exit intent detection
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Also check if user has seen popup in this session
    const hasSeenPopup = sessionStorage.getItem('exitPopupShown')
    if (hasSeenPopup) {
      setHasShown(true)
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('exitPopupShown', 'true')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup - Compact & Mobile Friendly */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden animate-slideUp flex flex-col">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 animate-pulse" />
            <h2 className="text-2xl font-bold">WAIT! You're About to Lose {countryPricing.currency}3,000 in Savings!</h2>
          </div>
          <p className="text-lg">This special pricing expires when you leave this page...</p>
        </div>

        {/* Content - Compact */}
        <div className="p-4 overflow-y-auto flex-1 max-h-[50vh]">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mb-3">
            <p className="text-base font-black text-center">
              ⚠️ LEAVING WITHOUT {countryPricing.currency}65,000 IN SAVINGS?
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">❌</span>
              <div>
                <p className="font-bold text-red-600 text-sm">LIVE Duty Calculator</p>
                <p className="text-xs text-gray-600">Save {countryPricing.currency}15,000+ on calculations</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">❌</span>
              <div>
                <p className="font-bold text-red-600 text-sm">Port Navigation Guide</p>
                <p className="text-xs text-gray-600">Clear customs in 3 days not 2 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">❌</span>
              <div>
                <p className="font-bold text-red-600 text-sm">Scam Prevention ({countryPricing.currency}45,000)</p>
                <p className="text-xs text-gray-600">Avoid the 5 costly mistakes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-2 mb-2 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-red-600 animate-pulse" />
            <p className="text-red-600 font-bold text-sm">
              Expires in {formatTime(timeLeft)}
            </p>
          </div>

        </div>
        
        {/* CTA Buttons - Fixed at bottom */}
        <div className="p-4 border-t bg-gray-50">
            <Link href={`/register?country=${country}&package=mastery`}>
              <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Yes! I Want to Save {countryPricing.currency}65,000 on My Import
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <button
              onClick={handleClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              No thanks, I'll risk losing {countryPricing.currency}45,000 in mistakes
            </button>
        </div>
      </div>
    </div>
  )
}