'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, Ship, TrendingDown, Clock, Shield } from 'lucide-react'

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
                <strong>Agent Overcharging:</strong> Dishonest agents charge N$45,000+ 
                for "expedited clearance" that never happens
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
              'The 7-document checklist for pre-clearance',
              'Exact HS codes for popular Japanese vehicles',
              'Red flags for dishonest clearing agents',
              'NRCS compliance shortcuts (save 2 weeks)',
              'Storage fee negotiation tactics',
              'Emergency contact list for port officials',
              'Template emails for expedited processing',
              'Weekend clearance loopholes',
              'Hidden fee calculator spreadsheet',
              'WhatsApp groups for container sharing'
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
                className="w-full bg-white text-orange-600 hover:bg-gray-100"
              >
                {loading ? 'Processing...' : 'Get the Guide for N$499'}
              </Button>
              
              <p className="text-sm text-orange-100">
                🔒 Secure payment via Stripe • No hidden fees
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
            "This guide saved me N$32,000 in unnecessary fees and got my Prius 
            cleared in 5 days instead of the quoted 3 weeks." - Johan M., Windhoek
          </p>
          <p className="text-center text-gray-600 italic">
            "The agent contact list alone is worth 10x the price. Found an honest 
            agent who charged half what others quoted." - Sarah K., Swakopmund
          </p>
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