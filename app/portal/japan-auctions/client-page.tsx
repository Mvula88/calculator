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
  const { hasAccess, loading, userTier, userEmail } = useAuth()
  const [selectedTab, setSelectedTab] = useState<'guide' | 'exporters'>('guide')

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
  if (!hasAccess) {
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
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Guide
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
        </div>
      )}
    </div>
  )
}