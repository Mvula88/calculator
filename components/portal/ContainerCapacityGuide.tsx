'use client'

import { useState } from 'react'
import { Package, Car, AlertCircle, TrendingUp, Info, CheckCircle } from 'lucide-react'

interface ContainerConfig {
  type: string
  cars: number
  description: string
  advantages: string[]
  disadvantages: string[]
  costPerCar: number
  bestFor: string
}

const containerConfigs: ContainerConfig[] = [
  {
    type: '20ft Container',
    cars: 2,
    description: '2 small cars (Vitz, March, Demio)',
    advantages: [
      'Lower total container cost',
      'Faster to fill with partners',
      'Good for compact cars'
    ],
    disadvantages: [
      'Limited to small vehicles',
      'Higher cost per car than 40ft',
      'No SUVs or larger sedans'
    ],
    costPerCar: 35000,
    bestFor: 'Small cars, quick shipments'
  },
  {
    type: '40ft Container',
    cars: 4,
    description: '4 cars (mix of sizes)',
    advantages: [
      'Lowest cost per car',
      'Most economical option',
      'Can mix vehicle sizes',
      'Industry standard'
    ],
    disadvantages: [
      'Need more partners',
      'Takes longer to fill',
      'Higher total cost'
    ],
    costPerCar: 18500,
    bestFor: 'Mixed vehicles, best value'
  },
  {
    type: '40ft High Cube',
    cars: 5,
    description: '4-5 cars (with stacking)',
    advantages: [
      'Extra height for SUVs',
      'Can fit 5 small cars',
      'Good for tall vehicles'
    ],
    disadvantages: [
      'Requires special loading',
      'Risk of damage if stacked',
      'Not all ports accept'
    ],
    costPerCar: 16000,
    bestFor: 'SUVs, vans, maximum capacity'
  }
]

const realExamples = [
  {
    configuration: '4 cars in 40ft',
    vehicles: ['Honda Fit', 'Toyota Vitz', 'Mazda Demio', 'Nissan Note'],
    totalCost: 74000,
    perCarCost: 18500,
    note: 'Most common setup'
  },
  {
    configuration: '3 SUVs + 1 sedan',
    vehicles: ['Honda Vezel', 'Toyota RAV4', 'Nissan X-Trail', 'Toyota Corolla'],
    totalCost: 74000,
    perCarCost: 18500,
    note: 'Mixed sizes work well'
  },
  {
    configuration: '2 large vans + 2 cars',
    vehicles: ['Toyota Noah', 'Toyota Voxy', 'Honda Fit', 'Nissan March'],
    totalCost: 74000,
    perCarCost: 18500,
    note: 'Vans fit if loaded carefully'
  }
]

const loadingTips = [
  'Smaller cars (Vitz, March, Demio) can be loaded 5 in a 40ft container with proper arrangement',
  'SUVs and larger sedans typically fit 4 per 40ft container',
  'Vans like Noah/Voxy take more space - maximum 2 vans + 2 small cars',
  'Pickup trucks (Hilux, Navara) usually fit 3 per 40ft container',
  'Always confirm vehicle dimensions with your exporter before booking',
  'Container must be fumigated before shipping (cost included in freight)',
  'Vehicles must have less than 1/4 tank of fuel for shipping',
  'Remove all personal items from vehicles to avoid customs issues'
]

export default function ContainerCapacityGuide() {
  const [selectedConfig, setSelectedConfig] = useState<ContainerConfig | null>(containerConfigs[1])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Container Capacity & Loading Guide
          </h2>
          <p className="text-gray-600">
            Real-world container configurations from Japanese car exports to Namibia
          </p>
        </div>

        {/* Container Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {containerConfigs.map((config) => (
            <div
              key={config.type}
              onClick={() => setSelectedConfig(config)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedConfig?.type === config.type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{config.type}</h3>
                {config.costPerCar === 18500 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Best Value
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{config.cars} cars</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{config.description}</p>
              <div className="text-lg font-bold text-blue-600">
                R{config.costPerCar.toLocaleString()}/car
              </div>
            </div>
          ))}
        </div>

        {/* Selected Configuration Details */}
        {selectedConfig && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">
              {selectedConfig.type} Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Advantages
                </h4>
                <ul className="space-y-1">
                  {selectedConfig.advantages.map((adv, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-amber-700 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Considerations
                </h4>
                <ul className="space-y-1">
                  {selectedConfig.disadvantages.map((dis, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Best for:</strong> {selectedConfig.bestFor}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Real Loading Examples */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Real Container Loading Examples
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {realExamples.map((example, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {example.configuration}
              </h4>
              <div className="space-y-1 mb-3">
                {example.vehicles.map((vehicle, vIdx) => (
                  <div key={vIdx} className="flex items-center gap-2 text-sm">
                    <Car className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">{vehicle}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Total:</span>
                  <span className="font-semibold">R{example.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Per car:</span>
                  <span className="font-semibold text-green-600">
                    R{example.perCarCost.toLocaleString()}
                  </span>
                </div>
                {example.note && (
                  <p className="text-xs text-blue-600 mt-2">{example.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Loading Information */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Info className="h-5 w-5" />
          Critical Loading Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-amber-800 mb-2">Vehicle Size Guidelines</h4>
            <ul className="space-y-1 text-sm text-amber-700">
              <li>• <strong>Small cars:</strong> 5 units possible in 40ft</li>
              <li>• <strong>Standard sedans:</strong> 4 units in 40ft</li>
              <li>• <strong>SUVs/Crossovers:</strong> 4 units in 40ft</li>
              <li>• <strong>Large vans:</strong> 2-3 units in 40ft</li>
              <li>• <strong>Pickup trucks:</strong> 3 units in 40ft</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-800 mb-2">Pre-Shipping Requirements</h4>
            <ul className="space-y-1 text-sm text-amber-700">
              <li>• Fuel level must be below 1/4 tank</li>
              <li>• Remove all personal belongings</li>
              <li>• Container fumigation required</li>
              <li>• Secure loose parts (mirrors, antennas)</li>
              <li>• Document any existing damage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Expert Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          💡 Expert Container Loading Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {loadingTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/70 rounded-lg">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Container Sharing Strategy:
          </p>
          <p className="text-sm text-gray-600">
            Join ContShare.com to find partners shipping to the same destination.
            Most containers leave Japan with 2-3 weeks notice, giving you time to
            coordinate with other importers. Sharing a 40ft container with 3 other
            importers saves each person approximately R55,500 compared to solo shipping.
          </p>
        </div>
      </div>
    </div>
  )
}