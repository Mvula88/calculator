'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, X, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface FloatingSignupButtonProps {
  country?: string
}

export default function FloatingSignupButton({ country = 'na' }: FloatingSignupButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPulse, setShowPulse] = useState(true)

  useEffect(() => {
    // Auto-expand after 5 seconds
    const timer = setTimeout(() => {
      setIsExpanded(true)
      setShowPulse(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Pulse every 10 seconds if not expanded
    if (!isExpanded) {
      const interval = setInterval(() => {
        setShowPulse(true)
        setTimeout(() => setShowPulse(false), 3000)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isExpanded])

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all ${
              showPulse ? 'animate-pulse' : ''
            }`}
          >
            <Sparkles className="h-6 w-6" />
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border-2 border-purple-200 animate-slide-up">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">Save N$50,000+</h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn to import cars yourself and skip dealer markups
              </p>
              <Link href={`/${country}/guide#signup`}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-gray-500 mt-3">
                Join 12,847+ successful importers
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Floating CTA */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-2xl p-6 w-80">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Ready to Import?</h3>
              <p className="text-sm text-white/90 mb-4">
                Get instant access to our complete import guide and save thousands
              </p>
              <Link href={`/${country}/guide#signup`}>
                <Button 
                  size="sm"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold"
                >
                  Start Saving Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}