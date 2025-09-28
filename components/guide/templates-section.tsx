'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
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
    whenToUse: 'Before purchasing any vehicle to avoid costly mistakes'
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
    whenToUse: 'Before finalizing Bill of Lading to prevent container holds'
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
    whenToUse: 'When selecting clearing agent - need written quotes to compare costs'
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
    whenToUse: 'Before making any payments to agents or shipping lines'
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
    whenToUse: 'For Japanese vehicles - start translation process early to avoid delays'
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
    whenToUse: 'If you suspect wrong HS code classification to avoid extra duty'
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
    whenToUse: 'When container is held due to consignee account issues'
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
    whenToUse: 'When storage fees are mounting due to issues outside your control'
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
    whenToUse: 'When customs rejects documents due to errors'
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
    whenToUse: 'To book vehicle transport from port to final destination'
  }
]

export function TemplatesSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string>('All')
  const [selectedPriority, setSelectedPriority] = useState<string>('All')
  const [showSubmissionOrder, setShowSubmissionOrder] = useState(false)

  const stages = ['All', ...Array.from(new Set(templates.map(t => t.stage)))]
  const priorities = ['All', 'required', 'helpful', 'emergency']

  const filteredTemplates = templates.filter(template => {
    const stageMatch = selectedStage === 'All' || template.stage === selectedStage
    const priorityMatch = selectedPriority === 'All' || template.priority === selectedPriority
    return stageMatch && priorityMatch
  })

  // Sort by submission order when showing required templates
  const sortedTemplates = showSubmissionOrder 
    ? [...filteredTemplates].sort((a, b) => (a.submissionOrder || 999) - (b.submissionOrder || 999))
    : filteredTemplates

  const copyToClipboard = async (template: Template) => {
    const fullText = template.subject 
      ? `Subject: ${template.subject}\n\n${template.content}`
      : template.content

    await navigator.clipboard.writeText(fullText)
    setCopiedId(template.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'required': return 'bg-red-100 text-red-700 border-red-300'
      case 'helpful': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'emergency': return 'bg-orange-100 text-orange-700 border-orange-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'required': return '⚡'
      case 'helpful': return '💡'
      case 'emergency': return '🚨'
      default: return '📄'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">📋 Documents & Communication Templates</h2>
        <p className="text-gray-600">Ready-to-use templates organized by timeline stage with priority levels</p>
      </div>

      {/* Priority Guide */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <h3 className="font-bold mb-3">🏷️ Template Priorities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full border bg-red-100 text-red-700 border-red-300">⚡ required</span>
            <span className="text-sm">Must use to avoid problems</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full border bg-blue-100 text-blue-700 border-blue-300">💡 helpful</span>
            <span className="text-sm">Useful for optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full border bg-orange-100 text-orange-700 border-orange-300">🚨 emergency</span>
            <span className="text-sm">For crisis situations</span>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h4 className="font-medium mb-2">Filter by Timeline Stage:</h4>
          <div className="flex flex-wrap gap-2">
            {stages.map(stage => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedStage === stage
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-medium mb-2">Filter by Priority:</h4>
          <div className="flex flex-wrap gap-2">
            {priorities.map(priority => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedPriority === priority
                    ? getPriorityColor(priority)
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {priority === 'All' ? 'All Priorities' : `${getPriorityIcon(priority)} ${priority}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Order Toggle */}
      {selectedPriority === 'required' && (
        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div>
            <p className="text-sm font-medium text-yellow-900">Required Templates</p>
            <p className="text-xs text-yellow-700 mt-1">These are essential for a successful import</p>
          </div>
          <button
            onClick={() => setShowSubmissionOrder(!showSubmissionOrder)}
            className="text-yellow-600 hover:text-yellow-800 text-sm underline"
          >
            {showSubmissionOrder ? 'Hide' : 'Show'} Order Guide
          </button>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid gap-4">
        {sortedTemplates.map((template, index) => {
          const Icon = template.icon
          return (
            <Card key={template.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{template.title}</h3>
                        {showSubmissionOrder && template.submissionOrder && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            Step {template.submissionOrder}
                          </span>
                        )}
                      </div>

                      {/* Labels */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {template.stage}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(template.priority)}`}>
                          {getPriorityIcon(template.priority)} {template.priority}
                        </span>
                      </div>

                      {/* When to Use */}
                      <div className="text-sm text-gray-600 mb-3">
                        <strong>When to use:</strong> {template.whenToUse}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(template)}
                    className="flex items-center gap-2 ml-4"
                  >
                    {copiedId === template.id ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                {/* Template Content */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  {template.subject && (
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-600">Subject: </span>
                      <span className="text-sm text-gray-900">{template.subject}</span>
                    </div>
                  )}
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                    {template.content}
                  </pre>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {sortedTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No templates match your current filters.</p>
          <button
            onClick={() => {
              setSelectedStage('All')
              setSelectedPriority('All')
            }}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Stage Overview */}
      {selectedStage === 'All' && selectedPriority === 'All' && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-bold mb-3">📊 Templates by Import Stage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stages.slice(1).map(stage => {
              const stageTemplates = templates.filter(t => t.stage === stage)
              return (
                <div key={stage} className="p-3 bg-white rounded border">
                  <h4 className="font-medium text-sm mb-2">{stage}</h4>
                  <div className="space-y-1">
                    {stageTemplates.map((template, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="truncate mr-2">{template.title}</span>
                        <span className={`px-1 py-0.5 rounded ${getPriorityColor(template.priority)}`}>
                          {getPriorityIcon(template.priority)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}