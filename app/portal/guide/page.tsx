import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Shield, 
  DollarSign,
  Truck,
  MapPin,
  Phone,
  Calendar,
  Lock,
  Star,
  TrendingUp,
  Eye
} from 'lucide-react'

export default function ImportGuide() {
  const steps = [
    {
      phase: "Pre-Import Planning",
      duration: "7-14 days",
      steps: [
        "Vehicle selection and inspection in source country",
        "Verify vehicle eligibility for import (age restrictions)",
        "Obtain vehicle history report and inspection certificate",
        "Secure financing and insurance arrangements",
        "Choose clearing agent and shipping company"
      ],
      criticalTips: [
        "NEVER buy a vehicle over 10 years old for SA import",
        "Ensure the vehicle has not been in major accidents",
        "Verify the VIN matches all documentation exactly"
      ]
    },
    {
      phase: "Documentation Preparation", 
      duration: "3-5 days",
      steps: [
        "Original title/registration document",
        "Bill of sale with detailed vehicle specifications",
        "Export permit from source country",
        "Professional vehicle appraisal (market value)",
        "Insurance certificate for transit"
      ],
      criticalTips: [
        "All documents must be notarized and apostilled",
        "Vehicle value affects duty calculation - be strategic",
        "Missing documents cause 30+ day delays"
      ]
    },
    {
      phase: "Shipping & Transit",
      duration: "21-35 days", 
      steps: [
        "Vehicle preparation for shipping (fluids, battery)",
        "Loading and container sealing",
        "Ocean freight to destination port",
        "Port arrival and customs clearance initiation",
        "SARS duty assessment and payment"
      ],
      criticalTips: [
        "RoRo shipping is R15,000 cheaper than container",
        "Port delays add R800/day in storage fees",
        "Pay duties within 21 days to avoid penalties"
      ]
    },
    {
      phase: "Customs Clearance",
      duration: "5-14 days",
      steps: [
        "SARS customs declaration submission",
        "Physical vehicle inspection by customs",
        "NRCS conformity assessment application", 
        "Homologation certificate issuance",
        "Final duty calculation and payment"
      ],
      criticalTips: [
        "Customs values vehicles 20-30% above declared value",
        "NRCS inspection failures require costly modifications",
        "Use our agent network to expedite processing"
      ]
    },
    {
      phase: "Final Registration",
      duration: "3-7 days",
      steps: [
        "Vehicle collection from port",
        "Transport to registration center",
        "Road safety inspection and certificate",
        "License plate application and issuance",
        "Final insurance activation"
      ],
      criticalTips: [
        "Book roadworthy test in advance - 2 week waiting lists",
        "Some modifications may be required for SA compliance",
        "Keep all import documents for future resale"
      ]
    }
  ]

  const costBreakdown = [
    { category: "Vehicle Purchase", range: "R180,000 - R450,000", notes: "Varies by model/condition" },
    { category: "Shipping Costs", range: "R18,000 - R35,000", notes: "Container vs RoRo" },
    { category: "Import Duties", range: "R54,000 - R135,000", notes: "30-45% of vehicle value" },
    { category: "VAT (15%)", range: "R27,000 - R67,500", notes: "On vehicle + duties + costs" },
    { category: "Clearing Agent", range: "R8,000 - R15,000", notes: "Professional service fee" },
    { category: "NRCS Testing", range: "R12,000 - R18,000", notes: "Mandatory safety certification" },
    { category: "Transport & Storage", range: "R5,000 - R12,000", notes: "Port to registration" },
    { category: "Registration Fees", range: "R2,500 - R4,500", notes: "License and documentation" }
  ]

  const commonMistakes = [
    {
      mistake: "Buying Overpriced Vehicles",
      cost: "R50,000+",
      solution: "Use our verified dealer network for fair pricing"
    },
    {
      mistake: "Incorrect Duty Classification",
      cost: "R25,000+", 
      solution: "Professional tariff code classification service"
    },
    {
      mistake: "NRCS Compliance Failures",
      cost: "R30,000+",
      solution: "Pre-import compliance checking and modification planning"
    },
    {
      mistake: "Port Storage Penalties",
      cost: "R15,000+",
      solution: "Proactive clearing timeline management"
    },
    {
      mistake: "Insurance Coverage Gaps",
      cost: "Total Loss Risk",
      solution: "Comprehensive transit and clearing insurance"
    }
  ]

  const insiderSecrets = [
    {
      secret: "Duty Rate Optimization",
      value: "Save 15-25%",
      detail: "Strategic vehicle age and engine size selection can move you into lower duty brackets. Engines under 1.5L qualify for reduced rates."
    },
    {
      secret: "Port Selection Strategy", 
      value: "Save R8,000",
      detail: "Durban has fastest processing but highest fees. Cape Town is slower but R8K cheaper. Choose based on your timeline vs budget."
    },
    {
      secret: "Clearing Agent Timing",
      value: "Save 2 weeks",
      detail: "Engage clearing agent before shipping. Pre-cleared documentation can reduce port time from 14 days to 3 days."
    },
    {
      secret: "NRCS Fast Track",
      value: "Save 3-4 weeks", 
      detail: "Submit NRCS applications with shipping notification. Parallel processing vs sequential saves massive time."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Vehicle Import Guide
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          The definitive step-by-step process used by professional importers. 
          This content represents 10+ years of import experience and has saved clients over R50 million in avoided mistakes.
        </p>
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span className="font-semibold text-red-900">CONFIDENTIAL & PROTECTED</span>
          </div>
          <p className="text-red-800 text-sm mt-1">
            This content is proprietary and legally protected. Unauthorized sharing or reproduction is prohibited.
          </p>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-blue-600" />
          Complete Import Process Timeline
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{step.phase}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {step.duration}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Required Steps:</h4>
                  <ul className="space-y-2">
                    {step.steps.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Critical Insider Tips:
                  </h4>
                  <ul className="space-y-2">
                    {step.criticalTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          Detailed Cost Breakdown
        </h2>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-semibold">Cost Category</th>
                  <th className="text-left py-3 font-semibold">Price Range</th>
                  <th className="text-left py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{item.category}</td>
                    <td className="py-3 text-green-600 font-semibold">{item.range}</td>
                    <td className="py-3 text-sm text-gray-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="py-4 font-bold">Total Import Cost</td>
                  <td className="py-4 font-bold text-lg text-green-600">R306,500 - R742,000</td>
                  <td className="py-4 text-sm">Excluding vehicle purchase price</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>

      {/* Common Mistakes */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          Costly Mistakes to Avoid
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {commonMistakes.map((mistake, index) => (
            <Card key={index} className="p-6 border-red-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                  !
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-2">{mistake.mistake}</h3>
                  <p className="text-red-600 font-semibold mb-2">Typical Cost: {mistake.cost}</p>
                  <p className="text-sm text-gray-700">{mistake.solution}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Insider Secrets */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Eye className="h-6 w-6 text-purple-600" />
          Professional Insider Secrets
        </h2>
        <div className="grid gap-6">
          {insiderSecrets.map((secret, index) => (
            <Card key={index} className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{secret.secret}</h3>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {secret.value}
                </div>
              </div>
              <p className="text-gray-700">{secret.detail}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Information for Issues */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          Need Expert Support?
        </h3>
        <p className="text-gray-700 mb-4">
          This guide covers 90% of import scenarios. For complex cases, unusual vehicles, 
          or when you need hands-on support, our expert consultants are available.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Import Consultation</p>
            <p className="text-sm text-gray-600">R2,500/hour • Guaranteed solutions</p>
          </div>
          <div>
            <p className="font-semibold">Full-Service Import</p>
            <p className="text-sm text-gray-600">R25,000 flat fee • End-to-end handling</p>
          </div>
        </div>
      </Card>
    </div>
  )
}