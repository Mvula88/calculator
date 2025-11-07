'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface PricingCountdownProps {
  endDate?: string // ISO date string, defaults to October 31, 2025
}

export default function PricingCountdown({ endDate = '2025-11-30T23:59:59' }: PricingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(endDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true
        })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false
      })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (timeLeft.expired) {
    return (
      <div className="inline-flex items-center gap-2 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg">
        <Clock className="h-4 w-4" />
        <span className="font-semibold text-sm">Sale Ended</span>
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Clock className="h-4 w-4 text-orange-500" />
        <span>Ends in:</span>
      </div>
      <div className="flex gap-2">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg min-w-[60px]">
            <span className="text-2xl font-bold">{timeLeft.days}</span>
            <span className="text-xs uppercase">Day{timeLeft.days !== 1 ? 's' : ''}</span>
          </div>
        )}
        <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-xs uppercase">Hours</span>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-xs uppercase">Mins</span>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-br from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg min-w-[60px]">
          <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-xs uppercase">Secs</span>
        </div>
      </div>
    </div>
  )
}
