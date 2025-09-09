'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
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
  Info
} from 'lucide-react'

interface Exporter {
  name: string
  website: string
  auctionAccess: 'Yes' | 'Likely'
  description: string
  highlight?: string
}

export default function JapanAuctionsPage() {
  const [user, setUser] = useState<any>(null)
  const [entitlement, setEntitlement] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'guide' | 'exporters'>('guide')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login?redirect=/portal/japan-auctions')
        return
      }

      setUser(user)

      // Check entitlement
      const { data: entitlements } = await supabase
        .from('entitlements')
        .select('*')
        .eq('active', true)
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)

      if (entitlements && entitlements.length > 0) {
        const masteryEntitlement = entitlements.find(e => e.tier === 'mastery')
        setEntitlement(masteryEntitlement || entitlements[0])
      }
    } catch (error) {
      console.error('Error checking access:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (!entitlement || entitlement.tier !== 'mastery') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center">
          <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Japan Auctions Guide - Mastery Only</h2>
          <p className="text-gray-600 mb-4">
            This comprehensive guide to Japanese car auctions is available for Import Mastery members only.
          </p>
          <Link 
            href={`/${entitlement?.country || 'na'}/upsell`}
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Upgrade to Mastery →
          </Link>
        </Card>
      </div>
    )
  }

  const currency = entitlement.country === 'na' ? 'N$' :
                   entitlement.country === 'za' ? 'R' :
                   entitlement.country === 'bw' ? 'P' :
                   entitlement.country === 'zm' ? 'K' : 'N$'

  // Exporters list
  const exporters: Exporter[] = [
    {
      name: 'Integrity Exports',
      website: 'integrityexports.com',
      auctionAccess: 'Yes',
      description: '120+ auction access, invoice transparency, budget guarantees',
      highlight: 'Top Recommended'
    },
    {
      name: 'SAT Japan',
      website: 'satjapan.com',
      auctionAccess: 'Yes',
      description: 'Hybrid stock & auction agent, strong Southern Africa focus',
      highlight: 'Africa Focused'
    },
    {
      name: 'AAA Japan (All Auto Auctions)',
      website: 'aaajapan.com',
      auctionAccess: 'Yes',
      description: 'Access to 70,000+ lots daily from 120+ auctions'
    },
    {
      name: 'Provide Cars',
      website: 'providecars.co.jp',
      auctionAccess: 'Yes',
      description: 'Established 1997, clear bidding, bilingual support'
    },
    {
      name: 'CSOJapan',
      website: 'csojapan.com',
      auctionAccess: 'Yes',
      description: '50,000+ lots daily; online auction agent'
    },
    {
      name: 'Japan Tradings',
      website: 'japan-tradings.com',
      auctionAccess: 'Yes',
      description: 'Direct auction export, very low service fees (~¥60,000)',
      highlight: 'Low Fees'
    },
    {
      name: 'AutoTraderImports.com',
      website: 'autotraderimports.com',
      auctionAccess: 'Yes',
      description: 'Live access to USS, TAA, JU, CAA + translated sheets'
    },
    {
      name: 'Prestige Motorsport',
      website: 'prestigemotorsport.jp',
      auctionAccess: 'Yes',
      description: 'Over 80 auctions covered, detailed inspection and support'
    },
    {
      name: 'Japan Auto Auction (Car Tradelines)',
      website: 'cartradelines.com',
      auctionAccess: 'Yes',
      description: 'Access to 50,000+ auctions'
    },
    {
      name: 'Japanesecartrade.com',
      website: 'japanesecartrade.com',
      auctionAccess: 'Likely',
      description: 'General exporter with auction listings'
    },
    {
      name: 'Car From Japan',
      website: 'carfromjapan.com',
      auctionAccess: 'Likely',
      description: 'Top exporters list, includes auction-based exporters'
    },
    {
      name: 'Royal Trading',
      website: 'royaltrading.jp',
      auctionAccess: 'Likely',
      description: 'Trusted exporter included in top rankings'
    },
    {
      name: 'Autorec',
      website: 'autorec.co.jp',
      auctionAccess: 'Likely',
      description: 'Well-reviewed among top exporters'
    },
    {
      name: 'Nikkyo',
      website: 'nikkyo.co.jp',
      auctionAccess: 'Likely',
      description: 'Established exporter with auction access implied in top list'
    },
    {
      name: 'RamaDBK',
      website: 'ramadbk.com',
      auctionAccess: 'Likely',
      description: 'Longstanding exporter, among top-used car exporters'
    },
    {
      name: 'Next-Drive',
      website: 'next-drive.co.jp',
      auctionAccess: 'Likely',
      description: 'Named top exporter in 2025 blogs'
    },
    {
      name: 'Trusted (Trust Company Ltd.)',
      website: 'trust-jv.com',
      auctionAccess: 'Likely',
      description: 'In top exporters list'
    },
    {
      name: 'S.K Trading',
      website: 'sktrading.co.jp',
      auctionAccess: 'Likely',
      description: 'Part of top 10 list, likely auction agent'
    },
    {
      name: 'JPC Trade',
      website: 'jpctrade.com',
      auctionAccess: 'Likely',
      description: 'Established exporter since 2003'
    },
    {
      name: 'EFJ (Export From Japan)',
      website: 'exportfromjapan.co.jp',
      auctionAccess: 'Likely',
      description: 'Located near auctions, qualifies as exporter with access'
    }
  ]

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: 'Register with Exporter',
      description: 'Submit ID, sign agreement',
      icon: '📝'
    },
    {
      step: 2,
      title: 'Pay Deposit',
      description: 'Normally ¥100,000–¥200,000 or 10% of bid',
      icon: '💰'
    },
    {
      step: 3,
      title: 'Browse Auction Cars',
      description: 'Exporter gives access to daily listings',
      icon: '🔍'
    },
    {
      step: 4,
      title: 'Check Auction Sheets',
      description: 'Learn grades (5=new, 4=very good, 3.5=decent, R=repaired)',
      icon: '📋'
    },
    {
      step: 5,
      title: 'Set Max Bid',
      description: 'Tell exporter your highest price',
      icon: '🎯'
    },
    {
      step: 6,
      title: 'Bidding',
      description: 'Exporter bids at the auction using their license',
      icon: '🔨'
    },
    {
      step: 7,
      title: 'Win Car',
      description: 'Pay balance (auction price + fees)',
      icon: '🎉'
    },
    {
      step: 8,
      title: 'Shipping & Docs',
      description: 'Exporter ships to Walvis Bay/Durban and sends paperwork',
      icon: '🚢'
    }
  ]

  // Cost breakdown
  const costs = [
    { item: 'Auction Winning Price', description: 'Base car cost', example: 'Variable' },
    { item: 'Service/Commission Fee', description: 'Exporter fee', example: '¥70,000–¥120,000' },
    { item: 'Inland Transport', description: 'From auction to port in Japan', example: '¥10,000–¥30,000' },
    { item: 'Export Fees', description: 'Customs + paperwork', example: '~¥16,000+' },
    { item: 'Ocean Shipping', description: 'To Walvis Bay/Durban', example: '$1,000–$1,400' }
  ]

  // Must-ask questions
  const questions = [
    'Are you a licensed auction member (USS, JU, TAA, etc.)?',
    'Do you belong to JUMVEA (Japanese Used Motor Vehicle Exporting Association)?',
    'What is the deposit amount and is it refundable?',
    'What is your service/commission fee?',
    'Do you provide auction sheets with English translation?',
    'What are total estimated costs (auction + fee + shipping)?',
    'Which documents will I get (Export Certificate, Bill of Lading, Invoice, Packing List)?',
    'How long from winning to shipment?'
  ]

  // Red flags
  const redFlags = [
    'Asking you to pay into a personal account',
    'Refusing to show real auction sheets',
    'No physical address or registration number in Japan',
    '"Too cheap" promises with no paperwork',
    'Pressure to decide immediately',
    'No clear refund policy',
    'Unable to provide references or reviews'
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🚘 Japan Auction Bidding Guide</h1>
            <p className="text-blue-100 text-lg mb-4">
              Master the art of buying cars directly from Japanese auctions
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">MASTERY EXCLUSIVE</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <Users className="h-4 w-4" />
                <span className="text-sm">20+ Verified Exporters</span>
              </div>
            </div>
          </div>
          <Gavel className="h-16 w-16 text-yellow-300 opacity-50" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={selectedTab === 'guide' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('guide')}
          className="flex-1"
        >
          <FileText className="h-4 w-4 mr-2" />
          Bidding Guide
        </Button>
        <Button
          variant={selectedTab === 'exporters' ? 'default' : 'ghost'}
          onClick={() => setSelectedTab('exporters')}
          className="flex-1"
        >
          <Building2 className="h-4 w-4 mr-2" />
          Exporters Directory
        </Button>
      </div>

      {selectedTab === 'guide' ? (
        <>
          {/* How It Works */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              How the System Works
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Big Auctions (USS, TAA, JU, AUCNET, etc.)</strong>
                  <p className="text-sm text-gray-600">Only licensed Japanese dealers can bid directly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Foreign buyers cannot bid directly</strong>
                  <p className="text-sm text-gray-600">You need an auction-focused exporter (agent) who bids on your behalf</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Exporters handle everything</strong>
                  <p className="text-sm text-gray-600">They charge a service fee and handle export, shipping, and paperwork</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Stock Dealers vs Auction Exporters */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-gray-200">
              <h3 className="font-bold text-lg mb-3">📦 Stock Dealers</h3>
              <p className="text-sm text-gray-600 mb-3">e.g., SBT, BE FORWARD</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">Sell cars they already bought from auction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">Easier but more expensive (their profit added)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">No auction access for you</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-6 border-2 border-green-200 bg-green-50">
              <h3 className="font-bold text-lg mb-3">🔨 Auction Exporters</h3>
              <p className="text-sm text-gray-600 mb-3">e.g., Integrity Exports, SAT Japan</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Give you access to real-time auctions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">You set max bid → they bid for you</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Usually cheaper and more transparent</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Step-by-Step Process */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Step-by-Step Auction Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    {step.step}
                  </div>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Costs Breakdown */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Costs to Expect
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2">Cost Item</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Typical Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {costs.map((cost, index) => (
                    <tr key={index}>
                      <td className="py-3 font-medium">{cost.item}</td>
                      <td className="py-3 text-sm text-gray-600">{cost.description}</td>
                      <td className="py-3 text-right font-mono text-sm">{cost.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Total cost is typically auction price + {currency}15,000-25,000 in fees + shipping
              </p>
            </div>
          </Card>

          {/* Questions and Red Flags */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Must Ask Questions */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Questions You Must Ask Exporters
              </h3>
              <ul className="space-y-2">
                {questions.map((question, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-sm">{question}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Red Flags */}
            <Card className="p-6 border-2 border-red-200 bg-red-50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Red Flags to Avoid 🚨
              </h3>
              <ul className="space-y-2">
                {redFlags.map((flag, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-800">{flag}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Quick Takeaways */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <h2 className="text-xl font-bold mb-4">🔑 Quick Takeaways</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  1
                </div>
                <p className="text-sm">
                  <strong>Direct auction access?</strong><br/>
                  Go with Integrity Exports or SAT Japan
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  2
                </div>
                <p className="text-sm">
                  <strong>Prefer ready stock?</strong><br/>
                  Use SBT Japan or BE FORWARD (simpler but pricier)
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                  3
                </div>
                <p className="text-sm">
                  <strong>Golden rule:</strong><br/>
                  Start small (1 car), confirm fees in writing
                </p>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* Exporters Directory */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              20 Reputable Auction-Focused Exporters in Japan
            </h2>
            <p className="text-gray-600 mb-6">
              These companies offer real-time access to major Japanese car auctions. Always verify current status before engaging.
            </p>
            
            <div className="grid gap-4">
              {exporters.map((exporter, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{exporter.name}</h3>
                        {exporter.highlight && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {exporter.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{exporter.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`flex items-center gap-1 ${
                          exporter.auctionAccess === 'Yes' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {exporter.auctionAccess === 'Yes' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          Auction Access: {exporter.auctionAccess}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`https://${exporter.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Visit Site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Summary Table */}
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Quick Comparison: Top Recommended Exporters</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-center py-3 px-4">Auction Access</th>
                    <th className="text-left py-3 px-4">Best For</th>
                    <th className="text-center py-3 px-4">Fee Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4 font-medium">Integrity Exports</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-4 w-4 text-green-600 inline" />
                    </td>
                    <td className="py-3 px-4">Transparency, large auction coverage</td>
                    <td className="text-center py-3 px-4">¥70,000-120,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">SAT Japan</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-4 w-4 text-green-600 inline" />
                    </td>
                    <td className="py-3 px-4">Southern Africa focus</td>
                    <td className="text-center py-3 px-4">¥80,000-120,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Japan Tradings</td>
                    <td className="text-center py-3 px-4">
                      <CheckCircle className="h-4 w-4 text-green-600 inline" />
                    </td>
                    <td className="py-3 px-4">Low fees</td>
                    <td className="text-center py-3 px-4">~¥60,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">SBT Japan</td>
                    <td className="text-center py-3 px-4">
                      <X className="h-4 w-4 text-gray-400 inline" />
                    </td>
                    <td className="py-3 px-4">Ready stock (no auction)</td>
                    <td className="text-center py-3 px-4">Built into price</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">BE FORWARD</td>
                    <td className="text-center py-3 px-4">
                      <X className="h-4 w-4 text-gray-400 inline" />
                    </td>
                    <td className="py-3 px-4">Ready stock, Africa offices</td>
                    <td className="text-center py-3 px-4">Built into price</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Final Notes */}
          <Card className="p-6 bg-yellow-50 border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Important Notes for First-Time Buyers</h3>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Always verify exporter credentials before sending any money</li>
                  <li>• Start with a test purchase of one vehicle to understand the process</li>
                  <li>• Keep all communication records and transaction receipts</li>
                  <li>• Work with exporters who already ship to Walvis Bay/Durban regularly</li>
                  <li>• Join online forums to read reviews from other African importers</li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}