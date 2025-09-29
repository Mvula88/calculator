'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  User, 
  FileText,
  Calendar,
  BookOpen,
  Phone,
  Globe,
  Info
} from 'lucide-react'

interface PreImportEssentialsProps {
  onNavigateToSection: (sectionId: string) => void
}

const eligibilityRules = [
  {
    category: "Vehicle Age",
    requirement: "Maximum 12 years old",
    details: "Age calculated from manufacturing date, not registration date",
    checkMethod: "Check manufacturing plate or import/export certificates",
    consequence: "Vehicles over 12 years will be rejected at port"
  },
  {
    category: "Drive Side",
    requirement: "Right-hand drive only",
    details: "Namibia follows South African vehicle standards",
    checkMethod: "Verify steering wheel position in photos/description",
    consequence: "Left-hand drive vehicles cannot be registered"
  },
  {
    category: "Engine Type",
    requirement: "Petrol or diesel only",
    details: "No restrictions on engine size, but affects duty rates",
    checkMethod: "Check engine capacity in CC (e.g., 1800cc, 3000cc)",
    consequence: "Hybrid/electric may face additional requirements"
  },
  {
    category: "Documentation",
    requirement: "Export certificate required",
    details: "Must be stamped by country of origin customs",
    checkMethod: "Ask seller for export certificate copy",
    consequence: "Cannot clear customs without proper export docs"
  }
]

const capitalRequirements = [
  {
    stage: "Pre-Purchase",
    amount: "N$25,000-45,000",
    description: "Vehicle purchase down payment",
    timing: "Before shipment",
    critical: true
  },
  {
    stage: "Shipping",
    amount: "N$18,000-35,000", 
    description: "Ocean freight payment",
    timing: "At booking or before sailing",
    critical: true
  },
  {
    stage: "Port Arrival",
    amount: "N$15,000-25,000",
    description: "Duties, VAT, and port charges",
    timing: "Before container release",
    critical: true
  },
  {
    stage: "Clearance",
    amount: "N$8,000-15,000",
    description: "Agent fees and documentation",
    timing: "During clearance process",
    critical: true
  },
  {
    stage: "Delivery & Registration", 
    amount: "N$7,000-12,000",
    description: "Transport, roadworthy, registration",
    timing: "After clearance",
    critical: false
  },
  {
    stage: "Emergency Buffer",
    amount: "N$15,000-20,000",
    description: "Storage, delays, unexpected costs",
    timing: "Keep available throughout",
    critical: true
  }
]

const timeCommitments = [
  {
    phase: "Research & Planning",
    duration: "7-14 days",
    effort: "High",
    tasks: ["Find suitable vehicle", "Verify eligibility", "Arrange financing", "Choose clearing agent"],
    canOutsource: false
  },
  {
    phase: "Purchase & Shipping",
    duration: "3-7 days",
    effort: "Medium", 
    tasks: ["Complete purchase", "Arrange export", "Book shipping", "Prepare documentation"],
    canOutsource: true
  },
  {
    phase: "Transit Period",
    duration: "35-45 days",
    effort: "Low",
    tasks: ["Track container", "Prepare clearance docs", "Monitor for updates"],
    canOutsource: true
  },
  {
    phase: "Arrival & Clearance",
    duration: "5-10 days",
    effort: "High",
    tasks: ["Submit documents", "Pay duties", "Coordinate collection", "Handle issues"],
    canOutsource: true
  },
  {
    phase: "Registration",
    duration: "7-14 days", 
    effort: "Medium",
    tasks: ["Roadworthy test", "NaTIS registration", "Insurance", "License plates"],
    canOutsource: false
  }
]

const skillsNeeded = [
  {
    skill: "Language Skills",
    requirement: "English fluency", 
    importance: "Critical",
    description: "All documents and communication are in English",
    alternative: "Hire translator or bilingual agent"
  },
  {
    skill: "Documentation Management",
    requirement: "Detail-oriented",
    importance: "Critical", 
    description: "One wrong digit can cause weeks of delays",
    alternative: "Use professional clearing agent"
  },
  {
    skill: "Financial Planning",
    requirement: "Budget management",
    importance: "High",
    description: "Multiple payments with strict timing requirements",
    alternative: "Use financing or payment plan services"
  },
  {
    skill: "Persistence & Patience",
    requirement: "Problem-solving mindset",
    importance: "High",
    description: "Delays and issues are common, need to stay calm",
    alternative: "Hire full-service agent (more expensive)"
  },
  {
    skill: "Technical Knowledge",
    requirement: "Basic car knowledge",
    importance: "Medium",
    description: "Understand engine specs, features for customs forms",
    alternative: "Rely on clearing agent expertise"
  }
]

export function PreImportEssentials({ onNavigateToSection }: PreImportEssentialsProps) {
  const totalCapitalNeeded = capitalRequirements.reduce((sum, req) => {
    const min = parseInt(req.amount.split('-')[0].replace(/[N$,]/g, ''))
    const max = parseInt(req.amount.split('-')[1]?.replace(/[N$,]/g, '') || min.toString())
    return sum + ((min + max) / 2)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">🎯 Pre-Import Essentials</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Before you buy any vehicle, make sure you understand these critical requirements
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-semibold text-blue-900">Vehicle Rules</p>
              <p className="text-sm text-blue-700">Max 12 years, RHD only</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-purple-600 mt-1" />
            <div>
              <p className="font-semibold text-purple-900">Time Needed</p>
              <p className="text-sm text-purple-700">60-90 days total</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-orange-600 mt-1" />
            <div>
              <p className="font-semibold text-orange-900">Skills</p>
              <p className="text-sm text-orange-700">English + patience</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Eligibility Rules */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            Vehicle Eligibility Rules
          </h3>
          <p className="text-sm text-gray-600">
            Check these BEFORE you buy - violations mean automatic rejection
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {eligibilityRules.map((rule, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{rule.category}</h4>
                    <p className="text-sm text-green-600 font-medium">✓ {rule.requirement}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                      Must Pass
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>Details:</strong> {rule.details}</p>
                  <p><strong>How to check:</strong> {rule.checkMethod}</p>
                  <div className="p-2 bg-red-50 rounded border border-red-200">
                    <p className="text-red-800"><strong>If you fail:</strong> {rule.consequence}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Time Commitment */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Time Commitment by Phase
          </h3>
          <p className="text-sm text-gray-600">
            Realistic timeline showing when you'll be most busy
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timeCommitments.map((phase, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{phase.phase}</h4>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {phase.duration}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        phase.effort === 'High' ? 'bg-red-100 text-red-700' :
                        phase.effort === 'Medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {phase.effort} effort
                      </span>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Key tasks:</p>
                    <ul className="text-gray-600 pl-4">
                      {phase.tasks.map((task, i) => (
                        <li key={i} className="list-disc">{task}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">
                      {phase.canOutsource ? "✓ Can outsource to agent" : "✗ Must handle personally"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Skills Assessment */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <User className="h-5 w-5 text-orange-600" />
            Skills & Capabilities Needed
          </h3>
          <p className="text-sm text-gray-600">
            Honest assessment of what's required - and alternatives if you lack them
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {skillsNeeded.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{skill.skill}</h4>
                    <p className="text-sm text-gray-600">{skill.requirement}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    skill.importance === 'Critical' ? 'bg-red-100 text-red-700' :
                    skill.importance === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {skill.importance}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{skill.description}</p>
                <div className="p-2 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Alternative:</strong> {skill.alternative}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Ready to Proceed */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ready to Proceed?</h3>
            <p className="text-gray-600 mb-4">
              If you meet the requirements above, you're ready to start the import process
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => onNavigateToSection('costs')}>
                Calculate Total Costs
              </Button>
              <Button variant="outline" onClick={() => onNavigateToSection('timeline')}>
                See Full Timeline
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}