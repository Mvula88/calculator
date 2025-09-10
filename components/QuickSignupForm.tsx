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
  const [selectedTier, setSelectedTier] = useState<'mistake' | 'mastery'>('mastery')
  const [loading, setLoading] = useState(false)

  const handleQuickSignup = async () => {
    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)
    try {
      localStorage.setItem('checkout_email', email)
      
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country, 
          tier: selectedTier,
          productId: 'import-guide',
          email
        })
      })
      
      const { url, error } = await res.json()
      
      if (error) {
        alert(`Error: ${error}`)
        return
      }
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout')
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-8 shadow-2xl border-2 border-purple-200">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-bold text-gray-600">12,847+ SUCCESSFUL IMPORTERS</span>
          <Trophy className="h-5 w-5 text-yellow-500" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-black text-center mb-4">
          Start Saving N$50,000+ Today
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={() => setSelectedTier('mistake')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              selectedTier === 'mistake' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-bold">Mistake Guide</div>
            <div className="text-2xl font-black text-blue-600">N$499</div>
            <div className="text-xs text-gray-600">Perfect start</div>
          </button>
          
          <button
            onClick={() => setSelectedTier('mastery')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all relative ${
              selectedTier === 'mastery' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                SAVE N$500
              </span>
            </div>
            <div className="font-bold">Import Mastery</div>
            <div className="text-2xl font-black text-purple-600">N$1,999</div>
            <div className="text-xs text-gray-600">Complete toolkit</div>
          </button>
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
            <span>Guaranteed</span>
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
            <p className="text-sm text-gray-600">Join 12,847+ importers</p>
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
      
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSelectedTier('mistake')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTier === 'mistake' 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="font-bold mb-1">Mistake Guide</div>
          <div className="text-3xl font-black text-blue-600 mb-1">N$499</div>
          <div className="text-sm text-gray-600">Essential import guide</div>
          {selectedTier === 'mistake' && (
            <div className="mt-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mx-auto" />
            </div>
          )}
        </button>
        
        <button
          onClick={() => setSelectedTier('mastery')}
          className={`p-4 rounded-lg border-2 transition-all relative ${
            selectedTier === 'mastery' 
              ? 'border-purple-500 bg-purple-50 scale-105' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="absolute -top-3 right-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
              <Star className="h-3 w-3" />
              POPULAR
            </span>
          </div>
          <div className="font-bold mb-1">Import Mastery</div>
          <div className="text-3xl font-black text-purple-600 mb-1">N$1,999</div>
          <div className="text-sm text-gray-600">Complete professional toolkit</div>
          {selectedTier === 'mastery' && (
            <div className="mt-2">
              <CheckCircle className="h-5 w-5 text-purple-600 mx-auto" />
            </div>
          )}
        </button>
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
              Get Instant Access - {selectedTier === 'mastery' ? 'N$1,999' : 'N$499'}
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