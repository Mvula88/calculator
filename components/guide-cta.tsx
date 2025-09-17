'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CheckCircle, Shield, Star, TrendingUp } from 'lucide-react'

interface GuideCTAProps {
  country: string
  mistakePrice: string
  masteryPrice: string
}

export default function GuideCTA({ country, mistakePrice, masteryPrice }: GuideCTAProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<'mistake' | 'mastery'>('mistake')

  const countryCode = country.toLowerCase() === 'namibia' ? 'na' : 
                      country.toLowerCase() === 'south africa' ? 'za' :
                      country.toLowerCase() === 'botswana' ? 'bw' : 
                      country.toLowerCase() === 'zambia' ? 'zm' : 'na'

  async function handleCheckout() {
    setLoading(true)
    try {
      localStorage.setItem('checkout_email', email)
      
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: countryCode, 
          tier: selectedTier,
          productId: `${countryCode}-guide`,
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

  return (
    <div className="my-16">
      {/* Package Selection */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Package</h2>
        <p className="text-gray-600">Get instant access to proven import strategies</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Mistake Guide */}
        <Card 
          className={`p-6 cursor-pointer transition-all ${
            selectedTier === 'mistake' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => setSelectedTier('mistake')}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">📚 Mistake Guide</h3>
            <p className="text-3xl font-bold text-blue-600 mb-2">{mistakePrice}</p>
            <p className="text-sm text-gray-600 mb-4">One-time payment</p>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Complete import timeline</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Cost breakdown calculator</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Mistake avoidance guide</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Email templates</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Import Mastery */}
        <Card 
          className={`p-6 cursor-pointer transition-all relative ${
            selectedTier === 'mastery' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
          }`}
          onClick={() => setSelectedTier('mastery')}
        >
          <div className="absolute -top-3 right-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
              BEST VALUE
            </span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">⭐ Import Mastery</h3>
            <p className="text-3xl font-bold text-purple-600 mb-2">{masteryPrice}</p>
            <p className="text-sm text-gray-600 mb-4">One-time payment</p>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span className="font-semibold">Everything in Mistake Guide</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Live duty calculator</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Verified agent contacts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Container booking system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Emergency support hotline</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Purchase Form */}
      <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Get Instant Access
          </h3>
          <p className="text-blue-100 mb-6">
            Pay now → Create account after → Access portal
          </p>

          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-gray-900"
              required
            />

            <Button
              onClick={handleCheckout}
              disabled={loading || !email}
              size="lg"
              className="w-full bg-white text-blue-600 hover:bg-gray-100"
            >
              {loading ? 'Processing...' :
                selectedTier === 'mistake'
                  ? `Proceed to Checkout - ${mistakePrice}`
                  : `Proceed to Checkout - ${masteryPrice}`
              }
            </Button>

            <p className="text-sm text-blue-100">
              🔒 Secure payment via Stripe • No account needed yet
            </p>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Real Import Experience, Real Guidance</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Testimonials */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-700 italic mb-2">
            "The consignee check template alone saved me from a N$15,000 mistake. 
            Worth every cent!"
          </p>
          <p className="text-sm text-gray-500">— Johan M., Windhoek</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-700 italic mb-2">
            "Cleared my Hilux in 5 days instead of the quoted 3 weeks. 
            The emergency playbooks are gold!"
          </p>
          <p className="text-sm text-gray-500">— Sarah K., Cape Town</p>
        </Card>
      </div>
    </div>
  )
}