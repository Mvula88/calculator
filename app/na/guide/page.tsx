'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship, TrendingDown, Clock, Shield, Star, Lock, DollarSign, Users, Calculator, FileText, Phone, Award, ArrowRight, Zap, Target } from 'lucide-react'
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
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-1.5 rounded-lg">
                <Ship className="h-5 w-5 text-white" />
              </div>
              <div className="font-bold text-xl">IMPOTA</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Trusted by 12,000+ Importers</div>
              <HeaderCountrySelector />
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
            <Zap className="h-5 w-5" />
            <span className="font-semibold">DIY IMPORT GUIDE</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stop Paying Dealers to Do<br />
            What YOU Can Do Yourself
          </h1>
          
          <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
            THE TRUTH: Importing Is NOT Complicated.<br />
            The "Secret"? There IS No Secret.<br />
            Just Simple Steps Dealers Don't Want You to Learn.
          </p>
          
          <p className="text-2xl font-bold text-green-600 mb-8">
            Save N$30,000 to N$100,000. Every Single Time.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600">4.9/5 from 847 verified importers</p>
            </div>
          </div>
        </div>

        {/* What Our Guide Shows You */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">OUR GUIDE SHOWS YOU EXACTLY HOW TO:</h2>
          <p className="text-center text-gray-600 mb-3">No Prior Knowledge Required. No Agent Needed. No Dealer Markup.</p>
          <p className="text-center text-red-600 font-semibold mb-10">
            Avoid Costly Mistakes That Can Cost You Your Car or N$100,000+
          </p>
          
          {/* Step by Step Process */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-lg">Find cars on Japan auction sites</strong>
                  <p className="text-gray-600">Step-by-step screenshots of actual auction sites</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-lg">Calculate total costs BEFORE buying</strong>
                  <p className="text-gray-600">Duty calculator included - know your exact total</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-lg">Arrange shipping yourself</strong>
                  <p className="text-gray-600">Which companies to use, exact costs to expect</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-lg">Clear customs at Walvis Bay</strong>
                  <p className="text-gray-600">Every form explained, every office location</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-lg">Register your car in Namibia</strong>
                  <p className="text-gray-600">Complete checklist from police clearance to plates</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
              <p className="text-lg font-semibold mb-2">Just Follow Our Step-by-Step Instructions.</p>
              <p className="text-2xl font-bold text-green-600">12,847 People Already Did It. 60 Days Start to Finish.</p>
              <p className="text-xl font-bold text-blue-600 mt-2">Your Turn to Save N$100,000 →</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Mistake Guide */}
            <Card className="p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Mistake Avoidance Guide</h3>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  N$499
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">55-Page Battle-Tested Playbook</strong>
                    <p className="text-xs text-gray-600">Every mistake I made so you don't have to</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Walvis Bay Insider Tactics</strong>
                    <p className="text-xs text-gray-600">Exactly who to call, what to say, when to act</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Real Cost Breakdowns</strong>
                    <p className="text-xs text-gray-600">See actual invoices from 50+ imports</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Emergency Playbooks</strong>
                    <p className="text-xs text-gray-600">When things go wrong (they will), do this</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setSelectedTier('mistake')}
                variant={selectedTier === 'mistake' ? 'default' : 'outline'}
                className="w-full"
              >
                {selectedTier === 'mistake' ? 'Selected' : 'Select This Package'}
              </Button>
            </Card>

            {/* Mastery Package */}
            <Card className="p-6 border-2 border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Import Mastery Suite</h3>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  N$1,999
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Everything in Mistake Guide</strong>
                    <p className="text-xs text-gray-600">Plus these power tools:</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Live Duty Calculator</strong>
                    <p className="text-xs text-gray-600">Know exact costs before you buy (saves N$15,000+)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Container Sharing Network</strong>
                    <p className="text-xs text-gray-600">Split costs with verified importers (saves N$25,000)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Verified Agent Directory</strong>
                    <p className="text-xs text-gray-600">Pre-negotiated rates, proven track records</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">WhatsApp Support Group</strong>
                    <p className="text-xs text-gray-600">Get help from successful importers in real-time</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setSelectedTier('mastery')}
                variant={selectedTier === 'mastery' ? 'default' : 'outline'}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {selectedTier === 'mastery' ? 'Selected (Save N$500 Today)' : 'Select This Package - Save N$500'}
              </Button>
            </Card>
          </div>
        </div>

        {/* Real Results Section */}
        <div className="mb-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Real Results from Real People</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-3 italic">
                "The duty calculator alone saved me N$18,000 on my Toyota Hilux. 
                I was about to pay for the wrong HS code."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">Johannes M.</p>
                  <p className="text-xs text-gray-500">Imported: 2019 Hilux</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-3 italic">
                "Found 2 people to share my container through IMPOTA. 
                Split the N$45,000 cost three ways. Game changer!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">Sarah K.</p>
                  <p className="text-xs text-gray-500">Imported: 2018 RAV4</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-3 italic">
                "The emergency playbook saved my car when customs held it. 
                Knew exactly what to do. Released in 3 days."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">David N.</p>
                  <p className="text-xs text-gray-500">Imported: 2020 Corolla</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-orange-600">N$8,450</p>
              <p className="text-sm text-gray-600">Avg. Saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">14 days</p>
              <p className="text-sm text-gray-600">Avg. Clear Time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">98.7%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">12,847</p>
              <p className="text-sm text-gray-600">Cars Imported</p>
            </div>
          </div>
        </div>

        {/* The Truth Section */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-red-50 to-orange-50 border-orange-200">
            <h2 className="text-2xl font-bold mb-6">The Truth About Importing</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-red-700">❌ What Others Won't Tell You:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Agents mark up costs by 30-50% (you won't know)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Wrong paperwork = N$600/day storage fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>One wrong VIN digit = indefinite customs hold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Container sharing gone wrong = you pay full N$45,000</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-green-700">✅ What IMPOTA Gives You:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Exact agent rates (we mystery-shopped 50+ agents)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Document templates that pass inspection first time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>VIN verification checklist (never get held up)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Legal container sharing agreements (bulletproof)</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Purchase Section */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Ready to Import Smarter?</h2>
              <p className="text-lg opacity-90">Join 12,000+ successful importers using IMPOTA</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white/90">
                  Enter your email to get instant access:
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-gray-900"
                  required
                />
              </div>
              
              <Button 
                onClick={handleCheckout}
                disabled={loading || !email}
                size="lg"
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold"
              >
                {loading ? 'Processing...' : (
                  <>
                    Get Instant Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              
              <div className="mt-6 space-y-2 text-center">
                <p className="text-sm opacity-90">
                  ✓ Instant download after payment
                </p>
                <p className="text-sm opacity-90">
                  ✓ 30-day money-back guarantee
                </p>
                <p className="text-sm opacity-90">
                  ✓ Lifetime updates included
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Questions? We've Got Answers</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Is this legal?</h3>
              <p className="text-sm text-gray-600">
                100% legal. We share public information and personal experience. 
                No insider trading, no bribes, no shortcuts. Just smart importing.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">How current is the information?</h3>
              <p className="text-sm text-gray-600">
                Updated monthly. Last update: January 2025. We track regulation changes, 
                port fee updates, and new requirements. You get lifetime updates.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">What if it doesn't work for me?</h3>
              <p className="text-sm text-gray-600">
                30-day money-back guarantee. If you follow the guide and don't save 
                at least N$5,000 on your import, we'll refund you. No questions.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Can I share this with friends?</h3>
              <p className="text-sm text-gray-600">
                No. This is licensed to you personally. We track sharing and will 
                revoke access. Your friends can get their own access - it pays for itself.
              </p>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Limited Time: Save N$500 on Mastery Package</span>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            Your First Import Mistake<br />
            Could Cost You N$45,000
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            IMPOTA costs less than 1% of that. One tip pays for everything.
            12,000+ importers started here. Your turn.
          </p>
          
          <Button 
            onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            Yes, I Want to Import Smarter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  )
}