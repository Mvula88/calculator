'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { 
  CheckCircle, 
  Star, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp,
  Loader2,
  AlertCircle,
  Check,
  X,
  Zap,
  FileText,
  Calculator,
  Headphones,
  Award,
  ArrowRight
} from 'lucide-react'

const packages = [
  {
    id: 'mistake',
    name: 'Mistake Guide',
    price: 'N$499',
    priceValue: 499,
    description: 'Perfect for first-time importers',
    popular: false,
    features: [
      { text: 'Complete import guide for Namibia', included: true },
      { text: 'Common mistakes to avoid', included: true },
      { text: 'Required documents checklist', included: true },
      { text: 'Step-by-step customs process', included: true },
      { text: 'Basic email support', included: true },
      { text: 'Live import calculators', included: false },
      { text: 'Priority support', included: false },
      { text: 'Advanced strategies', included: false },
    ]
  },
  {
    id: 'mastery',
    name: 'Import Mastery',
    price: 'N$1,999',
    priceValue: 1999,
    description: 'Everything you need to master importing',
    popular: true,
    features: [
      { text: 'Everything in Mistake Guide', included: true },
      { text: 'Live import calculators', included: true },
      { text: 'Priority WhatsApp support', included: true },
      { text: 'Advanced import strategies', included: true },
      { text: 'Dealer negotiation templates', included: true },
      { text: 'Shipping optimization guide', included: true },
      { text: 'Lifetime updates', included: true },
      { text: 'Exclusive importer community', included: true },
    ]
  }
]

export default function PricingPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handlePurchase = async (tier: 'mistake' | 'mastery') => {
    setError('')
    
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setLoading(tier)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tier,
          country: 'namibia',
          productId: tier
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IMPOTA
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Already have access? Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Start Importing Cars to Namibia
            <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              The Right Way
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Join 12,000+ successful importers who saved thousands by avoiding costly mistakes
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">One-time payment</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">30-day guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              <Award className="h-5 w-5" />
              <span className="font-semibold">Lifetime access</span>
            </div>
          </div>
        </div>

        {/* Step 1: Email Input Section - PROMINENT */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <span className="font-bold">Step 1</span>
              <ArrowRight className="h-4 w-4" />
              <span>Enter Your Email</span>
            </div>
          </div>
          
          <Card className="border-2 border-blue-400 shadow-xl bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">
                <span className="text-blue-600">First,</span> Enter Your Email Address
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                This will be used for payment and account creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-semibold">
                  Your Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg h-12 border-2 focus:border-blue-500"
                  autoFocus
                />
                <p className="text-sm text-gray-600 mt-1">
                  ✓ We'll send your purchase receipt here<br/>
                  ✓ You'll use this to create your account after payment
                </p>
              </div>
              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}
              {email && emailRegex.test(email) && (
                <Alert className="mt-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Great! Now choose your package below
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Step 2 Indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
            <span className="font-bold">Step 2</span>
            <ArrowRight className="h-4 w-4" />
            <span>Choose Your Package</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-purple-400 shadow-xl' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-black">{pkg.price}</span>
                  <span className="text-gray-600 ml-2">one-time</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button
                  className={`w-full ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : ''}`}
                  size="lg"
                  onClick={() => handlePurchase(pkg.id as 'mistake' | 'mastery')}
                  disabled={loading !== null || !email}
                  title={!email ? 'Please enter your email above first' : ''}
                >
                  {loading === pkg.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : !email ? (
                    <>
                      Enter Email Above First
                      <AlertCircle className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Get {pkg.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12,000+</div>
              <p className="text-sm text-gray-600">Happy Importers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">N$2.5M+</div>
              <p className="text-sm text-gray-600">Saved on Imports</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <p className="text-sm text-gray-600">User Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the difference between the two packages?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The Mistake Guide gives you all the essential information to import successfully. 
                  Import Mastery adds live calculators, priority support, and advanced strategies 
                  that can save you thousands more on each import.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I access the content after payment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  After payment, you'll be redirected to create your account with a password. 
                  Once done, you'll have immediate access to all your purchased content in the portal.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is this a subscription or one-time payment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  It's a one-time payment. You get lifetime access to your purchased tier 
                  with no recurring charges or hidden fees.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I'm not satisfied?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied, 
                  contact us within 30 days for a full refund, no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Importing?</h3>
          <p className="text-gray-600 mb-6">
            Join thousands of successful importers today
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handlePurchase('mistake')}
              disabled={loading !== null}
            >
              Start with Mistake Guide
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => handlePurchase('mastery')}
              disabled={loading !== null}
            >
              Get Import Mastery
            </Button>
          </div>
        </div>

        {/* Security badges */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-2">
            🔒 Secure payment powered by Stripe
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 American Express</span>
          </div>
        </div>
      </div>
    </div>
  )
}