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
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
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
            <h2 className="text-2xl font-bold">WAIT! You're About to Miss This Forever!</h2>
          </div>
          <p className="text-lg">These exclusive bonuses expire when you leave...</p>
        </div>

        {/* Content */}
        <div className="p-6 -mt-4">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
            <p className="text-2xl font-black text-center mb-2">
              🎁 3 EXCLUSIVE BONUSES
            </p>
            <p className="text-center text-gray-700 font-semibold">
              Worth {countryPricing.currency}2,500+ (Not Sold Separately)
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚫</span>
              <div>
                <p className="font-bold text-red-600">BONUS #1: WhatsApp VIP Group Access</p>
                <p className="text-sm text-gray-600">Direct access to successful importers & instant answers (Worth {countryPricing.currency}999)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚫</span>
              <div>
                <p className="font-bold text-red-600">BONUS #2: Verified Agent Black Book</p>
                <p className="text-sm text-gray-600">Our private list of 23 trusted agents with negotiated rates (Worth {countryPricing.currency}799)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚫</span>
              <div>
                <p className="font-bold text-red-600">BONUS #3: 1-on-1 Import Review Call</p>
                <p className="text-sm text-gray-600">30-min personal consultation for your first import (Worth {countryPricing.currency}750)</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-700 font-medium text-center">
              ⚠️ These bonuses are ONLY available right now. Once you leave, they're gone forever.
            </p>
          </div>

          {/* Timer */}
          <div className="bg-red-50 rounded-lg p-3 mb-6 flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-red-600 animate-pulse" />
            <p className="text-red-600 font-bold">
              Bonuses disappear in {formatTime(timeLeft)}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href={`/register?country=${country}&package=mastery&bonuses=vip`}>
              <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Yes! Lock In My Bonuses Now
                <Gift className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <button
              onClick={handleClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              No thanks, I'll figure it out alone without help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}