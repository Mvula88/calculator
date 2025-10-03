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
  BookOpen
} from 'lucide-react'
import GuideHeader from '@/components/GuideHeader'
import ValidatedCheckoutButton from '@/components/validated-checkout-button'
import PricingCountdown from '@/components/PricingCountdown'
export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [user, setUser] = useState<any>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
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
      {/* Hero Section - Clear Value Proposition */}
      <section className="relative pt-20 pb-32 overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-gray-900/70"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* What We Do - Crystal Clear */}
            <div className="mb-6 inline-flex items-center gap-2 bg-white/90 text-blue-800 px-4 py-2 rounded-full backdrop-blur-sm">
              <Globe className="h-4 w-4" />
              <span className="font-semibold">Educational Resources & Import Guides</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Learn How to Import Cars from Japan
              <span className="block text-yellow-300 mt-2 text-2xl sm:text-3xl">Step-by-Step Educational Guide for Southern Africa</span>
            </h1>
            <p className="text-xl text-white mb-6 leading-relaxed bg-black/30 backdrop-blur-sm rounded-lg p-4">
              <strong>What we provide:</strong> Educational resources and guides to help you understand the process of importing a quality used car from Japan to Namibia, South Africa, Botswana, or Zambia. From research to documentation.
            </p>
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-6 inline-block">
              <p className="text-sm text-gray-900">
                <strong>📚 Educational Content Only:</strong> We provide guides and information. We do not import vehicles, provide clearing services, or act as agents.
              </p>
            </div>
            {/* Service Highlights */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200">
                <Calculator className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Cost Calculator</div>
                <div className="text-sm text-gray-600">Calculate all import costs upfront</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200">
                <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Complete Guides</div>
                <div className="text-sm text-gray-600">Step-by-step import process</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-200">
                <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Agent Directory</div>
                <div className="text-sm text-gray-600">Contact info for clearing agents</div>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Already Have Access? Login
                  </Link>
                </Button>
              )}
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                asChild
              >
                <Link href="#countries">
                  <Globe className="mr-2 h-5 w-5" />
                  Select Your Country
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Choose Your Country */}
      <section id="countries" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Select Your Country to Start
            </h2>
            <p className="text-xl text-gray-600">
              View specific import guides for your country
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
              <Ship className="h-4 w-4" />
              <span className="font-semibold">Primary Port: Walvis Bay - Fastest & Most Efficient Route</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/na/guide">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-300">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🇳🇦</div>
                  <h3 className="font-bold text-lg mb-2">Namibia</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Direct to Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Home port advantage</p>
                    <p>✓ Fastest clearance</p>
                    <p>✓ Local expertise</p>
                  </div>
                  <div className="mt-4 text-blue-600 font-semibold">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/za/guide">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-green-300">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🇿🇦</div>
                  <h3 className="font-bold text-lg mb-2">South Africa</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Durban / Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Two port options</p>
                    <p>✓ Walvis Bay faster</p>
                    <p>✓ Direct transport home</p>
                  </div>
                  <div className="mt-4 text-green-600 font-semibold">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bw/guide">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-yellow-300">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🇧🇼</div>
                  <h3 className="font-bold text-lg mb-2">Botswana</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Via Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Trans-Kalahari route</p>
                    <p>✓ Faster than Durban</p>
                    <p>✓ Efficient route</p>
                  </div>
                  <div className="mt-4 text-yellow-600 font-semibold">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/zm/guide">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-purple-300">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🇿🇲</div>
                  <h3 className="font-bold text-lg mb-2">Zambia</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-2">Via Walvis Bay</p>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>✓ Katima Mulilo corridor</p>
                    <p>✓ Shorter transit time</p>
                    <p>✓ Better port efficiency</p>
                  </div>
                  <div className="mt-4 text-purple-600 font-semibold">
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
                  Import guides, documentation templates, and Japan auction system training.
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

          {/* CTA */}
          <div className="text-center mt-12 px-4">
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">LIMITED TIME: $49 USD</h3>
                <p className="text-sm text-gray-600 mb-4">Save $30 - Regular Price $79</p>
              </div>
              <PricingCountdown />
            </div>
            <ValidatedCheckoutButton
              tier="mastery"
              country="na"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 sm:py-6 px-6 sm:px-12 text-base sm:text-lg rounded-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">Get Lifetime Access - $49 USD</span>
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
    </>
  )
}