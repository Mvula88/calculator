'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship, TrendingDown, Clock, Shield, Star, Lock, DollarSign } from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import HeaderCountrySelector from '@/components/HeaderCountrySelector'
import LoginHeader from '@/components/LoginHeader'

export default function NamibiaGuidePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<'mistake' | 'mastery'>('mistake')

  async function handleCheckout() {
    setLoading(true)
    try {
      // Save email to localStorage for thank-you page
      localStorage.setItem('checkout_email', email)
      
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'na', 
          tier: selectedTier,
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
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <LoginHeader country="na" />
      <CountrySelector />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">IMPOTA</div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Trusted by 12,000+ Importers</div>
              <HeaderCountrySelector />
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">WARNING: Walvis Bay Port Delays</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The N$45,000 Walvis Bay Mistake<br />
            That Traps Cars for Months
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the #1 documentation error that keeps vehicles stuck at port - 
            and the exact steps to clear in 5 days (proven on 38 imports)
          </p>
        </div>

        {/* Problem Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">N$800/day</p>
              <p className="text-sm text-gray-600">Storage fees accumulating</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">3-6 Weeks</p>
              <p className="text-sm text-gray-600">Average delay time</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">73%</p>
              <p className="text-sm text-gray-600">First-timers get stuck</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Problems */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Why Your Car Is Stuck (And Costing You N$800/Day)
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <Ship className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Missing Pre-Clearance Documents:</strong> One missing paper = 
                3-6 weeks delay + N$24,000 in storage fees
              </div>
            </div>
            
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Wrong HS Code Declaration:</strong> Incorrect classification = 
                40% higher duties + inspection delays
              </div>
            </div>
            
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Consignee Account Blocks:</strong> Shipping line holds = 
                Indefinite delays + mounting storage costs
              </div>
            </div>
          </div>
        </Card>

        {/* What You Get Preview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            What's Inside The Walvis Bay Import Guide:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              '5-Step Import Timeline with exact durations',
              'Interactive Cost Calculator (finds hidden fees)',
              '6 Real Mistakes that cost me N$45,000+',
              'Copy-paste email templates that work',
              'Emergency playbooks for crisis situations',
              'Consignee verification checklist',
              'Certified translator contact list',
              'Storage fee negotiation scripts',
              'Police & NATIS exact procedures',
              'Transit guides for Botswana & Zambia'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Locked Content Teaser */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/90 to-gray-100 z-10"></div>
            <Lock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-gray-400 z-20" />
            <div className="text-sm text-gray-500 blur-sm">
              <p className="font-semibold mb-2">🎯 Critical Insider Tip #1:</p>
              <p>The single most expensive mistake is [LOCKED CONTENT]. This one error alone 
              cost me N$11,000 and could have been avoided by simply [PURCHASE TO UNLOCK]...</p>
            </div>
          </div>
        </Card>

        {/* Package Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Choose Your Package</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mistake Guide */}
            <Card 
              className={`p-6 cursor-pointer transition-all ${
                selectedTier === 'mistake' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedTier('mistake')}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">📚 Mistake Guide</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">N$499</p>
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
                    <span>6 costly mistakes to avoid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Email templates & scripts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Emergency playbooks</span>
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
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">⭐ Import Mastery</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">N$2,999</p>
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
                    <span>Verified agent database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Container booking tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-orange-600 to-red-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get Instant Access - Stop the Storage Fees Today
            </h3>
            <p className="text-orange-100 mb-6">
              Join 12,847 successful importers • 30-day money-back guarantee
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
                className="w-full bg-white text-orange-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 
                  selectedTier === 'mistake' 
                    ? 'Get Mistake Guide for N$499'
                    : 'Get Import Mastery for N$2,999'
                }
              </Button>
              
              <p className="text-sm text-orange-100">
                🔒 Secure payment via Stripe • Instant portal access
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
                <DollarSign className="h-4 w-4" />
                <span>Save N$8,450 Average</span>
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
              "The consignee check template saved me from a N$15,000 mistake. 
              My container would have been stuck for weeks!"
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
              The emergency playbooks alone are worth 10x the price."
            </p>
            <p className="text-sm text-gray-500">— Sarah K., Swakopmund</p>
          </Card>
        </div>
        
        {/* Urgency */}
        <div className="mt-8 text-center">
          <p className="text-red-600 font-semibold">
            ⚠️ Every day of delay costs N$800 in storage fees. Get the guide now and save thousands.
          </p>
        </div>
      </div>
    </main>
  )
}