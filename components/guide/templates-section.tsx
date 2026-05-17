'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, CheckCircle, Mail, FileText, Phone } from 'lucide-react'

interface Template {
  id: string
  title: string
  icon: any
  subject?: string
  content: string
  category: string
  stage: string
  priority: 'required' | 'helpful' | 'emergency'
  submissionOrder?: number
  whenToUse: string
}

const templates: Template[] = [
  {
    id: 'vehicle-eligibility',
    title: 'Vehicle Eligibility Pre-Check',
    icon: FileText,
    subject: 'Vehicle Import Eligibility Confirmation - [Make/Model/Year]',
    content: `Please confirm this vehicle meets Namibian import requirements:

Vehicle Details:
- Make/Model: [Make/Model]
- Year: [Year]
- Engine: [Size/Type]
- Drive: Right-hand drive
- VIN: [VIN]

Please confirm:
1. Vehicle age acceptable (under 12 years)?
2. Right-hand drive confirmed?
3. Any import restrictions for this model?
4. Estimated duty/VAT based on value N$[Amount]?

Need written confirmation before purchase.`,
    category: 'Verification',
    stage: 'Pre-Import Planning',
    priority: 'required',
    submissionOrder: 1,
    whenToUse: 'Before purchasing any vehicle to avoid costly mistakes',
  },
  {
    id: 'consignee-check',
    title: 'Consignee Good Standing Check',
    icon: Mail,
    subject: 'Consignee Status Confirmation – Booking [#] / BL Draft',
    content: `Dear [Agent/Carrier],

Please confirm in writing that the proposed Consignee "[Full Legal Name]" is in good standing with your company and that no credit hold or account block exists which could delay cargo release for Booking [#] / ETD [date].

If any risk exists, please advise immediately so we can amend the consignee before BL issuance.

Thank you,
[Your Name]
[Company] • [Phone] • [Email]`,
    category: 'Verification',
    stage: 'Shipping & Documentation',
    priority: 'required',
    submissionOrder: 2,
    whenToUse: 'Before finalizing Bill of Lading to prevent container holds',
  },
  {
    id: 'agent-quote',
    title: 'Agent Quote Request',
    icon: Mail,
    subject: 'Written Quote Request - Import Clearance Services',
    content: `Please send your written fee schedule with line items for:
• Port charges
• Terminal handling
• Clearing fees
• Storage (per day rate)
• Unpacking costs
• Staff travel (if any)
• Who supplies straps/materials

Please confirm unpacking location in writing.

Vehicle details:
- Type: [Make/Model]
- Origin: [Country]
- ETA: [Date]`,
    category: 'Planning',
    stage: 'Pre-Import Planning',
    priority: 'required',
    submissionOrder: 3,
    whenToUse: 'When selecting clearing agent — need written quotes to compare costs',
  },
  {
    id: 'due-diligence',
    title: 'Pre-Payment Due Diligence',
    icon: Mail,
    subject: 'Pre-Payment Confirmation Required',
    content: `Before we proceed with payment, please confirm in writing:

1. Consignee name on B/L: [Name]
2. Consignee good standing with shipping line: [Yes/No]
3. Written fee schedule attached: [Yes/No]
4. Unpacking location: [Specific location]
5. Who pays if unpacking moves: [Party]
6. Container share rules (if applicable): [Details]

Please provide written confirmation by [date/time].`,
    category: 'Verification',
    stage: 'Shipping & Documentation',
    priority: 'required',
    submissionOrder: 4,
    whenToUse: 'Before making any payments to agents or shipping lines',
  },
  {
    id: 'translator-request',
    title: 'Translation Service Request',
    icon: FileText,
    subject: 'Urgent: Certified JP→EN Translation Required',
    content: `We need a certified Japanese→English translation of export certificate by [date].

Please confirm:
- Certification type accepted by NamRA/MIT
- Turnaround time
- Cost
- Whether you can certify/stamp the translation

Documents ready for immediate submission.`,
    category: 'Documentation',
    stage: 'Documentation Preparation',
    priority: 'required',
    submissionOrder: 5,
    whenToUse: 'For Japanese vehicles — start translation process early to avoid delays',
  },
  {
    id: 'customs-inquiry',
    title: 'Customs Classification Inquiry',
    icon: FileText,
    subject: 'HS Code Classification Inquiry - [Make/Model]',
    content: `Please confirm the correct HS code classification for:

Vehicle: [Make/Model/Year]
Engine: [Size/Type - e.g., 2000cc petrol]
Features: [Any special features that affect classification]

Current proposed code: [Code if known]
Duty rate: [Rate if known]

Please provide:
1. Correct HS code with justification
2. Applicable duty rate
3. Any special considerations

Reference documents attached: specs, brochures, etc.`,
    category: 'Documentation',
    stage: 'Clearance & Collection',
    priority: 'helpful',
    submissionOrder: 6,
    whenToUse: 'If you suspect wrong HS code classification to avoid extra duty',
  },
  {
    id: 'bl-amendment',
    title: 'B/L Amendment Request',
    icon: FileText,
    subject: 'B/L [number] – Consignee Amendment Request',
    content: `Please amend consignee to: [New Legal Name + Registration + Address].

Reason: Account block on previous consignee, preventing release. All parties consent.

Attached: ID/Company docs + authorisation letter.`,
    category: 'Emergency',
    stage: 'Emergency Situations',
    priority: 'emergency',
    whenToUse: 'When container is held due to consignee account issues',
  },
  {
    id: 'storage-negotiation',
    title: 'Storage Fee Negotiation',
    icon: Phone,
    subject: 'Storage Fee Goodwill Request - Container [#]',
    content: `We're clearing in good faith; the hold resulted from a consignee account issue outside our control.

We've resolved the account and can clear today.

Please authorise a goodwill reduction on storage for this consignment.

Container: [#]
Days affected: [#]
Resolution date: [Today]`,
    category: 'Negotiation',
    stage: 'Emergency Situations',
    priority: 'emergency',
    whenToUse: 'When storage fees are mounting due to issues outside your control',
  },
  {
    id: 'document-correction',
    title: 'Document Correction Request',
    icon: FileText,
    subject: 'Document Correction Required - Container [#]',
    content: `Please assist with correcting the following document errors:

Container: [#]
Current Issue: [Describe error - e.g., VIN digit wrong]

Correct Information:
- VIN: [Correct VIN]
- Engine Number: [Correct Engine #]
- Make/Model: [Correct details]

Supporting Evidence Attached:
- VIN photo from vehicle
- Engine number photo
- Corrected invoice from seller

Please advise process and timeline for correction.`,
    category: 'Correction',
    stage: 'Emergency Situations',
    priority: 'emergency',
    whenToUse: 'When customs rejects documents due to errors',
  },
  {
    id: 'transport-booking',
    title: 'Transport Service Booking',
    icon: Phone,
    subject: 'Vehicle Transport Booking - [Origin] to [Destination]',
    content: `Please quote for vehicle transport:

Pickup: [Port/Location + Date]
Delivery: [Final destination + preferred date]
Vehicle: [Make/Model, size if large]
Special requirements: [Any special handling needed]

Please confirm:
- Rate per vehicle
- Insurance coverage included
- Estimated transit time
- Payment terms
- What happens if pickup delayed

Available for pickup from [Date].`,
    category: 'Logistics',
    stage: 'Collection & Delivery',
    priority: 'helpful',
    submissionOrder: 7,
    whenToUse: 'To book vehicle transport from port to final destination',
  },
]

function priorityText(priority: Template['priority']) {
  if (priority === 'required') return 'text-red-600'
  if (priority === 'emergency') return 'text-amber-600'
  return 'text-zinc-500'
}

export function TemplatesSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string>('All')
  const [selectedPriority, setSelectedPriority] = useState<string>('All')
  const [showSubmissionOrder, setShowSubmissionOrder] = useState(false)

  const stages = ['All', ...Array.from(new Set(templates.map((t) => t.stage)))]
  const priorities = ['All', 'required', 'helpful', 'emergency']

  const filteredTemplates = templates.filter((template) => {
    const stageMatch = selectedStage === 'All' || template.stage === selectedStage
    const priorityMatch = selectedPriority === 'All' || template.priority === selectedPriority
    return stageMatch && priorityMatch
  })

  const sortedTemplates = showSubmissionOrder
    ? [...filteredTemplates].sort((a, b) => (a.submissionOrder || 999) - (b.submissionOrder || 999))
    : filteredTemplates

  const copyToClipboard = async (template: Template) => {
    const fullText = template.subject ? `Subject: ${template.subject}\n\n${template.content}` : template.content
    await navigator.clipboard.writeText(fullText)
    setCopiedId(template.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 07</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Templates</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Copy-paste templates.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Email, message, and form templates organized by timeline stage and priority. Click to copy the full text including subject line.
      </p>

      {/* Priority legend */}
      <div className="mt-8 border border-zinc-200 rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 grid grid-cols-1 sm:grid-cols-3 overflow-hidden">
        {[
          { p: 'required' as const, copy: 'Must use to avoid problems' },
          { p: 'helpful' as const, copy: 'Useful for optimization' },
          { p: 'emergency' as const, copy: 'For crisis situations' },
        ].map(({ p, copy }) => (
          <div key={p} className="px-5 py-4 bg-white">
            <p className={`font-mono text-[10px] uppercase tracking-[0.24em] font-semibold ${priorityText(p)}`}>
              {p}
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
                {stage}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2.5">
            <span aria-hidden className="mr-2">↳</span>
            Filter by priority
          </p>
          <div className="flex flex-wrap gap-2">
            {priorities.map((priority) => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] rounded-full border transition-colors ${
                  selectedPriority === priority
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-white border-zinc-300 text-zinc-600 hover:border-zinc-500'
                }`}
              >
                {priority === 'All' ? 'All priorities' : priority}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submission order toggle */}
      {selectedPriority === 'required' && (
        <div className="mt-6 flex items-center justify-between border border-zinc-200 rounded-xl px-5 py-3 bg-stone-50/60">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 font-semibold">
              Required templates
            </p>
            <p className="mt-1 text-xs text-zinc-600">Essential for a successful import.</p>
          </div>
          <button
            onClick={() => setShowSubmissionOrder((s) => !s)}
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-700 hover:text-zinc-900 underline underline-offset-4"
          >
            {showSubmissionOrder ? 'Hide order' : 'Show order'}
          </button>
        </div>
      )}

      {/* Templates */}
      <div className="mt-10 space-y-6">
        {sortedTemplates.map((template, index) => {
          const Icon = template.icon
          return (
            <article
              key={template.id}
              className="border border-zinc-200 rounded-2xl overflow-hidden bg-white"
            >
              <div className="px-6 sm:px-8 py-6">
                <div className="flex items-start gap-4">
                  <Icon className="h-4 w-4 text-zinc-300 mt-1.5 flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                        Template {String(index + 1).padStart(2, '0')}
                      </p>
                      {showSubmissionOrder && template.submissionOrder && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                          Step {template.submissionOrder}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-zinc-900 leading-snug">
                      {template.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em]">
                      <span className="text-zinc-500">{template.stage}</span>
                      <span className={`font-semibold ${priorityText(template.priority)}`}>
                        {template.priority}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-zinc-700">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mr-2">When to use</span>
                      {template.whenToUse}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(template)}
                    className="border-zinc-300 bg-white hover:bg-stone-50 text-zinc-900 font-medium rounded-full h-9 px-4 ml-2 flex-shrink-0"
                  >
                    {copiedId === template.id ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-emerald-600" strokeWidth={1.75} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.75} />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="border-t border-zinc-200 bg-stone-50/60 px-6 sm:px-8 py-5">
                {template.subject && (
                  <div className="mb-4 pb-4 border-b border-zinc-200">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-1">Subject</p>
                    <p className="text-sm text-zinc-900 font-medium">{template.subject}</p>
                  </div>
                )}
                <pre className="text-sm text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {template.content}
                </pre>
              </div>
            </article>
          )
        })}
      </div>

      {sortedTemplates.length === 0 && (
        <div className="mt-10 border border-zinc-200 rounded-2xl px-6 py-10 text-center">
          <p className="text-sm text-zinc-600">No templates match your current filters.</p>
          <button
            onClick={() => {
              setSelectedStage('All')
              setSelectedPriority('All')
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
