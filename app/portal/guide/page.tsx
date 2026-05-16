'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthImmediate } from '@/lib/hooks/use-auth-immediate'
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
import LastUpdated from '@/components/portal/LastUpdated'
import SupportContact from '@/components/portal/SupportContact'
import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import { namibiaTimelineSteps } from '@/lib/guide-data/namibia-timeline'
import { southAfricaTimelineSteps } from '@/lib/guide-data/south-africa-timeline'
import { botswanaTimelineSteps } from '@/lib/guide-data/botswana-timeline'
import { zambiaTimelineSteps } from '@/lib/guide-data/zambia-timeline'
import { CheckCircle2, Lock, Shield, Loader2 } from 'lucide-react'

const countryData = {
  namibia: { name: 'Namibia', port: 'Walvis Bay', currency: 'N$', timeline: namibiaTimelineSteps, daysRange: '60–75' },
  'south-africa': { name: 'South Africa', port: 'Walvis Bay or Durban', currency: 'R', timeline: southAfricaTimelineSteps, daysRange: '65–90' },
  botswana: { name: 'Botswana', port: 'Walvis Bay', currency: 'P', timeline: botswanaTimelineSteps, daysRange: '60–80' },
  zambia: { name: 'Zambia', port: 'Walvis Bay', currency: 'K', timeline: zambiaTimelineSteps, daysRange: '70–95' },
} as const

export default function GuidePage() {
  const router = useRouter()
  const { user, userEmail, loading } = useAuthImmediate()
  const [currentSection, setCurrentSection] = useState<string>('overview')
  const [selectedCountry, setSelectedCountry] = useState<Country>('namibia')

  const currentCountryData = countryData[selectedCountry]

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country)
    setTimeout(() => {
      const timelineElement = document.getElementById('timeline')
      if (timelineElement) {
        timelineElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const displayEmail = userEmail || 'Portal User'
  const cleanEmail =
    displayEmail.startsWith('user_cs_test_') ||
    (displayEmail.startsWith('user_') && displayEmail.endsWith('@impota.com'))
      ? 'Portal User'
      : displayEmail

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Loading guide
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.replace('/portal')
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Redirecting to portal
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
              Import guide · {currentCountryData.name}
            </p>
            <LastUpdated date="October 2025" note="Multi-country verified" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
            Complete vehicle
            <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">
              import guide.
            </span>
          </h1>

          <div className="mt-4 flex items-start gap-2.5 max-w-2xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Your step-by-step roadmap to importing vehicles via {currentCountryData.port}.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            <Shield className="h-3 w-3" strokeWidth={1.75} />
            <span>Licensed to · {cleanEmail}</span>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="mb-8">
          <SupportContact />
        </div>

        {/* CONTENT PROTECTION NOTICE — editorial */}
        <div className="mb-10 border-t border-b border-zinc-200 py-5 flex items-start gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold mt-0.5 whitespace-nowrap">
            [ Protected ]
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 mb-1 inline-flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-red-500" strokeWidth={1.75} />
              Content protection active
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              This guide is licensed to{' '}
              <span className="font-medium text-zinc-800">{cleanEmail}</span>. Sharing or redistributing
              this content violates the terms of service.
            </p>
          </div>
        </div>

        {/* COUNTRY SELECTOR */}
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
            Choose country
          </p>
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
          />
        </div>

        <div className="space-y-16">
          {/* Navigation */}
          <GuideNavigation
            currentSection={currentSection}
            onNavigate={handleNavigateToSection}
          />

          <section id="overview">
            <QuickStartOverview onNavigateToSection={handleNavigateToSection} />
          </section>

          <section id="essentials">
            <PreImportEssentials onNavigateToSection={handleNavigateToSection} />
          </section>

          <section id="warnings">
            <CriticalImportWarnings />
          </section>

          <section id="costs">
            <CostBreakdown showTimelineIntegration={true} />
          </section>

          <section id="timeline" key={`timeline-${selectedCountry}`}>
            <TimelineSection steps={currentCountryData.timeline} />
          </section>

          <section id="mistakes">
            <MistakeCards />
          </section>

          <section id="templates">
            <TemplatesSection />
          </section>

          <section id="tools">
            <PracticalTools />
          </section>

          <section id="emergency">
            <EmergencyQuickReference />
          </section>

          {/* SUCCESS SUMMARY — editorial */}
          <section className="pt-8">
            <div className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold mb-3">
                Success formula
              </p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
                Your import success.
              </h2>
              <div className="mt-4 h-px w-14 bg-amber-500/70" />

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden max-w-md">
                <div className="bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Success rate</p>
                  <p className="mt-2 text-3xl font-medium tracking-tight bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                    95%
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">When following all steps</p>
                </div>
                <div className="bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Days</p>
                  <p className="mt-2 text-3xl font-medium tracking-tight text-zinc-900">
                    {currentCountryData.daysRange}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">Purchase to registration</p>
                </div>
              </div>

              {/* Two-column lists */}
              <div className="mt-10 grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
                <div className="bg-white p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold border-b border-zinc-200 pb-2.5 mb-3">
                    Critical success factors
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      'Follow the eligibility rules exactly — no exceptions',
                      'Verify consignee good standing before paying anything',
                      'Triple-check all VIN and engine numbers',
                      'Keep 15% budget buffer for unexpected costs',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold border-b border-zinc-200 pb-2.5 mb-3">
                    Your next steps
                  </p>
                  <ol className="space-y-2.5">
                    {[
                      'Use the eligibility checker above to confirm you can import',
                      'Calculate your total budget including buffer',
                      'Find suitable vehicles and verify eligibility before purchasing',
                      'Use the progress tracker to stay organized throughout',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                        <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0 pt-1 font-semibold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Support footnote */}
        <div className="mt-16 pt-8 border-t border-zinc-200 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            Need help? Use the emergency contacts section or consult your clearing agent.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            This guide is specifically for {currentCountryData.port} port imports to{' '}
            {currentCountryData.name}. Other ports may have different procedures.
          </p>
        </div>

        <PortalPageNavigation currentPath="/portal/guide" />
      </div>
    </main>
  )
}
