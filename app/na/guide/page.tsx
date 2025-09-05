'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship } from 'lucide-react'

export default function NamibiaGuidePage() {
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
          tier: 'mistake',
          productId: 'walvis-bay-guide' 
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
      {/* Simple Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">ImportCalc Pro</div>
            <div className="text-sm text-gray-600">Trusted by 500+ Importers</div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
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
            and the exact steps to avoid it (based on 38 successful imports)
          </p>
        </div>

        {/* Problem/Solution */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Why 73% of First-Time Importers Get Stuck
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <Ship className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Missing Pre-Clearance Documents:</strong> One missing paper = 
                3-6 weeks delay + N$800/day storage fees
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
                <strong>Agent Overcharging:</strong> Dishonest agents charge N$45,000+ 
                for "expedited clearance" that never happens
              </div>
            </div>
          </div>
        </Card>

        {/* What You Get */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            What You'll Learn in This Guide:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              'The 7-document checklist for pre-clearance',
              'Exact HS codes for popular Japanese vehicles',
              'Red flags for dishonest clearing agents',
              'NRCS compliance shortcuts (save 2 weeks)',
              'Storage fee negotiation tactics',
              'Emergency contact list for port officials',
              'Template emails for expedited processing',
              'Weekend clearance loopholes'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-orange-600 to-red-600 text-white border-0">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get Instant Access to the Walvis Bay Guide
            </h3>
            <p className="text-orange-100 mb-6">
              One-time payment • Instant access • 30-day money-back guarantee
            </p>
            
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
                className="w-full bg-white text-orange-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get the Guide for N$499'}
              </Button>
              
              <p className="text-sm text-orange-100">
                🔒 Secure payment via Stripe • No hidden fees
              </p>
            </div>
          </div>
        </Card>

        {/* Testimonial */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            "This guide saved me N$32,000 in unnecessary fees and got my Prius 
            cleared in 5 days instead of the quoted 3 weeks." - Johan M., Windhoek
          </p>
        </div>
      </div>
    </main>
  )
}