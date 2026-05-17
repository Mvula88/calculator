'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Phone,
  Mail,
  AlertTriangle,
  Clock,
  CheckCircle,
  X,
  HelpCircle,
  Copy,
  MapPin,
} from 'lucide-react'

interface EmergencyContact {
  name: string
  role: string
  phone?: string
  email?: string
  hours: string
  location?: string
  speciality?: string
}

interface QuickAction {
  situation: string
  urgency: 'critical' | 'high' | 'medium'
  cost: string
  timeframe: string
  immediateActions: string[]
  contacts: string[]
  templates?: string[]
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Namibian Port Authority',
    role: 'Port Operations',
    phone: '+264 64 208 2100',
    email: 'info@namport.com.na',
    hours: '24/7 operations',
    location: 'Walvis Bay',
    speciality: 'Container releases, storage issues',
  },
  {
    name: 'NamRA Customs',
    role: 'Import Clearance',
    phone: '+264 61 299 1000',
    email: 'contact@namra.gov.na',
    hours: 'Mon–Fri 8:00–17:00',
    location: 'Windhoek / Walvis Bay',
    speciality: 'Duty disputes, document issues',
  },
  {
    name: 'MIT — Import Control',
    role: 'Import Permits',
    phone: '+264 61 283 7111',
    email: 'info@mti.gov.na',
    hours: 'Mon–Fri 8:00–17:00',
    location: 'Windhoek',
    speciality: 'Import permit issues, restricted goods',
  },
  {
    name: 'Japanese Embassy',
    role: 'Document Verification',
    phone: '+264 61 254 916',
    email: 'consul@windhoek.mofa.go.jp',
    hours: 'Mon–Fri 9:00–12:00, 14:00–16:00',
    location: 'Windhoek',
    speciality: 'Translation services, document authentication',
  },
  {
    name: 'High Court of Namibia',
    role: 'Legal Translation',
    phone: '+264 61 275 9000',
    hours: 'Mon–Fri 8:00–16:30',
    location: 'Windhoek',
    speciality: 'Certified translators list',
  },
]

const quickActions: QuickAction[] = [
  {
    situation: 'Container held due to consignee block',
    urgency: 'critical',
    cost: 'N$500+/day storage',
    timeframe: 'Immediate action needed',
    immediateActions: [
      'Call shipping line to confirm block reason and amount due',
      'Request written details of debt and account',
      'If not your debt, immediately request B/L amendment',
      'Call port to request storage counter freeze during resolution',
    ],
    contacts: ['Namibian Port Authority', 'NamRA Customs'],
    templates: ['B/L Amendment Request', 'Storage Fee Negotiation'],
  },
  {
    situation: 'Wrong VIN/Engine number on documents',
    urgency: 'high',
    cost: 'N$300+/day storage',
    timeframe: '24–48 hours to fix',
    immediateActions: [
      'Take clear photos of actual VIN and engine numbers',
      'Contact seller for corrected invoice with proper details',
      'Submit correction request to clearing agent with photos',
      'Follow up with customs officer directly if possible',
    ],
    contacts: ['NamRA Customs'],
    templates: ['Document Correction Request'],
  },
  {
    situation: 'Cannot find certified translator',
    urgency: 'high',
    cost: 'N$200–500/day storage',
    timeframe: '5–14 days to resolve',
    immediateActions: [
      "Submit partial application noting 'translation in progress'",
      'Call Japanese Embassy for certified translator list',
      'Contact High Court for general translator directory',
      'Consider flying to Joburg if local options exhausted',
    ],
    contacts: ['Japanese Embassy', 'High Court of Namibia'],
    templates: ['Translation Service Request'],
  },
  {
    situation: 'HS code classification disputed',
    urgency: 'medium',
    cost: 'N$10,000+ extra duty',
    timeframe: '3–7 days to appeal',
    immediateActions: [
      'Request written justification from customs for their code choice',
      'Gather technical specs from manufacturer website',
      'Research similar vehicle classifications online',
      'Submit formal appeal with supporting evidence',
    ],
    contacts: ['NamRA Customs'],
    templates: ['Customs Classification Inquiry'],
  },
  {
    situation: 'Storage fees mounting rapidly',
    urgency: 'high',
    cost: 'N$200–500/day ongoing',
    timeframe: 'Same-day action required',
    immediateActions: [
      'Document the root cause with screenshots/emails',
      'Calculate total fees and days affected',
      'Request meeting with port manager (face-to-face works better)',
      'Propose payment plan or partial payment in good faith',
    ],
    contacts: ['Namibian Port Authority'],
    templates: ['Storage Fee Negotiation'],
  },
]

function urgencyText(urgency: QuickAction['urgency']) {
  if (urgency === 'critical') return 'text-red-600'
  if (urgency === 'high') return 'text-amber-600'
  return 'text-zinc-500'
}

function urgencyBorder(urgency: QuickAction['urgency']) {
  if (urgency === 'critical') return 'border-red-500'
  if (urgency === 'high') return 'border-amber-500'
  return 'border-zinc-300'
}

export function EmergencyQuickReference() {
  const [isFloatingVisible, setIsFloatingVisible] = useState(false)
  const [selectedAction, setSelectedAction] = useState<QuickAction | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  return (
    <>
      <div id="emergency">
        {/* Section header */}
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
          <span className="text-amber-600">Nº 09</span>
          <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
          <span>Emergency reference</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
          When things go wrong.
        </h2>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
          Critical contacts and step-by-step playbooks for the five most common crises.
        </p>

        {/* Quick access strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
          {[
            {
              icon: Phone,
              label: 'Contacts',
              copy: 'Key numbers when things go wrong',
              target: 'emergency-contacts',
              cta: 'Jump to contacts',
            },
            {
              icon: AlertTriangle,
              label: 'Playbooks',
              copy: 'Step-by-step crisis management',
              target: 'crisis-playbooks',
              cta: 'Jump to playbooks',
            },
            {
              icon: HelpCircle,
              label: 'Floating help',
              copy: 'Always-accessible emergency button',
              cta: 'Enable floating help',
              isFloating: true,
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.isFloating) {
                    setIsFloatingVisible(true)
                  } else if (item.target) {
                    document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="group bg-white p-6 sm:p-7 text-left hover:bg-stone-50/60 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                    Nº 0{idx + 1}
                  </span>
                  <Icon className="h-4 w-4 text-zinc-300 group-hover:text-amber-500 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-base font-medium tracking-tight text-zinc-900">{item.label}</h3>
                <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{item.copy}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-700 group-hover:text-amber-700 transition-colors">
                  {item.cta} →
                </p>
              </button>
            )
          })}
        </div>

        {/* Emergency contacts */}
        <div id="emergency-contacts" className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
              <Phone className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
              <span className="text-amber-600">Directory</span>
              <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
              <span>Five critical numbers</span>
            </div>
            <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
              Save these before you start.
            </h3>
          </div>

          <ul className="divide-y divide-zinc-200">
            {emergencyContacts.map((contact, idx) => (
              <li key={contact.name} className="px-6 sm:px-8 py-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                      Contact 0{idx + 1}
                    </p>
                    <h4 className="font-serif text-base sm:text-lg font-medium tracking-tight text-zinc-900">
                      {contact.name}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{contact.role}</p>
                    {contact.speciality && (
                      <p className="mt-2 text-xs text-zinc-600 italic">{contact.speciality}</p>
                    )}
                  </div>
                  {contact.location && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" strokeWidth={1.5} />
                      {contact.location}
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-mono text-zinc-900">{contact.phone}</span>
                      <button
                        onClick={() => copyToClipboard(contact.phone!, `${contact.name} phone`)}
                        className="text-zinc-400 hover:text-zinc-700 transition-colors"
                        aria-label="Copy phone"
                      >
                        {copiedText === `${contact.name} phone` ? (
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.75} />
                        ) : (
                          <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-zinc-700 break-all">{contact.email}</span>
                      <button
                        onClick={() => copyToClipboard(contact.email!, `${contact.name} email`)}
                        className="text-zinc-400 hover:text-zinc-700 transition-colors flex-shrink-0"
                        aria-label="Copy email"
                      >
                        {copiedText === `${contact.name} email` ? (
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.75} />
                        ) : (
                          <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Clock className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-zinc-600">{contact.hours}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Crisis playbooks */}
        <div id="crisis-playbooks" className="mt-12 border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-zinc-200 bg-stone-50/60">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" strokeWidth={1.5} />
              <span className="text-amber-600">Playbooks</span>
              <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
              <span>Crisis situations</span>
            </div>
            <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-zinc-900">
              Immediate-action plans.
            </h3>
          </div>

          <ul className="divide-y divide-zinc-200">
            {quickActions.map((action, idx) => {
              const isOpen = selectedAction?.situation === action.situation
              return (
                <li key={action.situation} className={`border-l-2 ${urgencyBorder(action.urgency)}`}>
                  <button
                    onClick={() => setSelectedAction(isOpen ? null : action)}
                    className="w-full px-6 sm:px-8 py-5 text-left hover:bg-stone-50/60 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 font-mono text-[10px] uppercase tracking-[0.24em]">
                          <span className="text-amber-600 font-semibold">
                            Crisis {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className={`font-semibold ${urgencyText(action.urgency)}`}>
                            {action.urgency}
                          </span>
                          <span className="text-red-600">{action.cost}</span>
                        </div>
                        <h4 className="font-serif text-lg font-medium tracking-tight text-zinc-900">
                          {action.situation}
                        </h4>
                        <p className="mt-1 text-xs text-zinc-500">{action.timeframe}</p>
                      </div>
                      <span aria-hidden className="text-zinc-400 mt-2 flex-shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-zinc-100 bg-stone-50/30 space-y-6">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-600 font-semibold mb-3 pt-4">
                          Immediate actions
                        </p>
                        <ol className="space-y-2.5">
                          {action.immediateActions.map((actionItem, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-800">
                              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold flex-shrink-0 w-6 pt-1">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="leading-relaxed">{actionItem}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {action.contacts.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold mb-2">
                            <span aria-hidden className="mr-2">↳</span>
                            Key contacts
                          </p>
                          <ul className="space-y-1">
                            {action.contacts.map((contactName, i) => {
                              const contact = emergencyContacts.find((c) => c.name === contactName)
                              return (
                                <li key={i} className="text-sm text-zinc-700">
                                  <span className="font-medium">{contactName}</span>
                                  {contact?.phone && (
                                    <span className="ml-2 font-mono text-xs text-zinc-500">{contact.phone}</span>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}

                      {action.templates && action.templates.length > 0 && (
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-700 font-semibold mb-2">
                            <span aria-hidden className="mr-2">↳</span>
                            Helpful templates
                          </p>
                          <ul className="space-y-1">
                            {action.templates.map((template, i) => (
                              <li key={i} className="text-sm text-zinc-700">{template}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Floating emergency button */}
      {isFloatingVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <Button
              className="h-12 w-12 rounded-full bg-zinc-900 hover:bg-zinc-800 shadow-lg p-0"
              onClick={() => setIsFloatingVisible(false)}
              aria-label="Close emergency help"
            >
              <HelpCircle className="h-5 w-5 text-amber-400" strokeWidth={1.75} />
            </Button>
            <div className="absolute bottom-14 right-0 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 min-w-[260px]">
              <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-zinc-100">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                    Emergency
                  </p>
                  <h4 className="mt-1 font-serif text-base font-medium tracking-tight text-zinc-900">
                    Quick help
                  </h4>
                </div>
                <button
                  onClick={() => setIsFloatingVisible(false)}
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <div className="space-y-1">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-stone-50 rounded text-sm text-zinc-800 transition-colors"
                  onClick={() => {
                    document.getElementById('emergency-contacts')?.scrollIntoView({ behavior: 'smooth' })
                    setIsFloatingVisible(false)
                  }}
                >
                  <Phone className="h-3.5 w-3.5 inline mr-2 text-zinc-400" strokeWidth={1.5} />
                  Emergency contacts
                </button>
                <button
                  className="w-full text-left px-3 py-2 hover:bg-stone-50 rounded text-sm text-zinc-800 transition-colors"
                  onClick={() => {
                    document.getElementById('crisis-playbooks')?.scrollIntoView({ behavior: 'smooth' })
                    setIsFloatingVisible(false)
                  }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 inline mr-2 text-zinc-400" strokeWidth={1.5} />
                  Crisis playbooks
                </button>
              </div>
              <p className="mt-3 pt-3 border-t border-zinc-100 text-xs text-zinc-600 leading-relaxed">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 font-semibold">Most common</span>{' '}
                Container holds due to consignee blocks or document errors.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
