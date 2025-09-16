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

export default function SouthAfricaGuidePage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <StickySignupHeader country="za" />
      <CountrySelector />
      <GuideHeader 
        country="za" 
        trusted="Real Import Experience, Real Guidance"
        primaryColor="green-600"
        secondaryColor="emerald-600"
      />
      
      {/* Hero Section - South Africa Themed */}
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
        
        {/* Gradient overlay for brand colors - South Africa Green/Yellow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-yellow-600/10 to-emerald-600/20 z-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 z-20">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-xl">
              <Trophy className="h-5 w-5" />
              <span className="font-bold text-sm">SOUTH AFRICA'S #1 IMPORT EDUCATION PLATFORM</span>
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-center mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">
              Japanese Cars Are
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl">
              Up to 45% Less
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white text-center mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            <span className="font-bold text-yellow-300">3 MILLION+ quality used cars</span> available in Japan RIGHT NOW. We're exposing the entire import process with EXACT steps, forms, and contacts.
            <br />
            <span className="text-lg text-gray-200 block mt-2">IMPOTA teaches you how to import cars yourself — step by step.</span>
          </p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Save R30K-100K</p>
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
                  <p className="font-bold text-gray-900">45 Days</p>
                  <p className="text-xs text-gray-600">Start to finish</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">New Import Service</p>
                  <p className="text-xs text-gray-600">Growing community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTA Buttons */}
          <div className="mb-8" id="signup">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?country=za&package=mistake">
                <Button size="lg" variant="outline" className="font-bold text-lg px-8 border-2">
                  Get Mistake Guide - R499
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register?country=za&package=mastery">
                <Button size="lg" className="font-bold text-lg px-8 bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700">
                  Get Import Mastery
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white text-center mt-4">Instant access • Lifetime updates • 30-day guarantee</p>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-bold text-gray-900">Fully Legal</p>
                <p className="text-xs text-gray-600">Designed for compliance with import procedures</p>
              </div>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-bold text-gray-900">Step-by-Step Guidance</p>
                <p className="text-xs text-gray-600">Easy to follow instructions</p>
              </div>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-bold text-gray-900">Save Thousands</p>
                <p className="text-xs text-gray-600">On every import</p>
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
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Master The Complete Import Process
              </span>
            </h2>
            <p className="text-xl text-gray-600">Learn how to import cars from Japan to South Africa through Durban port. No experience needed - our step-by-step South Africa car import guide shows you everything.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Find Cars in Japan",
                description: "Access 50,000+ cars daily from Japanese auctions",
                color: "green"
              },
              {
                icon: Calculator,
                title: "Calculate Total Costs",
                description: "Know exact duty, VAT, shipping before buying",
                color: "yellow"
              },
              {
                icon: Ship,
                title: "Arrange Shipping",
                description: "Book containers with verified shipping lines",
                color: "blue"
              },
              {
                icon: FileText,
                title: "Handle Documentation",
                description: "Every form, every stamp, every office",
                color: "purple"
              },
              {
                icon: Package,
                title: "Clear Customs",
                description: "Navigate Durban port like a pro",
                color: "orange"
              },
              {
                icon: CheckCircle,
                title: "Register Vehicle",
                description: "From police clearance to license plates",
                color: "green"
              }
            ].map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <Card className="h-full border-2 hover:border-green-400 hover:shadow-xl transition-all">
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
            <p className="text-xl text-gray-600">Get expert guidance for your car import</p>
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
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-green-600">R499</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold mt-2">Essential import guidance</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Complete 55-page import guide",
                      "Durban port procedures guide",
                      "Real cost breakdowns and calculations",
                      "All customs forms & processes explained",
                      "Emergency troubleshooting solutions",
                      "Common mistake prevention guide",
                      "Regular updates and improvements"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=za&package=mistake">
                    <Button 
                      variant="outline"
                      className="w-full h-12 text-lg font-bold hover:bg-green-50 border-2 border-green-200 hover:border-green-400"
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
                <div className="bg-gradient-to-r from-green-600 to-yellow-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-bold text-sm">BEST VALUE</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              
              <Card className="h-full border-2 border-green-400 shadow-xl bg-gradient-to-br from-green-50 to-yellow-50">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Import Mastery</h3>
                      <p className="text-gray-600">Complete professional toolkit</p>
                    </div>
                    <Crown className="h-8 w-8 text-yellow-600" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">R1,999</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold mt-2">Complete import toolkit</p>
                  </div>
                  
                  <div className="bg-green-100 rounded-lg p-3 mb-6">
                    <p className="text-green-800 font-bold text-sm">Everything in Mistake Guide PLUS:</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Advanced duty calculator tool",
                      "Verified clearing agent contacts",
                      "Japan auction access strategies",
                      "Container sharing network access",
                      "Personal import master checklist",
                      "Advanced troubleshooting guide",
                      "Priority regulation updates"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=za&package=mastery">
                    <Button 
                      className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 shadow-lg hover:shadow-xl transition-all"
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
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Risk Reversal - Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-12 border-2 border-green-200">
            <Trophy className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your Complete Import Education Resource</h2>
            <p className="text-xl text-gray-700 mb-6">
              Real import experience shared through comprehensive educational materials.
              Access detailed information and step-by-step guidance for successful imports.
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
      <section className="py-20 bg-gradient-to-br from-green-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Start Importing Cars from Japan to South Africa Today
          </h2>
          <p className="text-2xl mb-8 text-green-100">
            Start your import journey today and join our growing community of successful importers through Durban.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">
              Start Your Import Journey Today
            </p>
            <p className="text-xl text-green-100">
              Get instant access to everything you need to import like a pro.
            </p>
          </div>
          <Link href="/register?country=za&package=mastery">
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-6 h-auto font-bold shadow-2xl"
            >
              Start Your South Africa Import Journey - Learn From Our Members →
            </Button>
          </Link>
          <p className="mt-6 text-green-200">
            ⚡ Special pricing ends soon • 🔒 Secure checkout • 📱 Instant access
          </p>
        </div>
      </section>
    </main>
  )
}