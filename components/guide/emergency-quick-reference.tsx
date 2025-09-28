'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  CheckCircle,
  X,
  HelpCircle,
  FileText,
  ExternalLink,
  Copy,
  Map
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
    name: "Namibian Port Authority",
    role: "Port Operations",
    phone: "+264 64 208 2100",
    email: "info@namport.com.na",
    hours: "24/7 Operations",
    location: "Walvis Bay",
    speciality: "Container releases, storage issues"
  },
  {
    name: "NamRA Customs",
    role: "Import Clearance",
    phone: "+264 61 299 1000",
    email: "contact@namra.gov.na", 
    hours: "Mon-Fri 8:00-17:00",
    location: "Windhoek/Walvis Bay",
    speciality: "Duty disputes, document issues"
  },
  {
    name: "MIT - Import Control",
    role: "Import Permits",
    phone: "+264 61 283 7111",
    email: "info@mti.gov.na",
    hours: "Mon-Fri 8:00-17:00", 
    location: "Windhoek",
    speciality: "Import permit issues, restricted goods"
  },
  {
    name: "Japanese Embassy",
    role: "Document Verification",
    phone: "+264 61 254 916",
    email: "consul@windhoek.mofa.go.jp",
    hours: "Mon-Fri 9:00-12:00, 14:00-16:00",
    location: "Windhoek",
    speciality: "Translation services, document authentication"
  },
  {
    name: "High Court of Namibia",
    role: "Legal Translation",
    phone: "+264 61 275 9000",
    hours: "Mon-Fri 8:00-16:30",
    location: "Windhoek",
    speciality: "Certified translators list"
  }
]

const quickActions: QuickAction[] = [
  {
    situation: "Container held due to consignee block",
    urgency: "critical",
    cost: "N$500+/day storage",
    timeframe: "Immediate action needed",
    immediateActions: [
      "Call shipping line to confirm block reason and amount due",
      "Request written details of debt and account",
      "If not your debt, immediately request B/L amendment",
      "Call port to request storage counter freeze during resolution"
    ],
    contacts: ["Namibian Port Authority", "NamRA Customs"],
    templates: ["B/L Amendment Request", "Storage Fee Negotiation"]
  },
  {
    situation: "Wrong VIN/Engine number on documents", 
    urgency: "high",
    cost: "N$300+/day storage",
    timeframe: "24-48 hours to fix",
    immediateActions: [
      "Take clear photos of actual VIN and engine numbers",
      "Contact seller for corrected invoice with proper details",
      "Submit correction request to clearing agent with photos",
      "Follow up with customs officer directly if possible"
    ],
    contacts: ["NamRA Customs"],
    templates: ["Document Correction Request"]
  },
  {
    situation: "Cannot find certified translator",
    urgency: "high", 
    cost: "N$200-500/day storage",
    timeframe: "5-14 days to resolve",
    immediateActions: [
      "Submit partial application noting 'translation in progress'",
      "Call Japanese Embassy for certified translator list",
      "Contact High Court for general translator directory",
      "Consider flying to Joburg if local options exhausted"
    ],
    contacts: ["Japanese Embassy", "High Court of Namibia"],
    templates: ["Translation Service Request"]
  },
  {
    situation: "HS code classification disputed",
    urgency: "medium",
    cost: "N$10,000+ extra duty",
    timeframe: "3-7 days to appeal",
    immediateActions: [
      "Request written justification from customs for their code choice",
      "Gather technical specs from manufacturer website",
      "Research similar vehicle classifications online",
      "Submit formal appeal with supporting evidence"
    ],
    contacts: ["NamRA Customs"],
    templates: ["Customs Classification Inquiry"]
  },
  {
    situation: "Storage fees mounting rapidly",
    urgency: "high",
    cost: "N$200-500/day ongoing",
    timeframe: "Same day action required", 
    immediateActions: [
      "Document the root cause with screenshots/emails",
      "Calculate total fees and days affected",
      "Request meeting with port manager (face-to-face works better)",
      "Propose payment plan or partial payment in good faith"
    ],
    contacts: ["Namibian Port Authority"],
    templates: ["Storage Fee Negotiation"]
  }
]

export function EmergencyQuickReference() {
  const [isFloatingVisible, setIsFloatingVisible] = useState(false)
  const [selectedAction, setSelectedAction] = useState<QuickAction | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '🚨'
      case 'high': return '⚠️'
      case 'medium': return '📅'
      default: return 'ℹ️'
    }
  }

  return (
    <>
      {/* Main Emergency Reference Section */}
      <div className="space-y-6" id="emergency">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">🚨 Emergency Quick Reference</h2>
          <p className="text-gray-600">Instant access to critical contacts and crisis management</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="text-center">
              <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-red-900">Emergency Contacts</h3>
              <p className="text-sm text-red-700 mb-3">Key numbers when things go wrong</p>
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => document.getElementById('emergency-contacts')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Contacts
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-bold text-orange-900">Crisis Playbooks</h3>
              <p className="text-sm text-orange-700 mb-3">Step-by-step crisis management</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-orange-300 text-orange-700"
                onClick={() => document.getElementById('crisis-playbooks')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Playbooks
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-blue-900">Floating Help</h3>
              <p className="text-sm text-blue-700 mb-3">Always-accessible emergency button</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-blue-300 text-blue-700"
                onClick={() => setIsFloatingVisible(true)}
              >
                Enable Floating Help
              </Button>
            </div>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="overflow-hidden" id="emergency-contacts">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600" />
              Emergency Contact Directory
            </h3>
            <p className="text-sm text-gray-600">
              Critical numbers to call when facing import issues
            </p>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{contact.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{contact.role}</p>
                      {contact.speciality && (
                        <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                          {contact.speciality}
                        </p>
                      )}
                    </div>
                    {contact.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Map className="h-3 w-3" />
                        {contact.location}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span className="font-mono text-sm">{contact.phone}</span>
                        <button
                          onClick={() => copyToClipboard(contact.phone!, `${contact.name} phone`)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedText === `${contact.name} phone` ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                    )}

                    {contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{contact.email}</span>
                        <button
                          onClick={() => copyToClipboard(contact.email!, `${contact.name} email`)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedText === `${contact.name} email` ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{contact.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Crisis Playbooks */}
        <Card className="overflow-hidden" id="crisis-playbooks">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Crisis Situation Playbooks
            </h3>
            <p className="text-sm text-gray-600">
              Immediate action plans for common emergency situations
            </p>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {quickActions.map((action, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedAction(selectedAction?.situation === action.situation ? null : action)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(action.urgency)}`}>
                            {getUrgencyIcon(action.urgency)} {action.urgency}
                          </span>
                          <span className="text-sm text-red-600 font-medium">{action.cost}</span>
                        </div>
                        <h4 className="font-semibold text-lg">{action.situation}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.timeframe}</p>
                      </div>
                      <div className="text-gray-400">
                        {selectedAction?.situation === action.situation ? '−' : '+'}
                      </div>
                    </div>
                  </button>

                  {selectedAction?.situation === action.situation && (
                    <div className="border-t p-4 bg-gray-50">
                      <h5 className="font-semibold mb-3 text-red-900">Immediate Actions:</h5>
                      <ol className="space-y-2 mb-4">
                        {action.immediateActions.map((actionItem, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-700 rounded-full text-xs flex items-center justify-center font-semibold">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-800">{actionItem}</span>
                          </li>
                        ))}
                      </ol>

                      {action.contacts.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2 text-blue-900">Key Contacts:</h5>
                          <div className="flex flex-wrap gap-2">
                            {action.contacts.map((contactName, idx) => {
                              const contact = emergencyContacts.find(c => c.name === contactName)
                              return (
                                <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                                  {contactName}
                                  {contact?.phone && (
                                    <span className="ml-1 font-mono">
                                      {contact.phone}
                                    </span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {action.templates && action.templates.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-2 text-green-900">Helpful Templates:</h5>
                          <div className="flex flex-wrap gap-2">
                            {action.templates.map((template, idx) => (
                              <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                                📋 {template}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Emergency Button */}
      {isFloatingVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <Button
              className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
              onClick={() => setIsFloatingVisible(false)}
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-16 right-0 bg-white border shadow-lg rounded-lg p-4 min-w-[250px]">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-red-900">Quick Emergency Help</h4>
                <button
                  onClick={() => setIsFloatingVisible(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  className="w-full text-left p-2 hover:bg-gray-50 rounded border text-sm"
                  onClick={() => {
                    document.getElementById('emergency-contacts')?.scrollIntoView({ behavior: 'smooth' })
                    setIsFloatingVisible(false)
                  }}
                >
                  📞 Emergency Contacts
                </button>
                <button
                  className="w-full text-left p-2 hover:bg-gray-50 rounded border text-sm"
                  onClick={() => {
                    document.getElementById('crisis-playbooks')?.scrollIntoView({ behavior: 'smooth' })
                    setIsFloatingVisible(false)
                  }}
                >
                  🚨 Crisis Playbooks
                </button>
                <div className="text-xs text-gray-600 mt-2 p-2 bg-yellow-50 rounded">
                  <strong>Most common:</strong> Container holds due to consignee blocks or document errors
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}