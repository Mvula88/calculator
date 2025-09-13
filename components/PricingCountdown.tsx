'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface PricingCountdownProps {
  currency: string
  mistakeOriginal: string
  masteryOriginal: string
}

export default function PricingCountdown({ currency, mistakeOriginal, masteryOriginal }: PricingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          // Reset to 24 hours when timer reaches 0
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-4 mb-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-4">
        <Clock className="h-6 w-6 animate-pulse" />
        <div className="text-center">
          <p className="text-sm font-medium mb-1">⚡ FLASH SALE ENDS IN ⚡</p>
          <div className="flex items-center gap-2 justify-center">
            <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
              <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs block">HOURS</span>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
              <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs block">MINS</span>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
              <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs block">SECS</span>
            </div>
          </div>
          <p className="text-xs mt-1 opacity-90">
            Prices increase to {currency}{mistakeOriginal} & {currency}{masteryOriginal} at midnight!
          </p>
        </div>
      </div>
    </div>
  )
}