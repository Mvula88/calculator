'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Shield, Star, TrendingUp, Loader2 } from 'lucide-react'

export default function PackagesPage() {
  const [selectedTier, setSelectedTier] = useState<'mistake' | 'mastery'>('mistake')
  const [loading, setLoading] = useState(false)

  // Default to Namibia pricing
  const mistakePrice = 'N$499'
  const masteryPrice = 'N$2,999'

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: 'na',
          tier: selectedTier,
          productId: `na-guide`
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold mb-4">Choose Your Package</h1>
          <p className="text-xl text-gray-600">Get instant access to proven import strategies</p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
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
                  <span>Avoid costly importing mistakes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Step-by-step import process</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Real import documents examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Common pitfalls to avoid</span>
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
            <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
              POPULAR
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">🎯 Import Mastery</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">{masteryPrice}</p>
              <p className="text-sm text-gray-600 mb-4">Lifetime access</p>
              <ul className="text-left space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Mistake Guide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Live duty calculator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Japan auction guide</span>
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
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Checkout Button */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white max-w-md mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-blue-100 mb-6">
              Click below to pay securely with Stripe
            </p>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              size="lg"
              className="w-full bg-white text-blue-600 hover:bg-gray-100"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting to Stripe...
                </>
              ) : (
                selectedTier === 'mistake'
                  ? `Pay ${mistakePrice} - Mistake Guide`
                  : `Pay ${masteryPrice} - Import Mastery`
              )}
            </Button>

            <p className="text-sm text-blue-100 mt-4">
              🔒 Secure checkout • Create account after payment
            </p>
          </div>
        </Card>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>500+ Happy Importers</span>
          </div>
        </div>
      </div>
    </div>
  )
}