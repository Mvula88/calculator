'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { AlertTriangle, XCircle, CheckCircle, DollarSign } from 'lucide-react'

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
    problem: 'One wrong digit in VIN or missing engine number on invoice',
    fix: 'Make seller print VIN & engine on invoice; attach VIN photo to file; pre-check before vessel arrives',
    realStory: 'I had one digit wrong in the VIN. Cost me 5 days and N$2,500 in storage.',
    stage: 'Documentation Preparation',
    severity: 'major',
    timeImpact: '3-10 days delay',
    recoveryDifficulty: 'moderate'
  },
  {
    title: 'Consignee/Account blocked with shipping line',
    cost: 'N$7,000+ storage fees',
    problem: 'Consignee has unpaid bills with carrier',
    fix: 'Confirm consignee good standing BEFORE you pay. If in doubt, list yourself or clean clearing firm as consignee',
    realStory: 'Our container was held for 2 weeks because the consignee owed the shipping line. We paid N$7,000 in storage.',
    stage: 'Pre-Import Planning',
    severity: 'deal-breaker',
    timeImpact: 'Indefinite hold',
    recoveryDifficulty: 'difficult'
  },
  {
    title: 'No certified Japanese translation',
    cost: 'N$5,000+ storage fees',
    problem: 'MIT/NamRA won\'t accept untranslated export certificate',
    fix: 'Source certified JP→EN translator early. Treat it like a permit',
    realStory: 'Took me 14 days to find the only certified translator in Namibia. Called embassy, courts, everyone.',
    stage: 'Documentation Preparation',
    severity: 'major',
    timeImpact: '7-21 days delay',
    recoveryDifficulty: 'difficult'
  },
  {
    title: 'Wrong vehicle purchase (age/drive side)',
    cost: 'Total loss of vehicle',
    problem: 'Car is over 12 years old or left-hand drive',
    fix: 'Double-check manufacturing date and steering position before purchase',
    realStory: 'Friend bought a 2009 car in 2022, thinking it was okay. Car was rejected at port - total loss.',
    stage: 'Pre-Import Planning',
    severity: 'deal-breaker',
    timeImpact: 'Import impossible',
    recoveryDifficulty: 'difficult'
  },
  {
    title: 'Unpacking materials not planned',
    cost: 'N$600+ rush costs',
    problem: 'Cars are strapped inside container, need tools to release',
    fix: 'Budget straps/bolts/tools; confirm who supplies them',
    realStory: 'Had to rush to Cymot and pay N$600 for straps while the truck waited.',
    stage: 'Collection',
    severity: 'minor',
    timeImpact: 'Same day delay',
    recoveryDifficulty: 'easy'
  },
  {
    title: 'Unpacking location changed without agreement',
    cost: 'N$11,000 staff travel',
    problem: 'Agent wants to move unpacking from Walvis to upcountry',
    fix: 'Write "Unpacking at Walvis warehouse" into agreement, specify who pays if moved',
    realStory: 'Got quoted N$11,000 for staff to travel to Ongwediva. Only avoided because we fought to keep it in Walvis.',
    stage: 'Clearance',
    severity: 'major',
    timeImpact: 'No time delay',
    recoveryDifficulty: 'moderate'
  },
  {
    title: 'HS code misclassification',
    cost: 'N$15,000+ extra duty',
    problem: 'Wrong classification = wrong duty rate',
    fix: 'Ask clearing firm to justify HS code on SAD 500 with model/engine evidence',
    realStory: 'Agent used wrong code for my diesel SUV. Would have paid 30% more duty if I hadn\'t checked.',
    stage: 'Clearance',
    severity: 'major',
    timeImpact: '2-5 days appeal',
    recoveryDifficulty: 'moderate'
  },
  {
    title: 'No insurance before driving',
    cost: 'N$50,000+ accident liability',
    problem: 'Driving without valid insurance from port',
    fix: 'Arrange temporary insurance before collection day',
    realStory: 'Saw someone get in accident driving from port without insurance. Police and civil liability nightmare.',
    stage: 'Collection',
    severity: 'major',
    timeImpact: 'No time delay',
    recoveryDifficulty: 'easy'
  },
  {
    title: 'Roadworthy test not booked early',
    cost: 'N$1,500+ delays',
    problem: 'Roadworthy centres get fully booked for weeks',
    fix: 'Book appointment immediately after collection',
    realStory: 'Had to wait 3 weeks for roadworthy appointment. Car sat unregistered, couldn\'t use it.',
    stage: 'Registration',
    severity: 'minor',
    timeImpact: '1-3 weeks delay',
    recoveryDifficulty: 'easy'
  }
]

export function MistakeCards() {
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  
  const stages = ['all', ...Array.from(new Set(mistakes.map(m => m.stage)))]
  const severities = ['all', 'deal-breaker', 'major', 'minor']
  
  const filteredMistakes = mistakes.filter(mistake => {
    const stageMatch = selectedStage === 'all' || mistake.stage === selectedStage
    const severityMatch = selectedSeverity === 'all' || mistake.severity === selectedSeverity
    return stageMatch && severityMatch
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'deal-breaker': return 'bg-red-100 text-red-700 border-red-300'
      case 'major': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'minor': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'deal-breaker': return 'border-red-500'
      case 'major': return 'border-orange-500'
      case 'minor': return 'border-yellow-500'
      default: return 'border-gray-500'
    }
  }

  const getRecoveryColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600'
      case 'moderate': return 'text-orange-600'
      case 'difficult': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // Group mistakes by stage for overview
  const mistakesByStage = mistakes.reduce((acc, mistake) => {
    if (!acc[mistake.stage]) {
      acc[mistake.stage] = []
    }
    acc[mistake.stage].push(mistake)
    return acc
  }, {} as Record<string, Mistake[]>)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">🚫 Costly Mistakes by Timeline Stage</h2>
        <p className="text-gray-600">Real mistakes organized by when they happen - with severity ratings and recovery difficulty</p>
      </div>

      {/* Severity Overview */}
      <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <h3 className="font-bold mb-3">⚠️ Severity Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full border bg-red-100 text-red-700 border-red-300">deal-breaker</span>
            <span className="text-sm">Import fails or total loss</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full border bg-orange-100 text-orange-700 border-orange-300">major</span>
            <span className="text-sm">Significant cost/delay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full border bg-yellow-100 text-yellow-700 border-yellow-300">minor</span>
            <span className="text-sm">Manageable inconvenience</span>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h4 className="font-medium mb-2">Filter by Stage:</h4>
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
                {stage === 'all' ? 'All Stages' : stage}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-2">Filter by Severity:</h4>
          <div className="flex flex-wrap gap-2">
            {severities.map(severity => (
              <button
                key={severity}
                onClick={() => setSelectedSeverity(severity)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedSeverity === severity
                    ? getSeverityColor(severity)
                    : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {severity === 'all' ? 'All Severities' : severity}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mistakes Grid */}
      <div className="grid gap-6">
        {filteredMistakes.map((mistake, index) => (
          <Card key={index} className={`overflow-hidden border-l-4 ${getSeverityBorder(mistake.severity)}`}>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{mistake.title}</h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {mistake.stage}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(mistake.severity)}`}>
                        {mistake.severity}
                      </span>
                      <span className="text-xs text-gray-500">
                        Recovery: <span className={getRecoveryColor(mistake.recoveryDifficulty)}>{mistake.recoveryDifficulty}</span>
                      </span>
                    </div>

                    {/* Cost and Time Impact */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-red-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">{mistake.cost}</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Time impact:</span> {mistake.timeImpact}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-900 mb-1">The Problem:</p>
                      <p className="text-sm text-red-800">{mistake.problem}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-900 mb-1">How to Prevent:</p>
                      <p className="text-sm text-green-800">{mistake.fix}</p>
                    </div>
                  </div>
                </div>

                {mistake.realStory && (
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                    <p className="text-sm text-gray-700 italic">
                      <strong>Real story:</strong> {mistake.realStory}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMistakes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No mistakes match your current filters.</p>
          <button
            onClick={() => {
              setSelectedStage('all')
              setSelectedSeverity('all')
            }}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Stage Summary */}
      {selectedStage === 'all' && selectedSeverity === 'all' && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-bold mb-3">📊 Mistakes by Import Stage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(mistakesByStage).map(([stage, stageMistakes]) => (
              <div key={stage} className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm mb-2">{stage}</h4>
                <div className="space-y-1">
                  {stageMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="truncate mr-2">{mistake.title.split('(')[0].trim()}</span>
                      <span className={`px-1 py-0.5 rounded ${getSeverityColor(mistake.severity)}`}>
                        {mistake.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}