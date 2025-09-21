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
  TrendingDown,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  DollarSign,
  Map,
  Sparkles,
  ChevronRight,
  Star,
  Globe,
  Ship,
  Building,
  Gavel
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
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
        alert("Great! You're ready to start importing. Let's explore the platform!")
      } else {
        alert("Importing might be challenging for you right now. Consider reviewing our guides first or working with an agent.")
      }
    }
  }

  return (
    <>
      <Header />

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
                <Link href="#import-101">
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

      {/* Import 101 - Basics for Beginners */}
      <section id="import-101" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Import 101: The Basics
            </h2>
            <p className="text-xl text-gray-600">
              New to importing? Start here. We'll explain everything in simple terms.
            </p>
          </div>

          {/* What is Car Importing? */}
          <Card className="mb-8">
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
                <ul className="space-y-2 text-green-800">
                  <li>• Japanese cars are well-maintained and have low mileage</li>
                  <li>• Strict inspection system (Shaken) ensures quality</li>
                  <li>• Large selection (50,000+ vehicles at auction daily)</li>
                  <li>• Right-hand drive like Southern Africa</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* The Import Process - Simplified */}
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2">
                <Map className="h-6 w-6 text-green-600" />
                The Import Journey (Simple Version)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Find & Buy (Week 1-2)</h4>
                    <p className="text-gray-600">Search Japanese auctions, place bid, win vehicle, pay</p>
                    <p className="text-sm text-blue-600 mt-1">Budget needed: Vehicle price + N$10,000 Japan fees</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Ship to Africa (Week 3-6)</h4>
                    <p className="text-gray-600">Vehicle loaded on ship at Japanese port, sails to Walvis Bay/Durban</p>
                    <p className="text-sm text-blue-600 mt-1">Budget needed: N$18,500-25,000 shipping</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Clear Customs (Week 7-8)</h4>
                    <p className="text-gray-600">Pay import duties, get clearance, complete paperwork</p>
                    <p className="text-sm text-blue-600 mt-1">Budget needed: 40-65% of vehicle value in taxes</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Register & Drive (Week 9-10)</h4>
                    <p className="text-gray-600">Roadworthy test, registration, license plates</p>
                    <p className="text-sm text-blue-600 mt-1">Budget needed: N$5,000-8,000</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-semibold text-amber-900 mb-2">Total Budget Needed:</p>
                <p className="text-amber-800">Vehicle Price + 80-100% additional costs (shipping, duties, clearing, registration)</p>
                <p className="text-sm text-amber-700 mt-2">Example: N$80,000 car = N$150,000-160,000 total landed cost</p>
              </div>
            </CardContent>
          </Card>

          {/* Common Terms Explained */}
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Import Terms Explained (No Jargon!)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">FOB Price</h4>
                  <p className="text-sm text-gray-600">The car's price in Japan (before shipping)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">CIF Value</h4>
                  <p className="text-sm text-gray-600">Car price + shipping + insurance costs</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Customs Duty</h4>
                  <p className="text-sm text-gray-600">Import tax (usually 25% of car value)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">VAT</h4>
                  <p className="text-sm text-gray-600">Sales tax on imported goods (15-16%)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Clearing Agent</h4>
                  <p className="text-sm text-gray-600">Company that handles customs paperwork for you</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Auction Grade</h4>
                  <p className="text-sm text-gray-600">Japan's car condition rating (3.5+ is good)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Landed Cost</h4>
                  <p className="text-sm text-gray-600">Total cost including all fees and taxes</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Container Sharing</h4>
                  <p className="text-sm text-gray-600">Split shipping costs with other importers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Can Go Wrong? */}
          <Card className="mb-8 border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center gap-2 text-red-900">
                <AlertCircle className="h-6 w-6 text-red-600" />
                Risks & Reality Check
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">Importing isn't risk-free. Here's what can go wrong:</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Delays (Common)</p>
                    <p className="text-sm text-gray-600">Shipping delays, port congestion, paperwork issues can add 2-4 weeks</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Hidden Costs (Occasional)</p>
                    <p className="text-sm text-gray-600">Storage fees, additional inspections, exchange rate changes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Vehicle Condition (Rare with good agents)</p>
                    <p className="text-sm text-gray-600">Car not matching description, hidden damage</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Regulatory Changes (Very Rare)</p>
                    <p className="text-sm text-gray-600">Import rules or duties change while car is in transit</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-900">How We Help Minimize Risks:</p>
                <p className="text-green-800 text-sm">Our platform provides verified agents, accurate calculators, and step-by-step guidance to avoid common pitfalls.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Simple Budget Calculator */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calculator className="h-8 w-8" />
                Quick Budget Estimator (Simple Version)
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Get a rough total cost estimate in seconds (for detailed calculations, use our advanced calculator in the portal)
              </p>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Purchase Price in Japan (¥ Yen)
                  </label>
                  <input
                    type="number"
                    id="quick-vehicle-price"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="e.g., 800000 for ¥800,000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical range: ¥500,000 - ¥2,000,000</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Country
                  </label>
                  <select
                    id="quick-country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  >
                    <option value="na">Namibia</option>
                    <option value="za">South Africa</option>
                    <option value="bw">Botswana</option>
                    <option value="zm">Zambia</option>
                  </select>
                </div>

                <Button
                  className="w-full py-6 text-lg"
                  onClick={() => {
                    const price = parseInt((document.getElementById('quick-vehicle-price') as HTMLInputElement)?.value || '0')
                    const country = (document.getElementById('quick-country') as HTMLSelectElement)?.value

                    if (price > 0) {
                      // Simple rough calculation
                      const exchangeRate = country === 'za' ? 0.13 : 0.14 // Rough exchange rates
                      const localPrice = price * exchangeRate
                      const duties = localPrice * 0.65 // Rough 65% for all duties/taxes
                      const shipping = 25000 // Average shipping
                      const clearing = 12000 // Average clearing
                      const registration = 5000 // Average registration
                      const total = localPrice + duties + shipping + clearing + registration

                      const currency = {
                        'na': 'N$',
                        'za': 'R',
                        'bw': 'P',
                        'zm': 'ZK'
                      }[country] || 'N$'

                      alert(`Rough Estimate:\n\nVehicle: ${currency}${Math.round(localPrice).toLocaleString()}\nDuties & Taxes: ${currency}${Math.round(duties).toLocaleString()}\nShipping: ${currency}${Math.round(shipping).toLocaleString()}\nClearing & Registration: ${currency}${Math.round(clearing + registration).toLocaleString()}\n\nTOTAL: ${currency}${Math.round(total).toLocaleString()}\n\nNote: This is a rough estimate. Access our detailed calculator for accurate figures.`)
                    } else {
                      alert('Please enter a vehicle price')
                    }
                  }}
                >
                  Calculate Rough Total Cost
                </Button>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Rule of Thumb:</strong> Budget for the vehicle price + 80-100% additional costs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What's Included - Clear Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Get for N$1,499
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to successfully import your first car
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Calculator className="h-10 w-10 text-blue-600 mb-3" />
                <CardTitle>Duty Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Accurate import duty calculations for all 4 countries. Know your exact costs before buying.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Saves you from N$20,000+ surprises
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-3" />
                <CardTitle>Verified Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Direct contacts for 30+ licensed clearing agents. Skip the middlemen.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Worth N$5,000+ in saved agent fees
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-300 transition-colors">
              <CardHeader>
                <FileText className="h-10 w-10 text-green-600 mb-3" />
                <CardTitle>Documents & Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  All required forms, templates, and checklists. Never miss a document.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Prevents costly delays
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-300 transition-colors">
              <CardHeader>
                <Map className="h-10 w-10 text-orange-600 mb-3" />
                <CardTitle>Step-by-Step Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Complete roadmap from auction to registration. Know exactly what to do when.
                </p>
                <div className="text-xs text-green-600 font-semibold">
                  Like having an expert beside you
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex gap-3">
              <Gavel className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Japan Auction Access Guide</h4>
                <p className="text-sm text-gray-600">Learn to read auction sheets, understand grading, avoid bad deals</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Ship className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Shipping Company Contacts</h4>
                <p className="text-sm text-gray-600">Direct contacts for container shipping, RoRo, and shared containers</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Building className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Government Contacts</h4>
                <p className="text-sm text-gray-600">NamRA, SARS, BURS, ZRA direct contacts and requirements</p>
              </div>
            </div>
          </div>

          {/* ROI Comparison */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Return on Investment</h3>
                <p className="text-gray-600">The platform pays for itself with your first import</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Without Our Platform:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Agent finder fees: N$3,000-5,000</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Duty calculation errors: N$10,000-30,000</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Documentation mistakes: N$5,000+ in delays</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Wrong shipping choice: N$8,000+ extra</span>
                    </li>
                  </ul>
                  <div className="mt-3 font-bold text-red-600">
                    Potential extra costs: N$26,000-48,000
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">With Our Platform:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Direct agent contacts included</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Accurate duty calculations</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Complete document checklists</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Best shipping options revealed</span>
                    </li>
                  </ul>
                  <div className="mt-3 font-bold text-green-600">
                    One-time cost: N$1,499
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center p-4 bg-white rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  You save N$24,000-46,000 on your first import alone
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
              One-time payment • Lifetime updates • Start importing today
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Import Examples
            </h2>
            <p className="text-xl text-gray-600">
              Actual imports completed using our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h4 className="font-bold mb-2">2019 Toyota Hilux</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Japan Price:</span> <span className="font-semibold">¥1,800,000</span></p>
                  <p><span className="text-gray-600">Total Landed:</span> <span className="font-semibold">N$320,000</span></p>
                  <p><span className="text-gray-600">Local Dealer:</span> <span className="font-semibold">N$485,000</span></p>
                  <p className="text-green-600 font-bold pt-2">Saved: N$165,000 (34%)</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">Imported to Windhoek, September 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h4 className="font-bold mb-2">2018 Honda Fit Hybrid</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Japan Price:</span> <span className="font-semibold">¥980,000</span></p>
                  <p><span className="text-gray-600">Total Landed:</span> <span className="font-semibold">N$175,000</span></p>
                  <p><span className="text-gray-600">Local Dealer:</span> <span className="font-semibold">N$245,000</span></p>
                  <p className="text-green-600 font-bold pt-2">Saved: N$70,000 (29%)</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">Imported to Cape Town, October 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h4 className="font-bold mb-2">2020 Mazda CX-5</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Japan Price:</span> <span className="font-semibold">¥2,200,000</span></p>
                  <p><span className="text-gray-600">Total Landed:</span> <span className="font-semibold">N$385,000</span></p>
                  <p><span className="text-gray-600">Local Dealer:</span> <span className="font-semibold">N$520,000</span></p>
                  <p className="text-green-600 font-bold pt-2">Saved: N$135,000 (26%)</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">Imported to Gaborone, August 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Choose Your Path */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start? Choose Your Country
            </h2>
            <p className="text-xl text-gray-600">
              Select your country to see specific requirements and costs
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
        </div>
      </section>

      <Footer />
    </>
  )
}