'use client'

import { useState } from 'react'
import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react'

interface Mistake {
  title: string
  cost: string
  problem: string
  fix: string
  realStory?: string
  stage: string
  severity: 'minor' | 'major' | 'deal-breaker'
  timeImpact: string
  recoveryDifficulty: 'easy' | 'moderate' | 'difficult'
}

const mistakes: Mistake[] = [
  {
    title: 'Incorrect documents (VIN/engine missing or wrong)',
    cost: 'N$2,500+ storage fees',
    problem: 'One wrong digit in VIN or missing engine number on invoice.',
    fix: 'Make seller print VIN & engine on invoice; attach VIN photo to file; pre-check before vessel arrives.',
    realStory: 'I had one digit wrong in the VIN. Cost me 5 days and N$2,500 in storage.',
    stage: 'Documentation Preparation',
    severity: 'major',
    timeImpact: '3–10 days delay',
    recoveryDifficulty: 'moderate',
  },
  {
    title: 'Using unreliable consignees/agents — blacklisted or blocked accounts',
    cost: 'N$152,694.70+ in storage fees (or total loss)',
    problem:
      'Consignee has unpaid debts with shipping line, gets blacklisted. Container transferred to state warehouse. Massive storage fees accumulate daily. Risk of cargo auction if not claimed within 3 months.',
    fix: 'CRITICAL: Always verify your consignee or clearing agent with the shipping line BEFORE shipping. Check if they have outstanding debts (Maersk, MSC, etc). Have backup contacts. Never let cargo sit for months without action. Understand who is responsible for which fees BEFORE shipping. If in doubt, list yourself or a verified clearing firm as consignee.',
    realStory:
      'Real case (April–November 2025): a 2019 Golf 7.5 TSI was part of a container shipped under a consignee later blacklisted by Maersk for unpaid debts. Maersk handed the container to the State; Terminal Investment Namibia confirmed storage of N$152,694.70 (5 days N$380+VAT/day, next 5 days N$619+VAT/day, then N$662+VAT/day). Fees were billed collectively under the banned consignee — impossible to pay for one vehicle independently. Container handed to State; importers get 3 months to claim before auction. Lesson: always verify your consignee with the shipping line before shipping.',
    stage: 'Pre-Import Planning',
    severity: 'deal-breaker',
    timeImpact: 'Indefinite hold — 3–12+ months possible',
    recoveryDifficulty: 'difficult',
  },
  {
    title: 'No certified Japanese translation',
    cost: 'N$5,000+ storage fees',
    problem: "MIT/NamRA won't accept untranslated export certificate.",
    fix: 'Source certified JP→EN translator early. Treat it like a permit. Contact: Ritsuko Abrahams +264 81 124 1991.',
    realStory:
      'Took me 14 days to find the only certified translator in Namibia. Called embassy, courts, everyone. Now use Ritsuko Abrahams +264 81 124 1991.',
    stage: 'Documentation Preparation',
    severity: 'major',
    timeImpact: '7–21 days delay',
    recoveryDifficulty: 'difficult',
  },
  {
    title: 'Wrong vehicle purchase (age/drive side)',
    cost: 'Total loss of vehicle',
    problem: 'Car is over 12 years old or left-hand drive.',
    fix: 'Double-check manufacturing date and steering position before purchase.',
    realStory: 'Friend bought a 2009 car in 2022, thinking it was okay. Car was rejected at port — total loss.',
    stage: 'Pre-Import Planning',
    severity: 'deal-breaker',
    timeImpact: 'Import impossible',
    recoveryDifficulty: 'difficult',
  },
  {
    title: 'Unpacking materials not planned',
    cost: 'N$600+ rush costs',
    problem: 'Cars are strapped inside container, need tools to release.',
    fix: 'Budget straps/bolts/tools; confirm who supplies them.',
    realStory: 'Had to rush to Cymot and pay N$600 for straps while the truck waited.',
    stage: 'Collection',
    severity: 'minor',
    timeImpact: 'Same-day delay',
    recoveryDifficulty: 'easy',
  },
  {
    title: 'Unpacking location changed without agreement',
    cost: 'N$11,000 staff travel',
    problem: 'Agent wants to move unpacking from Walvis to upcountry.',
    fix: 'Write "Unpacking at Walvis warehouse" into agreement, specify who pays if moved.',
    realStory:
      'Got quoted N$11,000 for staff to travel to Ongwediva. Only avoided because we fought to keep it in Walvis.',
    stage: 'Clearance',
    severity: 'major',
    timeImpact: 'No time delay',
    recoveryDifficulty: 'moderate',
  },
  {
    title: 'HS code misclassification',
    cost: 'N$15,000+ extra duty',
    problem: 'Wrong classification = wrong duty rate.',
    fix: 'Ask clearing firm to justify HS code on SAD 500 with model/engine evidence.',
    realStory: "Agent used wrong code for my diesel SUV. Would have paid 30% more duty if I hadn't checked.",
    stage: 'Clearance',
    severity: 'major',
    timeImpact: '2–5 days appeal',
    recoveryDifficulty: 'moderate',
  },
  {
    title: 'No insurance before driving',
    cost: 'N$50,000+ accident liability',
    problem: 'Driving without valid insurance from port.',
    fix: 'Arrange temporary insurance before collection day.',
    realStory:
      'Saw someone get in an accident driving from port without insurance. Police and civil liability nightmare.',
    stage: 'Collection',
    severity: 'major',
    timeImpact: 'No time delay',
    recoveryDifficulty: 'easy',
  },
  {
    title: 'Roadworthy test not booked early',
    cost: 'N$1,500+ delays',
    problem: 'Roadworthy centres get fully booked for weeks.',
    fix: 'Book appointment immediately after collection.',
    realStory: "Had to wait 3 weeks for roadworthy appointment. Car sat unregistered, couldn't use it.",
    stage: 'Registration',
    severity: 'minor',
    timeImpact: '1–3 weeks delay',
    recoveryDifficulty: 'easy',
  },
]

function severityBorder(severity: Mistake['severity']) {
  if (severity === 'deal-breaker') return 'border-red-500'
  if (severity === 'major') return 'border-amber-500'
  return 'border-zinc-300'
}

function severityText(severity: Mistake['severity']) {
  if (severity === 'deal-breaker') return 'text-red-600'
  if (severity === 'major') return 'text-amber-600'
  return 'text-zinc-500'
}

function recoveryText(difficulty: Mistake['recoveryDifficulty']) {
  if (difficulty === 'easy') return 'text-emerald-700'
  if (difficulty === 'moderate') return 'text-amber-600'
  return 'text-red-600'
}

export function MistakeCards() {
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')

  const stages = ['all', ...Array.from(new Set(mistakes.map((m) => m.stage)))]
  const severities = ['all', 'deal-breaker', 'major', 'minor']

  const filtered = mistakes.filter((m) => {
    const stageMatch = selectedStage === 'all' || m.stage === selectedStage
    const sevMatch = selectedSeverity === 'all' || m.severity === selectedSeverity
    return stageMatch && sevMatch
  })

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 06</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Costly mistakes</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        What goes wrong, organized.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Real mistakes from real imports — by stage, by severity, with recovery difficulty and a real story for each.
      </p>

      {/* Severity legend */}
      <div className="mt-8 border border-zinc-200 rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 grid grid-cols-1 sm:grid-cols-3 overflow-hidden">
        {[
          { sev: 'deal-breaker' as const, copy: 'Import fails or total loss' },
          { sev: 'major' as const, copy: 'Significant cost or delay' },
          { sev: 'minor' as const, copy: 'Manageable inconvenience' },
        ].map(({ sev, copy }) => (
          <div key={sev} className="px-5 py-4 bg-white">
            <p className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold ${severityText(sev)}`}>
              {sev}
            </p>
            <p className="mt-1 text-sm text-zinc-700">{copy}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2.5">
            <span aria-hidden className="mr-2">↳</span>
            Filter by stage
          </p>
          <div className="flex flex-wrap gap-2">
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] rounded-full border transition-colors ${
                  selectedStage === stage
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-white border-zinc-300 text-zinc-600 hover:border-zinc-500'
                }`}
              >
                {stage === 'all' ? 'All stages' : stage}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2.5">
            <span aria-hidden className="mr-2">↳</span>
            Filter by severity
          </p>
          <div className="flex flex-wrap gap-2">
            {severities.map((severity) => (
              <button
                key={severity}
                onClick={() => setSelectedSeverity(severity)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] rounded-full border transition-colors ${
                  selectedSeverity === severity
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-white border-zinc-300 text-zinc-600 hover:border-zinc-500'
                }`}
              >
                {severity === 'all' ? 'All severities' : severity}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mistakes */}
      <div className="mt-10 space-y-6">
        {filtered.map((mistake, index) => (
          <article
            key={index}
            className={`border border-zinc-200 border-l-2 ${severityBorder(mistake.severity)} rounded-2xl overflow-hidden bg-white`}
          >
            <div className="px-6 sm:px-8 py-6">
              <div className="flex items-start gap-4">
                <XCircle
                  className={`h-4 w-4 mt-1 flex-shrink-0 ${severityText(mistake.severity)}`}
                  strokeWidth={1.5}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                    Mistake {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-zinc-900 leading-snug">
                    {mistake.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em]">
                    <span className="text-zinc-500">{mistake.stage}</span>
                    <span className={`font-semibold ${severityText(mistake.severity)}`}>
                      {mistake.severity}
                    </span>
                    <span className="text-zinc-500">
                      Recovery{' '}
                      <span className={`font-semibold ${recoveryText(mistake.recoveryDifficulty)}`}>
                        {mistake.recoveryDifficulty}
                      </span>
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <p className="text-red-600">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] mr-2">Cost</span>
                      {mistake.cost}
                    </p>
                    <p className="text-zinc-600">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] mr-2">Time</span>
                      {mistake.timeImpact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-5 sm:pl-8">
                <div className="border-l-2 border-red-500 pl-4 py-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold mb-1 flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} />
                    The problem
                  </p>
                  <p className="text-sm text-zinc-800 leading-relaxed">{mistake.problem}</p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 font-semibold mb-1 flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                    How to prevent
                  </p>
                  <p className="text-sm text-zinc-800 leading-relaxed">{mistake.fix}</p>
                </div>

                {mistake.realStory && (
                  <div className="pt-4 border-t border-zinc-200">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">
                      <span aria-hidden className="mr-2">↳</span>
                      Real story
                    </p>
                    <p className="font-serif italic text-zinc-700 leading-relaxed text-sm">
                      {mistake.realStory}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 border border-zinc-200 rounded-2xl px-6 py-10 text-center">
          <p className="text-sm text-zinc-600">No mistakes match your current filters.</p>
          <button
            onClick={() => {
              setSelectedStage('all')
              setSelectedSeverity('all')
            }}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 hover:text-amber-900 underline underline-offset-4"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
