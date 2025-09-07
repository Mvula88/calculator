'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship, TrendingDown, Clock, Shield, MapPin, DollarSign } from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import HeaderCountrySelector from '@/components/HeaderCountrySelector'
import LoginHeader from '@/components/LoginHeader'

export default function ZambiaGuidePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'zm', 
          tier: 'mistake',
          productId: 'walvis-bay-guide',
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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <LoginHeader country="zm" />
      <CountrySelector />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">ImportCalc Pro</div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Trusted by 500+ Importers</div>
              <HeaderCountrySelector />
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
            <DollarSign className="h-5 w-5" />
            <span className="font-semibold">SAVE K45,000 Per Import</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Walvis Bay Saves Zambian<br />
            Importers K45,000+ Per Vehicle
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Skip expensive Durban fees and delays. Use Walvis Bay for faster clearance, 
            lower costs, and direct access via Katima Mulilo to Lusaka
          </p>
        </div>

        {/* Savings Comparison */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">K45,000</p>
              <p className="text-sm text-gray-600">Average savings per import</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">5 Days</p>
              <p className="text-sm text-gray-600">vs 3 weeks at Durban</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">Direct</p>
              <p className="text-sm text-gray-600">Route to Lusaka</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Benefits */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Why Walvis Bay Is Cheaper for Zambian Imports
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <DollarSign className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Lower Port Fees:</strong> K15,000 less in handling charges compared 
                to Durban's congested terminals and premium rates
              </div>
            </div>
            
            <div className="flex gap-3">
              <Clock className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Faster Clearance:</strong> 5-day processing vs 3+ weeks at Durban = 
                K20,000 saved in storage and demurrage fees
              </div>
            </div>
            
            <div className="flex gap-3">
              <MapPin className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Direct Transport:</strong> Katima Mulilo to Lusaka route saves 
                K10,000 in fuel and reduces transport time by 40%
              </div>
            </div>
            
            <div className="flex gap-3">
              <Shield className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Transparent Pricing:</strong> No hidden agent fees or "expediting" 
                charges that add K5,000-15,000 to your import costs
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Breakdown */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Complete Cost Breakdown: Durban vs Walvis Bay
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-600 mb-3">Durban Costs:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Port handling fees</span>
                  <span>K25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage (3+ weeks)</span>
                  <span>K30,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Agent commissions</span>
                  <span>K15,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport via SA</span>
                  <span>K18,000</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total Durban:</span>
                  <span>K88,000</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-green-600 mb-3">Walvis Bay Costs:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Port handling fees</span>
                  <span>K10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage (5 days)</span>
                  <span>K8,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Clearing agent</span>
                  <span>K7,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct transport</span>
                  <span>K18,000</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total Walvis Bay:</span>
                  <span>K43,000</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-700">
              You Save: K45,000 per vehicle
            </p>
          </div>
        </Card>

        {/* What You Get */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-emerald-50 to-white border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            What's Inside The Walvis Bay Guide for Zambia:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              'Namibia-Zambia customs procedures',
              'Katima Mulilo border crossing guide',
              'SADC trade agreement benefits',
              'Trusted Walvis Bay clearing agents',
              'Direct Lusaka transport contacts',
              'Kwacha exchange rate optimization',
              'ZRA duty calculation worksheets',
              'Vehicle registration in Zambia',
              'Road permit requirements for transport',
              'Emergency breakdown assistance contacts'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get the Walvis Bay Import Guide for Zambia
            </h3>
            <p className="text-emerald-100 mb-6">
              One-time payment • Instant access • 30-day guarantee
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
                className="w-full bg-white text-emerald-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get the Guide for K499'}
              </Button>
              
              <p className="text-sm text-emerald-100">
                Secure payment via Stripe • No hidden fees
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
            </div>
          </div>
        </Card>

        {/* Testimonials */}
        <div className="mt-12 space-y-4">
          <p className="text-center text-gray-600 italic">
            "Saved K52,000 on my Prado import by using Walvis Bay instead of Durban. 
            The guide made it so simple." - Moses C., Lusaka
          </p>
          <p className="text-center text-gray-600 italic">
            "The Katima Mulilo route was perfect. No delays, no hidden fees, 
            cleared customs in 4 days." - Grace M., Ndola
          </p>
        </div>
        
        {/* Urgency */}
        <div className="mt-8 text-center">
          <p className="text-red-600 font-semibold">
            Durban port delays are increasing costs. Start saving K45,000 per import now.
          </p>
        </div>
      </div>
    </main>
  )
}