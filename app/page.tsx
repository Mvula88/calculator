'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import QuickSignupForm from '@/components/QuickSignupForm'
import FloatingSignupButton from '@/components/FloatingSignupButton'
import { 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  Shield, 
  Users,
  Star,
  CheckCircle,
  Zap,
  Trophy,
  DollarSign,
  Clock,
  Package
} from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  const countries = [
    { code: 'na', name: 'Namibia', flag: '🇳🇦', users: '8,234', currency: 'N$' },
    { code: 'za', name: 'South Africa', flag: '🇿🇦', users: '3,421', currency: 'R' },
    { code: 'bw', name: 'Botswana', flag: '🇧🇼', users: '892', currency: 'P' },
    { code: 'zm', name: 'Zambia', flag: '🇿🇲', users: '300', currency: 'K' }
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Save 30-70%',
      description: 'Skip dealer markups and import directly',
      color: 'green'
    },
    {
      icon: Clock,
      title: '60 Days',
      description: 'From purchase to driving on local roads',
      color: 'blue'
    },
    {
      icon: Shield,
      title: '100% Legal',
      description: 'Fully compliant with customs regulations',
      color: 'purple'
    },
    {
      icon: Users,
      title: '12,847+ Success',
      description: 'Join thousands of successful importers',
      color: 'orange'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <FloatingSignupButton />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/impota-logo.png" 
              alt="IMPOTA" 
              width={180} 
              height={48}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </div>

          {/* Main Headline */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg mb-6">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-bold">#1 IMPORT EDUCATION PLATFORM IN AFRICA</span>
              <Trophy className="h-4 w-4" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-gray-900">Import Cars Yourself</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Save 50,000+ Today
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              The complete step-by-step system that shows you exactly how to import cars from Japan, 
              legally and profitably, without middlemen.
            </p>

            {/* CTA Buttons - More Prominent */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="#signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 h-auto shadow-xl transform hover:scale-105 transition-all"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Instant Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/purchase">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto border-2 hover:bg-gray-50"
                >
                  View Pricing & Packages
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1 font-semibold">4.9/5</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="font-semibold">12,847+ Members</span>
              <span className="text-gray-400">•</span>
              <span className="font-semibold">30-Day Guarantee</span>
            </div>
          </div>

          {/* Quick Signup Form - Hero Position */}
          <div className="max-w-4xl mx-auto" id="signup">
            <QuickSignupForm variant="hero" />
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why 12,847+ People Trust IMPOTA
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all hover:scale-105">
                <div className={`bg-${benefit.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <benefit.icon className={`h-6 w-6 text-${benefit.color}-600`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Country Selection with Stats */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose Your Country to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              Customized guides for each country's import regulations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {countries.map((country) => (
              <Link key={country.code} href={`/${country.code}/guide`}>
                <Card className="p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <div className="text-center">
                    <div className="text-5xl mb-3">{country.flag}</div>
                    <h3 className="font-bold text-xl mb-2">{country.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                      <Users className="h-4 w-4" />
                      <span>{country.users} members</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Saving {country.currency}50K+
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Another Signup Form */}
          <div className="max-w-3xl mx-auto">
            <QuickSignupForm variant="default" />
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Everything You Need to Import Successfully
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-bold text-xl mb-4 text-blue-600">Mistake Guide (N$499)</h3>
              {[
                'Complete 55-page import playbook',
                'Step-by-step customs navigation',
                'Real cost breakdowns from 50+ imports',
                'Documentation templates & checklists',
                'Scam prevention strategies',
                'Emergency troubleshooting guide'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-xl mb-4 text-purple-600">Import Mastery (N$1,999)</h3>
              <div className="bg-purple-50 rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold text-purple-800">Everything in Mistake Guide PLUS:</p>
              </div>
              {[
                'Live duty & tax calculator',
                'Japan auction bidding guide',
                'Verified agent directory',
                'Container sharing network',
                'WhatsApp priority support',
                'Video tutorials & walkthroughs'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 12,847+ smart importers who are saving thousands on every car import
          </p>
          
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
            <QuickSignupForm variant="compact" />
          </div>
          
          <p className="mt-8 text-blue-200">
            ⚡ Instant access • 🔒 Secure checkout • 💰 30-day money-back guarantee
          </p>
        </div>
      </section>
    </main>
  )
}