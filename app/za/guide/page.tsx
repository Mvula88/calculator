'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
  User,
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
  ChevronDown,
  BadgeCheck,
  Package,
  Globe,
  MessageCircle,
  Rocket,
  Trophy,
  Crown,
  AlertCircle,
  Check,
  MapPin,
  Truck,
  Building,
  GraduationCap,
  Heart,
  PlayCircle,
  Download,
  Eye,
  BarChart3,
  Settings,
  Compass,
  Briefcase
} from 'lucide-react'
import GuideHeader from '@/components/GuideHeader'
import StockCounter from '@/components/StockCounter'
import ImportSuccessNotifications from '@/components/PurchaseNotifications'

// Function to get static Tailwind classes for colors
const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { background: string; shadow: string } } = {
    blue: {
      background: 'bg-gradient-to-br from-blue-500 to-blue-600',
      shadow: 'group-hover:shadow-blue-500/25'
    },
    green: {
      background: 'bg-gradient-to-br from-green-500 to-green-600',
      shadow: 'group-hover:shadow-green-500/25'
    },
    purple: {
      background: 'bg-gradient-to-br from-purple-500 to-purple-600',
      shadow: 'group-hover:shadow-purple-500/25'
    },
    amber: {
      background: 'bg-gradient-to-br from-amber-500 to-amber-600',
      shadow: 'group-hover:shadow-amber-500/25'
    },
    rose: {
      background: 'bg-gradient-to-br from-rose-500 to-rose-600',
      shadow: 'group-hover:shadow-rose-500/25'
    },
    teal: {
      background: 'bg-gradient-to-br from-teal-500 to-teal-600',
      shadow: 'group-hover:shadow-teal-500/25'
    },
    emerald: {
      background: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      shadow: 'group-hover:shadow-emerald-500/25'
    },
    yellow: {
      background: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      shadow: 'group-hover:shadow-yellow-500/25'
    },
    sky: {
      background: 'bg-gradient-to-br from-sky-500 to-sky-600',
      shadow: 'group-hover:shadow-sky-500/25'
    },
    orange: {
      background: 'bg-gradient-to-br from-orange-500 to-orange-600',
      shadow: 'group-hover:shadow-orange-500/25'
    }
  }
  
  return colorMap[color] || colorMap.blue // Default to blue if color not found
}

// SEO-optimized FAQ data - General info only, specifics in paid guide
const faqs = [
  {
    question: 'How much does it cost to import a car from Japan to South Africa?',
    answer: 'Import costs vary significantly based on vehicle type, shipping method, and current regulations. Our guide provides comprehensive cost breakdowns and reveals hidden fees to help you make informed decisions.'
  },
  {
    question: 'What are the benefits of importing directly from Japan?',
    answer: 'Importing directly gives you access to a wider selection of quality vehicles, transparent pricing, and detailed vehicle history. Our guide includes a comprehensive calculator to help you understand all costs involved.'
  },
  {
    question: 'What are the biggest mistakes first-time importers make?',
    answer: 'First-time importers often make costly mistakes. Our Mistake Guide specifically addresses the top 5 pitfalls with step-by-step solutions based on real import experiences.'
  },
  {
    question: 'Do I need connections or experience to import?',
    answer: 'No prior experience needed! Our comprehensive guides provide everything from verified agent contacts to exact forms and procedures. You\'ll import like a pro from day one.'
  }
]

export default function SouthAfricaGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
      }

      setLoading(false)
    }

    checkUser()
  }, [])

  return (
    <>
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Import Cars from Japan to South Africa 2024 - Complete Durban Port Guide | Save R65,000</h1>
      
      {/* Purchase Notifications */}
      <ImportSuccessNotifications />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-x-hidden" itemScope itemType="https://schema.org/Guide">
      <GuideHeader 
        country="za" 
        trusted="Real Import Experience, Real Guidance"
        primaryColor="green-600"
        secondaryColor="emerald-600"
      />
      
      {/* Modern Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden w-full min-h-0 md:min-h-screen flex items-center py-16 md:py-0">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('/japan-cars-hero.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 z-20">
          {/* Premium Trust Badge - Mobile Optimized */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-500 via-yellow-600 to-emerald-600 text-white px-3 py-1.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm text-center">
              <Crown className="h-4 w-4 sm:h-6 sm:w-6" />
              <span className="font-bold text-xs sm:text-base tracking-tight sm:tracking-wide">SOUTH AFRICA'S PREMIER IMPORT EDUCATION PLATFORM</span>
              <Crown className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
          </div>
          
          {/* Modern Typography - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
              <span className="text-white drop-shadow-2xl block">
                Learn How to Import Cars
              </span>
              <span className="text-white drop-shadow-2xl block mb-2">
                from Japan
              </span>
              <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl text-2xl sm:text-3xl">
                Step-by-Step Guide for South Africa
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-4 sm:mb-6 font-light leading-relaxed max-w-2xl sm:max-w-3xl mx-auto px-4">
              Access <span className="font-bold text-yellow-300">quality vehicles</span> from Japan with our complete import guide.
            </p>
            
            <p className="hidden sm:block text-base md:text-lg text-gray-300 max-w-xl sm:max-w-2xl mx-auto px-4 leading-relaxed">
              Professional guidance for successful imports through Durban — no experience required.
            </p>
          </div>
          
          {/* Modern Value Proposition Cards - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto mb-6 sm:mb-10 px-4">
            <div className="group">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-emerald-500 p-1.5 sm:p-2 rounded-lg shadow-lg">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">Cost Effective</h3>
                      <p className="text-yellow-300 font-medium text-xs sm:text-sm">Direct import</p>
                    </div>
                  </div>
                  <p className="hidden sm:block text-gray-300 text-xs leading-relaxed">Direct access to Japanese market</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg shadow-lg">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">45-60 Days</h3>
                      <p className="text-blue-300 font-medium text-xs sm:text-sm">Process time</p>
                    </div>
                  </div>
                  <p className="hidden sm:block text-gray-300 text-xs leading-relaxed">Purchase to registration</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group hidden sm:block lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="bg-purple-500 p-1.5 sm:p-2 rounded-lg shadow-lg">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">Community</h3>
                      <p className="text-purple-300 font-medium text-xs sm:text-sm">Success stories</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">Join successful importers</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Premium CTA Section - Mobile Optimized */}
          <div className="text-center mb-6 sm:mb-10" id="signup">
            <div className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                {user ? (
                  // User is logged in - show portal access only
                  <Link href="/portal" className="group">
                    <Button
                      size="lg"
                      className="font-bold text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 h-auto bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 shadow-2xl group-hover:scale-105 transition-all duration-300 group-hover:shadow-emerald-500/25 min-h-[44px]"
                    >
                      <Lock className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      Access Member Portal
                      <ArrowRight className="ml-2 sm:ml-3 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  // Not logged in - show both buttons
                  <>
                    {/* Member Login Button for returning customers */}
                    <Link href="/auth/login" className="group">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-4 h-auto border-2 border-white/30 bg-black/30 text-white hover:bg-white/20 transition-all duration-300 group-hover:scale-105 min-h-[44px]"
                      >
                        <User className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        Member Login
                      </Button>
                    </Link>

                    {/* Get Started Button for new customers */}
                    <a href="#pricing" className="group">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 h-auto bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 shadow-2xl group-hover:scale-105 transition-all duration-300 group-hover:shadow-emerald-500/25 min-h-[44px]"
                      >
                        <Crown className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        Get Started
                        <Sparkles className="ml-2 sm:ml-3 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
                      </Button>
                    </a>
                  </>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                  <span>Instant</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  <span>Updates</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <BadgeCheck className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Trust Indicators - Mobile Optimized */}
          <div className="max-w-6xl mx-auto px-4">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 items-center text-center">
                  <div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
                      <h3 className="font-bold text-white text-base sm:text-lg">Full Legal Compliance</h3>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">All procedures designed for full regulatory compliance</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                      <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                      <h3 className="font-bold text-white text-base sm:text-lg">Expert Guidance</h3>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">Step-by-step professional instruction</p>
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                      <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                      <h3 className="font-bold text-white text-base sm:text-lg">Real Results</h3>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">Successful imports across South Africa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Process Section - Mobile Optimized */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50" aria-labelledby="learn-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm mb-4">
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
              Complete Import Mastery
            </div>
            <h2 id="learn-section" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Master Every Step of 
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                The Import Process
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Professional guidance for importing vehicles from Japan to South Africa through Durban port. 
              <span className="font-semibold text-gray-800">No experience required</span> — our comprehensive system covers everything.
            </p>
          </div>
          
          {/* Process Steps Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Globe,
                title: "Source Premium Vehicles",
                description: "Access Japan's auction system with 50,000+ quality vehicles daily. Learn insider strategies for finding the best deals.",
                color: "emerald",
                step: "01"
              },
              {
                icon: Calculator,
                title: "Calculate True Costs",
                description: "Master our comprehensive cost calculator. Know exact duties, VAT, shipping, and hidden fees before you buy.",
                color: "blue",
                step: "02"
              },
              {
                icon: Ship,
                title: "Secure Professional Shipping",
                description: "Connect with verified shipping lines and clearing agents. Navigate container sharing and shipping schedules.",
                color: "purple",
                step: "03"
              },
              {
                icon: FileText,
                title: "Master Documentation",
                description: "Complete guide to every form, stamp, and office visit. Streamline bureaucracy with insider knowledge.",
                color: "amber",
                step: "04"
              },
              {
                icon: MapPin,
                title: "Navigate Durban Port",
                description: "Professional port procedures guide. Clear customs efficiently with step-by-step instructions.",
                color: "rose",
                step: "05"
              },
              {
                icon: CheckCircle,
                title: "Complete Registration",
                description: "From police clearance to license plates. Final steps to get your vehicle road-ready in South Africa.",
                color: "teal",
                step: "06"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <Card className="h-full border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50">
                  <CardContent className="p-6 sm:p-8 relative">
                    {/* Step Number */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-100 group-hover:text-blue-100 transition-colors">
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={`relative ${getColorClasses(item.color).background} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg ${getColorClasses(item.color).shadow} group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-gray-900 group-hover:text-blue-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 mt-4 sm:mt-6 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm sm:text-base">Learn the details</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
        </div>
      </section>


      {/* Professional FAQ Section - Mobile Optimized */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm mb-4">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              Common Questions
            </div>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                Import Questions
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                Expert Answers
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Get instant answers to the most common questions about importing cars from Japan to South Africa.
            </p>
          </div>
          
          {/* FAQ Cards - Mobile Optimized */}
          <div className="space-y-3 sm:space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 overflow-hidden"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left min-h-[44px]"
                >
                  <CardContent className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 
                        className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pr-4 leading-tight" 
                        itemProp="name"
                      >
                        {faq.question}
                      </h3>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''} ml-2`}>
                        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </button>
                
                {expandedFaq === index && (
                  <div 
                    className="border-t border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <p 
                        className="text-gray-700 text-base sm:text-lg leading-relaxed" 
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                    </CardContent>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
        </div>
      </section>

    </main>
    </>
  )
}