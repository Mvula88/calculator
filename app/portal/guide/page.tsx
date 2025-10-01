'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
import { Card } from '@/components/ui/card'
import { GuideNavigation } from '@/components/guide/guide-navigation'
import { QuickStartOverview } from '@/components/guide/quick-start-overview'
import { PreImportEssentials } from '@/components/guide/pre-import-essentials'
import { TimelineSection } from '@/components/guide/timeline-section'
import { CostBreakdown } from '@/components/guide/cost-breakdown'
import { MistakeCards } from '@/components/guide/mistake-cards'
import { TemplatesSection } from '@/components/guide/templates-section'
import { EmergencyQuickReference } from '@/components/guide/emergency-quick-reference'
import { PracticalTools } from '@/components/guide/practical-tools'
import CriticalImportWarnings from '@/components/portal/CriticalImportWarnings'
import { CountrySelector, type Country } from '@/components/guide/CountrySelector'
import { namibiaTimelineSteps } from '@/lib/guide-data/namibia-timeline'
import { southAfricaTimelineSteps } from '@/lib/guide-data/south-africa-timeline'
import { botswanaTimelineSteps } from '@/lib/guide-data/botswana-timeline'
import { zambiaTimelineSteps } from '@/lib/guide-data/zambia-timeline'
import { AlertTriangle, CheckCircle, Info, TrendingDown, Lock, Shield } from 'lucide-react'

// Country-specific data
const countryData = {
  'namibia': {
    name: 'Namibia',
    port: 'Walvis Bay',
    currency: 'N$',
    timeline: namibiaTimelineSteps,
    daysRange: '60-75'
  },
  'south-africa': {
    name: 'South Africa',
    port: 'Walvis Bay or Durban',
    currency: 'R',
    timeline: southAfricaTimelineSteps,
    daysRange: '65-90'
  },
  'botswana': {
    name: 'Botswana',
    port: 'Walvis Bay',
    currency: 'P',
    timeline: botswanaTimelineSteps,
    daysRange: '60-80'
  },
  'zambia': {
    name: 'Zambia',
    port: 'Walvis Bay',
    currency: 'K',
    timeline: zambiaTimelineSteps,
    daysRange: '70-95'
  }
} as const

// Old timeline data - kept for backward compatibility, will be removed
const _oldNamibiaTimelineSteps = [
  {
    title: 'Pre-Import Planning',
    duration: '7–14 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Pick a car that meets import rules (max 12 years old for Namibia)',
      'Get seller to photograph VIN and engine number on the car',
      'Confirm who will appear as Consignee on Bill of Lading',
      'Choose clearing approach: DIY + clearing firm (recommended) vs full agent'
    ],
    tips: [
      '🔍 Match everything to VIN/engine number. One wrong character = days of delay',
      '🧾 Invoice must show: VIN, engine number, make/model, year, engine capacity, color',
      '🎯 If sharing container, agree in writing who pays if someone drops out'
    ],
    commonDelays: [
      {
        delay: 'Wrong vehicle age calculation',
        cost: 'Total loss of vehicle',
        prevention: 'Check manufacturing date, not registration date'
      },
      {
        delay: 'Consignee account blocked',
        cost: 'N$500+/day storage',
        prevention: 'Verify consignee good standing before purchase'
      }
    ],
    checklist: [
      { label: 'VIN photo', id: 'vin-photo' },
      { label: 'Engine photo', id: 'engine-photo' },
      { label: 'Correct invoice', id: 'invoice' },
      { label: 'Consignee confirmed', id: 'consignee' },
      { label: 'Clearing plan', id: 'clearing' }
    ]
  },
  {
    title: 'Documentation Preparation',
    duration: '3–5 days',
    urgencyLevel: 'high' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'SAD 500 form (clearing firm prepares)',
      'Assessment Notice (official duty/VAT computation)',
      'Payment Receipts for all duties and levies',
      'Customs Release Order and Clearance Certificate',
      'Police Clearance for VIN/engine verification',
      'ID and Driver\'s License copies'
    ],
    tips: [
      '⚡ Complete SAD 500 immediately when Bill of Lading arrives',
      '📋 Triple-check VIN/engine numbers before submission',
      '💰 Keep all payment receipts - you need them for registration'
    ],
    commonDelays: [
      {
        delay: 'Missing certified translation',
        cost: 'N$300+/day storage',
        prevention: 'Start translation process 2-3 weeks early'
      },
      {
        delay: 'VIN/Engine number errors',
        cost: 'N$2,500+ delays',
        prevention: 'Triple-check all numbers against photos'
      }
    ],
    checklist: [
      { label: 'SAD 500 form', id: 'sad-500' },
      { label: 'All receipts', id: 'receipts' },
      { label: 'ID documents', id: 'id-docs' },
      { label: 'Vehicle photos', id: 'photos' }
    ]
  },
  {
    title: 'Shipping & Arrival',
    duration: '35–45 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Track container location weekly',
      'Prepare clearing agent documents',
      'Arrange port storage if needed',
      'Book transporter in advance'
    ],
    tips: [
      '🚢 Container arrives 2-3 days before scheduled date usually',
      '📅 Book clearing agent 1 week before arrival',
      '🚚 Pre-book transporter to avoid storage fees'
    ],
    commonDelays: [
      {
        delay: 'Port congestion',
        cost: 'N$200+/day extra storage',
        prevention: 'Monitor port status and plan for delays'
      }
    ],
    checklist: [
      { label: 'Container tracked', id: 'tracking' },
      { label: 'Agent booked', id: 'agent' },
      { label: 'Transport ready', id: 'transport' }
    ]
  },
  {
    title: 'Clearance & Collection',
    duration: '5–10 days',
    urgencyLevel: 'critical' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Submit documents to clearing agent',
      'Pay all duties and fees',
      'Pass police clearance inspection',
      'Arrange collection from port'
    ],
    tips: [
      '💡 Use clearing firm for first import - DIY is risky',
      '⏰ Start clearance immediately to avoid storage fees',
      '🔐 Get temporary insurance before driving'
    ],
    commonDelays: [
      {
        delay: 'HS code disputes',
        cost: 'N$15,000+ extra duty',
        prevention: 'Research correct classification beforehand'
      },
      {
        delay: 'Payment processing delays',
        cost: 'N$500+/day storage',
        prevention: 'Have all payment methods ready and verified'
      }
    ],
    checklist: [
      { label: 'Duties paid', id: 'duties' },
      { label: 'Police cleared', id: 'police' },
      { label: 'Car collected', id: 'collected' }
    ]
  },
  {
    title: 'Registration',
    duration: '7–14 days',
    urgencyLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    required: [
      'Roadworthy certificate',
      'NaTIS registration',
      'License plates',
      'Insurance policy'
    ],
    tips: [
      '🛠️ Book roadworthy test immediately after collection',
      '📝 Submit NaTIS papers same day as roadworthy',
      '🎯 Full process can be done in 3 days if organized'
    ],
    commonDelays: [
      {
        delay: 'Roadworthy test backlogs',
        cost: 'N$1,500+ delays',
        prevention: 'Book appointment immediately after collection'
      }
    ],
    checklist: [
      { label: 'Roadworthy', id: 'roadworthy' },
      { label: 'NaTIS done', id: 'natis' },
      { label: 'Plates fitted', id: 'plates' },
      { label: 'Insurance active', id: 'insurance' }
    ]
  }
]

export default function GuidePage() {
  const router = useRouter()
  const { user, userEmail, hasAccess, loading, userTier } = useAuthImmediate()
  const [currentSection, setCurrentSection] = useState<string>('overview')
  const [selectedCountry, setSelectedCountry] = useState<Country>('namibia')

  // Get current country data
  const currentCountryData = countryData[selectedCountry]

  // Clean up email display
  const displayEmail = userEmail || 'Portal User'
  const cleanEmail = displayEmail.startsWith('user_cs_test_') ||
    (displayEmail.startsWith('user_') && displayEmail.endsWith('@impota.com'))
    ? 'Portal User'
    : displayEmail

  // Navigation handler
  const handleNavigateToSection = (sectionId: string) => {
    setCurrentSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guide...</p>
        </div>
      </div>
    )
  }

  // No access - redirect to portal home or show message
  if (!user) {
    router.replace('/portal')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to portal...</p>
        </div>
      </div>
    )
  }

  // Has access - show the guide
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full">
        {/* Header with protection notice - Mobile Optimized */}
        <div className="mb-8 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Complete Vehicle Import Guide</h1>
              <p className="text-gray-600">Your step-by-step roadmap to importing vehicles into {currentCountryData.name}</p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-[200px]">Licensed to: {cleanEmail}</span>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-red-800 font-medium">Content Protection Active</p>
                <p className="text-xs text-red-700 mt-1">
                  This guide is licensed to {cleanEmail}. Sharing or redistributing this content violates the terms of service.
                </p>
              </div>
            </div>
          </div>

          {/* Country Selector */}
          <div className="mt-6">
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Navigation */}
          <GuideNavigation
            currentSection={currentSection}
            onNavigate={handleNavigateToSection}
          />

          {/* 1. Quick Start Overview */}
          <section id="overview">
            <QuickStartOverview onNavigateToSection={handleNavigateToSection} />
          </section>

          {/* 2. Pre-Import Essentials */}
          <section id="essentials">
            <PreImportEssentials onNavigateToSection={handleNavigateToSection} />
          </section>

          {/* Critical Warnings Section */}
          <section id="warnings">
            <CriticalImportWarnings />
          </section>

          {/* 3. Cost Breakdown */}
          <section id="costs">
            <CostBreakdown showTimelineIntegration={true} />
          </section>

          {/* 4. Step-by-Step Timeline */}
          <section id="timeline">
            <TimelineSection steps={currentCountryData.timeline} />
          </section>

          {/* 5. Common Mistakes */}
          <section id="mistakes">
            <MistakeCards />
          </section>

          {/* 6. Documents & Templates */}
          <section id="templates">
            <TemplatesSection />
          </section>

          {/* 7. Practical Tools */}
          <section id="tools">
            <PracticalTools />
          </section>

          {/* 8. Emergency Help */}
          <section id="emergency">
            <EmergencyQuickReference />
          </section>

          {/* Success Summary */}
          <section className="pt-8">
            <Card className="p-6 sm:p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Your Import Success Formula</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                    <p className="text-sm text-gray-600">Success rate when following all steps</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{currentCountryData.daysRange}</div>
                    <p className="text-sm text-gray-600">Days from purchase to registration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold mb-3">Critical Success Factors:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Follow the eligibility rules exactly - no exceptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Verify consignee good standing before paying anything</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Triple-check all VIN and engine numbers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Keep 15% budget buffer for unexpected costs</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Your Next Steps:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-semibold">1</span>
                        <span>Use the eligibility checker above to confirm you can import</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-semibold">2</span>
                        <span>Calculate your total budget including buffer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-semibold">3</span>
                        <span>Find suitable vehicles and verify eligibility before purchasing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center font-semibold">4</span>
                        <span>Use the progress tracker to stay organized throughout the process</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>

        {/* Support Notice */}
        <div className="mt-16 text-center text-xs sm:text-sm text-gray-600 px-4 sm:px-6 pb-8">
          <p>Need help? Use the emergency contacts section or consult with your clearing agent.</p>
          <p className="mt-2">This guide is specifically for {currentCountryData.port} port imports to {currentCountryData.name}. Other ports may have different procedures.</p>
        </div>
      </div>
    </main>
  )
}