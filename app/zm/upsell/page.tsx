'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Star, ArrowRight, Clock, Shield, TrendingUp, DollarSign, Mail } from 'lucide-react'

export default function ZambiaUpsellPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)

  useEffect(() => {
    // Try to get email from localStorage (saved during initial purchase)
    const savedEmail = localStorage.getItem('checkout_email')
    if (savedEmail) {
      setEmail(savedEmail)
    } else {
      setShowEmailInput(true)
    }
  }, [])

  async function handleUpgrade() {
    if (!email) {
      setShowEmailInput(true)
      alert('Please enter your email address')
      return
    }
    
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'zm', 
          tier: 'mastery',
          productId: 'import-mastery-zm',
          email: email,
          isUpgrade: true  // Flag this as an upgrade
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
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">ImportCalc Pro</div>
            <div className="text-sm text-gray-600">Upgrade Available</div>
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
            <DollarSign className="h-5 w-5" />
            <span className="font-semibold">UPGRADE TO IMPORT MASTERY</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unlock Maximum Savings<br />
            with Import Mastery
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're already saving with Walvis Bay. Now discover the advanced 
            strategies that can save you thousands per vehicle import to Zambia.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Basic Guide */}
          <Card className="p-6 border-2 border-gray-200">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-600">You Have:</h3>
              <p className="text-2xl font-bold">Walvis Bay Guide</p>
              <p className="text-green-600 font-semibold">Saves K45,000</p>
            </div>
            <div className="space-y-2">
              {[
                'Port clearance procedures',
                'Basic cost breakdown',
                'Katima Mulilo route guide',
                'Clearing agent contacts'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Mastery Upgrade */}
          <Card className="p-6 border-2 border-green-500 bg-gradient-to-br from-green-50 to-white">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-green-600">Upgrade To:</h3>
              <p className="text-2xl font-bold text-green-700">Import Mastery</p>
              <p className="text-green-600 font-semibold">Saves K75,000+</p>
              <div className="flex justify-center">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                'Everything in Basic Guide',
                'Japan auction house mastery',
                'Advanced duty minimization',
                'Bulk shipping strategies',
                'ZRA insider connections',
                'Vehicle resale strategies',
                'Insurance claim optimization',
                'Emergency resolution protocols'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Advanced Savings Breakdown */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Additional Savings with Mastery:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span>Auction bidding strategies</span>
                <span className="font-bold text-green-600">K15,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span>Duty optimization techniques</span>
                <span className="font-bold text-green-600">K8,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span>Bulk shipping discounts</span>
                <span className="font-bold text-green-600">K5,000</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span>Insurance negotiation</span>
                <span className="font-bold text-green-600">K4,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span>ZRA fast-track fees avoided</span>
                <span className="font-bold text-green-600">K3,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span>Vehicle condition assessment</span>
                <span className="font-bold text-green-600">K10,000</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-700">
              Total Savings: Thousands per vehicle
            </p>
          </div>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center border-0 shadow-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Save thousands</h3>
            <p className="text-sm text-gray-600">
              Advanced strategies for maximum cost reduction
            </p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-lg">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">3x Faster</h3>
            <p className="text-sm text-gray-600">
              VIP processing and priority handling
            </p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-lg">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Risk Elimination</h3>
            <p className="text-sm text-gray-600">
              Advanced problem prevention strategies
            </p>
          </Card>
        </div>

        {/* Exclusive Content */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Exclusive Mastery Content for Zambia:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Live auction bidding for Japanese imports',
              'ZRA duty calculator and optimization tricks',
              'Bulk container sharing networks',
              'Vehicle condition assessment from photos',
              'Lusaka dealer network and flip strategies',
              'Kwacha hedging for currency protection',
              'Emergency customs resolution protocols',
              'VIP agent network with priority service',
              'Monthly market trend reports',
              'Private WhatsApp group for Zambian importers'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Upgrade Now - Limited Time
            </h3>
            <div className="text-2xl font-bold mb-2">
              <span>K2,000</span>
            </div>
            <p className="text-green-100 mb-6">
              Lifetime access & updates
            </p>
            
            <div className="max-w-md mx-auto space-y-4">
              {showEmailInput && (
                <div className="mb-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white text-gray-900"
                      required
                    />
                  </div>
                  <p className="text-xs mt-2 text-green-100">
                    Use the same email from your initial purchase
                  </p>
                </div>
              )}
              
              {!showEmailInput && (
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-gray-900"
                  required
                />
              )}
              
              <Button 
                onClick={handleUpgrade}
                disabled={loading || !email}
                size="lg"
                className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold"
              >
                {loading ? 'Processing...' : (
                  <span className="flex items-center gap-2">
                    Upgrade to Mastery for K2,000
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <p className="text-sm text-green-100">
                Secure payment • Instant access • Lifetime access & updates
              </p>
            </div>
          </div>
        </Card>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic mb-4">
            "The Mastery upgrade helped me import successfully on my first Land Cruiser import. 
            The auction strategies and ZRA tips are gold." - Patrick L., Lusaka
          </p>
          <div className="flex justify-center mb-2">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-500">4.9/5 from 94 Zambian importers</p>
        </div>
      </div>
    </main>
  )
}