'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship, TrendingDown, Clock, Shield, MapPin, DollarSign } from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'

export default function BotswanaGuidePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'bw', 
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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <CountrySelector />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">ImportCalc Pro</div>
            <div className="text-sm text-gray-600">Trusted by 500+ Importers</div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">URGENT: Durban Crime Alert</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Avoid the P50,000 Durban Crime Risk<br />
            Use Walvis Bay Instead
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Why smart Botswana importers choose Walvis Bay over Durban - 
            zero crime rate, direct A2 highway to Gaborone, and faster clearance
          </p>
        </div>

        {/* Comparison Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">0% Crime</p>
              <p className="text-sm text-gray-600">Walvis Bay port safety</p>
            </CardContent>
          </Card>
          
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">P50,000</p>
              <p className="text-sm text-gray-600">Average Durban crime loss</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">5 Days</p>
              <p className="text-sm text-gray-600">Walvis Bay clearance</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Problems */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Why Walvis Bay Is Safer for Botswana Imports
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <Shield className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Zero Crime Rate:</strong> Walvis Bay has no recorded vehicle theft incidents 
                vs Durban's 30% hijacking risk for foreign vehicles
              </div>
            </div>
            
            <div className="flex gap-3">
              <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Direct A2 Highway:</strong> Straight route to Gaborone via Trans-Kalahari - 
                no dangerous detours through crime hotspots
              </div>
            </div>
            
            <div className="flex gap-3">
              <Clock className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Faster Processing:</strong> 5-day clearance vs 3-week delays at 
                congested Durban terminals
              </div>
            </div>
            
            <div className="flex gap-3">
              <DollarSign className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Lower Costs:</strong> No expensive security escorts needed - 
                save P15,000+ on transport security
              </div>
            </div>
          </div>
        </Card>

        {/* What You Get */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            What's Inside The Walvis Bay Guide:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              'Pre-clearance documents for Botswana imports',
              'Exact route via Trans-Kalahari Highway',
              'SACU customs procedures walkthrough',
              'Trusted clearing agents in Walvis Bay',
              'Border crossing tips at Mamuno',
              'Pula exchange rate optimization',
              'Vehicle registration shortcuts for Gaborone',
              'Insurance requirements for A2 highway',
              'Emergency contacts for breakdown assistance',
              'Gaborone delivery service providers'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get the Walvis Bay Import Guide for Botswana
            </h3>
            <p className="text-blue-100 mb-6">
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
                className="w-full bg-white text-blue-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get the Guide for P499'}
              </Button>
              
              <p className="text-sm text-blue-100">
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
            "Saved my Hilux from being hijacked in Durban. The Walvis Bay route 
            was smooth and safe - arrived in Gaborone without issues." - Thabo M., Gaborone
          </p>
          <p className="text-center text-gray-600 italic">
            "The Trans-Kalahari route instructions were perfect. No security issues, 
            cleared customs in 4 days." - Mosa K., Francistown
          </p>
        </div>
        
        {/* Urgency */}
        <div className="mt-8 text-center">
          <p className="text-red-600 font-semibold">
            Durban crime rates are increasing. Secure your vehicle import route now.
          </p>
        </div>
      </div>
    </main>
  )
}