'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calculator, 
  Clock, 
  HelpCircle, 
  ChevronRight, 
  Info,
  DollarSign,
  Calendar,
  Shield
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
    question: "How old is the car you want to import?",
    requirement: "Maximum 12 years old for Namibia",
    passCondition: "12 years or newer",
    failMessage: "Car too old - Namibia only allows vehicles up to 12 years"
  },
  {
    question: "Is the car right-hand drive?",
    requirement: "Must be right-hand drive",
    passCondition: "Right-hand drive",
    failMessage: "Left-hand drive vehicles not permitted in Namibia"
  },
  {
    question: "Do you have at least N$180,000 available?",
    requirement: "Total budget including buffer",
    passCondition: "N$180,000+ available",
    failMessage: "Insufficient budget - imports typically cost N$150-180k total"
  },
  {
    question: "Can you handle 60-90 days timeline?",
    requirement: "Full process takes 2-3 months",
    passCondition: "Can wait 60-90 days",
    failMessage: "Timeline too long for your needs"
  }
]

const quickFacts = [
  {
    icon: Clock,
    label: "Timeline",
    value: "60-90 days",
    description: "From purchase to registration",
    color: "blue"
  },
  {
    icon: DollarSign,
    label: "Total Cost",
    value: "N$150-180k",
    description: "All fees + 15% buffer",
    color: "green"
  },
  {
    icon: CheckCircle,
    label: "Success Rate",
    value: "95%",
    description: "When following all steps",
    color: "purple"
  },
  {
    icon: Shield,
    label: "Savings vs Dealer",
    value: "N$30-50k",
    description: "Typical savings amount",
    color: "orange"
  }
]

const topRisks = [
  {
    risk: "Wrong VIN/Engine numbers",
    cost: "N$2,500+ storage fees",
    severity: "high"
  },
  {
    risk: "Consignee account blocked",
    cost: "N$7,000+ delays",
    severity: "high"
  },
  {
    risk: "Missing translation",
    cost: "14-21 day delays",
    severity: "medium"
  }
]

export function QuickStartOverview({ onNavigateToSection }: QuickStartOverviewProps) {
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<number, boolean>>({})
  const [showEligibility, setShowEligibility] = useState(false)

  const handleEligibilityAnswer = (index: number, passed: boolean) => {
    setEligibilityAnswers(prev => ({
      ...prev,
      [index]: passed
    }))
  }

  const eligibilityScore = Object.values(eligibilityAnswers).filter(Boolean).length
  const totalChecks = eligibilityChecks.length
  const allAnswered = Object.keys(eligibilityAnswers).length === totalChecks
  const canImport = eligibilityScore === totalChecks

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600", 
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">🚀 Quick Start: Can You Import?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get instant answers to your key questions before diving into the detailed process
        </p>
      </div>

      {/* Quick Facts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickFacts.map((fact, index) => {
          const Icon = fact.icon
          return (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getColorClasses(fact.color)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{fact.label}</p>
                  <p className="text-lg font-bold">{fact.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{fact.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Eligibility Checker */}
        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowEligibility(true)}>
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Can I Import?</h3>
            <p className="text-sm text-gray-600 mb-3">
              4-question eligibility check
            </p>
            <Button size="sm" className="w-full">
              Check Now
            </Button>
          </div>
        </Card>

        {/* Cost Calculator */}
        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigateToSection('costs')}>
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">What Will It Cost?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Interactive cost calculator
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Calculate
            </Button>
          </div>
        </Card>

        {/* Timeline Summary */}
        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigateToSection('timeline')}>
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">How Long?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Complete timeline breakdown
            </p>
            <Button size="sm" variant="outline" className="w-full">
              View Timeline
            </Button>
          </div>
        </Card>

        {/* Top Risks */}
        <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigateToSection('mistakes')}>
          <div className="text-center">
            <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">What Can Go Wrong?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Top 3 costly mistakes
            </p>
            <Button size="sm" variant="outline" className="w-full">
              See Risks
            </Button>
          </div>
        </Card>
      </div>

      {/* Top 3 Risks Preview */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4">
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Top 3 Things That Can Go Wrong
          </h3>
          <p className="text-sm text-gray-600">Learn from real mistakes that cost time and money</p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {topRisks.map((risk, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  risk.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{risk.risk}</p>
                  <p className="text-xs text-red-600 mt-1">Typical cost: {risk.cost}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  risk.severity === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {risk.severity}
                </span>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={() => onNavigateToSection('mistakes')}
          >
            See All Common Mistakes <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>

      {/* Eligibility Modal/Overlay */}
      {showEligibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Import Eligibility Checker</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Answer these 4 questions to see if you can import
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowEligibility(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                {eligibilityChecks.map((check, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="font-medium mb-2">{check.question}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Requirement:</strong> {check.requirement}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={eligibilityAnswers[index] === true ? 'default' : 'outline'}
                        onClick={() => handleEligibilityAnswer(index, true)}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {check.passCondition}
                      </Button>
                      <Button
                        size="sm"
                        variant={eligibilityAnswers[index] === false ? 'destructive' : 'outline'}
                        onClick={() => handleEligibilityAnswer(index, false)}
                        className="flex items-center gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        No
                      </Button>
                    </div>
                    {eligibilityAnswers[index] === false && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-800">⚠️ {check.failMessage}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {allAnswered && (
                <div className={`p-4 rounded-lg border ${
                  canImport 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {canImport ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        canImport ? 'text-green-900' : 'text-red-900'
                      }`}>
                        {canImport ? "✅ You can import!" : "❌ Import not recommended"}
                      </p>
                      <p className={`text-sm mt-1 ${
                        canImport ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {canImport 
                          ? `Score: ${eligibilityScore}/${totalChecks} - You meet all requirements. Ready to start the process!`
                          : `Score: ${eligibilityScore}/${totalChecks} - You don't meet all requirements. Consider addressing the issues above first.`
                        }
                      </p>
                      {canImport && (
                        <div className="mt-3">
                          <Button 
                            size="sm"
                            onClick={() => {
                              setShowEligibility(false)
                              onNavigateToSection('essentials')
                            }}
                          >
                            Start Import Process <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}