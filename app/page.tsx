'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { LandingPageSkeleton } from '@/components/skeletons/LandingPageSkeleton'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowRight,
  Calculator,
  FileText,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Map,
  Sparkles,
  Star,
  Globe,
  Ship,
  Building,
  Gavel,
  ChevronLeft,
  ChevronRight,
  Phone,
  TrendingUp,
  Package,
  LogIn,
  BookOpen,
  MessageCircle
} from 'lucide-react'
import GuideHeader from '@/components/GuideHeader'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'
import PricingCountdown from '@/components/PricingCountdown'
export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [user, setUser] = useState<any>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const whatsappNumber = "264814756919"
  const whatsappMessage = "Hi! I'm interested in learning more about importing cars from Japan."
  useEffect(() => {
    // Check user authentication
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    // Simulate initial page load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  // Show skeleton while loading
  if (loading) {
    return <LandingPageSkeleton />
  }
  return (
    <>
      <GuideHeader country="na" showCountrySelector={false} />
      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-24 md:pt-32 md:pb-32 overflow-hidden mobile-section">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/75 via-blue-900/60 to-gray-900/75"></div>
        </div>
        <div className="max-w-7xl mx-auto mobile-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* What We Do - Crystal Clear */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-white/95 text-blue-800 px-4 py-2.5 sm:py-2 rounded-full backdrop-blur-sm shadow-lg">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm">Educational Resources & Import Guides</span>
            </div>
            <h1 className="text-center text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
              <span className="block">Learn How to Import Cars</span>
              <span className="block mb-1 sm:mb-2">from Japan</span>
              <span className="block text-yellow-300 mt-1 sm:mt-2 text-xl xs:text-2xl sm:text-3xl md:text-4xl">Step-by-Step Guide for Namibia</span>
            </h1>
            <p className="text-left sm:text-center text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 leading-relaxed bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-5">
              <strong>What we provide:</strong> Educational resources and guides to help you understand the process of importing a quality used car from Japan to Namibia. From research to documentation.
            </p>

            {/* CTA Buttons - Free Guide as Primary - Mobile Optimized */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center">
              {/* PRIMARY CTA - FREE GUIDE (Big, Yellow, Prominent) */}
              <div className="w-full max-w-md">
                <Button
                  size="lg"
                  className="w-full min-h-touch-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-6 py-4 sm:px-10 sm:py-6 text-lg sm:text-xl border-3 border-yellow-300 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  asChild
                >
                  <Link href="/import-guide">
                    Get FREE Import Guide
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                </Button>
                <p className="text-white text-xs sm:text-sm mt-2 text-center font-semibold drop-shadow">
                  No signup required • Instant access
                </p>
              </div>

              {/* Secondary CTAs - Smaller, Less Prominent */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                {!user && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 min-h-touch bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-700 px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base transition-all active:scale-95"
                    asChild
                  >
                    <Link href="/auth/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Member Login
                    </Link>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 min-h-touch bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-blue-700 px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base transition-all active:scale-95"
                  asChild
                >
                  <Link href="#countries">
                    <Globe className="mr-2 h-4 w-4" />
                    Select Country
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Highlights - Mobile Optimized */}
      <section className="mobile-section bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything You Need to Import Successfully
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Professional tools and comprehensive resources
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="bg-white mobile-card shadow-lg border-2 border-gray-200 hover:border-green-400 transition-all hover:shadow-xl active:scale-95">
              <Calculator className="h-10 w-10 sm:h-8 sm:w-8 text-green-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900 text-lg sm:text-base md:text-lg mb-2 text-center">Cost Calculator</div>
              <div className="text-sm text-gray-600 text-center">Calculate all import costs upfront</div>
            </div>
            <div className="bg-white mobile-card shadow-lg border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-xl active:scale-95">
              <FileText className="h-10 w-10 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900 text-lg sm:text-base md:text-lg mb-2 text-center">Complete Guides</div>
              <div className="text-sm text-gray-600 text-center">Step-by-step import process</div>
            </div>
            <div className="bg-white mobile-card shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-all hover:shadow-xl active:scale-95">
              <Ship className="h-10 w-10 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-3" />
              <div className="font-bold text-gray-900 text-lg sm:text-base md:text-lg mb-2 text-center">Container Sharing</div>
              <div className="text-sm text-gray-600 text-center">Find platforms to share containers</div>
            </div>
          </div>
        </div>
      </section>
      {/* Choose Your Country - Mobile Optimized */}
      <section id="countries" className="mobile-section bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Select Your Country to Start
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4">
              View specific import guides for your country
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
              <Ship className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="font-semibold">Primary Port: Walvis Bay - Fastest & Most Efficient Route</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/na/guide" className="block group">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-300 active:scale-95 h-full">
                <CardContent className="mobile-card text-center">
                  <div className="text-5xl sm:text-4xl mb-3">🇳🇦</div>
                  <h3 className="font-bold text-xl sm:text-lg mb-2">Namibia</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Direct to Walvis Bay</p>
                  <div className="text-xs sm:text-xs text-gray-600 space-y-1">
                    <p>✓ Home port advantage</p>
                    <p>✓ Fastest clearance</p>
                    <p>✓ Local expertise</p>
                  </div>
                  <div className="mt-4 text-blue-600 font-semibold min-h-touch flex items-center justify-center">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/za/guide" className="block group">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-green-300 active:scale-95 h-full">
                <CardContent className="mobile-card text-center">
                  <div className="text-5xl sm:text-4xl mb-3">🇿🇦</div>
                  <h3 className="font-bold text-xl sm:text-lg mb-2">South Africa</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Durban / Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Two port options</p>
                    <p>✓ Walvis Bay faster</p>
                    <p>✓ Direct transport home</p>
                  </div>
                  <div className="mt-4 text-green-600 font-semibold min-h-touch flex items-center justify-center">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bw/guide" className="block group">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-yellow-300 active:scale-95 h-full">
                <CardContent className="mobile-card text-center">
                  <div className="text-5xl sm:text-4xl mb-3">🇧🇼</div>
                  <h3 className="font-bold text-xl sm:text-lg mb-2">Botswana</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Via Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Trans-Kalahari route</p>
                    <p>✓ Faster than Durban</p>
                    <p>✓ Efficient route</p>
                  </div>
                  <div className="mt-4 text-yellow-600 font-semibold min-h-touch flex items-center justify-center">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/zm/guide" className="block group">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-purple-300 active:scale-95 h-full">
                <CardContent className="mobile-card text-center">
                  <div className="text-5xl sm:text-4xl mb-3">🇿🇲</div>
                  <h3 className="font-bold text-xl sm:text-lg mb-2">Zambia</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Via Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Katima Mulilo corridor</p>
                    <p>✓ Shorter transit time</p>
                    <p>✓ Better port efficiency</p>
                  </div>
                  <div className="mt-4 text-purple-600 font-semibold min-h-touch flex items-center justify-center">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      {/* What's Included - Clear Value Proposition */}
      <section id="get-access" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What's Included in Your Access
            </h2>
            <p className="text-xl text-gray-600">
              Complete import platform and professional tools
            </p>
          </div>
          {/* 6 Essential Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600 mb-3" />
                <CardTitle>Advanced Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Professional duty calculator and budget estimator. Calculate all import costs accurately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardHeader>
                <FileText className="h-10 w-10 text-green-600 mb-3" />
                <CardTitle>Complete Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Import guides, documentation templates, Japan auction system training, and costly mistakes to avoid.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-pink-300 transition-colors">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-pink-600 mb-3" />
                <CardTitle>Document Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sample import documents and guides to help you understand required paperwork.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-300 transition-colors">
              <CardHeader>
                <Map className="h-10 w-10 text-orange-600 mb-3" />
                <CardTitle>Real Import Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Actual vehicle imports with complete cost breakdowns from Japan.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-cyan-300 transition-colors">
              <CardHeader>
                <Package className="h-10 w-10 text-cyan-600 mb-3" />
                <CardTitle>Container Sharing Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Learn about container sharing options and connect with other importers through trusted platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Gavel className="h-10 w-10 text-purple-600 mb-3" />
                <CardTitle>Where to Buy Cars</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Directory of Japan auction platforms and trusted exporters to source quality vehicles.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Free Guide CTA */}
          <div className="text-center mb-8">
            <Card className="inline-block p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
              <p className="text-gray-900 font-semibold mb-3">
                🎁 Not sure yet? <strong>View our FREE Import Guide</strong> first
              </p>
              <p className="text-sm text-gray-600 mb-4">
                See a real vehicle import example with actual costs and invoice before buying
              </p>
              <Button
                variant="outline"
                className="border-2 border-yellow-600 text-yellow-800 hover:bg-yellow-600 hover:text-white font-bold"
                asChild
              >
                <Link href="/import-guide">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Free Guide
                </Link>
              </Button>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 px-4">
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">GET ACCESS: $87 USD</h3>
                <p className="text-sm text-gray-600 mb-4">Lifetime access • N$1,500 (Namibia)</p>
              </div>
            </div>
            <ValidatedCheckoutButton
              tier="mastery"
              country="na"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 sm:py-6 px-6 sm:px-12 text-base sm:text-lg rounded-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">Get Lifetime Access - $87 USD</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </ValidatedCheckoutButton>
            <p className="text-xs sm:text-sm text-gray-600 mt-4">
              One-time payment • Instant digital access • Educational materials only
            </p>
            <p className="text-xs text-gray-500 mt-2">
              7-day refund available if you haven't accessed the content
            </p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline-block group-hover:inline-block text-sm font-bold pr-2">
          Questions? Chat with us
        </span>
      </a>
    </>
  )
}