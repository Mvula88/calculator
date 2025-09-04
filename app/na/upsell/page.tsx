'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calculator, Users, FileText, TrendingUp, Star } from 'lucide-react'

export default function NamibiaUpsellPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'na', 
          tier: 'mastery',
          productId: 'import-mastery-na' 
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
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            COMPLETE IMPORT SYSTEM
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Import Mastery + Live Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The complete system for importing vehicles through Walvis Bay - 
            with exact cost calculations, verified agents, and priority support
          </p>
        </div>

        {/* What's Included */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Everything You Get:</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Live Import Calculator</h3>
                <p className="text-gray-600">
                  Real-time calculations for duties, VAT, shipping, clearing fees - 
                  accurate to the dollar with 2024 rates
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Verified Agents Directory</h3>
                <p className="text-gray-600">
                  Pre-vetted clearing agents with proven track records, honest pricing, 
                  and direct WhatsApp contacts
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Complete Documentation Pack</h3>
                <p className="text-gray-600">
                  Fill-in-the-blank templates, step-by-step SOPs, emergency contacts, 
                  and expedited processing tactics
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Container Slot Access</h3>
                <p className="text-gray-600">
                  Priority booking for shared containers with Transworld Cargo and 
                  DB Schenker (save 60% on shipping)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Success Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 text-center border-0 shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">38</div>
            <div className="text-gray-600">Successful Imports</div>
          </Card>
          <Card className="p-6 text-center border-0 shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">N$1.6M</div>
            <div className="text-gray-600">Total Value Imported</div>
          </Card>
          <Card className="p-6 text-center border-0 shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">5-7 days</div>
            <div className="text-gray-600">Average Clearance</div>
          </Card>
        </div>

        {/* Pricing */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-3xl font-bold">N$1,999</span>
              <span className="text-blue-100 ml-2">one-time payment</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-blue-100 ml-2">250+ satisfied importers</span>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900"
              />
              
              <Button 
                onClick={handleCheckout}
                disabled={loading}
                size="lg"
                className="w-full bg-white text-blue-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get Instant Access for N$1,999'}
              </Button>
              
              <p className="text-sm text-blue-100">
                ✓ Instant access • ✓ Lifetime updates • ✓ 30-day guarantee
              </p>
            </div>
          </div>
        </Card>

        {/* Guarantee */}
        <div className="mt-12 text-center p-6 bg-green-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">100% Money-Back Guarantee</h3>
          <p className="text-gray-600">
            If the calculator doesn't save you at least N$5,000 on your first import, 
            get a full refund - no questions asked.
          </p>
        </div>
      </div>
    </main>
  )
}