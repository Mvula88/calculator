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
        trusted="8,500+ SA Importers"
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
              45% Cheaper
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white text-center mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            <span className="font-bold text-yellow-300">3 MILLION+ quality used cars</span> available in Japan RIGHT NOW.
            <br />
            <span className="text-lg mt-2 block">We're <span className="font-bold text-green-400">exposing the entire import process</span> with EXACT steps, forms, and contacts.</span>
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
                  <p className="text-xs text-gray-600">Durban clearance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">8,500+ Success</p>
                  <p className="text-xs text-gray-600">SA importers</p>
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
                  Get Import Mastery - Save R500
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white text-center mt-4">Instant access • Lifetime updates • 30-day guarantee</p>
          </div>

          {/* Social Proof Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex -space-x-3">
              {[
                {
                  src: '/avatars/namibia-1.png',
                  name: 'Thabo M.',
                  location: 'Johannesburg'
                },
                {
                  src: '/avatars/namibia-2.png',
                  name: 'Sipho K.',
                  location: 'Cape Town'
                },
                {
                  src: '/avatars/namibia-3.png',
                  name: 'Lungi N.',
                  location: 'Durban'
                },
                {
                  src: '/avatars/namibia-4.png',
                  name: 'Zanele P.',
                  location: 'Pretoria'
                }
              ].map((customer, i) => (
                <img 
                  key={i} 
                  src={customer.src}
                  alt={`${customer.name} from ${customer.location}`}
                  title={`${customer.name} - ${customer.location}`}
                  className="w-12 h-12 rounded-full border-3 border-white shadow-md object-cover"
                />
              ))}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-1 justify-center md:justify-start mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-bold text-gray-900">4.9/5 from 650 verified SA importers</p>
              <p className="text-sm text-gray-600">Updated December 2024</p>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-bold text-gray-900">SARS Compliant</p>
                <p className="text-xs text-gray-600">100% legal process</p>
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
                Master The Durban Port Import Process
              </span>
            </h2>
            <p className="text-xl text-gray-600">Navigate SARS, customs, and registration like a pro.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Find Cars in Japan",
                description: "Access Japanese auctions from South Africa",
                color: "green"
              },
              {
                icon: Calculator,
                title: "SARS Duty Calculator",
                description: "Calculate exact import duties and VAT",
                color: "yellow"
              },
              {
                icon: Ship,
                title: "Durban Port Shipping",
                description: "Book with MSC, Maersk, and more",
                color: "blue"
              },
              {
                icon: FileText,
                title: "SARS Documentation",
                description: "DA304, SAD500, and all forms explained",
                color: "purple"
              },
              {
                icon: Package,
                title: "Clear Customs",
                description: "Navigate Durban port clearance process",
                color: "orange"
              },
              {
                icon: CheckCircle,
                title: "Register with eNaTIS",
                description: "Complete registration and licensing",
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
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-black">R499</span>
                    <span className="text-gray-500 ml-2">once-off</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Complete 55-page SA import playbook",
                      "Durban port navigation guide",
                      "SARS duty calculation examples",
                      "All customs forms with samples",
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
                  <span className="font-bold text-sm">MOST POPULAR - SAVE R500</span>
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
                  
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-black">R1,999</span>
                    <span className="text-gray-500 ml-2 line-through">R2,499</span>
                  </div>
                  <p className="text-green-600 font-bold mb-6">Save R500 today!</p>
                  
                  <div className="bg-green-100 rounded-lg p-3 mb-6">
                    <p className="text-green-800 font-bold text-sm">Everything in Mistake Guide PLUS:</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Live SARS duty calculator (saves R15,000+)",
                      "Verified clearing agent directory",
                      "Japan auction bidding guide",
                      "Container sharing network access",
                      "Personal import checklist generator",
                      "ITAC permit application guide",
                      "Monthly SARS regulation updates"
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
                      Get Import Mastery - Save R500
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

      {/* Testimonials - Modern Design */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Join 8,500+ Successful SA Importers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Thabo M.",
                car: "2019 Toyota Fortuner",
                saved: "R45,000",
                text: "The SARS duty calculator saved me from paying the wrong tariff code. Saved R20,000 instantly!"
              },
              {
                name: "Priya N.",
                car: "2018 BMW 320i",
                saved: "R62,000",
                text: "Found 2 other importers through the container sharing feature. Split shipping costs 3 ways!"
              },
              {
                name: "Johan V.",
                car: "2020 Ford Ranger",
                saved: "R75,000",
                text: "Dealer wanted R120,000 in fees. Did it myself for R45,000 total using your guide."
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full" />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.car}</p>
                      <p className="text-sm font-bold text-green-600">Saved {testimonial.saved}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Reversal - Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-12 border-2 border-green-200">
            <Trophy className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Iron-Clad Guarantee</h2>
            <p className="text-xl text-gray-700 mb-6">
              Our guide is proven to save you at least R10,000 on your first import.
              Join thousands of successful importers today.
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
            Stop Watching Others Save Money
          </h2>
          <p className="text-2xl mb-8 text-green-100">
            Every day you wait, another South African imports their dream car for R50,000 less than you would pay.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">
              Join 8,500+ Smart SA Importers Today
            </p>
            <p className="text-xl text-green-100">
              Get instant access to everything you need to import like a pro.
            </p>
          </div>
          <Button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-6 h-auto font-bold shadow-2xl"
          >
            Yes! I Want to Save R50,000+ →
          </Button>
          <p className="mt-6 text-green-200">
            ⚡ Special pricing ends soon • 🔒 Secure checkout • 📱 Instant access
          </p>
        </div>
      </section>
    </main>
  )
}