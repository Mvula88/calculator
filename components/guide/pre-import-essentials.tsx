'use client'

import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  ChevronRight,
} from 'lucide-react'

interface PreImportEssentialsProps {
  onNavigateToSection: (sectionId: string) => void
}

const eligibilityRules = [
  {
    category: 'Vehicle Age',
    requirement: 'Maximum 12 years old',
    details: 'Age calculated from manufacturing date, not registration date.',
    checkMethod: 'Check manufacturing plate or import/export certificates.',
    consequence: 'Vehicles over 12 years will be rejected at port.',
  },
  {
    category: 'Drive Side',
    requirement: 'Right-hand drive only',
    details: 'Namibia follows South African vehicle standards.',
    checkMethod: 'Verify steering wheel position in photos/description.',
    consequence: 'Left-hand drive vehicles cannot be registered.',
  },
  {
    category: 'Engine Type',
    requirement: 'Petrol or diesel only',
    details: 'No restrictions on engine size, but affects duty rates.',
    checkMethod: 'Check engine capacity in CC (e.g., 1800cc, 3000cc).',
    consequence: 'Hybrid/electric may face additional requirements.',
  },
  {
    category: 'Documentation',
    requirement: 'Export certificate required',
    details: 'Must be stamped by country of origin customs.',
    checkMethod: 'Ask seller for export certificate copy.',
    consequence: 'Cannot clear customs without proper export docs.',
  },
]

const timeCommitments = [
  {
    phase: 'Research & Planning',
    duration: '7–14 days',
    effort: 'High',
    tasks: ['Find suitable vehicle', 'Verify eligibility', 'Arrange financing', 'Choose clearing agent'],
    canOutsource: false,
  },
  {
    phase: 'Purchase & Shipping',
    duration: '3–7 days',
    effort: 'Medium',
    tasks: ['Complete purchase', 'Arrange export', 'Book shipping', 'Prepare documentation'],
    canOutsource: true,
  },
  {
    phase: 'Transit Period',
    duration: '35–45 days',
    effort: 'Low',
    tasks: ['Track container', 'Prepare clearance docs', 'Monitor for updates'],
    canOutsource: true,
  },
  {
    phase: 'Arrival & Clearance',
    duration: '5–10 days',
    effort: 'High',
    tasks: ['Submit documents', 'Pay duties', 'Coordinate collection', 'Handle issues'],
    canOutsource: true,
  },
  {
    phase: 'Registration',
    duration: '7–14 days',
    effort: 'Medium',
    tasks: ['Roadworthy test', 'NaTIS registration', 'Insurance', 'License plates'],
    canOutsource: false,
  },
]

const skillsNeeded = [
  {
    skill: 'Language Skills',
    requirement: 'English fluency',
    importance: 'Critical',
    description: 'All documents and communication are in English.',
    alternative: 'Hire translator or bilingual agent.',
  },
  {
    skill: 'Documentation Management',
    requirement: 'Detail-oriented',
    importance: 'Critical',
    description: 'One wrong digit can cause weeks of delays.',
    alternative: 'Use professional clearing agent.',
  },
  {
    skill: 'Financial Planning',
    requirement: 'Budget management',
    importance: 'High',
    description: 'Multiple payments with strict timing requirements.',
    alternative: 'Use financing or payment plan services.',
  },
  {
    skill: 'Persistence & Patience',
    requirement: 'Problem-solving mindset',
    importance: 'High',
    description: 'Delays and issues are common, need to stay calm.',
    alternative: 'Hire full-service agent (more expensive).',
  },
  {
    skill: 'Technical Knowledge',
    requirement: 'Basic car knowledge',
    importance: 'Medium',
    description: 'Understand engine specs, features for customs forms.',
    alternative: 'Rely on clearing agent expertise.',
  },
]

const summaryCards = [
  { icon: CheckCircle, label: 'Vehicle rules', value: 'Max 12 years, RHD only' },
  { icon: Clock, label: 'Time needed', value: '60–90 days total' },
  { icon: User, label: 'Skills', value: 'English + patience' },
]

function effortColor(effort: string) {
  if (effort === 'High') return 'text-red-600'
  if (effort === 'Medium') return 'text-amber-600'
  return 'text-emerald-700'
}

function importanceColor(importance: string) {
  if (importance === 'Critical') return 'text-red-600'
  if (importance === 'High') return 'text-amber-600'
  return 'text-zinc-500'
}

export function PreImportEssentials({ onNavigateToSection }: PreImportEssentialsProps) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 02</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Pre-import essentials</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Before you buy.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        The four rules a vehicle must pass, the time the process takes, and the skills you need — or where to outsource them.
      </p>

      {/* Summary strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
        {summaryCards.map((c, idx) => {
          const Icon = c.icon
          return (
            <div key={c.label} className="bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                  Nº 0{idx + 1}
                </span>
                <Icon className="h-4 w-4 text-zinc-300" strokeWidth={1.5} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">{c.label}</p>
              <p className="mt-1 font-serif text-lg font-medium tracking-tight text-zinc-900">{c.value}</p>
            </div>
          )
        })}
      </div>

      {/* Eligibility rules */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <span className="text-amber-600">Eligibility</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Four rules</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            What your vehicle must be.
          </h3>
          <p className="mt-1 text-sm text-zinc-600">Check before you buy — violations mean automatic rejection.</p>
        </div>

        <div className="divide-y divide-zinc-200">
          {eligibilityRules.map((rule, idx) => (
            <div key={rule.category} className="px-6 sm:px-8 py-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                    Rule 0{idx + 1}
                  </p>
                  <h4 className="font-serif text-lg font-medium tracking-tight text-zinc-900">{rule.category}</h4>
                  <p className="mt-1 text-sm text-emerald-700 font-medium">{rule.requirement}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold whitespace-nowrap">
                  Must pass
                </span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="grid grid-cols-[110px_1fr] gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 pt-0.5">Details</dt>
                  <dd className="text-zinc-700">{rule.details}</dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 pt-0.5">How to check</dt>
                  <dd className="text-zinc-700">{rule.checkMethod}</dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-3 border-l-2 border-red-500 pl-3 ml-[-12px] mt-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold pt-0.5">If you fail</dt>
                  <dd className="text-zinc-800">{rule.consequence}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>

      {/* Time commitments */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <span className="text-amber-600">Time</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Phase by phase</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            When you'll be busy.
          </h3>
          <p className="mt-1 text-sm text-zinc-600">Realistic timeline showing where the effort lands.</p>
        </div>

        <ul className="divide-y divide-zinc-200">
          {timeCommitments.map((phase, idx) => (
            <li key={phase.phase} className="px-6 sm:px-8 py-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-4">
                  <Calendar className="h-4 w-4 text-zinc-300 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                      Phase 0{idx + 1}
                    </p>
                    <h4 className="font-serif text-base font-medium tracking-tight text-zinc-900">{phase.phase}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 text-right">
                  <span className="font-mono text-xs text-zinc-700">{phase.duration}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold ${effortColor(phase.effort)}`}>
                    {phase.effort} effort
                  </span>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">Key tasks</p>
              <ul className="space-y-1 text-sm text-zinc-700 mb-3">
                {phase.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                <span aria-hidden className="mr-1.5">↳</span>
                {phase.canOutsource ? 'Can outsource to agent' : 'Must handle personally'}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills needed */}
      <div className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
            <span className="text-amber-600">Skills</span>
            <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
            <span>Or who to hire</span>
          </div>
          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
            What you need — and where to outsource.
          </h3>
        </div>

        <div className="divide-y divide-zinc-200">
          {skillsNeeded.map((skill, idx) => (
            <div key={skill.skill} className="px-6 sm:px-8 py-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                    Skill 0{idx + 1}
                  </p>
                  <h4 className="font-serif text-base font-medium tracking-tight text-zinc-900">{skill.skill}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{skill.requirement}</p>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold whitespace-nowrap ${importanceColor(skill.importance)}`}>
                  {skill.importance}
                </span>
              </div>
              <p className="text-sm text-zinc-700 mt-2">{skill.description}</p>
              <p className="mt-2 text-sm text-zinc-600">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mr-2">↳ Alternative</span>
                {skill.alternative}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ready to proceed */}
      <div className="mt-12 border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-10">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-3">
          <span className="text-amber-600">Ready?</span>
          <span className="h-px w-8 bg-zinc-300" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
          If your vehicle passes the four rules,
          <span className="italic font-light text-amber-600"> you're ready to proceed.</span>
        </h3>
        <p className="mt-3 text-sm text-zinc-600">Run the numbers or see the full timeline.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => onNavigateToSection('costs')}
            className="bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full h-11 px-6"
          >
            Calculate total costs
            <ChevronRight className="h-4 w-4 ml-1.5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigateToSection('timeline')}
            className="border-zinc-300 bg-white hover:bg-stone-50 text-zinc-900 font-medium rounded-full h-11 px-6"
          >
            See full timeline
          </Button>
        </div>
      </div>
    </div>
  )
}
