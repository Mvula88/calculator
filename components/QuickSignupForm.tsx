'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Clock, 
  Star,
  Zap,
  Trophy
} from 'lucide-react'
import { Card } from '@/components/ui/card'

interface QuickSignupFormProps {
  country?: string
  variant?: 'default' | 'hero' | 'compact'
  primaryColor?: string
  secondaryColor?: string
}

export default function QuickSignupForm({ 
  country = 'na', 
  variant = 'default',
  primaryColor = 'purple-600',
  secondaryColor = 'blue-600' 
}: QuickSignupFormProps) {
  const [email, setEmail] = useState('')
  const [selectedTier] = useState<'mastery'>('mastery')
  const [loading, setLoading] = useState(false)

  const handleQuickSignup = async () => {
    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)

    // Redirect to register page with email and package pre-filled
    const params = new URLSearchParams({
      email: email,
      package: selectedTier,
      country: country
    })

    window.location.href = `/register?${params.toString()}`
  }

  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border-2 border-purple-200">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
          <span className="text-xs sm:text-sm font-bold text-gray-600">EXPERT IMPORT GUIDANCE</span>
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4">
          Start Your Import Journey Today
        </h3>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 sm:p-4 rounded-lg border-2 border-purple-200 mb-3 sm:mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-base sm:text-lg">Import Mastery</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Complete professional toolkit</div>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm font-bold text-gray-400 line-through">$79 USD</div>
              <div className="text-xl sm:text-2xl font-black text-purple-600">$49 USD</div>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-bold">
                ENDS OCT 5
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <Input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 sm:h-14 text-base sm:text-lg"
            required
          />

          <Button
            onClick={handleQuickSignup}
            disabled={!email || loading}
            className={`w-full h-12 sm:h-14 text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-${primaryColor} to-${secondaryColor} hover:opacity-90 active:scale-95 transition-all touch-manipulation`}
            size="lg"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Zap className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Get Instant Access Now
                <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
            <Shield className="h-3 w-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
            <Clock className="h-3 w-3" />
            <span>Instant</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
            <CheckCircle className="h-3 w-3" />
            <span>Support</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="bg-purple-100 rounded-full p-1.5 sm:p-2">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">Quick Start</h4>
            <p className="text-xs sm:text-sm text-gray-600">Start importing today</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-11 sm:h-auto"
          />
          <Button
            onClick={handleQuickSignup}
            disabled={!email || loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-11 sm:h-auto touch-manipulation active:scale-95 transition-transform"
          >
            Start →
          </Button>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-gray-100">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Get Instant Access</h3>
        <p className="text-sm sm:text-base text-gray-600">Choose your package and start saving today</p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 sm:p-6 rounded-lg border-2 border-purple-200 mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-bold inline-flex items-center gap-1 mb-2">
              <Star className="h-3 w-3" />
              BEST VALUE
            </span>
            <div className="font-bold text-lg sm:text-xl mb-1">Import Mastery</div>
            <div className="text-xs sm:text-sm text-gray-600">Complete professional toolkit</div>
          </div>
          <div className="text-right">
            <div className="text-base sm:text-xl lg:text-2xl font-bold text-gray-400 line-through">$79</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600">$49</div>
            <div className="text-xs sm:text-sm text-green-600 font-semibold">Ends Oct 5</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 sm:h-12"
          required
        />

        <Button
          onClick={handleQuickSignup}
          disabled={!email || loading}
          className="w-full h-11 sm:h-12 font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 transition-all touch-manipulation"
          size="lg"
        >
          {loading ? (
            'Processing...'
          ) : (
            <>
              Get Instant Access - $49 USD
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6">
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
          <Shield className="h-3 w-3" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
          <Clock className="h-3 w-3" />
          <span>Instant access</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
          <CheckCircle className="h-3 w-3" />
          <span>Lifetime updates</span>
        </div>
      </div>
    </div>
  )
}