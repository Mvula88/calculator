'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calculator, Users, FileText, TrendingUp, Star } from 'lucide-react'

export default function SouthAfricaUpsellPage() {
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
          tier: 'mastery',
          productId: 'import-mastery-za' 
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
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2">
            DURBAN PORT MASTERY SYSTEM
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Import Mastery + SARS Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The complete Durban port import system - with SARS-compliant calculations, 
            verified forwarders, and priority Transnet access
          </p>
        </div>

        {/* What's Included */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Complete Import System Includes:</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">SARS-Compliant Calculator</h3>
                <p className="text-gray-600">
                  Exact duty, VAT, ad valorem calculations with 2024 ITAC codes - 
                  matches SARS assessments to the cent
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Verified Forwarders Network</h3>
                <p className="text-gray-600">
                  Direct contacts at Transworld Cargo, DB Schenker, and 5 other 
                  trusted forwarders with negotiated rates
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">SARS Documentation Pack</h3>
                <p className="text-gray-600">
                  Pre-filled RLA templates, DA304 guides, ITAC permit applications, 
                  and direct SARS office contacts
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Priority Container Slots</h3>
                <p className="text-gray-600">
                  Exclusive access to shared container bookings - save 60% on 
                  shipping from Japan to Durban
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Success Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 text-center border-0 shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">38</div>
            <div className="text-gray-600">Vehicles Cleared</div>
          </Card>
          <Card className="p-6 text-center border-0 shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">R2.4M</div>
            <div className="text-gray-600">Import Value</div>
          </Card>
          <Card className="p-6 text-center border-0 shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">5 days</div>
            <div className="text-gray-600">Avg Clearance</div>
          </Card>
        </div>

        {/* Pricing */}
        <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-3xl font-bold">R2,499</span>
              <span className="text-green-100 ml-2">once-off payment</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-green-100 ml-2">180+ SA importers</span>
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
                className="w-full bg-white text-green-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get Instant Access for R2,499'}
              </Button>
              
              <p className="text-sm text-green-100">
                ✓ Instant access • ✓ Lifetime updates • ✓ 30-day guarantee • ✓ VAT included
              </p>
            </div>
          </div>
        </Card>

        {/* Guarantee */}
        <div className="mt-12 text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">100% Money-Back Guarantee</h3>
          <p className="text-gray-600">
            If our system doesn't save you at least R10,000 on duties and fees, 
            get a full refund within 30 days.
          </p>
        </div>
      </div>
    </main>
  )
}