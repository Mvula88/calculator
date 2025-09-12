'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { 
  CheckCircle, 
  Star, 
  Shield, 
  Clock, 
  Award,
  ArrowRight,
  Check,
  X,
  Zap
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

export default function PackagesPage() {
  const router = useRouter()

  const handleSelectPackage = (tier: 'mistake' | 'mastery') => {
    // Redirect to register page with package info
    router.push(`/register?package=${tier}&country=na`)
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Zap className="h-5 w-5" />
            <span className="font-semibold">Step 1: Choose Your Package</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Select Your Import Guide Package
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Choose the package that best fits your importing needs
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-purple-400 shadow-xl scale-105' : ''}`}
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
                  onClick={() => handleSelectPackage(pkg.id as 'mistake' | 'mastery')}
                >
                  Select {pkg.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-4 items-center">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                1
              </div>
              <p className="text-sm font-semibold">Choose Package</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-gray-400" />
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                2
              </div>
              <p className="text-sm font-semibold">Enter Email</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-gray-400" />
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                3
              </div>
              <p className="text-sm font-semibold">Complete Payment</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-gray-400" />
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                4
              </div>
              <p className="text-sm font-semibold">Create Account</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-gray-400" />
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                5
              </div>
              <p className="text-sm font-semibold">Access Portal</p>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="text-center mt-12">
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