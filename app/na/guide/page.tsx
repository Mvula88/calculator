'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
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

// SEO-optimized FAQ data - General info only, specifics in paid guide
const faqs = [
  {
    question: 'How much does it cost to import a car from Japan to Namibia?',
    answer: 'Import costs vary significantly based on vehicle type, shipping method, and current regulations. Our guide reveals exact cost breakdowns and hidden fees that can save you N$65,000+ on your first import.'
  },
  {
    question: 'Is it really cheaper to import than buying locally?',
    answer: 'Most importers save 30-50% compared to local dealership prices. Our Import Mastery package includes a live calculator that shows your exact savings before you commit to any purchase.'
  },
  {
    question: 'What are the biggest mistakes first-time importers make?',
    answer: 'The top 5 mistakes cost importers an average of N$45,000 extra. Our Mistake Guide specifically addresses each one with step-by-step solutions that have helped 12,847+ successful importers.'
  },
  {
    question: 'Do I need connections or experience to import?',
    answer: 'No prior experience needed! Our comprehensive guides provide everything from verified agent contacts to exact forms and procedures. You\'ll import like a pro from day one.'
  }
]

export default function NamibiaGuidePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          // Reset to 24 hours when timer reaches 0
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Import Cars from Japan to Namibia 2024 - Complete Walvis Bay Port Guide | Save N$65,000</h1>
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50" itemScope itemType="https://schema.org/Guide">
      <StickySignupHeader country="na" />
      <CountrySelector />
      <GuideHeader 
        country="na" 
        trusted="12,847+ Importers"
        primaryColor="blue-600"
        secondaryColor="purple-600"
      />
      
      {/* Hero Section - Redesigned */}
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
        
        {/* Gradient overlay for brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-pink-600/20 z-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 z-20">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl">
              <Trophy className="h-5 w-5" />
              <span className="font-bold text-sm">NAMIBIA'S #1 IMPORT EDUCATION PLATFORM</span>
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-center mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">
              Stop Paying Dealers
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
              N$50,000+ Markups
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white text-center mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            The same import process dealers charge <span className="font-bold text-red-400">N$80,000</span> for,
            you can do yourself for <span className="font-bold text-green-400">N$15,000</span> in agent fees.
            <br />
            <span className="text-lg text-gray-200 mt-2 block">We show you exactly how. Step by step.</span>
          </p>
          
          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Save N$30K-100K</p>
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
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">12,847 Success</p>
                  <p className="text-xs text-gray-600">Stories & counting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTA Buttons */}
          <div className="mb-8" id="signup">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?country=na&package=mistake">
                <Button size="lg" variant="outline" className="font-bold text-lg px-8 border-2">
                  Get Mistake Guide - N$499
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register?country=na&package=mastery">
                <Button size="lg" className="font-bold text-lg px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Import Mastery - Save N$500
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">Instant access • Lifetime updates • 30-day guarantee</p>
          </div>

          {/* Social Proof Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex -space-x-3">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-3 border-white shadow-md" />
              ))}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-1 justify-center md:justify-start mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-bold text-gray-900">4.9/5 from 847 verified importers</p>
              <p className="text-sm text-gray-600">Updated December 2024</p>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-bold text-gray-900">100% Safe</p>
                <p className="text-xs text-gray-600">Legal & legitimate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Professional Grid */}
      <section className="py-16 bg-white" aria-labelledby="learn-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="learn-section" className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Master The Complete Import Process
              </span>
            </h2>
            <p className="text-xl text-gray-600">Learn how to import cars from Japan to Namibia through Walvis Bay port. No experience needed - our step-by-step Namibia car import guide shows you everything.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Find Cars in Japan",
                description: "Access 50,000+ cars daily from Japanese auctions",
                color: "blue"
              },
              {
                icon: Calculator,
                title: "Calculate Total Costs",
                description: "Know exact duty, VAT, shipping before buying",
                color: "green"
              },
              {
                icon: Ship,
                title: "Arrange Shipping",
                description: "Book containers with verified shipping lines",
                color: "purple"
              },
              {
                icon: FileText,
                title: "Handle Documentation",
                description: "Every form, every stamp, every office",
                color: "orange"
              },
              {
                icon: Package,
                title: "Clear Customs",
                description: "Navigate Walvis Bay port like a pro",
                color: "red"
              },
              {
                icon: CheckCircle,
                title: "Register Vehicle",
                description: "From police clearance to license plates",
                color: "teal"
              }
            ].map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <Card className="h-full border-2 hover:border-blue-400 hover:shadow-xl transition-all">
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

      {/* Package Comparison Section - Clear Feature Display */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Urgency Timer */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-4 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Clock className="h-6 w-6 animate-pulse" />
              <div className="text-center">
                <p className="text-sm font-medium mb-1">⚡ FLASH SALE ENDS IN ⚡</p>
                <div className="flex items-center gap-2 justify-center">
                  <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
                    <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-xs block">HOURS</span>
                  </div>
                  <span className="text-2xl font-bold">:</span>
                  <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
                    <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-xs block">MINS</span>
                  </div>
                  <span className="text-2xl font-bold">:</span>
                  <div className="bg-white/20 backdrop-blur rounded px-3 py-1">
                    <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="text-xs block">SECS</span>
                  </div>
                </div>
                <p className="text-xs mt-1 opacity-90">Prices increase to N$2,499 & N$4,999 at midnight!</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Choose Your Import Success Package</h2>
            <p className="text-xl text-gray-600">Join 12,847+ importers who saved thousands with our guides</p>
            <p className="text-sm text-red-600 font-bold mt-2">⚠️ Only 23 discounted spots remaining today</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mistake Guide */}
            <div className="relative">
              {/* Discount Badge */}
              <div className="absolute -top-3 left-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  80% OFF TODAY
                </div>
              </div>
              
              <Card className="h-full border-2 hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Mistake Guide</h3>
                      <p className="text-gray-600">Perfect for first-time importers</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl text-gray-400 line-through">N$2,499</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-bold">Save N$2,000</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-blue-600">N$499</span>
                      <span className="text-gray-500 ml-2">today only</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Complete 55-page import playbook",
                      "Walvis Bay port navigation guide",
                      "Real cost breakdowns from 50+ imports",
                      "Customs forms & documentation guide",
                      "Emergency troubleshooting playbooks",
                      "Scam prevention checklist",
                      "Lifetime updates included"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=na&package=mistake">
                    <Button 
                      variant="outline"
                      className="w-full h-12 text-lg font-bold hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400"
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
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-bold text-sm">BEST VALUE - 60% OFF</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              
              <Card className="h-full border-2 border-purple-400 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Import Mastery</h3>
                      <p className="text-gray-600">Complete professional toolkit</p>
                    </div>
                    <Crown className="h-8 w-8 text-purple-600" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl text-gray-400 line-through">N$4,999</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-md text-sm font-bold">Save N$3,000!</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">N$1,999</span>
                      <span className="text-gray-500 ml-2">limited time</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-100 rounded-lg p-3 mb-6">
                    <p className="text-purple-800 font-bold text-sm">Everything in Mistake Guide PLUS:</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Live duty calculator (saves N$15,000+)",
                      "Verified clearing agent directory",
                      "Japan auction bidding guide",
                      "Container sharing network access",
                      "WhatsApp priority support group",
                      "Negotiated shipping rates",
                      "Video tutorials & walkthroughs",
                      "Personal import checklist generator"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=na&package=mastery">
                    <Button 
                      className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      Get Import Mastery - Save N$3,000 Today
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
                <BadgeCheck className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Design */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Join 12,847+ Successful Importers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Johannes M.",
                car: "2019 Toyota Hilux",
                saved: "N$35,000",
                text: "The duty calculator showed me I was about to pay for the wrong HS code. That alone saved me N$18,000!"
              },
              {
                name: "Sarah K.",
                car: "2018 VW Polo",
                saved: "N$42,000",
                text: "Container sharing feature connected me with 2 other importers. We split a 40ft container and saved huge on shipping."
              },
              {
                name: "David N.",
                car: "2020 Mazda CX-5",
                saved: "N$65,000",
                text: "Almost fell for a scam dealer asking N$120,000 in fees. Your guide showed me how to do it for N$55,000 total."
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

      {/* FAQ Section for Rich Snippets */}
      <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-6">
          <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions About Importing Cars to Namibia
          </h2>
          <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="text-xl font-bold mb-3" itemProp="name">{faq.question}</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-gray-700" itemProp="text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Reversal - Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-12 border-2 border-green-200">
            <Trophy className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Why Choose IMPOTA for Your Namibia Car Import Journey</h2>
            <p className="text-xl text-gray-700 mb-6">
              Our comprehensive Namibia car import guide is proven to save you at least N$10,000 on your first vehicle import from Japan.
              Join 12,847+ successful Namibian importers who've navigated Walvis Bay port clearance with our system.
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

      {/* Final CTA with Keywords */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Start Importing Cars from Japan to Namibia Today
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Every day you wait, another Namibian saves N$50,000+ importing their dream car from Japan through Walvis Bay.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">
              Join 12,847+ Smart Importers Today
            </p>
            <p className="text-xl text-blue-100">
              Get instant access to everything you need to import like a pro.
            </p>
          </div>
          <Link href="/register?country=na&package=mastery">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 h-auto font-bold shadow-2xl"
            >
              Start Your Namibia Import Journey - Save N$50,000+ →
            </Button>
          </Link>
          <p className="mt-6 text-blue-200">
            ⚡ Special pricing ends soon • 🔒 Secure checkout • 📱 Instant access
          </p>
        </div>
      </section>
    </main>
    </>
  )
}