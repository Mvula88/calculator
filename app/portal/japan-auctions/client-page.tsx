'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { Button } from '@/components/ui/button'
import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react'

interface Exporter {
  name: string
  website: string
  auctionAccess: 'Yes' | 'Likely'
  description: string
  highlight?: string
}

const exporters: Exporter[] = [
  { name: 'AAA Japan', website: 'aaajapan.com', auctionAccess: 'Yes', description: '70,000+ lots daily from 120+ auctions', highlight: 'Top pick' },
  { name: 'Hanamaru (Sococara)', website: 'sococara.com/sococara/', auctionAccess: 'Yes', description: 'Budget-friendly stock + accident-damaged vehicles for parts/rebuilds', highlight: 'Salvage' },
  { name: 'TAU Trade', website: 'tau-trade.com/sal_frt/', auctionAccess: 'Yes', description: 'Salvage & accident-damaged car specialist — very low prices', highlight: 'Salvage' },
  { name: 'Integrity Exports', website: 'integrityexports.com', auctionAccess: 'Yes', description: '120+ auction access, invoice transparency' },
  { name: 'SAT Japan', website: 'satjapan.com', auctionAccess: 'Yes', description: 'Hybrid stock & auction, Africa focus', highlight: 'Africa' },
  { name: 'Provide Cars', website: 'providecars.co.jp', auctionAccess: 'Yes', description: 'Est. 1997, bilingual support' },
  { name: 'CSOJapan', website: 'csojapan.com', auctionAccess: 'Yes', description: '50,000+ lots daily online' },
  { name: 'Japan Tradings', website: 'japan-tradings.com', auctionAccess: 'Yes', description: 'Very low fees (~¥60,000)', highlight: 'Low fees' },
  { name: 'Karmen Ltd', website: 'kar-men.com', auctionAccess: 'Likely', description: 'Est. 1995, 31,255+ vehicles, worldwide export' },
  { name: 'Nikkyo Cars', website: 'nikkyocars.com', auctionAccess: 'Yes', description: 'Stock & auction, Namibia focus, Walvis Bay shipping', highlight: 'Namibia' },
  { name: 'Autocom Japan', website: 'autocj.co.jp', auctionAccess: 'Likely', description: 'Large inventory, 360° views, comprehensive platform' },
]

const processSteps = [
  { title: 'Register', desc: 'Sign up with exporter' },
  { title: 'Deposit', desc: '¥100–200K deposit' },
  { title: 'Browse', desc: 'View auction cars' },
  { title: 'Check', desc: 'Read auction sheets' },
  { title: 'Bid', desc: 'Set max price' },
  { title: 'Win', desc: 'Pay balance' },
  { title: 'Ship', desc: 'Export to port' },
  { title: 'Receive', desc: 'Get documents' },
]

const auctionGrades = [
  { grade: '6', desc: 'Brand new vehicle', quality: 'Perfect', tone: 'ok' as const },
  { grade: '5', desc: 'Almost new, pristine condition', quality: 'Excellent', tone: 'ok' as const },
  { grade: '4.5', desc: 'Very clean with minimal wear', quality: 'Excellent', tone: 'ok' as const },
  { grade: '4', desc: 'Good condition, common for imports', quality: 'Very Good', tone: 'good' as const },
  { grade: '3.5', desc: 'Average condition, some wear', quality: 'Good', tone: 'warn' as const },
  { grade: '3', desc: 'Below average, noticeable issues', quality: 'Fair', tone: 'warn' as const },
  { grade: '2', desc: 'Poor condition, major issues', quality: 'Poor', tone: 'bad' as const },
  { grade: 'R/RA', desc: 'Repaired accident damage', quality: 'Accident', tone: 'bad' as const },
]

const interiorGrades = [
  { grade: 'A', desc: 'Excellent — Like new, no issues', tone: 'ok' as const },
  { grade: 'B', desc: 'Good — Minor wear, clean overall', tone: 'good' as const },
  { grade: 'C', desc: 'Fair — Noticeable wear, some stains', tone: 'warn' as const },
  { grade: 'D', desc: 'Poor — Heavy wear, needs cleaning', tone: 'bad' as const },
]

const conditionCodes = [
  { code: 'A1', meaning: 'Small scratch (< 10cm)' },
  { code: 'A2', meaning: 'Medium scratch (10–20cm)' },
  { code: 'A3', meaning: 'Large scratch (> 20cm)' },
  { code: 'U1', meaning: 'Small dent (< golf ball)' },
  { code: 'U2', meaning: 'Medium dent (golf ball size)' },
  { code: 'U3', meaning: 'Large dent (> tennis ball)' },
  { code: 'W1', meaning: 'Repaired/replaced panel' },
  { code: 'S1', meaning: 'Rust present' },
  { code: 'C1', meaning: 'Corrosion' },
  { code: 'X', meaning: 'Needs replacement' },
  { code: 'XX', meaning: 'Replaced part' },
  { code: 'P', meaning: 'Paint work done' },
]

const mustAskQuestions = [
  'Licensed auction member (USS, JU, TAA)?',
  'JUMVEA member?',
  'Deposit amount & refund policy?',
  'Service/commission fee?',
  'English auction sheets?',
  'Total cost estimate?',
  'Which documents included?',
  'Time from win to shipment?',
]

const redFlags = [
  'Personal account payments',
  'No real auction sheets',
  'No Japan address/registration',
  'Too cheap promises',
  'Pressure tactics',
  'No refund policy',
  'No references',
]

const tabs = [
  { id: 'guide' as const, label: 'Guide' },
  { id: 'auction-sheet' as const, label: 'Auction sheet' },
  { id: 'exporters' as const, label: 'Exporters' },
]

const toneRing = (tone: 'ok' | 'good' | 'warn' | 'bad') => {
  switch (tone) {
    case 'ok':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
    case 'good':
      return 'bg-blue-50 text-blue-700 ring-blue-200'
    case 'warn':
      return 'bg-amber-50 text-amber-700 ring-amber-200'
    case 'bad':
      return 'bg-red-50 text-red-700 ring-red-200'
  }
}

export default function JapanAuctionsClientPage() {
  const { user, loading } = useAuth()
  const [selectedTab, setSelectedTab] = useState<'guide' | 'exporters' | 'auction-sheet'>('guide')

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Loading auction guide
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Verifying your access
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
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
              Japan auctions
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Mastery · 20+ exporters
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
            Buy cars from
            <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">
              Japanese auctions.
            </span>
          </h1>
          <div className="mt-4 flex items-start gap-2.5 max-w-2xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Explore the three sections below to get the complete picture: guide, auction sheet,
              and verified exporters.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-10">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-4">
            <span className="text-blue-600 font-semibold">Sections</span>
            <span className="text-zinc-500">
              {tabs.findIndex((t) => t.id === selectedTab) + 1} / {tabs.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t, i) => {
              const isActive = selectedTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTab(t.id)}
                  className={`group inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-zinc-900 font-semibold shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(251,191,36,0.5)]'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 font-medium'
                  }`}
                >
                  <span className={`font-mono text-[10px] tracking-[0.18em] ${isActive ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* GUIDE TAB */}
        {selectedTab === 'guide' && (
          <div className="space-y-12">
            {/* How it works */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                How it works
              </p>
              <div className="grid sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                {[
                  { title: 'Big auctions', desc: 'Only licensed dealers can bid' },
                  { title: 'You need an agent', desc: 'Exporter bids on your behalf' },
                  { title: 'Full service', desc: 'They handle export & shipping' },
                ].map((item, i) => (
                  <div key={item.title} className="bg-white p-6">
                    <p className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-base font-medium text-zinc-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Stock vs Auction */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Two paths
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                <div className="bg-white p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                    Stock dealers
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">e.g., SBT, BE FORWARD</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-zinc-700">
                    <li>· Pre-bought cars</li>
                    <li>· Easier but pricier</li>
                    <li>· No auction access</li>
                  </ul>
                </div>
                <div className="bg-white p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                    Auction exporters
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">e.g., Integrity, SAT</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-zinc-700">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={1.75} />Real-time auctions</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={1.75} />You set max bid</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={1.75} />Cheaper & transparent</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Process Steps */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Auction process · 8 steps
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                {processSteps.map((s, i) => (
                  <div key={s.title} className="bg-white p-5">
                    <p className="font-mono text-[10px] text-amber-600 tracking-[0.2em] font-semibold">
                      Step {String(i + 1).padStart(2, '0')}
                    </p>
                    <h4 className="mt-2 text-sm font-medium text-zinc-900">{s.title}</h4>
                    <p className="mt-1 text-xs text-zinc-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cost Breakdown */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Cost breakdown
              </p>
              <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                {[
                  ['Auction price', 'Variable'],
                  ['Service fee', '¥70–120K'],
                  ['Inland transport', '¥10–30K'],
                  ['Export fees', '~¥16K'],
                  ['Ocean shipping', '$1–1.4K'],
                ].map(([label, amount]) => (
                  <div key={label} className="grid grid-cols-[1fr_auto] gap-4 py-3.5 items-baseline">
                    <span className="text-sm text-zinc-700">{label}</span>
                    <span className="font-mono text-sm text-zinc-900 font-medium">{amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-0.5">
                  [ Total ]
                </span>
                <p className="text-sm text-zinc-700">
                  Auction + ¥15–25K fees + shipping
                </p>
              </div>
            </section>

            {/* Must Ask / Red Flags */}
            <section className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
              <div className="bg-white p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                  Must ask
                </p>
                <ul className="space-y-2">
                  {mustAskQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                  Red flags
                </p>
                <ul className="space-y-2">
                  {redFlags.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                      <XCircle className="h-3.5 w-3.5 mt-0.5 text-red-500 flex-shrink-0" strokeWidth={1.75} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* AUCTION SHEET TAB */}
        {selectedTab === 'auction-sheet' && (
          <div className="space-y-12">
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                What is an auction sheet
              </p>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-3xl">
                An inspection report created by Japanese auction houses for every vehicle sold.
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                {[
                  { title: 'Professional inspection', desc: 'By certified inspectors' },
                  { title: 'True condition', desc: 'Before bidding' },
                  { title: 'Detailed report', desc: 'All issues documented' },
                ].map((item, i) => (
                  <div key={item.title} className="bg-white p-5">
                    <p className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-sm font-medium text-zinc-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Information */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Key information on a sheet
              </p>
              <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                {[
                  { title: 'Vehicle details', desc: 'Make, model, year, chassis number, engine size, mileage, fuel type' },
                  { title: 'Overall auction grade', desc: 'Quality rating of the entire vehicle (6 to R)' },
                  { title: 'Interior grade', desc: 'Interior condition rating (A to D)' },
                  { title: 'Condition diagram', desc: 'Car outline with marks for dents, scratches, rust, repairs' },
                  { title: "Inspector's notes", desc: 'Japanese text comments on mechanical issues, modifications, warnings' },
                ].map((item, i) => (
                  <div key={item.title} className="grid sm:grid-cols-[4rem_1fr] gap-4 py-4 items-baseline">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Auction Grades */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Overall auction grades
              </p>
              <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                {auctionGrades.map((g) => (
                  <div key={g.grade} className="grid grid-cols-[4rem_8rem_1fr] gap-4 py-3.5 items-center">
                    <span className={`inline-flex items-center justify-center h-7 px-3 rounded-full font-mono text-xs font-semibold ring-1 ring-inset ${toneRing(g.tone)}`}>
                      {g.grade}
                    </span>
                    <span className="text-sm font-medium text-zinc-900">{g.quality}</span>
                    <span className="text-sm text-zinc-600">{g.desc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-0.5">
                  [ Tip ]
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  Grade 4 and above are excellent for imports. Grade 3.5 is acceptable if priced well.
                </p>
              </div>
            </section>

            {/* Interior Grades */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Interior grades
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                {interiorGrades.map((g) => (
                  <div key={g.grade} className="bg-white p-5">
                    <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full font-mono text-xs font-semibold ring-1 ring-inset ${toneRing(g.tone)}`}>
                      {g.grade}
                    </span>
                    <p className="mt-3 text-xs text-zinc-700 leading-relaxed">{g.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Condition Codes */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Condition diagram codes
              </p>
              <p className="text-sm text-zinc-600 mb-5">
                These codes appear on the car outline to mark specific issues.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                {conditionCodes.map((c) => (
                  <div key={c.code} className="bg-white grid grid-cols-[4rem_1fr] gap-3 px-5 py-3 items-baseline">
                    <span className="font-mono text-sm font-semibold text-amber-700">{c.code}</span>
                    <span className="text-sm text-zinc-700">{c.meaning}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Important Tips */}
            <section className="border-y border-zinc-200 py-6">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-1 whitespace-nowrap">
                  [ Important tips ]
                </span>
                <ul className="space-y-2 flex-1 max-w-3xl">
                  {[
                    "Always get the auction sheet translated if you don't read Japanese",
                    'R or RA grades indicate accident history — avoid unless very cheap',
                    'Check for matching chassis numbers between sheet and vehicle',
                    'Low mileage with poor grade might indicate odometer tampering',
                    'Ask your exporter for high-resolution auction sheet images',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                      <span className="mt-2 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* How to Read */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                How to read an auction sheet
              </p>
              <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                {[
                  { title: 'Check the grade first', desc: 'Look for the large number/letter in a box (4, 4.5, 5, etc.)' },
                  { title: 'Verify mileage', desc: 'Usually shown in kilometers, check if it matches the age' },
                  { title: 'Examine the car map', desc: 'Look for concentration of marks in specific areas' },
                  { title: 'Interior grade check', desc: 'Letter grade (A–D) indicates cabin condition' },
                  { title: 'Get translation', desc: 'Inspector notes often contain crucial mechanical info' },
                ].map((s, i) => (
                  <div key={s.title} className="grid sm:grid-cols-[4rem_1fr] gap-4 py-4 items-baseline">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{s.title}</p>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* EXPORTERS TAB */}
        {selectedTab === 'exporters' && (
          <div className="space-y-12">
            {/* Verified exporters list */}
            <section>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-5">
                <span className="text-blue-600 font-semibold">Verified exporters</span>
                <span className="text-zinc-500">{String(exporters.length).padStart(2, '0')} companies</span>
              </div>
              <p className="text-sm text-zinc-600 mb-5">
                Companies with real auction access. Verify before engaging.
              </p>
              <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200/80">
                {exporters.map((e, i) => (
                  <div key={e.name} className="bg-white p-5 grid sm:grid-cols-[3rem_1fr_auto] gap-4 items-start">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-medium text-zinc-900">{e.name}</h3>
                        {e.highlight && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold bg-amber-50 ring-1 ring-inset ring-amber-200 px-2 py-0.5 rounded-full">
                            {e.highlight}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{e.description}</p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" strokeWidth={1.75} />
                        Auction access · {e.auctionAccess}
                      </p>
                    </div>
                    <a
                      href={`https://${e.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-10 items-center gap-1.5 px-4 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900 transition-colors whitespace-nowrap"
                    >
                      Visit site
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Auction Mastery: Grading + Times + Bidding + Platforms */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Auction mastery
              </p>

              <div className="space-y-8">
                {/* Grade System */}
                <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      Grade system
                    </p>
                    <dl className="space-y-1.5 text-sm">
                      {[
                        ['S', 'Brand new / Nearly new (rare)'],
                        ['6', 'Extremely low mileage, mint condition'],
                        ['5', 'Excellent, minimal wear'],
                        ['4.5', 'Very good, light use visible'],
                        ['4', 'Good condition, normal wear'],
                        ['3.5', 'Average, visible wear'],
                        ['3', 'Below average, issues present'],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[2rem_1fr] gap-3">
                          <dt className="font-mono text-amber-700 font-semibold">{k}</dt>
                          <dd className="text-zinc-700">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      Interior grades
                    </p>
                    <dl className="space-y-1.5 text-sm">
                      {[
                        ['A', 'Like new, pristine'],
                        ['B', 'Clean, minimal wear'],
                        ['C', 'Average wear, usable'],
                        ['D', 'Poor, needs work'],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[2rem_1fr] gap-3">
                          <dt className="font-mono text-amber-700 font-semibold">{k}</dt>
                          <dd className="text-zinc-700">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 pt-3 border-t border-zinc-200 text-xs text-emerald-700">
                      <span className="font-mono uppercase tracking-[0.22em] font-semibold mr-1">[ Pro tip ]</span>
                      Grade 4/B offers best value for money.
                    </p>
                  </div>
                </div>

                {/* Optimal Buying Times */}
                <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      Seasonal opportunities
                    </p>
                    <ul className="space-y-1.5 text-sm text-zinc-700">
                      <li>· March–April · Financial year-end deals</li>
                      <li>· September · Model year clearance</li>
                      <li>· December · Year-end inventory clear</li>
                      <li>· Avoid May · Golden Week holidays</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      Weekly patterns
                    </p>
                    <ul className="space-y-1.5 text-sm text-zinc-700">
                      <li>· Tuesday · Most inventory available</li>
                      <li>· Thursday · Best deals typically</li>
                      <li>· Friday · Higher competition</li>
                      <li>· Monday · Leftover bargains</li>
                    </ul>
                  </div>
                </div>

                {/* Bidding Tactics */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
                    Professional bidding tactics
                  </p>
                  <ol className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                    {[
                      { title: 'Calculate maximum', desc: 'Total budget ÷ 2.2 − shipping = max bid' },
                      { title: 'Research history', desc: "Check same model's prices over 30 days" },
                      { title: 'Stay disciplined', desc: 'Lost auction = saved mistake. More cars tomorrow' },
                      { title: 'Read USS sheets', desc: 'Master auction sheets to spot hidden damage' },
                    ].map((t, i) => (
                      <li key={t.title} className="grid sm:grid-cols-[4rem_1fr] gap-4 py-3.5 items-baseline">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{t.title}</p>
                          <p className="mt-1 text-sm text-zinc-600">{t.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Platform Comparison */}
                <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      Direct purchase sites
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-700">
                      <li><a href="https://www.sbtjapan.com" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">SBT Japan</a> — Fixed prices, beginner-friendly, English support</li>
                      <li><a href="https://www.beforward.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">BE FORWARD</a> — Large inventory, negotiable prices</li>
                      <li><a href="https://www.japan-partner.com" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">Japan Partner</a> — Good for parts and accessories</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                      Auction access (agent required)
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-700">
                      <li><a href="https://www.ussnet.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">USS Auctions</a> — Largest, 150,000+ cars weekly</li>
                      <li><a href="https://www.jaa.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">JAA</a> — Luxury/sports car focus</li>
                      <li><a href="https://www.taag.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">TAA</a> — Toyota specialist auctions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Reality of Auctions */}
            <section className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold mt-1 whitespace-nowrap">
                  [ Reality ]
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-zinc-900">
                    The reality of Japanese car auctions.
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    What actually happens — critical information most exporters won't tell you.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-200">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mb-3">
                  The speed problem
                </p>
                <p className="text-sm text-zinc-700 mb-3">
                  <span className="font-medium">Reality check —</span> 1,200–8,000 cars are
                  auctioned <span className="font-semibold">daily</span> at each location.
                </p>
                <ul className="space-y-1.5 text-sm text-zinc-700">
                  <li>· Each car sells in about <span className="font-semibold">15 seconds</span></li>
                  <li>· Inspectors have less than <span className="font-semibold">1 minute per car</span> for checking</li>
                  <li>· Auction starts 9:30am, inspectors arrive 7:00am</li>
                  <li>· 100+ target cars to check in 2–3 hours</li>
                  <li>· One button push = ¥3,000–6,000 bid increase</li>
                </ul>
                <p className="mt-3 text-sm text-red-700 font-medium">
                  ↳ This is why cars often arrive different than described.
                </p>
              </div>

              {/* Symbol guide */}
              <div className="mt-8 pt-6 border-t border-zinc-200 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Scratch codes
                  </p>
                  <ul className="space-y-1 text-sm text-zinc-700">
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">A</span>Minor scratch</li>
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">A1</span>Small scratch (&lt; 10cm)</li>
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">A2</span>Medium scratch (10–20cm)</li>
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">A3</span>Large scratch — needs paint</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Dent codes
                  </p>
                  <ul className="space-y-1 text-sm text-zinc-700">
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">D</span>Pin dent</li>
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">D2</span>Multiple dents</li>
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">D3</span>Needs panel work</li>
                    <li><span className="font-mono text-amber-700 font-semibold mr-2">D4</span>Major panel work required</li>
                  </ul>
                </div>
              </div>

              {/* Grade reality */}
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mb-3">
                  What grades really mean
                </p>
                <ul className="space-y-2 text-sm text-zinc-700">
                  <li><span className="font-semibold text-zinc-900">Grade 5</span> — No repairs needed, most expensive</li>
                  <li><span className="font-semibold text-zinc-900">Grade 4.5</span> — Minor panel work or bumper repair</li>
                  <li><span className="font-semibold text-emerald-700">Grade 4</span> — 1–2 panels + 1 bumper repair (most cost-effective)</li>
                  <li><span className="font-semibold text-zinc-900">Grade 3.5</span> — 3–4 panels + 1–2 bumpers (average condition)</li>
                  <li><span className="font-semibold text-amber-700">Grade 3</span> — 4–5 panels + bumpers (not recommended)</li>
                  <li><span className="font-semibold text-red-600">A or R</span> — Accident history (some buyers accept for sports cars)</li>
                </ul>
                <p className="mt-3 text-sm text-emerald-700 font-medium">
                  ↳ Sweet spot — Grade 4 cars offer best value, mostly clean with minor fixes.
                </p>
              </div>

              {/* Critical warning */}
              <div className="mt-8 pt-6 border-t border-zinc-200">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold mb-3">
                  Why cars arrive different than expected
                </p>
                <ul className="space-y-1.5 text-sm text-zinc-700">
                  <li>· Big exporters check 100+ cars in 2–3 hours</li>
                  <li>· No time for double-checking after purchase</li>
                  <li>· Cars shipped to port without re-inspection</li>
                  <li>· Auction finishes late — no power to check cars at night</li>
                  <li>· Small buyers have no power to complain</li>
                </ul>
                <p className="mt-3 text-sm text-zinc-900 font-medium">
                  ↳ Solution — Use agents who check max 40 cars/day and spend 5+ minutes per inspection.
                </p>
              </div>
            </section>

            {/* Major Auction Houses */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Major Japanese auction houses
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                <div className="bg-white p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                    Largest groups
                  </p>
                  <ul className="space-y-2 text-sm text-zinc-700">
                    <li><a href="https://www.ussnet.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">USS</a> — 150,000+ cars weekly, 19 locations</li>
                    <li><a href="https://www.jaa.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">JAA</a> — Premium/luxury focus</li>
                    <li><a href="https://www.taag.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">TAA</a> — Toyota specialized</li>
                    <li><a href="https://www.haa.co.jp" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-amber-700 underline-offset-2 hover:underline">HAA</a> — Honda/Nissan focus</li>
                  </ul>
                </div>
                <div className="bg-white p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                    Daily volume
                  </p>
                  <ul className="space-y-1.5 text-sm text-zinc-700">
                    <li>· Small location · 1,200 cars/day</li>
                    <li>· Large location · 8,000 cars/day</li>
                    <li>· Total Japan · 50,000+ cars/day</li>
                    <li>· Bidding speed · 15 seconds/car</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                ↳ Note · Only licensed members can enter — you need an agent with proper access.
              </p>
            </section>

            {/* When to Buy */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                When to buy · weekly schedule
              </p>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                  <div className="bg-white p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 font-semibold mb-3">
                      Best months
                    </p>
                    <ul className="space-y-1.5 text-sm text-zinc-700">
                      <li>· March–May · Spring, good weather</li>
                      <li>· September–December · Fall, ideal conditions</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold mb-3">
                      Avoid
                    </p>
                    <ul className="space-y-1.5 text-sm text-zinc-700">
                      <li>· Golden Week (May 3–5) · Massive crowds</li>
                      <li>· Obon (mid-August) · Prices 2–3x normal</li>
                      <li>· June–July · Non-stop rain</li>
                      <li>· August · Unbearable heat/humidity</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold mb-3">
                    Weekly auction schedule (Nagoya area)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                    {[
                      ['Monday', 'USS R-Nagoya'],
                      ['Tuesday', 'CAA Gifu'],
                      ['Wednesday', 'CAA Chubu'],
                      ['Thursday', 'TAA (Toyota)'],
                      ['Friday', 'USS Nagoya'],
                      ['Saturday', 'GCA'],
                    ].map(([day, house]) => (
                      <div key={day} className="bg-white p-4">
                        <p className="text-sm font-medium text-zinc-900">{day}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{house}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                    Different regions have different schedules · This is central Japan
                  </p>
                </div>

                {/* Typical Fees */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold mb-3">
                    Typical fee structure
                  </p>
                  <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                    {[
                      ['Deposit required', '¥80,000–150,000 per car'],
                      ['Agent fee', '¥50,000–100,000 per car'],
                      ['Payment deadline', '3–5 business days'],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[1fr_auto] gap-4 py-3.5 items-baseline">
                        <span className="text-sm text-zinc-700">{k}</span>
                        <span className="font-mono text-sm text-zinc-900 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-red-600">
                    ↳ Missing payment deadline = lose deposit + automatic cancellation
                  </p>
                </div>
              </div>
            </section>

            {/* Critical Warnings */}
            <section className="border-y border-zinc-200 py-6">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold mt-1 whitespace-nowrap">
                  [ Critical rules ]
                </span>
                <ul className="space-y-2 flex-1 max-w-3xl">
                  {[
                    'Check import restrictions BEFORE bidding (YOUR responsibility)',
                    'Cancellation after purchase = lose entire deposit',
                    'Bank charges are YOUR responsibility',
                    'Missing payment deadline = automatic cancellation',
                    'No exceptions to these rules — agents are strict',
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                      <XCircle className="h-3.5 w-3.5 mt-0.5 text-red-500 flex-shrink-0" strokeWidth={1.75} />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Pricing Strategy */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Smart pricing strategy
              </p>
              <ol className="border-y border-zinc-200 divide-y divide-zinc-200/80">
                {[
                  'Check your local market price for the same model',
                  'Convert to JPY and bid LOWER than local price',
                  'Remember — 66,000 cars auctioned weekly = plenty of options',
                  'Your agent will provide recent auction prices for comparison',
                ].map((s, i) => (
                  <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 py-3.5 items-baseline">
                    <span className="font-mono text-[10px] text-amber-600 tracking-[0.2em] font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-zinc-700">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-emerald-700">
                ↳ Pro tip — Don't rush. If you miss one, another similar car comes next week.
              </p>
            </section>

            {/* Documentation */}
            <section>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-5 border-b border-zinc-200">
                Documentation you'll receive
              </p>
              <div className="grid sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
                {[
                  ['Auction sheet', 'Proves car condition & history'],
                  ['Invoice from auction', 'Proves actual price paid'],
                  ['Deregistration papers', 'Required for your registration'],
                  ['Bill of Lading', 'Needed to collect car at port'],
                  ['Service/warranty books', 'If available with the car'],
                  ['Inspection certificate', 'Japanese inspection record'],
                ].map(([title, desc], i) => (
                  <div key={title} className="bg-white p-5">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{title}</p>
                        <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                ↳ Keep all originals safe — customs often keeps them permanently
              </p>
            </section>
          </div>
        )}

        {/* EXPORTER INSIGHTS — always visible */}
        <section className="mt-16">
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
              Exporter insights
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
              Communication tips &amp; insider knowledge.
            </h2>
          </div>

          <div className="space-y-8">
            {/* Communication */}
            <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
                How to communicate with Japanese exporters
              </p>
              <div className="space-y-4 text-sm text-zinc-700">
                <div>
                  <p className="font-medium text-zinc-900 mb-1">Always include:</p>
                  <ul className="space-y-1 pl-4">
                    <li>· Your full name and country</li>
                    <li>· Specific car model and auction grade</li>
                    <li>· Your budget in USD or JPY</li>
                    <li>· Port of destination (Walvis Bay)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 mb-1">Response times:</p>
                  <p>Expect 12–24 hour delays due to timezone. Japanese business hours: 9 AM – 6 PM JST (2 AM – 11 AM Namibian time).</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-700 mb-1">↳ Pro tip</p>
                  <p>Use simple, clear English. Avoid slang. Number your questions for clear answers.</p>
                </div>
              </div>
            </div>

            {/* Hidden costs */}
            <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
                Hidden Japan-side costs (often not mentioned)
              </p>
              <ul className="divide-y divide-zinc-200/80">
                {[
                  ['Radiation inspection (2011 models)', '¥15,000'],
                  ['Recycling fee', '¥8,000–18,000'],
                  ['Inland transport (auction to port)', '¥30,000–60,000'],
                  ['Pre-export inspection', '¥10,000'],
                  ['Document handling', '¥5,000'],
                ].map(([k, v]) => (
                  <li key={k} className="grid grid-cols-[1fr_auto] gap-4 py-3 items-baseline">
                    <span className="text-sm text-zinc-700">{k}</span>
                    <span className="font-mono text-sm text-zinc-900 font-medium">{v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 pt-3 border-t border-red-500/40 text-sm text-red-700">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold mr-1.5">[ Total ]</span>
                Hidden costs ¥68,000–108,000 (R8,840–14,040)
              </p>
            </div>

            {/* Negotiation */}
            <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
                Smart negotiation tactics
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                {[
                  ['Bundle discount', 'Buying 2+ cars? Ask for 5–10% discount on FOB prices'],
                  ['Free shipping arrangement', 'Some exporters waive inland transport if you buy 3+ cars'],
                  ['Payment terms', 'Ask for 50% deposit, 50% on Bill of Lading receipt'],
                  ['Inspection inclusion', 'Request free detailed inspection report with underbody photos'],
                ].map(([title, desc]) => (
                  <div key={title}>
                    <p className="font-medium text-zinc-900">{title}</p>
                    <p className="mt-0.5 text-zinc-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exporter Red Flags */}
            <div className="border border-red-200 rounded-2xl bg-red-50/40 p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold pb-2.5 mb-4 border-b border-red-200">
                Exporter red flags
              </p>
              <ul className="space-y-2">
                {[
                  'Refuses to provide company registration details',
                  'Asks for 100% payment before shipping',
                  'No physical office address in Japan',
                  'Unusually low prices (30%+ below market)',
                  "Won't provide auction sheet translation",
                  'Pressures for immediate payment',
                ].map((flag, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                    <XCircle className="h-3.5 w-3.5 mt-0.5 text-red-500 flex-shrink-0" strokeWidth={1.75} />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Container Loading */}
            <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
                Container loading intelligence
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <p className="font-medium text-zinc-900 mb-2">Typical 40ft container capacity *</p>
                  <ul className="space-y-1 text-zinc-700">
                    <li>· 3–4 sedans · 3 guaranteed (Camry size), 4 if compact</li>
                    <li>· 4–5 small cars · 4 standard, 5 with special arrangement</li>
                    <li>· 3 SUVs · Standard for RAV4, CRV size vehicles</li>
                    <li>· 2 large vans · Noah, Voxy, Alphard (3 if smaller)</li>
                    <li>· 3 pickups · Hilux, Navara, D-Max standard</li>
                  </ul>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700">
                    * Always confirm with exporter — actual capacity varies by specific models
                  </p>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 mb-2">Loading day checklist</p>
                  <ul className="space-y-1 text-zinc-700">
                    <li>✓ Request loading photos from multiple angles</li>
                    <li>✓ Confirm all VINs match your documents</li>
                    <li>✓ Get container number and seal number</li>
                    <li>✓ Verify fumigation certificate issued</li>
                    <li>✓ Ensure fuel level — 1/8 tank or less (check shipper requirements)</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 pt-3 border-t border-zinc-200 text-sm text-emerald-700">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold mr-1.5">[ Money saver ]</span>
                Japanese exporters can arrange "consolidation" — they'll find other buyers to share
                your container. Usually costs ¥20,000 but saves R55,000+ on shipping.
              </p>
            </div>

            {/* Best months */}
            <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
                Best times to buy (insider knowledge)
              </p>
              <div className="grid sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
                {[
                  ['April–May (Golden Week)', 'Auction prices drop 10–15% during Japanese holidays'],
                  ['December–January', 'Year-end clearance, dealers dumping inventory'],
                  ['August (Obon)', 'Another holiday period with reduced competition'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white p-4">
                    <p className="text-sm font-medium text-zinc-900">{k}</p>
                    <p className="mt-1 text-xs text-zinc-600">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-red-700">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-semibold mr-1.5">[ Avoid ]</span>
                March (fiscal year end) and September (half-year close) — prices spike 20–30% as
                dealers stock up.
              </p>
            </div>
          </div>
        </section>
      </div>

      <PortalPageNavigation currentPath="/portal/japan-auctions" />
    </main>
  )
}
