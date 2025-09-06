'use client'

import { Card } from '@/components/ui/card'
import { AlertTriangle, XCircle, CheckCircle, DollarSign } from 'lucide-react'

interface Mistake {
  title: string
  cost: string
  problem: string
  fix: string
  realStory?: string
}

const mistakes: Mistake[] = [
  {
    title: 'Incorrect documents (VIN/engine missing or wrong)',
    cost: '3–10 extra days + storage fees',
    problem: 'One wrong digit in VIN or missing engine number on invoice',
    fix: 'Make seller print VIN & engine on invoice; attach VIN photo to file; pre-check before vessel arrives',
    realStory: 'I had one digit wrong in the VIN. Cost me 5 days and N$2,500 in storage.'
  },
  {
    title: 'Consignee/Account blocked with shipping line',
    cost: 'Indefinite hold + daily storage',
    problem: 'Consignee has unpaid bills with carrier',
    fix: 'Confirm consignee good standing BEFORE you pay. If in doubt, list yourself or clean clearing firm as consignee',
    realStory: 'Our container was held for 2 weeks because the consignee owed the shipping line. We paid N$7,000 in storage.'
  },
  {
    title: 'No certified Japanese translation',
    cost: '7–21 days searching + storage',
    problem: 'MIT/NamRA won\'t accept untranslated export certificate',
    fix: 'Source certified JP→EN translator early. Treat it like a permit',
    realStory: 'Took me 14 days to find the only certified translator in Namibia. Called embassy, courts, everyone.'
  },
  {
    title: 'Unpacking materials not planned',
    cost: 'N$600+ same-day scramble',
    problem: 'Cars are strapped inside container, need tools to release',
    fix: 'Budget straps/bolts/tools; confirm who supplies them',
    realStory: 'Had to rush to Cymot and pay N$600 for straps while the truck waited.'
  },
  {
    title: 'Unpacking location changed without agreement',
    cost: 'N$11,000 staff travel quote',
    problem: 'Agent wants to move unpacking from Walvis to upcountry',
    fix: 'Write "Unpacking at Walvis warehouse" into agreement, specify who pays if moved',
    realStory: 'Got quoted N$11,000 for staff to travel to Ongwediva. Only avoided because we fought to keep it in Walvis.'
  },
  {
    title: 'HS code misclassification',
    cost: '10–40% extra duty',
    problem: 'Wrong classification = wrong duty rate',
    fix: 'Ask clearing firm to justify HS code on SAD 500 with model/engine evidence',
    realStory: 'Agent used wrong code for my diesel SUV. Would have paid 30% more duty if I hadn\'t checked.'
  }
]

export function MistakeCards() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">🚫 Costly Mistakes to Avoid</h2>
        <p className="text-gray-600">Real mistakes that cost me time and money - learn from my pain</p>
      </div>

      <div className="grid gap-4">
        {mistakes.map((mistake, index) => (
          <Card key={index} className="overflow-hidden border-l-4 border-red-500">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">{mistake.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">
                        Typical cost: {mistake.cost}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

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
                      <p className="text-sm font-medium text-green-900 mb-1">The Fix:</p>
                      <p className="text-sm text-green-800">{mistake.fix}</p>
                    </div>
                  </div>
                </div>

                {mistake.realStory && (
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                    <p className="text-sm text-gray-700 italic">
                      <strong>My story:</strong> {mistake.realStory}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}