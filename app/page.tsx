'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import Footer from '@/components/Footer'
import CheckoutButton from '@/components/checkout-button'

export default function HomePage() {
  const [showBeginnerQuiz, setShowBeginnerQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const beginnerQuiz = [
    {
      question: "Do you have at least N$150,000 available for the entire import process?",
      yes: 1,
      no: 0
    },
    {
      question: "Can you wait 6-10 weeks to receive your vehicle?",
      yes: 1,
      no: 0
    },
    {
      question: "Are you comfortable dealing with paperwork and government agencies?",
      yes: 1,
      no: 0
    },
    {
      question: "Do you have a place to store the vehicle if there are delays?",
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
        alert("Great! You're ready to start importing. Get access to our complete import platform!")
      } else {
        alert("Importing might be challenging for you right now. Consider getting our guide to learn more, or working with one of our verified agents.")
      }
    }
  }

  return (
    <>
      <GuideHeader country="na" />

      {/* Hero Section - Clear Value Proposition */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-gray-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* What We Do - Crystal Clear */}
            <div className="mb-6 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <Globe className="h-4 w-4" />
              <span className="font-semibold">The Complete Car Import Platform for Southern Africa</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Import Your Dream Car from Japan
              <span className="block text-blue-600 mt-2">Save 30-50% vs Local Prices</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              <strong>What we do:</strong> We guide you through every step of importing a quality used car from Japan to
              Namibia, South Africa, Botswana, or Zambia. From finding the right car to driving it home.
            </p>

            {/* Clear Outcomes */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Average Savings</div>
                <div className="text-2xl font-bold text-green-600">N$50,000-150,000</div>
                <div className="text-sm text-gray-600">vs local dealer prices</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Total Timeline</div>
                <div className="text-2xl font-bold text-blue-600">6-10 Weeks</div>
                <div className="text-sm text-gray-600">from purchase to delivery</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <Shield className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Success Rate</div>
                <div className="text-2xl font-bold text-purple-600">95%+</div>
                <div className="text-sm text-gray-600">with our guidance</div>
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Get for N$1,499
            </h2>
            <p className="text-xl text-gray-600">
              Complete access to our import platform and tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600 mb-3" />
                <CardTitle>Advanced Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Accurate duty calculator plus simple budget estimator. Know all costs upfront.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Save N$20,000+ from surprises
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-3" />
                <CardTitle>30+ Verified Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Direct contacts for licensed clearing agents across 4 countries.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Worth N$5,000+ in saved fees
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardHeader>
                <FileText className="h-10 w-10 text-green-600 mb-3" />
                <CardTitle>Complete Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Step-by-step import process, Japan auction guide, all documents.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Like having an expert guide
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-300 transition-colors">
              <CardHeader>
                <Map className="h-10 w-10 text-orange-600 mb-3" />
                <CardTitle>Success Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Real import case studies with actual costs and savings data.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Learn from real imports
                </div>
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

          {/* ROI Box */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Return on Investment</h3>
                <p className="text-gray-600 mb-4">The platform pays for itself with your first import</p>
                <p className="text-3xl font-bold text-green-600">
                  Save N$24,000-46,000
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Avoid costly mistakes with our proven system
                </p>
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
              One-time payment • Lifetime updates • Instant access
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
              View specific requirements and guides for your country
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/na/guide">
              <Card className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-300">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-3">🇳🇦</div>
                  <h3 className="font-bold text-lg mb-2">Namibia</h3>
                  <p className="text-sm text-gray-600 mb-3">Port: Walvis Bay</p>
                  <div className="text-xs space-y-1">
                    <p>• 25% customs duty</p>
                    <p>• 15% VAT</p>
                    <p>• Environmental levy</p>
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
                  <p className="text-sm text-gray-600 mb-3">Port: Durban</p>
                  <div className="text-xs space-y-1">
                    <p>• 25% customs duty</p>
                    <p>• 15% VAT</p>
                    <p>• Ad valorem tax</p>
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
                  <p className="text-sm text-gray-600 mb-3">Via: Walvis Bay/Durban</p>
                  <div className="text-xs space-y-1">
                    <p>• 25% customs duty</p>
                    <p>• 12% VAT</p>
                    <p>• SACU member</p>
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
                  <p className="text-sm text-gray-600 mb-3">Via: Multiple routes</p>
                  <div className="text-xs space-y-1">
                    <p>• Specific duty rates</p>
                    <p>• 16% VAT</p>
                    <p>• Excise duty</p>
                  </div>
                  <div className="mt-4 text-purple-600 font-semibold">
                    View Guide →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Not sure which guide to read? Start with Namibia - it has the most comprehensive information.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}