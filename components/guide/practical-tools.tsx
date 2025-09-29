'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Calculator, 
  CheckCircle, 
  Circle,
  TrendingUp,
  Clock,
  DollarSign,
  FileText,
  Users,
  Phone,
  Globe,
  AlertTriangle,
  Info,
  Activity as ProgressIcon,
  Mail
} from 'lucide-react'
interface DutyCalculation {
  vehicleValue: number
  engineSize: number
  fuelType: 'petrol' | 'diesel'
  age: number
  dutyRate: number
  vatRate: number
  totalDuty: number
  totalVat: number
  totalTaxes: number
}
interface ProgressStep {
  id: string
  title: string
  stage: string
  completed: boolean
  optional: boolean
  dueDate?: string
  estimatedDuration: string
  dependencies?: string[]
}
interface ServiceProvider {
  name: string
  type: 'clearing-agent' | 'translator' | 'transporter' | 'insurance' | 'finance'
  phone?: string
  email?: string
  location: string
  speciality: string
  rating?: number
  notes?: string
}
const defaultProgressSteps: ProgressStep[] = [
  {
    id: 'vehicle-selected',
    title: 'Select suitable vehicle',
    stage: 'Pre-Import Planning',
    completed: false,
    optional: false,
    estimatedDuration: '3-7 days'
  },
  {
    id: 'eligibility-confirmed',
    title: 'Confirm vehicle eligibility',
    stage: 'Pre-Import Planning', 
    completed: false,
    optional: false,
    estimatedDuration: '1 day',
    dependencies: ['vehicle-selected']
  },
  {
    id: 'agent-selected',
    title: 'Select clearing agent',
    stage: 'Pre-Import Planning',
    completed: false,
    optional: false,
    estimatedDuration: '2-3 days'
  },
  {
    id: 'consignee-verified',
    title: 'Verify consignee good standing',
    stage: 'Shipping & Documentation',
    completed: false,
    optional: false,
    estimatedDuration: '1 day',
    dependencies: ['agent-selected']
  },
  {
    id: 'vehicle-purchased',
    title: 'Complete vehicle purchase',
    stage: 'Shipping & Documentation',
    completed: false,
    optional: false,
    estimatedDuration: '1-2 days',
    dependencies: ['eligibility-confirmed', 'consignee-verified']
  },
  {
    id: 'export-arranged',
    title: 'Arrange export documentation',
    stage: 'Shipping & Documentation',
    completed: false,
    optional: false,
    estimatedDuration: '3-5 days',
    dependencies: ['vehicle-purchased']
  },
  {
    id: 'translation-ordered',
    title: 'Order certified translation (if needed)',
    stage: 'Documentation Preparation',
    completed: false,
    optional: true,
    estimatedDuration: '7-14 days',
    dependencies: ['export-arranged']
  },
  {
    id: 'shipping-booked',
    title: 'Book ocean freight',
    stage: 'Shipping & Documentation',
    completed: false,
    optional: false,
    estimatedDuration: '1-2 days',
    dependencies: ['export-arranged']
  },
  {
    id: 'documents-prepared',
    title: 'Prepare clearance documents',
    stage: 'Documentation Preparation',
    completed: false,
    optional: false,
    estimatedDuration: '2-3 days',
    dependencies: ['shipping-booked']
  },
  {
    id: 'container-shipped',
    title: 'Container shipped',
    stage: 'Transit & Arrival',
    completed: false,
    optional: false,
    estimatedDuration: '35-45 days',
    dependencies: ['documents-prepared']
  },
  {
    id: 'arrival-prepared',
    title: 'Prepare for arrival',
    stage: 'Transit & Arrival',
    completed: false,
    optional: false,
    estimatedDuration: '3-5 days',
    dependencies: ['container-shipped']
  },
  {
    id: 'duties-paid',
    title: 'Pay duties and fees',
    stage: 'Clearance & Collection',
    completed: false,
    optional: false,
    estimatedDuration: '1-2 days',
    dependencies: ['arrival-prepared']
  },
  {
    id: 'vehicle-cleared',
    title: 'Complete customs clearance',
    stage: 'Clearance & Collection',
    completed: false,
    optional: false,
    estimatedDuration: '2-5 days',
    dependencies: ['duties-paid']
  },
  {
    id: 'vehicle-collected',
    title: 'Collect vehicle from port',
    stage: 'Clearance & Collection',
    completed: false,
    optional: false,
    estimatedDuration: '1 day',
    dependencies: ['vehicle-cleared']
  },
  {
    id: 'transport-arranged',
    title: 'Transport to final destination',
    stage: 'Delivery & Registration',
    completed: false,
    optional: true,
    estimatedDuration: '1-2 days',
    dependencies: ['vehicle-collected']
  },
  {
    id: 'roadworthy-booked',
    title: 'Book roadworthy test',
    stage: 'Delivery & Registration',
    completed: false,
    optional: false,
    estimatedDuration: '1-3 weeks',
    dependencies: ['vehicle-collected']
  },
  {
    id: 'roadworthy-passed',
    title: 'Pass roadworthy test',
    stage: 'Delivery & Registration',
    completed: false,
    optional: false,
    estimatedDuration: '1 day',
    dependencies: ['roadworthy-booked']
  },
  {
    id: 'natis-registered',
    title: 'Complete NaTIS registration',
    stage: 'Delivery & Registration',
    completed: false,
    optional: false,
    estimatedDuration: '3-5 days',
    dependencies: ['roadworthy-passed']
  },
  {
    id: 'license-plates',
    title: 'Receive license plates',
    stage: 'Delivery & Registration',
    completed: false,
    optional: false,
    estimatedDuration: '1-2 days',
    dependencies: ['natis-registered']
  },
  {
    id: 'insurance-active',
    title: 'Activate permanent insurance',
    stage: 'Delivery & Registration',
    completed: false,
    optional: false,
    estimatedDuration: '1 day',
    dependencies: ['license-plates']
  }
]
const serviceProviders: ServiceProvider[] = [
  {
    name: "ABC Clearing & Forwarding",
    type: "clearing-agent",
    phone: "+264 64 123 456",
    email: "info@abcclearing.na",
    location: "Walvis Bay",
    speciality: "Vehicle imports, container clearance",
    rating: 4.5,
    notes: "Experienced with Japanese imports"
  },
  {
    name: "Namport Logistics",
    type: "clearing-agent", 
    phone: "+264 64 789 012",
    location: "Walvis Bay",
    speciality: "Full service clearing agent",
    rating: 4.2
  },
  {
    name: "Embassy Translation Services",
    type: "translator",
    phone: "+264 61 234 567",
    email: "translate@embassy.na",
    location: "Windhoek",
    speciality: "Japanese to English certified translations",
    rating: 4.8,
    notes: "Accepts NamRA/MIT certifications"
  },
  {
    name: "Reliable Transport",
    type: "transporter",
    phone: "+264 61 345 678",
    location: "Windhoek/Walvis Bay",
    speciality: "Vehicle transport nationwide",
    rating: 4.3
  },
  {
    name: "Import Finance Solutions",
    type: "finance",
    phone: "+264 61 456 789",
    email: "loans@importfinance.na",
    location: "Windhoek",
    speciality: "Import financing, duty payment plans",
    rating: 4.0
  }
]
export function PracticalTools() {
  const [activeTab, setActiveTab] = useState<'duty' | 'progress'>('duty')
  const [dutyCalc, setDutyCalc] = useState({
    vehicleValue: '',
    engineSize: '',
    fuelType: 'petrol' as 'petrol' | 'diesel',
    age: ''
  })
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>(defaultProgressSteps)
  const [searchProvider, setSearchProvider] = useState('')
  const [filterProviderType, setFilterProviderType] = useState<string>('all')
  const calculateDuty = (): DutyCalculation | null => {
    const value = parseFloat(dutyCalc.vehicleValue)
    const engine = parseFloat(dutyCalc.engineSize)
    const age = parseInt(dutyCalc.age)
    if (!value || !engine || !age) return null
    // Simplified duty calculation - actual rates vary
    let dutyRate = 0.25 // Base 25%
    // Adjust by engine size
    if (engine > 2000) dutyRate += 0.05
    if (engine > 3000) dutyRate += 0.05
    // Adjust by fuel type
    if (dutyCalc.fuelType === 'diesel') dutyRate += 0.02
    // Adjust by age
    if (age > 8) dutyRate += 0.03
    const vatRate = 0.15 // 15% VAT
    const totalDuty = value * dutyRate
    const dutyInclusiveValue = value + totalDuty
    const totalVat = dutyInclusiveValue * vatRate
    const totalTaxes = totalDuty + totalVat
    return {
      vehicleValue: value,
      engineSize: engine,
      fuelType: dutyCalc.fuelType,
      age,
      dutyRate,
      vatRate,
      totalDuty,
      totalVat,
      totalTaxes
    }
  }
  const toggleProgressStep = (id: string) => {
    setProgressSteps(prev => prev.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ))
  }
  const resetProgress = () => {
    setProgressSteps(prev => prev.map(step => ({ ...step, completed: false })))
  }
  const getCompletionStats = () => {
    const required = progressSteps.filter(s => !s.optional)
    const optional = progressSteps.filter(s => s.optional)
    const completedRequired = required.filter(s => s.completed)
    const completedOptional = optional.filter(s => s.completed)
    return {
      requiredTotal: required.length,
      requiredCompleted: completedRequired.length,
      optionalTotal: optional.length,
      optionalCompleted: completedOptional.length,
      overallCompletion: Math.round((progressSteps.filter(s => s.completed).length / progressSteps.length) * 100)
    }
  }
  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchProvider.toLowerCase()) ||
                          provider.speciality.toLowerCase().includes(searchProvider.toLowerCase())
    const matchesType = filterProviderType === 'all' || provider.type === filterProviderType
    return matchesSearch && matchesType
  })
  const dutyResult = calculateDuty()
  const stats = getCompletionStats()
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">🛠️ Practical Import Tools</h2>
        <p className="text-gray-600">Interactive calculators, progress tracking, and contact directory</p>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('duty')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'duty'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Calculator className="h-4 w-4 inline mr-2" />
          Duty Calculator
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'progress'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <ProgressIcon className="h-4 w-4 inline mr-2" />
          Progress Tracker
        </button>
      </div>
      {/* Duty Calculator Tab */}
      {activeTab === 'duty' && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Import Duty & VAT Calculator
            </h3>
            <p className="text-sm text-gray-600">
              Get estimated duty and VAT calculations for your vehicle import
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vehicleValue">Vehicle Value (N$)</Label>
                  <Input
                    id="vehicleValue"
                    type="number"
                    placeholder="e.g., 250000"
                    value={dutyCalc.vehicleValue}
                    onChange={(e) => setDutyCalc(prev => ({ ...prev, vehicleValue: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="engineSize">Engine Size (CC)</Label>
                  <Input
                    id="engineSize"
                    type="number"
                    placeholder="e.g., 2000"
                    value={dutyCalc.engineSize}
                    onChange={(e) => setDutyCalc(prev => ({ ...prev, engineSize: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Fuel Type</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="petrol"
                        checked={dutyCalc.fuelType === 'petrol'}
                        onChange={(e) => setDutyCalc(prev => ({ ...prev, fuelType: e.target.value as 'petrol' | 'diesel' }))}
                        className="mr-2"
                      />
                      Petrol
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="diesel"
                        checked={dutyCalc.fuelType === 'diesel'}
                        onChange={(e) => setDutyCalc(prev => ({ ...prev, fuelType: e.target.value as 'petrol' | 'diesel' }))}
                        className="mr-2"
                      />
                      Diesel
                    </label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="age">Vehicle Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 5"
                    value={dutyCalc.age}
                    onChange={(e) => setDutyCalc(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
              </div>
              {/* Results */}
              <div>
                {dutyResult ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-bold text-green-900 mb-3">Calculation Results</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Vehicle Value:</span>
                          <span className="font-mono">N${dutyResult.vehicleValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duty Rate:</span>
                          <span className="font-mono">{(dutyResult.dutyRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Import Duty:</span>
                          <span className="font-mono">N${dutyResult.totalDuty.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-orange-600">
                          <span>VAT (15%):</span>
                          <span className="font-mono">N${dutyResult.totalVat.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-lg">
                          <span>Total Taxes:</span>
                          <span className="font-mono text-red-700">N${dutyResult.totalTaxes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-blue-700">
                          <span>Total Cost:</span>
                          <span className="font-mono">N${(dutyResult.vehicleValue + dutyResult.totalTaxes).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs text-yellow-800">
                        <AlertTriangle className="h-3 w-3 inline mr-1" />
                        <strong>Disclaimer:</strong> This is an estimate only. Actual rates depend on vehicle classification, 
                        customs valuation, and current tax schedules. Always verify with NamRA.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Enter vehicle details to calculate estimated duty and VAT</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
      {/* Progress Tracker Tab */}
      {activeTab === 'progress' && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <ProgressIcon className="h-5 w-5 text-green-600" />
                  Import Progress Tracker
                </h3>
                <p className="text-sm text-gray-600">
                  Track your progress through the complete import process
                </p>
              </div>
              <Button variant="outline" onClick={resetProgress}>
                Reset Progress
              </Button>
            </div>
            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-white rounded border">
                <div className="text-2xl font-bold text-green-600">{stats.overallCompletion}%</div>
                <div className="text-sm text-gray-600">Overall Complete</div>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="text-lg font-bold">{stats.requiredCompleted}/{stats.requiredTotal}</div>
                <div className="text-sm text-gray-600">Required Steps</div>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="text-lg font-bold">{stats.optionalCompleted}/{stats.optionalTotal}</div>
                <div className="text-sm text-gray-600">Optional Steps</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Group by stages */}
              {Array.from(new Set(progressSteps.map(s => s.stage))).map(stage => {
                const stageSteps = progressSteps.filter(s => s.stage === stage)
                const stageCompleted = stageSteps.filter(s => s.completed).length
                return (
                  <div key={stage} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{stage}</h4>
                        <span className="text-sm text-gray-600">
                          {stageCompleted}/{stageSteps.length} completed
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {stageSteps.map(step => (
                        <div key={step.id} className="flex items-start gap-3">
                          <button
                            onClick={() => toggleProgressStep(step.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${step.completed ? 'line-through text-gray-500' : 'text-gray-900'} font-medium`}>
                                {step.title}
                              </span>
                              {step.optional && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  optional
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {step.estimatedDuration}
                              </div>
                              {step.dependencies && step.dependencies.length > 0 && (
                                <div>
                                  Depends on: {step.dependencies.map(dep => {
                                    const depStep = progressSteps.find(s => s.id === dep)
                                    return depStep ? depStep.title : dep
                                  }).join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}