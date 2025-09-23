'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  AlertCircle,
  CheckCircle,
  Globe,
  DollarSign,
  FileText,
  Shield,
  ExternalLink,
  AlertTriangle,
  Users,
  Gavel,
  Building2,
  TrendingUp,
  X,
  Info,
  Lock,
  Star
} from 'lucide-react'

interface Exporter {
  name: string
  website: string
  auctionAccess: 'Yes' | 'Likely'
  description: string
  highlight?: string
}

export default function JapanAuctionsClientPage() {
  const { user, loading, userTier, userEmail } = useAuth()
  const [selectedTab, setSelectedTab] = useState<'guide' | 'exporters' | 'auction-sheet'>('guide')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading auction guide...</p>
        </div>
      </div>
    )
  }

  // Remove tier check - all portal users have access
  if (!user) {
    return (
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <Card className="p-6 sm:p-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full mb-4">
            <Gavel className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Loading Japan Auctions...</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Please wait while we verify your access.
          </p>
        </Card>
      </div>
    )
  }

  const currency = 'N$'

  // Exporters list
  const exporters: Exporter[] = [
    {
      name: 'Integrity Exports',
      website: 'integrityexports.com',
      auctionAccess: 'Yes',
      description: '120+ auction access, invoice transparency',
      highlight: 'Top Pick'
    },
    {
      name: 'SAT Japan',
      website: 'satjapan.com',
      auctionAccess: 'Yes',
      description: 'Hybrid stock & auction, Africa focus',
      highlight: 'Africa'
    },
    {
      name: 'AAA Japan',
      website: 'aaajapan.com',
      auctionAccess: 'Yes',
      description: '70,000+ lots daily from 120+ auctions'
    },
    {
      name: 'Provide Cars',
      website: 'providecars.co.jp',
      auctionAccess: 'Yes',
      description: 'Est. 1997, bilingual support'
    },
    {
      name: 'CSOJapan',
      website: 'csojapan.com',
      auctionAccess: 'Yes',
      description: '50,000+ lots daily online'
    },
    {
      name: 'Japan Tradings',
      website: 'japan-tradings.com',
      auctionAccess: 'Yes',
      description: 'Very low fees (~¥60,000)',
      highlight: 'Low Fees'
    }
  ]

  // Process steps - Mobile optimized
  const processSteps = [
    { step: 1, title: 'Register', icon: '📝', desc: 'Sign up with exporter' },
    { step: 2, title: 'Deposit', icon: '💰', desc: '¥100-200K deposit' },
    { step: 3, title: 'Browse', icon: '🔍', desc: 'View auction cars' },
    { step: 4, title: 'Check', icon: '📋', desc: 'Read auction sheets' },
    { step: 5, title: 'Bid', icon: '🎯', desc: 'Set max price' },
    { step: 6, title: 'Win', icon: '🎉', desc: 'Pay balance' },
    { step: 7, title: 'Ship', icon: '🚢', desc: 'Export to port' },
    { step: 8, title: 'Receive', icon: '✅', desc: 'Get documents' }
  ]

  // Auction Sheet Grade Definitions
  const auctionGrades = [
    { grade: '6', description: 'Brand new vehicle', quality: 'Perfect', color: 'bg-green-100 text-green-800' },
    { grade: '5', description: 'Almost new, pristine condition', quality: 'Excellent', color: 'bg-green-100 text-green-800' },
    { grade: '4.5', description: 'Very clean with minimal wear', quality: 'Excellent', color: 'bg-green-100 text-green-800' },
    { grade: '4', description: 'Good condition, common for imports', quality: 'Very Good', color: 'bg-blue-100 text-blue-800' },
    { grade: '3.5', description: 'Average condition, some wear', quality: 'Good', color: 'bg-yellow-100 text-yellow-800' },
    { grade: '3', description: 'Below average, noticeable issues', quality: 'Fair', color: 'bg-orange-100 text-orange-800' },
    { grade: '2', description: 'Poor condition, major issues', quality: 'Poor', color: 'bg-red-100 text-red-800' },
    { grade: 'R/RA', description: 'Repaired accident damage', quality: 'Accident', color: 'bg-red-100 text-red-800' },
  ]

  const interiorGrades = [
    { grade: 'A', description: 'Excellent - Like new, no issues', color: 'text-green-600' },
    { grade: 'B', description: 'Good - Minor wear, clean overall', color: 'text-blue-600' },
    { grade: 'C', description: 'Fair - Noticeable wear, some stains', color: 'text-yellow-600' },
    { grade: 'D', description: 'Poor - Heavy wear, needs cleaning', color: 'text-red-600' },
  ]

  const conditionCodes = [
    { code: 'A1', meaning: 'Small scratch (< 10cm)', icon: '➖' },
    { code: 'A2', meaning: 'Medium scratch (10-20cm)', icon: '➖' },
    { code: 'A3', meaning: 'Large scratch (> 20cm)', icon: '➖' },
    { code: 'U1', meaning: 'Small dent (< golf ball)', icon: '🔵' },
    { code: 'U2', meaning: 'Medium dent (golf ball size)', icon: '🔵' },
    { code: 'U3', meaning: 'Large dent (> tennis ball)', icon: '🔵' },
    { code: 'W1', meaning: 'Repaired/replaced panel', icon: '🔧' },
    { code: 'S1', meaning: 'Rust present', icon: '🟤' },
    { code: 'C1', meaning: 'Corrosion', icon: '🟫' },
    { code: 'X', meaning: 'Needs replacement', icon: '❌' },
    { code: 'XX', meaning: 'Replaced part', icon: '✅' },
    { code: 'P', meaning: 'Paint work done', icon: '🎨' },
  ]

  // Must-ask questions - shortened for mobile
  const questions = [
    'Licensed auction member (USS, JU, TAA)?',
    'JUMVEA member?',
    'Deposit amount & refund policy?',
    'Service/commission fee?',
    'English auction sheets?',
    'Total cost estimate?',
    'Which documents included?',
    'Time from win to shipment?'
  ]

  // Red flags - shortened for mobile
  const redFlags = [
    'Personal account payments',
    'No real auction sheets',
    'No Japan address/registration',
    'Too cheap promises',
    'Pressure tactics',
    'No refund policy',
    'No references'
  ]

  return (
    <div className="w-full pb-20">
      {/* Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-2xl p-4 sm:p-8 text-white shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              🚘 Japan Auction Guide
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-3 sm:mb-4">
              Buy cars directly from Japanese auctions
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">MASTERY</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">20+ Exporters</span>
              </div>
            </div>
          </div>
          <Gavel className="hidden sm:block h-12 w-12 lg:h-16 lg:w-16 text-yellow-300 opacity-50" />
        </div>
      </div>

      {/* Tab Navigation - Mobile Optimized */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-6">
        <Button
          variant={selectedTab === 'guide' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('guide')}
          className="flex-1 text-xs sm:text-sm"
        >
          <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Guide
        </Button>
        <Button
          variant={selectedTab === 'auction-sheet' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('auction-sheet')}
          className="flex-1 text-xs sm:text-sm"
        >
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Auction Sheet
        </Button>
        <Button
          variant={selectedTab === 'exporters' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('exporters')}
          className="flex-1 text-xs sm:text-sm"
        >
          <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Exporters
        </Button>
      </div>

      {selectedTab === 'guide' ? (
        <div className="space-y-4 sm:space-y-6">
          {/* How It Works - Mobile Optimized */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              How It Works
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm sm:text-base">Big Auctions</strong>
                  <p className="text-xs sm:text-sm text-gray-600">Only licensed dealers can bid</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm sm:text-base">You need an agent</strong>
                  <p className="text-xs sm:text-sm text-gray-600">Exporter bids on your behalf</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm sm:text-base">Full service</strong>
                  <p className="text-xs sm:text-sm text-gray-600">They handle export & shipping</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Stock vs Auction - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Card className="p-3 sm:p-4 border-2 border-gray-200">
              <h3 className="font-bold text-sm sm:text-base mb-2">📦 Stock Dealers</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">e.g., SBT, BE FORWARD</p>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>• Pre-bought cars</li>
                <li>• Easier but pricier</li>
                <li>• No auction access</li>
              </ul>
            </Card>
            
            <Card className="p-3 sm:p-4 border-2 border-green-200 bg-green-50">
              <h3 className="font-bold text-sm sm:text-base mb-2">🔨 Auction Exporters</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">e.g., Integrity, SAT</p>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li className="flex items-start gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time auctions</span>
                </li>
                <li className="flex items-start gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>You set max bid</span>
                </li>
                <li className="flex items-start gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Cheaper & transparent</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Process Steps - Mobile Optimized Grid */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Auction Process
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {processSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mx-auto mb-2">
                    {step.step}
                  </div>
                  <div className="text-lg sm:text-xl mb-1">{step.icon}</div>
                  <h4 className="font-semibold text-xs sm:text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-600 hidden sm:block">{step.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Costs - Mobile Optimized */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              Cost Breakdown
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>Auction Price</span>
                <span className="font-mono">Variable</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Service Fee</span>
                <span className="font-mono">¥70-120K</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Inland Transport</span>
                <span className="font-mono">¥10-30K</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Export Fees</span>
                <span className="font-mono">~¥16K</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Ocean Shipping</span>
                <span className="font-mono">$1-1.4K</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded text-xs sm:text-sm">
              💡 Total: Auction + {currency}15-25K fees + shipping
            </div>
          </Card>

          {/* Questions and Red Flags - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Card className="p-3 sm:p-4">
              <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                Must Ask
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                {questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-green-600">✓</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-3 sm:p-4 border-2 border-red-200 bg-red-50">
              <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                Red Flags 🚨
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                {redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <X className="h-3 w-3 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-800">{flag}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      ) : selectedTab === 'auction-sheet' ? (
        <div className="space-y-4 sm:space-y-6">
          {/* Auction Sheet Overview */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              🚘 What is an Auction Sheet?
            </h2>
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-700">
                An inspection report created by Japanese auction houses for every vehicle sold.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Professional Inspection</p>
                    <p className="text-xs text-gray-600">By certified inspectors</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">True Condition</p>
                    <p className="text-xs text-gray-600">Before bidding</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-purple-600 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Detailed Report</p>
                    <p className="text-xs text-gray-600">All issues documented</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Information Section */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              📑 Key Information on an Auction Sheet
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="font-semibold text-sm mb-1">Vehicle Details</h4>
                <p className="text-xs text-gray-600">
                  Make, model, year, chassis number, engine size, mileage, fuel type
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <h4 className="font-semibold text-sm mb-1">Overall Auction Grade</h4>
                <p className="text-xs text-gray-600">
                  Quality rating of the entire vehicle (6 to R)
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <h4 className="font-semibold text-sm mb-1">Interior Grade</h4>
                <p className="text-xs text-gray-600">
                  Interior condition rating (A to D)
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <h4 className="font-semibold text-sm mb-1">Condition Diagram</h4>
                <p className="text-xs text-gray-600">
                  Car outline with marks for dents, scratches, rust, repairs
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-3">
                <h4 className="font-semibold text-sm mb-1">Inspector's Notes</h4>
                <p className="text-xs text-gray-600">
                  Japanese text comments on mechanical issues, modifications, warnings
                </p>
              </div>
            </div>
          </Card>

          {/* Auction Grades Table */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              ⭐ Overall Auction Grades
            </h3>
            <div className="overflow-x-auto">
              <div className="space-y-2">
                {auctionGrades.map((grade) => (
                  <div key={grade.grade} className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded font-bold text-sm min-w-[3rem] text-center ${grade.color}`}>
                      {grade.grade}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{grade.quality}</span>
                      <span className="text-xs text-gray-600 ml-2">{grade.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 <strong>Tip:</strong> Grade 4 and above are excellent for imports. Grade 3.5 is acceptable if priced well.
              </p>
            </div>
          </Card>

          {/* Interior Grades */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              🚗 Interior Grades
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {interiorGrades.map((grade) => (
                <div key={grade.grade} className="flex items-start gap-2">
                  <span className={`font-bold text-lg ${grade.color}`}>
                    {grade.grade}
                  </span>
                  <p className="text-xs sm:text-sm">{grade.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Condition Codes */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              🗺️ Condition Diagram Codes
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              These codes appear on the car outline to mark specific issues:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {conditionCodes.map((code) => (
                <div key={code.code} className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{code.icon}</span>
                  <span className="font-mono font-bold text-blue-600">{code.code}</span>
                  <span className="text-xs text-gray-600">= {code.meaning}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Important Tips */}
          <Card className="p-4 sm:p-6 bg-yellow-50 border-yellow-200">
            <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2 text-yellow-900">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              Important Tips
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Always get the auction sheet translated if you don't read Japanese</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>R or RA grades indicate accident history - avoid unless very cheap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Check for matching chassis numbers between sheet and vehicle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Low mileage with poor grade might indicate odometer tampering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Ask your exporter for high-resolution auction sheet images</span>
              </li>
            </ul>
          </Card>

          {/* How to Read Section */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              🔍 How to Read an Auction Sheet
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <p className="text-sm font-semibold">Check the Grade First</p>
                  <p className="text-xs text-gray-600">Look for the large number/letter in a box (4, 4.5, 5, etc.)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <p className="text-sm font-semibold">Verify Mileage</p>
                  <p className="text-xs text-gray-600">Usually shown in kilometers, check if it matches the age</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <p className="text-sm font-semibold">Examine the Car Map</p>
                  <p className="text-xs text-gray-600">Look for concentration of marks in specific areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                <div>
                  <p className="text-sm font-semibold">Interior Grade Check</p>
                  <p className="text-xs text-gray-600">Letter grade (A-D) indicates cabin condition</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                <div>
                  <p className="text-sm font-semibold">Get Translation</p>
                  <p className="text-xs text-gray-600">Inspector notes often contain crucial mechanical info</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Exporters Directory - Mobile Optimized */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Verified Exporters
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Companies with real auction access. Verify before engaging.
            </p>
            
            <div className="space-y-3">
              {exporters.map((exporter, index) => (
                <Card key={index} className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm sm:text-base">{exporter.name}</h3>
                        {exporter.highlight && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {exporter.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">{exporter.description}</p>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        <span className="text-green-600">Auction Access</span>
                      </div>
                    </div>
                    <a
                      href={`https://${exporter.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium w-full sm:w-auto mt-2 sm:mt-0 py-1 sm:py-0"
                    >
                      Visit Site
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Advanced Auction Strategies Section - From Mastery */}
          <Card className="p-4 sm:p-6 border-2 border-green-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-green-800">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              Japanese Auction Mastery
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Advanced strategies for buying directly from Japanese auctions
            </p>

            {/* Auction Grading Deep Dive */}
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3">📊 Understanding Auction Grades</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Grade System Details:</h4>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li><strong>S:</strong> Brand new / Nearly new (rare)</li>
                    <li><strong>6:</strong> Extremely low mileage, mint condition</li>
                    <li><strong>5:</strong> Excellent, minimal wear</li>
                    <li><strong>4.5:</strong> Very good, light use visible</li>
                    <li><strong>4:</strong> Good condition, normal wear</li>
                    <li><strong>3.5:</strong> Average, visible wear</li>
                    <li><strong>3:</strong> Below average, issues present</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Interior Grades Explained:</h4>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li><strong>A:</strong> Like new, pristine</li>
                    <li><strong>B:</strong> Clean, minimal wear</li>
                    <li><strong>C:</strong> Average wear, usable</li>
                    <li><strong>D:</strong> Poor, needs work</li>
                  </ul>
                  <p className="text-xs text-green-700 mt-2">
                    💡 Pro Tip: Grade 4/B offers best value for money
                  </p>
                </div>
              </div>
            </div>

            {/* Best Times to Buy */}
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3">⏰ Optimal Buying Times</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Seasonal Opportunities:</h4>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li>• <strong>March-April:</strong> Financial year-end deals</li>
                    <li>• <strong>September:</strong> Model year clearance</li>
                    <li>• <strong>December:</strong> Year-end inventory clear</li>
                    <li>• <strong>Avoid May:</strong> Golden Week holidays</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Weekly Patterns:</h4>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li>• <strong>Tuesday:</strong> Most inventory available</li>
                    <li>• <strong>Thursday:</strong> Best deals typically</li>
                    <li>• <strong>Friday:</strong> Higher competition</li>
                    <li>• <strong>Monday:</strong> Leftover bargains</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Smart Bidding Tactics */}
            <div className="bg-purple-50 p-4 sm:p-6 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3">🎯 Professional Bidding Tactics</h3>
              <ol className="space-y-2 text-xs sm:text-sm">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <div>
                    <strong>Calculate Maximum:</strong> Total budget ÷ 2.2 - shipping = max bid
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <div>
                    <strong>Research History:</strong> Check same model's prices over 30 days
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <div>
                    <strong>Stay Disciplined:</strong> Lost auction = saved mistake. More cars tomorrow
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <div>
                    <strong>Read USS Sheets:</strong> Master auction sheets to spot hidden damage
                  </div>
                </li>
              </ol>
            </div>

            {/* Platform Comparison */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3">🌐 Platform Comparison</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-sm">Direct Purchase Sites:</h4>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li>• <strong>SBT Japan:</strong> Fixed prices, beginner-friendly, English support</li>
                    <li>• <strong>BE FORWARD:</strong> Large inventory, negotiable prices</li>
                    <li>• <strong>Japan Partner:</strong> Good for parts and accessories</li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-sm">Auction Access (Agent Required):</h4>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li>• <strong>USS Auctions:</strong> Largest, 150,000+ cars weekly</li>
                    <li>• <strong>JAA:</strong> Luxury/sports car focus</li>
                    <li>• <strong>TAA:</strong> Toyota specialist auctions</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Critical Auction House Reality - Based on Japan Tradings Experience */}
          <Card className="p-4 sm:p-6 border-2 border-red-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              The Reality of Japanese Car Auctions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              What actually happens at auction houses - critical information most exporters won't tell you
            </p>

            {/* How Auctions Really Work */}
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base mb-3">⚡ The Speed Problem</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="text-gray-700">
                  <strong>Reality Check:</strong> 1,200-8,000 cars are auctioned DAILY at each location
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Each car sells in about <strong>15 seconds</strong></li>
                  <li>• Inspectors have less than <strong>1 minute per car</strong> for checking</li>
                  <li>• Auction starts 9:30am, inspectors arrive 7:00am</li>
                  <li>• 100+ target cars to check in 2-3 hours</li>
                  <li>• One button push = ¥3,000-6,000 bid increase</li>
                </ul>
                <p className="text-red-700 font-semibold mt-2">
                  ⚠️ This is why cars often arrive different than described!
                </p>
              </div>
            </div>

            {/* Auction Sheet Symbols Explained */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base mb-3">📋 Auction Sheet Symbol Guide</h3>
              <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Scratch Codes:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>A:</strong> Minor scratch</li>
                    <li><strong>A1:</strong> Small scratch (< 10cm)</li>
                    <li><strong>A2:</strong> Medium scratch (10-20cm)</li>
                    <li><strong>A3:</strong> Large scratch - needs paint</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Dent Codes:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>D:</strong> Pin dent</li>
                    <li><strong>D2:</strong> Multiple dents</li>
                    <li><strong>D3:</strong> Needs panel work</li>
                    <li><strong>D4:</strong> Major panel work required</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-3">
                💡 Higher numbers = more damage. Position on diagram shows exact location.
              </p>
            </div>

            {/* Grade Reality Check */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base mb-3">🎯 What Grades REALLY Mean</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="border-l-4 border-green-500 pl-3">
                  <p><strong>Grade 5:</strong> No repairs needed, most expensive</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <p><strong>Grade 4.5:</strong> Minor panel work or bumper repair</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <p><strong>Grade 4:</strong> 1-2 panels + 1 bumper repair (Most cost-effective)</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-3">
                  <p><strong>Grade 3.5:</strong> 3-4 panels + 1-2 bumpers (Average condition)</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-3">
                  <p><strong>Grade 3:</strong> 4-5 panels + bumpers (Not recommended)</p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <p><strong>A or R:</strong> Accident history (Some buyers accept for sports cars)</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-100 rounded">
                <p className="text-xs font-semibold text-green-800">
                  💰 Sweet Spot: Grade 4 cars offer best value - mostly clean with minor fixes
                </p>
              </div>
            </div>

            {/* Interior Grades */}
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base mb-3">🚗 Interior Condition Grades</h3>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="bg-white p-2 rounded">
                  <p><strong className="text-green-600">A:</strong> Very clean</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p><strong className="text-blue-600">B:</strong> Needs cleaning</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p><strong className="text-yellow-600">C:</strong> Cigarette burns/defects</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p><strong className="text-red-600">D:</strong> Needs work (avoid)</p>
                </div>
              </div>
            </div>

            {/* Critical Warning */}
            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <h3 className="font-bold text-red-900 mb-2">🚨 Why Cars Arrive Different Than Expected</h3>
              <ul className="space-y-1 text-xs sm:text-sm text-red-800">
                <li>• Big exporters check 100+ cars in 2-3 hours</li>
                <li>• No time for double-checking after purchase</li>
                <li>• Cars shipped to port without re-inspection</li>
                <li>• Auction finishes late - no power to check cars at night</li>
                <li>• Small buyers have no power to complain</li>
              </ul>
              <p className="font-bold text-red-900 mt-2">
                Solution: Use agents who check max 40 cars/day and spend 5+ minutes per inspection
              </p>
            </div>
          </Card>

          {/* Major Auction Houses */}
          <Card className="p-4 sm:p-6 border-2 border-blue-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-blue-800">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
              Major Japanese Auction Houses
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <h3 className="font-semibold mb-2">Largest Auction Groups:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• <strong>USS:</strong> 150,000+ cars weekly, 19 locations</li>
                  <li>• <strong>JAA:</strong> Premium/luxury focus</li>
                  <li>• <strong>TAA:</strong> Toyota specialized</li>
                  <li>• <strong>HAA:</strong> Honda/Nissan focus</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Daily Volume:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Small location: 1,200 cars/day</li>
                  <li>• Large location: 8,000 cars/day</li>
                  <li>• Total Japan: 50,000+ cars/day</li>
                  <li>• Bidding speed: 15 seconds/car</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-100 rounded">
              <p className="text-xs font-semibold text-blue-800">
                📌 Note: Only licensed members can enter - you need an agent with proper access
              </p>
            </div>
          </Card>

          {/* Best Times to Buy & Auction Schedule */}
          <Card className="p-4 sm:p-6 border-2 border-green-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-green-800">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              When to Buy & Weekly Auction Schedule
            </h2>

            {/* Best Times to Visit Japan */}
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base mb-3">📅 Best Times to Buy in Japan</h3>
              <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-green-700 mb-2">✅ Best Months:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>March-May:</strong> Spring, good weather</li>
                    <li>• <strong>September-December:</strong> Fall, ideal conditions</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-700 mb-2">❌ Avoid These Times:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Golden Week (May 3-5):</strong> Massive crowds</li>
                    <li>• <strong>Obon (mid-August):</strong> Prices 2-3x normal</li>
                    <li>• <strong>June-July:</strong> Non-stop rain</li>
                    <li>• <strong>August:</strong> Unbearable heat/humidity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Weekly Auction Schedule */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-sm sm:text-base mb-3">📆 Weekly Auction Schedule (Nagoya Area)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs sm:text-sm">
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold">Monday</p>
                  <p className="text-gray-600">USS R-Nagoya</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold">Tuesday</p>
                  <p className="text-gray-600">CAA Gifu</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold">Wednesday</p>
                  <p className="text-gray-600">CAA Chubu</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold">Thursday</p>
                  <p className="text-gray-600">TAA (Toyota)</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold">Friday</p>
                  <p className="text-gray-600">USS Nagoya</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold">Saturday</p>
                  <p className="text-gray-600">GCA</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Note: Different regions have different schedules. This is central Japan (most active area).
              </p>
            </div>

            {/* Expected Costs */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-sm sm:text-base mb-3">💴 Typical Fee Structure (Varies by Agent)</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Deposit Required:</span>
                  <span className="font-semibold">¥80,000-150,000 per car</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Agent Fee:</span>
                  <span className="font-semibold">¥50,000-100,000 per car</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Payment Deadline:</span>
                  <span className="font-semibold text-red-600">3-5 business days</span>
                </div>
                <div className="p-2 bg-red-100 rounded mt-2">
                  <p className="text-xs text-red-800">
                    ⚠️ Missing payment deadline = lose deposit + automatic cancellation
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Critical Warnings & Rules */}
          <Card className="p-4 sm:p-6 border-2 border-red-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              Critical Warnings & Rules
            </h2>
            <div className="p-4 bg-red-50 rounded-lg">
              <ul className="space-y-2 text-xs sm:text-sm text-red-800">
                <li>• Check import restrictions BEFORE bidding (YOUR responsibility)</li>
                <li>• Cancellation after purchase = lose entire deposit</li>
                <li>• Bank charges are YOUR responsibility</li>
                <li>• Missing payment deadline = automatic cancellation</li>
                <li>• No exceptions to these rules - agents are strict</li>
              </ul>
            </div>
          </Card>

          {/* Pricing Strategy */}
          <Card className="p-4 sm:p-6 border-2 border-blue-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-blue-800">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              Smart Pricing Strategy
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ol className="space-y-2 text-xs sm:text-sm">
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <div>Check your local market price for the same model</div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <div>Convert to JPY and bid LOWER than local price</div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <div>Remember: 66,000 cars auctioned weekly = plenty of options</div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <div>Your agent will provide recent auction prices for comparison</div>
                </li>
              </ol>
              <div className="mt-3 p-2 bg-green-100 rounded">
                <p className="text-xs font-semibold text-green-800">
                  💡 Pro Tip: Don't rush - if you miss one, another similar car comes next week
                </p>
              </div>
            </div>
          </Card>

          {/* Documentation You'll Receive */}
          <Card className="p-4 sm:p-6 border-2 border-green-200">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-green-800">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              Documentation You'll Receive
            </h2>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Auction Sheet</p>
                    <p className="text-gray-600">Proves car condition & history</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Invoice from Auction</p>
                    <p className="text-gray-600">Proves actual price paid</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Deregistration Papers</p>
                    <p className="text-gray-600">Required for your registration</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Bill of Lading</p>
                    <p className="text-gray-600">Needed to collect car at port</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Service/Warranty Books</p>
                    <p className="text-gray-600">If available with the car</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Inspection Certificate</p>
                    <p className="text-gray-600">Japanese inspection record</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                📌 Keep all originals safe - customs often keeps them permanently
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}