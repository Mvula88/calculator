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

export default function BotswanaGuidePage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <StickySignupHeader country="bw" />
      <CountrySelector />
      <GuideHeader 
        country="bw" 
        trusted="3,200+ BW Importers"
        primaryColor="blue-600"
        secondaryColor="sky-600"
      />
      
      {/* Hero Section - Botswana Themed */}
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
        
        {/* Gradient overlay for brand colors - Botswana Blue/Sky */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-sky-600/10 to-cyan-600/20 z-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 z-20">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-6 py-3 rounded-full shadow-xl">
              <Trophy className="h-5 w-5" />
              <span className="font-bold text-sm">BOTSWANA'S #1 IMPORT EDUCATION PLATFORM</span>
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-center mb-6 leading-tight">
            <span className="text-white drop-shadow-2xl">
              Japanese Cars Are
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              45% Cheaper
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white text-center mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            <span className="font-bold text-yellow-300">3 MILLION+ quality used cars</span> available in Japan RIGHT NOW.
            <br />
            <span className="text-lg mt-2 block">We're <span className="font-bold text-blue-400">exposing the entire import process</span> with EXACT steps, forms, and contacts.</span>
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
                  <p className="font-bold text-gray-900">Save P30K-100K</p>
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
                  <p className="font-bold text-gray-900">50 Days</p>
                  <p className="text-xs text-gray-600">Full process</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">3,200+ Success</p>
                  <p className="text-xs text-gray-600">BW importers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTA Buttons */}
          <div className="mb-8" id="signup">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?country=bw&package=mistake">
                <Button size="lg" variant="outline" className="font-bold text-lg px-8 border-2">
                  Get Mistake Guide - P404
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register?country=bw&package=mastery">
                <Button size="lg" className="font-bold text-lg px-8 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700">
                  Get Import Mastery - Save P400
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
                'https://xsgames.co/randomusers/assets/avatars/male/47.jpg',
                'https://xsgames.co/randomusers/assets/avatars/female/3.jpg', 
                'https://xsgames.co/randomusers/assets/avatars/male/76.jpg',
                'https://xsgames.co/randomusers/assets/avatars/female/75.jpg',
                'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
                'https://xsgames.co/randomusers/assets/avatars/female/47.jpg'
              ].map((avatar, i) => (
                <img 
                  key={i} 
                  src={avatar}
                  alt={`Happy customer ${i + 1}`}
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
              <p className="font-bold text-gray-900">4.8/5 from 320 verified BW importers</p>
              <p className="text-sm text-gray-600">Updated December 2024</p>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-bold text-gray-900">BURS Compliant</p>
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
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Master The Botswana Import Process
              </span>
            </h2>
            <p className="text-xl text-gray-600">Navigate BURS, customs, and registration with confidence.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Find Cars in Japan",
                description: "Access auctions from Gaborone",
                color: "blue"
              },
              {
                icon: Calculator,
                title: "BURS Duty Calculator",
                description: "Calculate exact duties and VAT",
                color: "sky"
              },
              {
                icon: Ship,
                title: "Shipping via Durban",
                description: "Route through SA to Botswana",
                color: "cyan"
              },
              {
                icon: FileText,
                title: "BURS Documentation",
                description: "All customs forms explained",
                color: "indigo"
              },
              {
                icon: Package,
                title: "Border Clearance",
                description: "Navigate Kopfontein/Pioneer Gate",
                color: "blue"
              },
              {
                icon: CheckCircle,
                title: "BW Registration",
                description: "Complete vehicle registration",
                color: "sky"
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
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-black">P404</span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Complete 55-page BW import playbook",
                      "Durban to Gaborone route guide",
                      "BURS duty calculation examples",
                      "Border crossing documentation",
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
                  
                  <Link href="/register?country=bw&package=mistake">
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
                <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-bold text-sm">MOST POPULAR - SAVE P400</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              
              <Card className="h-full border-2 border-blue-400 shadow-xl bg-gradient-to-br from-blue-50 to-sky-50">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Import Mastery</h3>
                      <p className="text-gray-600">Complete professional toolkit</p>
                    </div>
                    <Crown className="h-8 w-8 text-sky-600" />
                  </div>
                  
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-black">P1,618</span>
                    <span className="text-gray-500 ml-2 line-through">P2,018</span>
                  </div>
                  <p className="text-blue-600 font-bold mb-6">Save P400 today!</p>
                  
                  <div className="bg-blue-100 rounded-lg p-3 mb-6">
                    <p className="text-blue-800 font-bold text-sm">Everything in Mistake Guide PLUS:</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Live BURS duty calculator (saves P15,000+)",
                      "Verified clearing agent directory",
                      "Japan auction bidding guide",
                      "Container sharing network access",
                      "Personal import checklist generator",
                      "Trans-Kalahari corridor guide",
                      "Monthly BURS regulation updates"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/register?country=bw&package=mastery">
                    <Button 
                      className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      Get Import Mastery - Save P400
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
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700 font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Design */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Join 3,200+ Successful BW Importers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Kgosi M.",
                car: "2019 Toyota Hilux DC",
                saved: "P38,000",
                text: "The BURS calculator helped me avoid wrong duty classification. Saved me P20,000!"
              },
              {
                name: "Naledi K.",
                car: "2018 VW Tiguan",
                saved: "P45,000",
                text: "Container sharing from Durban with 2 others cut my shipping costs by 60%!"
              },
              {
                name: "Thato B.",
                car: "2020 Mazda BT-50",
                saved: "P62,000",
                text: "Agent wanted P95,000. Did it myself for P33,000 using the guide. Amazing!"
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
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-12 border-2 border-blue-200">
            <Trophy className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Iron-Clad Guarantee</h2>
            <p className="text-xl text-gray-700 mb-6">
              Our guide is proven to save you at least P10,000 on your first import.
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-sky-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Stop Watching Others Save Money
          </h2>
          <p className="text-2xl mb-8 text-blue-100">
            Every day you wait, another Motswana imports their dream car for P50,000 less than you would pay.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">
              Join 3,200+ Smart BW Importers Today
            </p>
            <p className="text-xl text-blue-100">
              Get instant access to everything you need to import like a pro.
            </p>
          </div>
          <Button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 h-auto font-bold shadow-2xl"
          >
            Yes! I Want to Save P50,000+ →
          </Button>
          <p className="mt-6 text-blue-200">
            ⚡ Special pricing ends soon • 🔒 Secure checkout • 📱 Instant access
          </p>
        </div>
      </section>
    </main>
  )
}