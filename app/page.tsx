'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import {
  ArrowRight,
  Calculator,
  FileText,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  DollarSign,
  Map,
  Sparkles,
  Star,
  Globe,
  Ship,
  Building,
  Gavel
} from 'lucide-react'
import GuideHeader from '@/components/GuideHeader'
import CheckoutButton from '@/components/checkout-button'

export default function HomePage() {
  const [showBeginnerQuiz, setShowBeginnerQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const beginnerQuiz = [
    {
      question: "Do you have sufficient budget for importing a vehicle?",
      yes: 1,
      no: 0
    },
    {
      question: "Can you wait the typical import timeframe?",
      yes: 1,
      no: 0
    },
    {
      question: "Are you comfortable handling import documentation?",
      yes: 1,
      no: 0
    },
    {
      question: "Do you have arrangements for vehicle storage if needed?",
      yes: 1,
      no: 0
    }
  ]

  const handleQuizAnswer = (points: number) => {
    const newScore = quizScore + points
    setQuizScore(newScore)

    if (currentQuestion < beginnerQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz complete
      setShowBeginnerQuiz(false)
      if (newScore >= 3) {
        toast.success(
          <div className="space-y-2">
            <p className="font-semibold">🎉 Great! You're Ready to Import!</p>
            <p className="text-sm">Based on your answers, you appear ready to start importing vehicles from Japan.</p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={() => {
                  toast.dismiss()
                  document.getElementById('get-access')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Access Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  toast.dismiss()
                  document.getElementById('import-basics')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Learn More First
              </Button>
            </div>
          </div>,
          {
            duration: 10000,
          }
        )
      } else {
        toast.info(
          <div className="space-y-2">
            <p className="font-semibold">📚 Let's Build Your Knowledge First</p>
            <p className="text-sm">Importing requires preparation and knowledge. Our platform will help you get ready.</p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={() => {
                  toast.dismiss()
                  document.getElementById('import-basics')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Learn Import Basics
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.dismiss()}
              >
                Close
              </Button>
            </div>
          </div>,
          {
            duration: 10000,
          }
        )
      }
    }
  }

  return (
    <>
      <GuideHeader country="na" />

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
              <span className="font-semibold">The Complete Import Education Guide</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Learn How to Import Cars from Japan
              <span className="block text-yellow-300 mt-2 text-2xl sm:text-3xl">Step-by-Step Guide for Southern Africa</span>
            </h1>

            <p className="text-xl text-white mb-8 leading-relaxed bg-black/30 backdrop-blur-sm rounded-lg p-4">
              <strong>What we do:</strong> We guide you through every step of importing a quality used car from Japan to
              Namibia, South Africa, Botswana, or Zambia. From finding the right car to driving it home.
            </p>

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
                <div className="font-bold text-gray-900">Verified Agents</div>
                <div className="text-sm text-gray-600">Trusted clearing agents network</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
                onClick={() => setShowBeginnerQuiz(true)}
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                Am I Ready to Import? (Take Quiz)
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg"
                asChild
              >
                <Link href="#import-basics">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn Import Basics First
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beginner Quiz Modal */}
      {showBeginnerQuiz && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>Import Readiness Assessment</CardTitle>
              <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {beginnerQuiz.length}</p>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{beginnerQuiz[currentQuestion].question}</p>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleQuizAnswer(beginnerQuiz[currentQuestion].yes)}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleQuizAnswer(beginnerQuiz[currentQuestion].no)}
                  variant="outline"
                  className="flex-1"
                >
                  No
                </Button>
              </div>
              <Button
                onClick={() => setShowBeginnerQuiz(false)}
                variant="ghost"
                className="w-full mt-4"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Import Basics - Minimal Education */}
      <section id="import-basics" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Import Basics: What You Need to Know
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the fundamentals before you start
            </p>
          </div>

          {/* What is Car Importing? - Keep this basic explanation */}
          <Card className="mb-12">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                What is Car Importing?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Car importing means buying a used vehicle from another country (usually Japan) and shipping it to your country.
                Instead of buying from local dealers who import cars and add their profit margins, you become the importer.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Why Japan?</p>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Well-maintained vehicles with low mileage</li>
                  <li>• Strict inspection system ensures quality</li>
                  <li>• Large selection (50,000+ vehicles daily)</li>
                  <li>• Right-hand drive like Southern Africa</li>
                </ul>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Want to learn the import terms and process?</strong> Get full access to our detailed guides, glossary, and tools in the portal.
                </p>
              </div>
            </CardContent>
          </Card>

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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600 mb-3" />
                <CardTitle>Advanced Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Professional duty calculator and budget estimator. Calculate all import costs accurately before purchasing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-3" />
                <CardTitle>30+ Verified Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Directory of licensed clearing agents across Namibia, South Africa, Botswana, and Zambia with verified contact information.
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
                  Comprehensive import guides, documentation templates, and Japan auction system training materials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-300 transition-colors">
              <CardHeader>
                <Map className="h-10 w-10 text-orange-600 mb-3" />
                <CardTitle>Success Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Import case studies and examples showing the complete process from purchase to delivery.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex gap-3">
              <Gavel className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Japan Auction Training</h4>
                <p className="text-sm text-gray-600">Read auction sheets, understand grading, avoid bad deals</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Ship className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Shipping Companies</h4>
                <p className="text-sm text-gray-600">Container shipping, RoRo, and shared container contacts</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Building className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Government Contacts</h4>
                <p className="text-sm text-gray-600">NamRA, SARS, BURS, ZRA requirements and contacts</p>
              </div>
            </div>
          </div>

          {/* Platform Value */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Import Platform</h3>
                <p className="text-gray-600 mb-4">Complete tools and resources for car importing</p>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Accurate cost calculations
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Verified agent network
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Step-by-step guidance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <CheckoutButton
              tier="mastery"
              country="na"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-12 text-lg rounded-lg transition-all duration-300 hover:shadow-xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get Lifetime Access - N$1,499
              <ArrowRight className="ml-2 h-5 w-5" />
            </CheckoutButton>
            <p className="text-sm text-gray-600 mt-4">
              One-time payment • Instant access • Regular updates
            </p>
          </div>
        </div>
      </section>

      {/* Choose Your Country */}
      <section className="py-20 bg-white">
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

          <div className="text-center mt-12">
            <div className="inline-block p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 font-semibold mb-2">Why Walvis Bay Port?</p>
              <ul className="text-sm text-blue-800 text-left space-y-1">
                <li>• Less congestion than other ports</li>
                <li>• Faster vessel turnaround times</li>
                <li>• Direct shipping lines from Japan</li>
                <li>• Excellent road connections to all SADC countries</li>
                <li>• Safe & secure - no car hijackings</li>
                <li>• Namibia's stable environment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}