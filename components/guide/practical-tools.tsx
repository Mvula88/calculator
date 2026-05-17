'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Calculator,
  CheckCircle,
  Circle,
  Clock,
  AlertTriangle,
  Activity as ProgressIcon,
} from 'lucide-react'

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

const defaultProgressSteps: ProgressStep[] = [
  { id: 'vehicle-selected', title: 'Select suitable vehicle', stage: 'Pre-Import Planning', completed: false, optional: false, estimatedDuration: '3–7 days' },
  { id: 'eligibility-confirmed', title: 'Confirm vehicle eligibility', stage: 'Pre-Import Planning', completed: false, optional: false, estimatedDuration: '1 day', dependencies: ['vehicle-selected'] },
  { id: 'agent-selected', title: 'Select clearing agent', stage: 'Pre-Import Planning', completed: false, optional: false, estimatedDuration: '2–3 days' },
  { id: 'consignee-verified', title: 'Verify consignee good standing', stage: 'Shipping & Documentation', completed: false, optional: false, estimatedDuration: '1 day', dependencies: ['agent-selected'] },
  { id: 'vehicle-purchased', title: 'Complete vehicle purchase', stage: 'Shipping & Documentation', completed: false, optional: false, estimatedDuration: '1–2 days', dependencies: ['eligibility-confirmed', 'consignee-verified'] },
  { id: 'export-arranged', title: 'Arrange export documentation', stage: 'Shipping & Documentation', completed: false, optional: false, estimatedDuration: '3–5 days', dependencies: ['vehicle-purchased'] },
  { id: 'translation-ordered', title: 'Order certified translation (if needed)', stage: 'Documentation Preparation', completed: false, optional: true, estimatedDuration: '7–14 days', dependencies: ['export-arranged'] },
  { id: 'shipping-booked', title: 'Book ocean freight', stage: 'Shipping & Documentation', completed: false, optional: false, estimatedDuration: '1–2 days', dependencies: ['export-arranged'] },
  { id: 'documents-prepared', title: 'Prepare clearance documents', stage: 'Documentation Preparation', completed: false, optional: false, estimatedDuration: '2–3 days', dependencies: ['shipping-booked'] },
  { id: 'container-shipped', title: 'Container shipped', stage: 'Transit & Arrival', completed: false, optional: false, estimatedDuration: '35–45 days', dependencies: ['documents-prepared'] },
  { id: 'arrival-prepared', title: 'Prepare for arrival', stage: 'Transit & Arrival', completed: false, optional: false, estimatedDuration: '3–5 days', dependencies: ['container-shipped'] },
  { id: 'duties-paid', title: 'Pay duties and fees', stage: 'Clearance & Collection', completed: false, optional: false, estimatedDuration: '1–2 days', dependencies: ['arrival-prepared'] },
  { id: 'vehicle-cleared', title: 'Complete customs clearance', stage: 'Clearance & Collection', completed: false, optional: false, estimatedDuration: '2–5 days', dependencies: ['duties-paid'] },
  { id: 'vehicle-collected', title: 'Collect vehicle from port', stage: 'Clearance & Collection', completed: false, optional: false, estimatedDuration: '1 day', dependencies: ['vehicle-cleared'] },
  { id: 'transport-arranged', title: 'Transport to final destination', stage: 'Delivery & Registration', completed: false, optional: true, estimatedDuration: '1–2 days', dependencies: ['vehicle-collected'] },
  { id: 'roadworthy-booked', title: 'Book roadworthy test', stage: 'Delivery & Registration', completed: false, optional: false, estimatedDuration: '1–3 weeks', dependencies: ['vehicle-collected'] },
  { id: 'roadworthy-passed', title: 'Pass roadworthy test', stage: 'Delivery & Registration', completed: false, optional: false, estimatedDuration: '1 day', dependencies: ['roadworthy-booked'] },
  { id: 'natis-registered', title: 'Complete NaTIS registration', stage: 'Delivery & Registration', completed: false, optional: false, estimatedDuration: '3–5 days', dependencies: ['roadworthy-passed'] },
  { id: 'license-plates', title: 'Receive license plates', stage: 'Delivery & Registration', completed: false, optional: false, estimatedDuration: '1–2 days', dependencies: ['natis-registered'] },
  { id: 'insurance-active', title: 'Activate permanent insurance', stage: 'Delivery & Registration', completed: false, optional: false, estimatedDuration: '1 day', dependencies: ['license-plates'] },
]

export function PracticalTools() {
  const [activeTab, setActiveTab] = useState<'duty' | 'progress'>('duty')
  const [dutyCalc, setDutyCalc] = useState({
    vehicleValue: '',
    engineSize: '',
    fuelType: 'petrol' as 'petrol' | 'diesel',
    age: '',
  })
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>(defaultProgressSteps)

  const calculateDuty = () => {
    const value = parseFloat(dutyCalc.vehicleValue)
    const engine = parseFloat(dutyCalc.engineSize)
    const age = parseInt(dutyCalc.age)
    if (!value || !engine || !age) return null

    let dutyRate = 0.25
    if (engine > 2000) dutyRate += 0.05
    if (engine > 3000) dutyRate += 0.05
    if (dutyCalc.fuelType === 'diesel') dutyRate += 0.02
    if (age > 8) dutyRate += 0.03

    const vatRate = 0.15
    const totalDuty = value * dutyRate
    const dutyInclusive = value + totalDuty
    const totalVat = dutyInclusive * vatRate
    const totalTaxes = totalDuty + totalVat
    return { vehicleValue: value, engineSize: engine, fuelType: dutyCalc.fuelType, age, dutyRate, vatRate, totalDuty, totalVat, totalTaxes }
  }

  const toggleProgressStep = (id: string) =>
    setProgressSteps((prev) => prev.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)))

  const resetProgress = () => setProgressSteps((prev) => prev.map((step) => ({ ...step, completed: false })))

  const stats = (() => {
    const required = progressSteps.filter((s) => !s.optional)
    const optional = progressSteps.filter((s) => s.optional)
    return {
      requiredTotal: required.length,
      requiredCompleted: required.filter((s) => s.completed).length,
      optionalTotal: optional.length,
      optionalCompleted: optional.filter((s) => s.completed).length,
      overallCompletion: Math.round((progressSteps.filter((s) => s.completed).length / progressSteps.length) * 100),
    }
  })()

  const dutyResult = calculateDuty()

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold pb-2.5 mb-6 border-b border-zinc-200">
        <span className="text-amber-600">Nº 08</span>
        <span className="h-px flex-1 max-w-[40px] bg-zinc-300" />
        <span>Practical tools</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-tight">
        Calculator. Progress tracker.
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-600 leading-relaxed">
        Two working tools — duty estimator and full process tracker — that live with you through the import.
      </p>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 border-b border-zinc-200">
        <button
          onClick={() => setActiveTab('duty')}
          className={`px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] font-semibold transition-colors border-b-2 -mb-px ${
            activeTab === 'duty' ? 'border-amber-500 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'
          }`}
        >
          <Calculator className="h-3.5 w-3.5 inline mr-2" strokeWidth={1.5} />
          Duty calculator
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] font-semibold transition-colors border-b-2 -mb-px ${
            activeTab === 'progress' ? 'border-amber-500 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'
          }`}
        >
          <ProgressIcon className="h-3.5 w-3.5 inline mr-2" strokeWidth={1.5} />
          Progress tracker
        </button>
      </div>

      {/* Duty calculator */}
      {activeTab === 'duty' && (
        <div className="mt-8 border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Form */}
            <div className="px-6 sm:px-8 py-8 space-y-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                Inputs
              </p>
              <div>
                <Label htmlFor="vehicleValue" className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                  Vehicle value (N$)
                </Label>
                <Input
                  id="vehicleValue"
                  type="number"
                  placeholder="e.g., 250000"
                  value={dutyCalc.vehicleValue}
                  onChange={(e) => setDutyCalc((prev) => ({ ...prev, vehicleValue: e.target.value }))}
                  className="!h-11 !px-4 mt-2 bg-white border-zinc-300 focus-visible:ring-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="engineSize" className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                  Engine size (cc)
                </Label>
                <Input
                  id="engineSize"
                  type="number"
                  placeholder="e.g., 2000"
                  value={dutyCalc.engineSize}
                  onChange={(e) => setDutyCalc((prev) => ({ ...prev, engineSize: e.target.value }))}
                  className="!h-11 !px-4 mt-2 bg-white border-zinc-300 focus-visible:ring-amber-400"
                />
              </div>
              <div>
                <Label className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Fuel type</Label>
                <div className="mt-2 flex gap-2">
                  {(['petrol', 'diesel'] as const).map((fuel) => (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => setDutyCalc((prev) => ({ ...prev, fuelType: fuel }))}
                      className={`flex-1 px-4 h-11 text-sm font-mono uppercase tracking-[0.18em] rounded-full border transition-colors ${
                        dutyCalc.fuelType === fuel
                          ? 'bg-zinc-900 border-zinc-900 text-white'
                          : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="age" className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                  Vehicle age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 5"
                  value={dutyCalc.age}
                  onChange={(e) => setDutyCalc((prev) => ({ ...prev, age: e.target.value }))}
                  className="!h-11 !px-4 mt-2 bg-white border-zinc-300 focus-visible:ring-amber-400"
                />
              </div>
            </div>

            {/* Result */}
            <div className="px-6 sm:px-8 py-8 bg-stone-50/60">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-5">
                Result
              </p>
              {dutyResult ? (
                <>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-zinc-600">Vehicle value</dt>
                      <dd className="font-mono text-zinc-900">N${dutyResult.vehicleValue.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-zinc-600">Duty rate</dt>
                      <dd className="font-mono text-zinc-900">{(dutyResult.dutyRate * 100).toFixed(1)}%</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-red-600">Import duty</dt>
                      <dd className="font-mono text-red-600">N${dutyResult.totalDuty.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-amber-700">VAT (15%)</dt>
                      <dd className="font-mono text-amber-700">N${dutyResult.totalVat.toLocaleString()}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 pt-5 border-t border-zinc-200">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-1">Total taxes</p>
                    <p className="font-serif text-2xl font-medium tracking-tight text-zinc-900">
                      N${dutyResult.totalTaxes.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-200">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold mb-1">
                      Landed cost
                    </p>
                    <p className="font-serif text-3xl font-medium tracking-tight text-zinc-900">
                      N${(dutyResult.vehicleValue + dutyResult.totalTaxes).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-6 text-xs text-zinc-500 leading-relaxed border-l-2 border-amber-500 pl-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-700 font-semibold">Disclaimer</span>{' '}
                    Estimate only. Actual rates depend on vehicle classification, customs valuation, and current tax schedules. Verify with NamRA.
                  </p>
                </>
              ) : (
                <div className="text-center py-10">
                  <Calculator className="h-8 w-8 mx-auto mb-3 text-zinc-300" strokeWidth={1.5} />
                  <p className="text-sm text-zinc-500">Enter vehicle details to calculate.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress tracker */}
      {activeTab === 'progress' && (
        <div className="mt-8">
          <div className="border border-zinc-200 rounded-2xl px-6 sm:px-8 py-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-600 font-semibold">
                  Overall completion
                </p>
                <p className="mt-2 font-serif text-4xl sm:text-5xl font-medium tracking-tight text-zinc-900">
                  {stats.overallCompletion}%
                </p>
              </div>
              <Button
                variant="outline"
                onClick={resetProgress}
                className="border-zinc-300 bg-white hover:bg-stone-50 text-zinc-900 font-medium rounded-full h-9 px-5"
              >
                Reset progress
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Required steps</p>
                <p className="mt-1 font-serif text-xl font-medium text-zinc-900">
                  {stats.requiredCompleted}<span className="text-zinc-400"> / {stats.requiredTotal}</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Optional steps</p>
                <p className="mt-1 font-serif text-xl font-medium text-zinc-900">
                  {stats.optionalCompleted}<span className="text-zinc-400"> / {stats.optionalTotal}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {Array.from(new Set(progressSteps.map((s) => s.stage))).map((stage) => {
              const stageSteps = progressSteps.filter((s) => s.stage === stage)
              const stageCompleted = stageSteps.filter((s) => s.completed).length
              return (
                <div key={stage} className="border border-zinc-200 rounded-2xl overflow-hidden">
                  <div className="px-6 sm:px-8 py-4 border-b border-zinc-200 bg-stone-50/60 flex items-center justify-between">
                    <h4 className="font-serif text-base font-medium tracking-tight text-zinc-900">{stage}</h4>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                      {stageCompleted} / {stageSteps.length} done
                    </span>
                  </div>
                  <ul className="divide-y divide-zinc-100">
                    {stageSteps.map((step) => (
                      <li key={step.id} className="px-6 sm:px-8 py-4">
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleProgressStep(step.id)} className="mt-0.5 flex-shrink-0">
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
                            ) : (
                              <Circle className="h-5 w-5 text-zinc-300" strokeWidth={1.5} />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${step.completed ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>
                              {step.title}
                              {step.optional && (
                                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 no-underline">
                                  · optional
                                </span>
                              )}
                            </p>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 flex items-center gap-1.5">
                              <Clock className="h-3 w-3" strokeWidth={1.5} />
                              {step.estimatedDuration}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
