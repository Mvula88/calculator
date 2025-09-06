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
}

const templates: Template[] = [
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
    category: 'Pre-shipment'
  },
  {
    id: 'bl-amendment',
    title: 'B/L Amendment Request',
    icon: FileText,
    subject: 'B/L [number] – Consignee Amendment Request',
    content: `Please amend consignee to: [New Legal Name + Registration + Address]. 

Reason: Account block on previous consignee, preventing release. All parties consent. 

Attached: ID/Company docs + authorisation letter.`,
    category: 'Emergency'
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
    category: 'Planning'
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
    category: 'Negotiation'
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
    category: 'Documentation'
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
    category: 'Planning'
  }
]

export function TemplatesSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))]
  
  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const copyToClipboard = async (template: Template) => {
    const fullText = template.subject 
      ? `Subject: ${template.subject}\n\n${template.content}`
      : template.content
      
    await navigator.clipboard.writeText(fullText)
    setCopiedId(template.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">📋 Copy-Paste Templates & Scripts</h2>
        <p className="text-gray-600">Battle-tested emails that get results</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredTemplates.map((template) => {
          const Icon = template.icon
          return (
            <Card key={template.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">{template.title}</h3>
                      <span className="text-sm text-gray-500">{template.category}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(template)}
                    className="flex items-center gap-2"
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
    </div>
  )
}