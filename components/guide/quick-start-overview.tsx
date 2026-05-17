'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calculator,
  Clock,
  ChevronRight,
  ArrowUpRight,
  HelpCircle,
} from 'lucide-react'

interface QuickStartOverviewProps {
  onNavigateToSection: (sectionId: string) => void
}

interface EligibilityCheck {
  question: string
  requirement: string
  passCondition: string
  failMessage: string
}

const eligibilityChecks: EligibilityCheck[] = [
  {
    question: 'How old is the car you want to import?',
    requirement: 'Maximum 12 years old for Namibia',
    passCondition: '12 years or newer',
    failMessage: 'Car too old — Namibia only allows vehicles up to 12 years',
  },
  {
    question: 'Is the car right-hand drive?',
    requirement: 'Must be right-hand drive',
    passCondition: 'Right-hand drive',
    failMessage: 'Left-hand drive vehicles not permitted in Namibia',
  },
  {
    question: 'Do you have at least N$180,000 available?',
    requirement: 'Total budget including buffer',
    passCondition: 'N$180,000+ available',
    failMessage: 'Insufficient budget — imports typically cost N$150–180k total',
  },
  {
    question: 'Can you handle 60–90 days timeline?',
    requirement: 'Full process takes 2–3 months',
    passCondition: 'Can wait 60–90 days',
    failMessage: 'Timeline too long for your needs',
  },
]

const topRisks = [
  { risk: 'Wrong VIN/Engine numbers', cost: 'N$2,500+ storage fees', severity: 'high' as const },
  { risk: 'Consignee account blocked', cost: 'N$7,000+ delays', severity: 'high' as const },
  { risk: 'Missing translation', cost: '14–21 day delays', severity: 'medium' as const },
]

const actionCards = [
  { title: 'Can I import?', sub: '4-question eligibility check', icon: HelpCircle, action: 'check' as const },
  { title: 'What will it cost?', sub: 'Interactive cost calculator', icon: Calculator, navTo: 'costs' },
  { title: 'How long?', sub: 'Complete timeline breakdown', icon: Clock, navTo: 'timeline' },
  { title: 'What can go wrong?', sub: 'Top 3 costly mistakes', icon: AlertTriangle, navTo: 'mistakes' },
]

export function QuickStartOverview({ onNavigateToSection }: QuickStartOverviewProps) {
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<number, boolean>>({})
  const [showEligibility, setShowEligibility] = useState(false)

  const handleEligibilityAnswer = (index: number, passed: boolean) =>
    setEligibilityAnswers((prev) => ({ ...prev, [index]: passed }))

  const eligibilityScore = Object.values(eligibilityAnswers).filter(Boolean).length
  const totalChecks = eligibilityChecks.length
  const allAnswered = Object.keys(eligibilityAnswers).length === totalChecks
  const canImport = eligibilityScore === totalChecks

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 01</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Quick start</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Can you import?
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Four questions, a cost number, a timeline, and the three things that go wrong — before you read another line of the guide.
      </p>

      {/* Timeline strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
        <div className="bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            <Clock className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
            <span className="text-amber-700 font-semibold">Timeline</span>
          </div>
          <p className="mt-3 font-serif text-2xl font-medium tracking-tight text-zinc-900">60–90 days</p>
          <p className="mt-1 text-xs text-zinc-500">From purchase to registration</p>
        </div>
        <div className="bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
            <span className="text-amber-700 font-semibold">Budget</span>
          </div>
          <p className="mt-3 font-serif text-2xl font-medium tracking-tight text-zinc-900">N$150–180k</p>
          <p className="mt-1 text-xs text-zinc-500">Typical landed cost for first-timers</p>
        </div>
      </div>

      {/* Action cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
        {actionCards.map((card, idx) => {
          const Icon = card.icon
          const handleClick = () =>
            card.action === 'check' ? setShowEligibility(true) : card.navTo && onNavigateToSection(card.navTo)
          return (
            <button
              key={card.title}
              onClick={handleClick}
              className="group bg-white p-6 text-left hover:bg-stone-50/60 transition-colors flex flex-col min-h-[160px]"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                  Nº 0{idx + 1}
                </span>
                <Icon className="h-4 w-4 text-zinc-300 group-hover:text-amber-500 transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-base font-medium tracking-tight text-zinc-900">{card.title}</h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{card.sub}</p>
              <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                Open
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          )
        })}
      </div>

      {/* Top 3 risks */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <span className="text-amber-600">Nº 03</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Top 3 risks</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            What goes wrong, in order.
          </h3>
          <p className="mt-1 text-sm text-zinc-600">Real mistakes that cost time and money.</p>
        </div>

        <ul className="divide-y divide-zinc-200">
          {topRisks.map((risk, idx) => (
            <li key={idx} className="flex items-center gap-4 px-6 sm:px-8 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400 w-6">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  risk.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900">{risk.risk}</p>
                <p className="text-xs text-zinc-500">Typical cost: {risk.cost}</p>
              </div>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold ${
                  risk.severity === 'high' ? 'text-red-600' : 'text-amber-700'
                }`}
              >
                {risk.severity}
              </span>
            </li>
          ))}
        </ul>

        <div className="px-6 sm:px-8 py-4 border-t border-zinc-200">
          <button
            onClick={() => onNavigateToSection('mistakes')}
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-amber-700 transition-colors"
          >
            See all common mistakes
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Eligibility modal */}
      {showEligibility && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-2xl shadow-2xl">
            <div className="p-6 sm:p-8 border-b border-zinc-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-3">
                  <span className="text-amber-600">Eligibility</span>
                  <span className="h-px w-8 bg-zinc-300" />
                </div>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-zinc-900">
                  Can you import?
                </h3>
                <p className="mt-2 text-sm text-zinc-600">Answer four questions.</p>
              </div>
              <button
                onClick={() => setShowEligibility(false)}
                aria-label="Close"
                className="text-zinc-400 hover:text-zinc-900 transition-colors p-1"
              >
                <XCircle className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {eligibilityChecks.map((check, index) => (
                <div key={index} className="pb-6 border-b border-zinc-100 last:border-b-0 last:pb-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-2">
                    Q · 0{index + 1}
                  </p>
                  <p className="font-medium text-zinc-900 mb-2">{check.question}</p>
                  <p className="text-xs text-zinc-500 mb-4">
                    Requirement · {check.requirement}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEligibilityAnswer(index, true)}
                      className={
                        eligibilityAnswers[index] === true
                          ? 'bg-zinc-900 text-white hover:bg-zinc-800 rounded-full'
                          : 'bg-white text-zinc-900 border border-zinc-300 hover:bg-stone-50 rounded-full'
                      }
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-2" strokeWidth={1.75} />
                      {check.passCondition}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEligibilityAnswer(index, false)}
                      className={
                        eligibilityAnswers[index] === false
                          ? 'bg-red-600 text-white hover:bg-red-700 rounded-full'
                          : 'bg-white text-zinc-900 border border-zinc-300 hover:bg-stone-50 rounded-full'
                      }
                    >
                      <XCircle className="h-3.5 w-3.5 mr-2" strokeWidth={1.75} />
                      No
                    </Button>
                  </div>
                  {eligibilityAnswers[index] === false && (
                    <p className="mt-3 text-xs text-red-700 flex items-start gap-2 border-l-2 border-red-500 pl-3">
                      <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      {check.failMessage}
                    </p>
                  )}
                </div>
              ))}

              {allAnswered && (
                <div className="border-t border-zinc-200 pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-2">
                    Verdict · Score {eligibilityScore} / {totalChecks}
                  </p>
                  <p className={`font-serif text-2xl font-medium tracking-tight ${canImport ? 'text-zinc-900' : 'text-red-700'}`}>
                    {canImport ? 'You can import.' : 'Not recommended yet.'}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {canImport
                      ? 'You meet every requirement. Continue to the next section to start the process.'
                      : "Address the issues above before going further — the math doesn't work yet."}
                  </p>
                  {canImport && (
                    <Button
                      className="mt-5 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full h-11 px-6"
                      onClick={() => {
                        setShowEligibility(false)
                        onNavigateToSection('essentials')
                      }}
                    >
                      Start the import process
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
