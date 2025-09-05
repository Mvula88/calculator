'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship, TrendingDown, Clock, Shield } from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import HeaderCountrySelector from '@/components/HeaderCountrySelector'

export default function SouthAfricaGuidePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'za', 
          tier: 'mistake',
          productId: 'durban-guide',
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
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">WARNING: Durban Port Congestion</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The R65,000 Durban Port Mistake<br />
            That Delays Cars for Weeks
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn the critical SARS compliance error that causes 80% of import delays - 
            and the exact process to clear in 5 days
          </p>
        </div>

        {/* Problem Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">R1,200/day</p>
              <p className="text-sm text-gray-600">Storage fees at Durban</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">4 Weeks</p>
              <p className="text-sm text-gray-600">Average SARS delay</p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">100%</p>
              <p className="text-sm text-gray-600">Duty penalty risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Problems */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Why Durban Port Is Different (And More Expensive)
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <Ship className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>SARS RLA Requirements:</strong> Missing Letter of Authority = 
                4-week delay + R1,200/day storage
              </div>
            </div>
            
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>ITAC Permit Confusion:</strong> Wrong permit category = 
                100% duty penalty + possible seizure
              </div>
            </div>
            
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Transnet Delays:</strong> Peak season backlogs add 
                2-3 weeks + demurrage charges
              </div>
            </div>
          </div>
        </Card>

        {/* What You Get */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            What's Inside the Durban Guide:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              'SARS DA304 form completion walkthrough',
              'ITAC permit fast-track process',
              'Durban terminal gate pass shortcuts',
              'Approved clearing agent contact list',
              'Transnet booking system hacks',
              'Weekend collection procedures',
              'Duty calculation spreadsheet',
              'Emergency escalation contacts',
              'Crime prevention strategies',
              'Vehicle security protocols'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get the Durban Port Import Guide
            </h3>
            <p className="text-green-100 mb-6">
              One-time payment • Instant download • 30-day guarantee
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
                className="w-full bg-white text-green-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get the Guide for R499'}
              </Button>
              
              <p className="text-sm text-green-100">
                🔒 Secure payment via Stripe • VAT included
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
            "Saved me R45,000 in storage fees by showing exactly how to expedite 
            SARS clearance. Got my Hilux in 6 days!" - Themba K., Johannesburg
          </p>
          <p className="text-center text-gray-600 italic">
            "The ITAC permit section alone saved me from a R120,000 penalty. 
            Worth every cent." - Priya N., Cape Town
          </p>
        </div>
        
        {/* Urgency */}
        <div className="mt-8 text-center">
          <p className="text-red-600 font-semibold">
            ⚠️ Durban port congestion is at an all-time high. Get the guide before your car arrives.
          </p>
        </div>
      </div>
    </main>
  )
}