'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Star, ArrowRight, Clock, Shield, TrendingUp, Mail } from 'lucide-react'

export default function BotswanaUpsellPage() {
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
          country: 'bw', 
          tier: 'mastery',
          productId: 'import-mastery-bw',
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
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Star className="h-5 w-5" />
            <span className="font-semibold">UPGRADE TO IMPORT MASTERY</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upgrade to Import Mastery
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Go beyond the basics. Master the complete import process from 
            Japan to Botswana with advanced strategies and insider secrets.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Basic Guide */}
          <Card className="p-6 border-2 border-gray-200">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-600">You Have:</h3>
              <p className="text-2xl font-bold">Walvis Bay Guide</p>
            </div>
            <div className="space-y-2">
              {[
                'Port clearance procedures',
                'Basic documentation checklist',
                'Clearing agent contacts',
                'Trans-Kalahari route guide'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Mastery Upgrade */}
          <Card className="p-6 border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-white">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-purple-600">Upgrade To:</h3>
              <p className="text-2xl font-bold text-purple-700">Import Mastery</p>
              <div className="flex justify-center">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                'Everything in Basic Guide',
                'Japan auction house strategies',
                'Vehicle inspection shortcuts',
                'Financing & insurance optimization',
                'Tax minimization techniques',
                'VIP clearing agent network',
                'Emergency problem resolution',
                'Business strategies for dealers'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-purple-700">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center border-0 shadow-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Save thousands</h3>
            <p className="text-sm text-gray-600">
              Advanced tax strategies and agent negotiations
            </p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-lg">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">50% Faster</h3>
            <p className="text-sm text-gray-600">
              VIP connections and priority processing
            </p>
          </Card>
          
          <Card className="p-6 text-center border-0 shadow-lg">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Lifetime Value</h3>
            <p className="text-sm text-gray-600">
              Lifetime access & updates
            </p>
          </Card>
        </div>

        {/* Exclusive Content */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Exclusive Mastery Content:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Live auction bidding strategies for USS & TAA',
              'Vehicle condition assessment from photos',
              'Financing deals with Botswana banks',
              'Insurance claims and damage protection',
              'SACU duty optimization for dealers',
              'Gaborone registration fast-track system',
              'Cost analysis tools for resellers',
              'Emergency 24/7 support hotline access',
              'Quarterly market updates and trends',
              'Private WhatsApp group with experts'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Upgrade Now - Limited Time
            </h3>
            <div className="text-2xl font-bold mb-2">
              <span>P1,618</span>
            </div>
            <p className="text-purple-100 mb-6">
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
                  <p className="text-xs mt-2 text-purple-100">
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
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold"
              >
                {loading ? 'Processing...' : (
                  <span className="flex items-center gap-2">
                    Upgrade to Mastery for P1,618
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <p className="text-sm text-purple-100">
                Secure payment • Instant access • Lifetime access & updates
              </p>
            </div>
          </div>
        </Card>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic mb-4">
            "The Mastery upgrade paid for itself on my first import. The auction 
            strategies made a significant difference in my costs." - Keabetswe M., Gaborone
          </p>
          <div className="flex justify-center">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">4.9/5 from 127 reviews</p>
        </div>
      </div>
    </main>
  )
}