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
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 shadow-2xl border-2 border-purple-200">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-bold text-gray-600">EXPERT IMPORT GUIDANCE</span>
          <Trophy className="h-5 w-5 text-yellow-500" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-black text-center mb-4">
          Start Your Import Journey Today
        </h3>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-2 border-purple-200 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">Import Mastery</div>
              <div className="text-xs text-gray-600">Complete professional toolkit</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-400 line-through">N$2,999</div>
              <div className="text-2xl font-black text-purple-600">N$1,499</div>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                SAVE 50%
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 text-lg"
            required
          />
          
          <Button 
            onClick={handleQuickSignup}
            disabled={!email || loading}
            className={`w-full h-14 text-lg font-bold bg-gradient-to-r from-${primaryColor} to-${secondaryColor} hover:opacity-90 transform hover:scale-105 transition-all`}
            size="lg"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Get Instant Access Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Shield className="h-3 w-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="h-3 w-3" />
            <span>Instant</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <CheckCircle className="h-3 w-3" />
            <span>Support</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 rounded-full p-2">
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-bold">Quick Start</h4>
            <p className="text-sm text-gray-600">Start importing today</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleQuickSignup}
            disabled={!email || loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Start →
          </Button>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Get Instant Access</h3>
        <p className="text-gray-600">Choose your package and start saving today</p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold inline-flex items-center gap-1 mb-2">
              <Star className="h-3 w-3" />
              BEST VALUE
            </span>
            <div className="font-bold text-xl mb-1">Import Mastery</div>
            <div className="text-sm text-gray-600">Complete professional toolkit</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-400 line-through">N$2,999</div>
            <div className="text-3xl font-black text-purple-600">N$1,499</div>
            <div className="text-sm text-green-600 font-semibold">Save 50%</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
          required
        />
        
        <Button 
          onClick={handleQuickSignup}
          disabled={!email || loading}
          className="w-full h-12 font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="lg"
        >
          {loading ? (
            'Processing...'
          ) : (
            <>
              Get Instant Access - N$1,499
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Shield className="h-3 w-3" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="h-3 w-3" />
          <span>Instant access</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <CheckCircle className="h-3 w-3" />
          <span>Lifetime updates</span>
        </div>
      </div>
    </div>
  )
}