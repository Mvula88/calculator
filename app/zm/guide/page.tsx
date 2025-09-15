'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  CheckCircle, 
  AlertTriangle, 
  Ship, 
  TrendingDown, 
  Clock, 
  Shield, 
  Star, 
  Lock, 
  DollarSign, 
  Users, 
  Calculator, 
  FileText, 
  Phone, 
  Award, 
  ArrowRight, 
  Zap, 
  Target,
  BookOpen,
  Sparkles,
  TrendingUp,
  ChevronRight,
  BadgeCheck,
  Package,
  Globe,
  MessageCircle,
  Rocket,
  Trophy,
  Crown,
  AlertCircle,
  Check
} from 'lucide-react'
import CountrySelector from '@/components/CountrySelector'
import GuideHeader from '@/components/GuideHeader'
import StickySignupHeader from '@/components/StickySignupHeader'

export default function ZambiaGuidePage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <StickySignupHeader country="zm" />
      <CountrySelector />
      <GuideHeader 
        country="zm" 
        trusted="8 Successful Imports and Counting"
        primaryColor="emerald-600"
        secondaryColor="teal-600"
      />
      
      {/* Hero Section - Zambia Themed */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/japan-cars-hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        {/* Gradient overlay for brand colors - Zambia Emerald/Teal */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-green-600/10 to-teal-600/20 z-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 z-20">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-xl">
              <Trophy className="h-5 w-5" />
              <span className="font-bold text-sm">EXPERT IMPORT EDUCATION PLATFORM</span>
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-center mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">
              Japanese Cars Are
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
              Up to 45% Less
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white text-center mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            <span className="font-bold text-yellow-300">3 MILLION+ quality used cars</span> available in Japan RIGHT NOW.
            <br />
            <span className="text-lg mt-2 block">We're <span className="font-bold text-emerald-400">exposing the entire import process</span> with EXACT steps, forms, and contacts.</span>
            <br />
            <span className="text-lg text-gray-200 block">IMPOTA teaches you how to import cars yourself — step by step.</span>
          </p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Expert Import Guidance</p>
                  <p className="text-xs text-gray-600">Per vehicle import</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">60 Days</p>
                  <p className="text-xs text-gray-600">Start to finish</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">8 Successful</p>
                  <p className="text-xs text-gray-600">Imports completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="mb-8" id="signup">
            <div className="flex justify-center gap-4">
              <Link href="/register?country=zm&package=mistake">
                <Button size="lg" variant="outline" className="font-bold">
                  Get Mistake Guide - K500
                </Button>
              </Link>
              <Link href="/register?country=zm&package=mastery">
                <Button size="lg" className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Get Import Mastery
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white text-center mt-4">Instant access • Lifetime updates • 30-day guarantee</p>
          </div>

          {/* Compliance Info */}
          <div className="flex items-center justify-center gap-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="font-bold text-gray-900">ZRA Compliant</p>
                <p className="text-xs text-gray-600">Designed for compliance with ZRA requirements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Professional Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Master The Zambia Import Process
              </span>
            </h2>
            <p className="text-xl text-gray-600">Navigate ZRA, customs, and registration with confidence.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Find Cars in Japan",
                description: "Access auctions from Lusaka",
                color: "emerald"
              },
              {
                icon: Calculator,
                title: "ZRA Duty Calculator",
                description: "Calculate exact duties and VAT",
                color: "teal"
              },
              {
                icon: Ship,
                title: "Shipping via DSM/DBN",
                description: "Route through Tanzania or SA",
                color: "green"
              },
              {
                icon: FileText,
                title: "ZRA Documentation",
                description: "All customs forms explained",
                color: "cyan"
              },
              {
                icon: Package,
                title: "Border Clearance",
                description: "Navigate Chirundu/Kazungula",
                color: "emerald"
              },
              {
                icon: CheckCircle,
                title: "RTSA Registration",
                description: "Complete vehicle registration",
                color: "teal"
              }
            ].map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <Card className="h-full border-2 hover:border-emerald-400 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className={`bg-${item.color}-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Premium Design */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Choose Your Import Success Package</h2>
            <p className="text-xl text-gray-600">One-time payment. Lifetime access. Instant delivery.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mistake Guide */}
            <div className="relative">
              <Card className="h-full border-2 hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Mistake Guide</h3>
                      <p className="text-gray-600">Perfect for first-time importers</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-emerald-600" />
                  </div>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-black">K669</span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Complete 55-page ZM import playbook",
                      "Chirundu/Kazungula border guide",
                      "ZRA duty calculation examples",
                      "RTSA registration process",
                      "Common mistakes & solutions",
                      "Scam prevention checklist",
                      "Lifetime updates included"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=zm&package=mistake">
                    <Button 
                      variant="outline"
                      className="w-full h-12 text-lg font-bold hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400"
                      size="lg"
                    >
                      Get Mistake Guide
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Import Mastery */}
            <div className="relative">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-bold text-sm">BEST VALUE</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              
              <Card className="h-full border-2 border-emerald-400 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Import Mastery</h3>
                      <p className="text-gray-600">Complete professional toolkit</p>
                    </div>
                    <Crown className="h-8 w-8 text-teal-600" />
                  </div>
                  
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-black">K2,676</span>
                  </div>
                  <p className="text-emerald-600 font-bold mb-6">Complete package available</p>
                  
                  <div className="bg-emerald-100 rounded-lg p-3 mb-6">
                    <p className="text-emerald-800 font-bold text-sm">Everything in Mistake Guide PLUS:</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Live ZRA duty calculator for accurate estimates",
                      "Verified clearing agent directory",
                      "Japan auction bidding guide",
                      "Container sharing network access",
                      "Personal import checklist generator",
                      "Nakonde & Chirundu border guides",
                      "Monthly ZRA regulation updates"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=zm&package=mastery">
                    <Button 
                      className="w-full h-12 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      Get Import Mastery
                      <Crown className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700 font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Risk Reversal - Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 border-2 border-emerald-200">
            <Trophy className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Iron-Clad Guarantee</h2>
            <p className="text-xl text-gray-700 mb-6">
              Our guide provides comprehensive guidance for your first import.
              Start your import journey with proven guidance.
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="font-bold">Proven Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-purple-600" />
                <span className="font-bold">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Start Your Import Journey
          </h2>
          <p className="text-2xl mb-8 text-emerald-100">
            Every day you wait, another Zambian imports their car efficiently.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">
              Start Your Import Journey Today
            </p>
            <p className="text-xl text-emerald-100">
              Get instant access to everything you need to import like a pro.
            </p>
          </div>
          <Button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            size="lg"
            className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-12 py-6 h-auto font-bold shadow-2xl"
          >
            Get Started Now →
          </Button>
          <p className="mt-6 text-emerald-200">
            🔒 Secure checkout • 📱 Instant access
          </p>
        </div>
      </section>
    </main>
  )
}