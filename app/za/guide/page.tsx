'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship } from 'lucide-react'

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
          productId: 'durban-guide' 
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
            and the exact process to clear in 5 days (proven on 38 vehicles)
          </p>
        </div>

        {/* Problem/Solution */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Why Durban Port Is Different (And More Expensive)
          </h2>
          
          <div className="space-y-4 mb-6">
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
              'Emergency escalation contacts'
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
              />
              
              <Button 
                onClick={handleCheckout}
                disabled={loading}
                size="lg"
                className="w-full bg-white text-green-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get the Guide for R499'}
              </Button>
              
              <p className="text-sm text-green-100">
                🔒 Secure payment via Stripe • VAT included
              </p>
            </div>
          </div>
        </Card>

        {/* Testimonial */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            "Saved me R45,000 in storage fees by showing exactly how to expedite 
            SARS clearance. Got my Hilux in 6 days!" - Themba K., Johannesburg
          </p>
        </div>
      </div>
    </main>
  )
}