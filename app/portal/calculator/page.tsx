'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuthDebug } from '@/lib/hooks/use-auth-debug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import VehiclePricingDatabase from '@/components/portal/VehiclePricingDatabase'
import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Zap,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import {
  Country,
  VehicleType,
  calculateImportDuties,
  getCountryRequirements,
  type FullOutput,
} from '@/lib/calc/countries'

const japanCosts = {
  biddingCharge: 11000,
  recyclingFee: 440,
  deliveryFee: 57200,
  thc: 18000,
  operationFee: 33000,
  loadingCharges: 40000,
  specialHandlingFee: 0,
}

const defaultClearingCosts: Record<Country, number> = {
  NA: 26255.65,
  ZA: 35000.0,
  BW: 18000.0,
  ZM: 45000.0,
}

const namibiaSideCosts = {
  portCharges: 8500.0,
  handlingFees: 4200.0,
  documentation: 2800.0,
  agentFees: 6500.0,
  inspection: 1800.0,
  storage: 1500.0,
  miscFees: 955.65,
}

const localCostBreakdowns: Record<Country, typeof namibiaSideCosts> = {
  NA: namibiaSideCosts,
  ZA: { portCharges: 12000.0, handlingFees: 6000.0, documentation: 3500.0, agentFees: 8000.0, inspection: 2500.0, storage: 2000.0, miscFees: 1000.0 },
  BW: { portCharges: 6000.0, handlingFees: 3000.0, documentation: 2000.0, agentFees: 4500.0, inspection: 1200.0, storage: 800.0, miscFees: 500.0 },
  ZM: { portCharges: 15000.0, handlingFees: 7500.0, documentation: 5000.0, agentFees: 10000.0, inspection: 3500.0, storage: 2500.0, miscFees: 1500.0 },
}

const countryNames: Record<Country, string> = {
  NA: 'Namibia',
  ZA: 'South Africa',
  BW: 'Botswana',
  ZM: 'Zambia',
}

const exchangeRates: Record<Country, number> = { NA: 1.0, ZA: 1.0, BW: 1.35, ZM: 0.68 }

// Editorial label component
function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-2">
      {children}
    </label>
  )
}

function SectionHeader({ label, count }: { label: string; count?: string }) {
  return (
    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5">
      <span className="text-amber-600 font-semibold">{label}</span>
      {count && <span className="text-zinc-500">{count}</span>}
    </div>
  )
}

export default function DutyCalculator() {
  const { user, loading, debugInfo } = useAuthDebug()

  const [country, setCountry] = useState<Country>('NA')
  const [cifValue, setCifValue] = useState<string>('')
  const [jpyToLocalRate, setJpyToLocalRate] = useState<string>('0.13')
  const [co2Emissions, setCo2Emissions] = useState<string>('')
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel'>('petrol')
  const [rrpValue, setRrpValue] = useState<string>('')
  const [carsInContainer, setCarsInContainer] = useState<string>('1')
  const [isNewVehicle, setIsNewVehicle] = useState<boolean>(false)

  const [vehicleType, setVehicleType] = useState<VehicleType>('passenger')
  const [engineCC, setEngineCC] = useState<string>('')
  const [vehicleAge, setVehicleAge] = useState<string>('')
  const [exciseRate, setExciseRate] = useState<string>('30')
  const [isEV, setIsEV] = useState<boolean>(false)
  const [isHybrid, setIsHybrid] = useState<boolean>(false)

  const [specialHandlingFee, setSpecialHandlingFee] = useState<string>('0')
  const [localClearingTotal, setLocalClearingTotal] = useState<string>('')
  const [oceanFreightCost, setOceanFreightCost] = useState<string>('')
  const [inlandDelivery, setInlandDelivery] = useState<string>('0')

  const [result, setResult] = useState<FullOutput | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [useContainerSharing, setUseContainerSharing] = useState<boolean>(false)

  const countryReqs = getCountryRequirements(country)

  useEffect(() => {
    setLocalClearingTotal(defaultClearingCosts[country].toFixed(2))
    const baseJpyRate = 0.13
    const countryRate = baseJpyRate / exchangeRates[country]
    setJpyToLocalRate(countryRate.toFixed(4))
  }, [country])

  useEffect(() => {
    if (useContainerSharing) {
      const userCars = parseInt(carsInContainer) || 1
      setOceanFreightCost((18500 * userCars).toString())
    }
  }, [carsInContainer, useContainerSharing])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Loading calculator
          </p>
          {debugInfo?.error && (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600">
              Error · {debugInfo.error}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (!user && !loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-10 text-center">
          <AlertTriangle className="h-7 w-7 text-amber-600 mx-auto mb-3" strokeWidth={1.75} />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mb-3">
            [ Sign in required ]
          </p>
          <h2 className="text-xl font-medium tracking-tight text-zinc-900 mb-2">Please sign in.</h2>
          <p className="text-sm text-zinc-600">
            You need to be signed in to use the multi-country import calculator.
          </p>
        </div>
      </div>
    )
  }

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {}

    const cif = parseFloat(cifValue)
    if (!cifValue) newErrors.cifValue = `Vehicle price in ${countryReqs.currency} is required`
    else if (isNaN(cif) || cif <= 0) newErrors.cifValue = 'Please enter a valid positive amount'

    const rate = parseFloat(jpyToLocalRate)
    if (!jpyToLocalRate) newErrors.jpyToLocalRate = 'Exchange rate is required'
    else if (isNaN(rate) || rate <= 0) newErrors.jpyToLocalRate = 'Please enter a valid exchange rate'

    if (countryReqs.requiresCO2 || (country === 'ZA' && isNewVehicle)) {
      const co2 = parseFloat(co2Emissions)
      if (!co2Emissions) newErrors.co2Emissions = country === 'NA' ? 'Engine size in CC is required' : 'CO₂ emissions are required for this country'
      else if (isNaN(co2) || co2 < 0) newErrors.co2Emissions = country === 'NA' ? 'Please enter valid engine CC (e.g., 1400, 2000)' : 'Please enter valid CO₂ emissions'
    }

    if (country === 'ZM') {
      const cc = parseFloat(engineCC)
      if (!engineCC) newErrors.engineCC = 'Engine capacity is required for Zambia'
      else if (isNaN(cc) || cc <= 0) newErrors.engineCC = 'Please enter valid engine capacity'

      const age = parseFloat(vehicleAge)
      if (!vehicleAge) newErrors.vehicleAge = 'Vehicle age is required for Zambia'
      else if (isNaN(age) || age < 0) newErrors.vehicleAge = 'Please enter valid vehicle age'

      const excise = parseFloat(exciseRate)
      if (!exciseRate) newErrors.exciseRate = 'Excise rate is required'
      else if (isNaN(excise) || excise < 0 || excise > 100) newErrors.exciseRate = 'Please enter a valid percentage (0-100)'
    }

    const cars = parseInt(carsInContainer)
    if (!carsInContainer) newErrors.carsInContainer = 'Number of cars is required'
    else if (isNaN(cars) || cars < 1) newErrors.carsInContainer = 'Please enter at least 1 car'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateDuty = () => {
    if (!validateInputs()) return

    const inputValue = parseFloat(cifValue)
    const cif = country === 'NA' ? inputValue * 1.1 : inputValue
    const rate = parseFloat(jpyToLocalRate)
    const co2 = parseFloat(co2Emissions) || 0
    const rrp = parseFloat(rrpValue) || cif * 1.5
    const cars = parseInt(carsInContainer)
    const specialHandling = parseFloat(specialHandlingFee) || 0
    const localClearing = parseFloat(localClearingTotal) || defaultClearingCosts[country]
    const inland = parseFloat(inlandDelivery) || 0

    const japanSideTotalJPY = Object.values(japanCosts).reduce((s, c) => s + c, 0) + specialHandling
    const japanSideCosts = japanSideTotalJPY * rate

    const params = {
      country,
      cif,
      fuel: fuelType,
      co2,
      rrp,
      isNewVehicle,
      containerCars: cars,
      japanSideCosts,
      localClearingCosts: localClearing,
      inlandDelivery: inland,
      zm:
        country === 'ZM'
          ? {
              type: vehicleType,
              cc: parseFloat(engineCC) || 1500,
              ageYears: parseFloat(vehicleAge) || 3,
              exciseRate: parseFloat(exciseRate) || 30,
              isEV,
              isHybrid,
            }
          : undefined,
    }

    setResult(calculateImportDuties(params))
  }

  const resetCalculator = () => {
    setCifValue('')
    setCo2Emissions('')
    setFuelType('petrol')
    setRrpValue('')
    setCarsInContainer('1')
    setIsNewVehicle(false)
    setVehicleType('passenger')
    setEngineCC('')
    setVehicleAge('')
    setExciseRate('30')
    setIsEV(false)
    setIsHybrid(false)
    setSpecialHandlingFee('0')
    setLocalClearingTotal(defaultClearingCosts[country].toFixed(2))
    setOceanFreightCost('')
    setUseContainerSharing(false)
    setInlandDelivery('0')
    setResult(null)
    setErrors({})
  }

  const inputCls = '!h-11 !px-3.5 !text-base border-zinc-200 bg-white focus-visible:ring-amber-500/20 focus-visible:border-amber-500 rounded-xl'
  const selectCls = 'mt-1 w-full h-11 px-3.5 text-sm border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors'
  const errCls = '!border-red-300 focus-visible:ring-red-500/20 focus-visible:!border-red-500'

  const renderError = (field: keyof typeof errors, fallback: string) =>
    errors[field] ? (
      <p className="text-xs text-red-600 mt-1.5">{errors[field]}</p>
    ) : (
      <p className="text-xs text-zinc-500 mt-1.5">{fallback}</p>
    )

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-zinc-200">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
              Calculator
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Mastery · Professional tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
            Multi-country import
            <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">duty calculator.</span>
          </h1>
          <div className="mt-4 flex items-start gap-2.5 max-w-2xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Calculate import duties and fees for vehicles imported from Japan to Southern Africa.
            </p>
          </div>

          <div className="mt-6 border-t border-b border-zinc-200 py-4 flex items-start gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-0.5 whitespace-nowrap">
              [ Professional tool ]
            </span>
            <p className="text-sm text-zinc-700 leading-relaxed">
              Estimates only. Consult a clearing agent for final calculations.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* ───── CALCULATOR FORM ───── */}
          <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-8">
            <h2 className="text-xl font-medium tracking-tight text-zinc-900 mb-6">
              Vehicle &amp; import details
            </h2>

            <div className="space-y-8">
              {/* Country */}
              <section className="space-y-3">
                <SectionHeader label="Destination country" />
                <div>
                  <MonoLabel>Import destination</MonoLabel>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value as Country)}
                    className={selectCls}
                  >
                    {Object.entries(countryNames).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name} ({code})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Select the country where the vehicle will be imported.
                  </p>
                </div>

                {country === 'ZA' && !isNewVehicle && (
                  <div className="border border-amber-200 bg-amber-50/60 rounded-xl px-3.5 py-3 flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div>
                      <p className="text-xs font-semibold text-amber-900">ITAC permit required</p>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        Used vehicle imports to South Africa generally require an ITAC import permit
                        under limited categories (returning resident, inherited, vintage, etc.).
                        These calculations are estimates only.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Vehicle */}
              <section className="space-y-4">
                <SectionHeader label="Vehicle information" />

                <div>
                  <MonoLabel>Vehicle price ({countryReqs.currency})</MonoLabel>
                  <Input
                    id="cifValue"
                    type="number"
                    placeholder="e.g. 150000"
                    value={cifValue}
                    onChange={(e) => {
                      setCifValue(e.target.value)
                      if (errors.cifValue) setErrors((prev) => ({ ...prev, cifValue: '' }))
                    }}
                    className={`${inputCls} ${errors.cifValue ? errCls : ''}`}
                  />
                  {renderError('cifValue', 'Purchase price of the vehicle at auction (before shipping costs)')}
                </div>

                {(countryReqs.requiresCO2 || (country === 'ZA' && isNewVehicle)) && (
                  <div>
                    <MonoLabel>{country === 'NA' ? 'Engine size (cc)' : 'CO₂ emissions (g/km)'}</MonoLabel>
                    <Input
                      type="number"
                      placeholder={country === 'NA' ? 'e.g. 1400 for 1.4L, 2000 for 2.0L' : 'e.g. 150'}
                      value={co2Emissions}
                      onChange={(e) => {
                        setCo2Emissions(e.target.value)
                        if (errors.co2Emissions) setErrors((prev) => ({ ...prev, co2Emissions: '' }))
                      }}
                      className={`${inputCls} ${errors.co2Emissions ? errCls : ''}`}
                    />
                    {renderError(
                      'co2Emissions',
                      country === 'NA'
                        ? 'Enter engine capacity in CC (e.g., 1.4L = 1400, 1.8L = 1800, 2.0L = 2000)'
                        : country === 'ZA'
                          ? 'For CO₂ levy on new vehicles'
                          : 'For environmental calculations'
                    )}
                  </div>
                )}

                <div>
                  <MonoLabel>Fuel type</MonoLabel>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as 'petrol' | 'diesel')}
                    className={selectCls}
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                  </select>
                  <p className="text-xs text-zinc-500 mt-1.5">
                    {country === 'NA'
                      ? fuelType === 'petrol'
                        ? 'ENV levy applies if engine > 1200cc'
                        : 'ENV levy applies if engine > 1400cc'
                      : 'Select fuel type for vehicle'}
                  </p>
                </div>

                {country === 'ZA' && (
                  <label className="flex items-center gap-2.5 text-sm text-zinc-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewVehicle}
                      onChange={(e) => setIsNewVehicle(e.target.checked)}
                      className="rounded border-zinc-300 text-amber-500 focus:ring-amber-500/20"
                    />
                    New vehicle (enables CO₂ levy)
                  </label>
                )}

                {country === 'ZM' && (
                  <>
                    <div>
                      <MonoLabel>Vehicle type</MonoLabel>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                        className={selectCls}
                      >
                        <option value="passenger">Passenger car</option>
                        <option value="suv">SUV</option>
                        <option value="pickup">Pickup truck</option>
                        <option value="van">Van</option>
                        <option value="truck">Truck</option>
                      </select>
                    </div>

                    <div>
                      <MonoLabel>Engine capacity (cc)</MonoLabel>
                      <Input
                        type="number"
                        placeholder="e.g. 1800"
                        value={engineCC}
                        onChange={(e) => {
                          setEngineCC(e.target.value)
                          if (errors.engineCC) setErrors((prev) => ({ ...prev, engineCC: '' }))
                        }}
                        className={`${inputCls} ${errors.engineCC ? errCls : ''}`}
                      />
                      {renderError('engineCC', 'Engine size for specific duty lookup')}
                    </div>

                    <div>
                      <MonoLabel>Vehicle age (years)</MonoLabel>
                      <Input
                        type="number"
                        placeholder="e.g. 3"
                        value={vehicleAge}
                        onChange={(e) => {
                          setVehicleAge(e.target.value)
                          if (errors.vehicleAge) setErrors((prev) => ({ ...prev, vehicleAge: '' }))
                        }}
                        className={`${inputCls} ${errors.vehicleAge ? errCls : ''}`}
                      />
                      {renderError('vehicleAge', 'Age affects specific duty amount')}
                    </div>

                    <div>
                      <MonoLabel>Excise rate (%)</MonoLabel>
                      <Input
                        type="number"
                        placeholder="e.g. 30"
                        value={exciseRate}
                        onChange={(e) => {
                          setExciseRate(e.target.value)
                          if (errors.exciseRate) setErrors((prev) => ({ ...prev, exciseRate: '' }))
                        }}
                        className={`${inputCls} ${errors.exciseRate ? errCls : ''}`}
                      />
                      {renderError('exciseRate', 'Excise duty percentage (varies by vehicle category)')}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 text-sm text-zinc-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isEV}
                          onChange={(e) => {
                            setIsEV(e.target.checked)
                            if (e.target.checked) setIsHybrid(false)
                          }}
                          className="rounded border-zinc-300 text-amber-500 focus:ring-amber-500/20"
                        />
                        <Zap className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.75} />
                        Electric vehicle (zero duty)
                      </label>
                      <label className="flex items-center gap-2.5 text-sm text-zinc-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isHybrid}
                          onChange={(e) => {
                            setIsHybrid(e.target.checked)
                            if (e.target.checked) setIsEV(false)
                          }}
                          className="rounded border-zinc-300 text-amber-500 focus:ring-amber-500/20"
                        />
                        Hybrid vehicle (reduced excise)
                      </label>
                    </div>
                  </>
                )}
              </section>

              {/* Ocean Freight */}
              <section className="space-y-4">
                <SectionHeader label="Ocean freight" />

                <div>
                  <MonoLabel>Ocean freight cost ({countryReqs.currency})</MonoLabel>
                  <Input
                    type="number"
                    placeholder={useContainerSharing ? `${18500 * (parseInt(carsInContainer) || 1)}` : 'e.g. 35000'}
                    value={oceanFreightCost}
                    onChange={(e) => setOceanFreightCost(e.target.value)}
                    className={inputCls}
                    disabled={useContainerSharing}
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">
                    {useContainerSharing
                      ? `Shared rate · ${countryReqs.currency} 18,500 × ${parseInt(carsInContainer) || 1} car(s)`
                      : 'Total cost for your cars (will be divided by 4 cars in container)'}
                  </p>
                </div>

                <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-4">
                  <label className="flex items-start gap-2.5 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={useContainerSharing}
                      onChange={(e) => {
                        setUseContainerSharing(e.target.checked)
                        if (e.target.checked) {
                          const userCars = parseInt(carsInContainer) || 1
                          setOceanFreightCost((18500 * userCars).toString())
                        } else {
                          setOceanFreightCost('')
                        }
                      }}
                      className="mt-0.5 rounded border-zinc-300 text-amber-500 focus:ring-amber-500/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-900">Use shared container rate</p>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        Save up to 75% by splitting a 40ft container with other importers.
                      </p>
                    </div>
                  </label>

                  {useContainerSharing && (
                    <div className="text-xs text-zinc-700 bg-white border border-zinc-200 rounded-lg p-3 space-y-1.5">
                      <p className="font-medium text-emerald-700">
                        ✓ Shared rate · {countryReqs.currency} 18,500 per car
                      </p>
                      <p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mr-1.5">
                          [ How to find ]
                        </span>
                        Ask your exporter if other clients are shipping cars to your port
                        (e.g., Walvis Bay) — they often consolidate buyers into one 40ft container.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Exchange + Container */}
              <section className="space-y-4">
                <SectionHeader label="Exchange & container" />

                <div>
                  <MonoLabel>Exchange rate (JPY to {countryReqs.currency})</MonoLabel>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1.30"
                    value={jpyToLocalRate}
                    onChange={(e) => {
                      setJpyToLocalRate(e.target.value)
                      if (errors.jpyToLocalRate) setErrors((prev) => ({ ...prev, jpyToLocalRate: '' }))
                    }}
                    className={`${inputCls} ${errors.jpyToLocalRate ? errCls : ''}`}
                  />
                  {renderError('jpyToLocalRate', `Current JPY to ${countryReqs.currency} conversion rate`)}
                </div>

                <div>
                  <MonoLabel>Your cars in container</MonoLabel>
                  <Input
                    type="number"
                    placeholder="e.g. 1"
                    value={carsInContainer}
                    onChange={(e) => {
                      setCarsInContainer(e.target.value)
                      if (errors.carsInContainer) setErrors((prev) => ({ ...prev, carsInContainer: '' }))
                    }}
                    className={`${inputCls} ${errors.carsInContainer ? errCls : ''}`}
                  />
                  {renderError('carsInContainer', 'How many cars are you importing? (Container holds 4 cars total)')}
                </div>
              </section>

              {/* Japan-side Costs */}
              <section className="space-y-4">
                <SectionHeader label="Japan-side costs · prefilled" />

                <div className="border border-zinc-200 rounded-xl bg-stone-50/60 p-4 space-y-1">
                  {[
                    ['Bidding charge', japanCosts.biddingCharge],
                    ['Recycling fee', japanCosts.recyclingFee],
                    ['Delivery fee', japanCosts.deliveryFee],
                    ['THC', japanCosts.thc],
                    ['Operation fee', japanCosts.operationFee],
                    ['Loading charges', japanCosts.loadingCharges],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[1fr_auto_auto] gap-3 text-xs items-baseline">
                      <span className="text-zinc-700">{label}</span>
                      <span className="font-mono text-zinc-500">¥{(value as number).toLocaleString()}</span>
                      <span className="font-mono font-medium text-zinc-900 text-right min-w-[5rem]">
                        {countryReqs.currency} {((value as number) * parseFloat(jpyToLocalRate || '0.13')).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="grid grid-cols-[1fr_auto] gap-3 text-sm items-baseline border-t border-zinc-200 pt-2 mt-2">
                    <span className="font-medium text-zinc-900">Total Japan costs</span>
                    <span className="font-mono font-semibold text-amber-700">
                      {countryReqs.currency}{' '}
                      {(Object.values(japanCosts).reduce((a, b) => a + b, 0) * parseFloat(jpyToLocalRate || '0.13')).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <MonoLabel>Additional handling (JPY)</MonoLabel>
                  <Input
                    type="number"
                    placeholder="Optional"
                    value={specialHandlingFee}
                    onChange={(e) => setSpecialHandlingFee(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </section>

              {/* Local-side Costs */}
              <section className="space-y-4">
                <SectionHeader label={`${countryNames[country]}-side costs`} />

                <div>
                  <MonoLabel>Local clearing total ({countryReqs.currency})</MonoLabel>
                  <Input
                    type="number"
                    step="0.01"
                    value={localClearingTotal}
                    onChange={(e) => setLocalClearingTotal(e.target.value)}
                    className={inputCls}
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Default · {countryReqs.currency} {defaultClearingCosts[country].toFixed(2)} · Includes port
                    charges, handling, documentation, agent fees
                  </p>
                </div>

                <div>
                  <MonoLabel>Inland delivery ({countryReqs.currency})</MonoLabel>
                  <Input
                    type="number"
                    placeholder="Optional trucking cost"
                    value={inlandDelivery}
                    onChange={(e) => setInlandDelivery(e.target.value)}
                    className={inputCls}
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">Trucking from port to final destination.</p>
                </div>
              </section>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={calculateDuty}
                  className="group flex-1 h-12 bg-amber-400 text-zinc-900 hover:bg-amber-300 font-semibold rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(251,191,36,0.55)] transition-colors"
                >
                  <Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} />
                  Calculate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="h-12 px-6 rounded-full border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* ───── RESULTS ───── */}
          {result ? (
            <div className="border border-zinc-200 rounded-2xl bg-white p-6 sm:p-8 self-start">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium tracking-tight text-zinc-900">
                  Cost breakdown
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  {countryNames[country]}
                </span>
              </div>

              {/* Namibia Quick Summary */}
              {country === 'NA' && (
                <div className="border border-zinc-200 rounded-xl bg-stone-50/60 p-5 mb-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                    Quick summary
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      ['Vehicle price', `${countryReqs.currency} ${(result.cif / 1.1).toFixed(2)}`],
                      ['ICD (25%)', `${countryReqs.currency} ${result.duty.toFixed(2)}`],
                      ['ENV levy', `${countryReqs.currency} ${result.env.toFixed(2)}`],
                      ['Ad Valorem', `${countryReqs.currency} ${result.adv.toFixed(2)}`],
                      ['Import VAT (16.5%)', `${countryReqs.currency} ${result.vat.toFixed(2)}`],
                      ['Total taxes', `${countryReqs.currency} ${result.totalTaxes.toFixed(2)}`],
                    ].map(([k, v], i) => (
                      <div key={i}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{k}</p>
                        <p className={`mt-1 font-medium ${i === 5 ? 'text-red-600' : 'text-zinc-900'}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Japan-side Breakdown */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                    Japan-side costs
                  </p>
                  <div className="space-y-1.5 text-xs">
                    {[
                      ['Bidding charge', japanCosts.biddingCharge],
                      ['Recycling fee', japanCosts.recyclingFee],
                      ['Delivery fee', japanCosts.deliveryFee],
                      ['THC', japanCosts.thc],
                      ['Operation fee', japanCosts.operationFee],
                      ['Loading charges', japanCosts.loadingCharges],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-zinc-700">
                        <span>{label}</span>
                        <span className="font-mono">
                          {countryReqs.currency} {((value as number) * parseFloat(jpyToLocalRate)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {parseFloat(specialHandlingFee) > 0 && (
                      <div className="flex justify-between text-zinc-700">
                        <span>Special handling</span>
                        <span className="font-mono">
                          {countryReqs.currency} {(parseFloat(specialHandlingFee) * parseFloat(jpyToLocalRate)).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-zinc-200 pt-2.5 mt-2.5 space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-700">
                      <span>Total Japan costs</span>
                      <span className="font-mono">¥{(result.japanSideCosts / parseFloat(jpyToLocalRate)).toLocaleString('en', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Converted to {countryReqs.currency}</span>
                      <span className="font-mono text-amber-700">{countryReqs.currency} {result.japanSideCosts.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Ocean Freight */}
                {oceanFreightCost && parseFloat(oceanFreightCost) > 0 && (
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-3">
                      <span className="text-blue-600 font-semibold">Ocean freight</span>
                      {useContainerSharing && (
                        <span className="text-emerald-700 font-semibold">Shared</span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-sm">
                      {useContainerSharing ? (
                        <>
                          <div className="flex justify-between text-zinc-700">
                            <span>Shared rate per car</span>
                            <span className="font-mono">{countryReqs.currency} 18,500</span>
                          </div>
                          <div className="flex justify-between text-zinc-700">
                            <span>Number of cars</span>
                            <span className="font-mono">{parseInt(carsInContainer) || 1}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t border-zinc-200 pt-2 mt-2">
                            <span>Total ocean freight</span>
                            <span className="font-mono text-emerald-700">
                              {countryReqs.currency} {parseFloat(oceanFreightCost).toFixed(2)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-zinc-700">
                            <span>Total container cost</span>
                            <span className="font-mono">{countryReqs.currency} {parseFloat(oceanFreightCost).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-zinc-700">
                            <span>Your cars / total</span>
                            <span className="font-mono">{parseInt(carsInContainer) || 1} / 4</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t border-zinc-200 pt-2 mt-2">
                            <span>Your share ({parseInt(carsInContainer) || 1}/4)</span>
                            <span className="font-mono text-emerald-700">
                              {countryReqs.currency}{' '}
                              {((parseFloat(oceanFreightCost) / 4) * (parseInt(carsInContainer) || 1)).toFixed(2)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Local Clearing */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                    Local clearing agent costs
                  </p>
                  {(() => {
                    const localCosts = localCostBreakdowns[country]
                    const userCars = parseInt(carsInContainer) || 1
                    const userShare = userCars / 4
                    return (
                      <div className="space-y-1.5 text-xs">
                        {[
                          ['Port charges', localCosts.portCharges],
                          ['Handling fees', localCosts.handlingFees],
                          ['Documentation', localCosts.documentation],
                          ['Agent fees', localCosts.agentFees],
                          ['Inspection', localCosts.inspection],
                          ['Storage (7 days)', localCosts.storage],
                          ['Miscellaneous', localCosts.miscFees],
                        ].map(([k, v]) => (
                          <div key={k as string} className="flex justify-between text-zinc-700">
                            <span>{k}</span>
                            <span className="font-mono">
                              {countryReqs.currency} {((v as number) * userShare).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                  <div className="border-t border-zinc-200 pt-2.5 mt-2.5 space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-700">
                      <span>Total container cost</span>
                      <span className="font-mono">{countryReqs.currency} {(result.localClearingShare * 4).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-700">
                      <span>Your cars / total</span>
                      <span className="font-mono">{parseInt(carsInContainer) || 1} / 4</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Your share ({parseInt(carsInContainer) || 1}/4)</span>
                      <span className="font-mono text-amber-700">{countryReqs.currency} {result.localClearingShare.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Customs Duties */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold pb-2.5 mb-3 border-b border-zinc-200">
                    Customs duties &amp; taxes
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-700">
                      <span>Vehicle price</span>
                      <span className="font-mono">{countryReqs.currency} {(result.cif / 1.1).toFixed(2)}</span>
                    </div>
                    {country === 'NA' && (
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span>CIF value (price + 10% shipping)</span>
                        <span className="font-mono">{countryReqs.currency} {result.cif.toFixed(2)}</span>
                      </div>
                    )}
                    {result.duty > 0 && (
                      <div className="flex justify-between text-zinc-900 font-medium">
                        <span>{country === 'ZM' ? 'Specific duty' : country === 'NA' ? 'ICD (25% × vehicle price)' : 'Customs duty'}</span>
                        <span className="font-mono">{countryReqs.currency} {result.duty.toFixed(2)}</span>
                      </div>
                    )}
                    {country === 'NA' && (
                      <>
                        <div className="flex justify-between text-zinc-900 font-medium">
                          <span>ENV levy</span>
                          <span className="font-mono">{countryReqs.currency} {result.env.toFixed(2)}</span>
                        </div>
                        {parseFloat(co2Emissions) > 0 && (
                          <p className="text-xs text-zinc-500 pl-4">
                            Formula · {co2Emissions}cc × 0.05 × {fuelType === 'petrol' ? '40' : '45'} = N${result.env.toFixed(2)}
                          </p>
                        )}
                      </>
                    )}
                    {result.adv > 0 && (
                      <>
                        <div className="flex justify-between text-zinc-900 font-medium">
                          <span>ADV (Ad Valorem)</span>
                          <span className="font-mono">{countryReqs.currency} {result.adv.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-zinc-500 pl-4">
                          Formula · ((0.00003 × {(parseFloat(cifValue || '0') * (country === 'NA' ? 1.65 : 1.5)).toFixed(0)}) − 0.75)% × value
                        </p>
                      </>
                    )}
                    {result.excise > 0 && (
                      <div className="flex justify-between text-zinc-900 font-medium">
                        <span>Excise duty</span>
                        <span className="font-mono">{countryReqs.currency} {result.excise.toFixed(2)}</span>
                      </div>
                    )}
                    {result.co2Levy > 0 && (
                      <div className="flex justify-between text-zinc-900 font-medium">
                        <span>CO₂ levy (new vehicle)</span>
                        <span className="font-mono">{countryReqs.currency} {result.co2Levy.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-900 font-medium">
                      <span>VAT ({countryReqs.vatRate}%)</span>
                      <span className="font-mono">{countryReqs.currency} {result.vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-zinc-200 pt-2.5 mt-2.5">
                      <span>Total duties &amp; taxes</span>
                      <span className="font-mono text-red-600">{countryReqs.currency} {result.totalTaxes.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-5 py-3.5 bg-stone-50 border border-zinc-200 rounded-xl">
                    <span className="font-medium text-zinc-900">Landed cost (no ocean freight)</span>
                    <span className="font-mono text-lg font-semibold text-zinc-900">
                      {countryReqs.currency} {result.landedCost.toFixed(2)}
                    </span>
                  </div>

                  {oceanFreightCost && parseFloat(oceanFreightCost) > 0 && (
                    <div className="flex justify-between items-center px-5 text-sm text-zinc-700">
                      <span>+ Ocean freight</span>
                      <span className="font-mono">
                        {countryReqs.currency}{' '}
                        {useContainerSharing
                          ? parseFloat(oceanFreightCost).toFixed(2)
                          : ((parseFloat(oceanFreightCost) / 4) * (parseInt(carsInContainer) || 1)).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {result.inlandDelivery > 0 && (
                    <div className="flex justify-between items-center px-5 text-sm text-zinc-700">
                      <span>+ Inland delivery</span>
                      <span className="font-mono">{countryReqs.currency} {result.inlandDelivery.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center px-5 py-4 bg-zinc-950 text-white rounded-xl">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold">
                      Final total
                    </span>
                    <span className="font-medium tracking-tight bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent text-2xl">
                      {countryReqs.currency}{' '}
                      {(
                        result.landedCost +
                        result.inlandDelivery +
                        (oceanFreightCost && parseFloat(oceanFreightCost) > 0
                          ? useContainerSharing
                            ? parseFloat(oceanFreightCost)
                            : (parseFloat(oceanFreightCost) / 4) * (parseInt(carsInContainer) || 1)
                          : 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div className="border border-zinc-200 rounded-xl bg-stone-50/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-2">
                    Calculation notes · {countryNames[country]}
                  </p>
                  <ul className="space-y-1 text-xs text-zinc-700">
                    {country === 'NA' && (
                      <>
                        <li>· ICD = 25% × vehicle price (auction price, shipping excluded)</li>
                        <li>· ENV = engine size (cc) × 0.05 × {fuelType === 'petrol' ? '40' : '45'}</li>
                        <li>· ADV = ((0.00003 × RRP) − 0.75)% × RRP (capped at 30%)</li>
                        <li>· Import VAT = 15% × [(vehicle price + 10%) + duty + ADV + ENV]</li>
                      </>
                    )}
                    {country === 'ZA' && (
                      <>
                        <li>· Duty = 25% × CIF (HS 8703)</li>
                        <li>· ADV = ((0.00003 × RRP) − 0.75)% × RRP (capped at 30%)</li>
                        {isNewVehicle && <li>· CO₂ levy applies to new vehicles only</li>}
                        <li>· Import VAT = 15% × [(CIF + 10%) + duty + ADV {isNewVehicle ? '+ CO₂ levy' : ''}]</li>
                      </>
                    )}
                    {country === 'BW' && (
                      <>
                        <li>· Duty = 25% × CIF (HS 8703 default)</li>
                        <li>· ADV = ((0.00003 × RRP) − 0.75)% × RRP (capped at 30%)</li>
                        <li>· Import VAT = 12% × [CIF + duty + ADV] (no uplift)</li>
                      </>
                    )}
                    {country === 'ZM' && (
                      <>
                        <li>· Specific duty from ZRA table by type/cc/age</li>
                        <li>· Excise = {exciseRate}% × (CIF + duty)</li>
                        <li>· Import VAT = 16% × [CIF + duty + excise]</li>
                        {isEV && <li>· EVs receive zero duty and reduced excise</li>}
                        {isHybrid && <li>· Hybrids receive reduced excise duty</li>}
                      </>
                    )}
                  </ul>
                </div>

                {/* Breakdown notes */}
                {result.breakdownNotes && result.breakdownNotes.length > 0 && (
                  <div className="border-t border-b border-zinc-200 py-4 flex items-start gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-0.5 whitespace-nowrap">
                      [ Important ]
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-700 flex-1">
                      {result.breakdownNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500 flex-shrink-0" aria-hidden />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-zinc-200 rounded-2xl bg-stone-50/60 p-8 sm:p-10 text-center self-start">
              <Calculator className="h-10 w-10 text-zinc-300 mx-auto mb-4" strokeWidth={1.5} />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-2">
                Ready to calculate
              </p>
              <h3 className="text-lg font-medium tracking-tight text-zinc-900 mb-2">
                Enter vehicle details.
              </h3>
              <p className="text-sm text-zinc-600 mb-6">
                See the full import cost breakdown.
              </p>

              <div className="text-left border-t border-zinc-200 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
                  What's included
                </p>
                <ul className="space-y-2 text-sm text-zinc-700">
                  {[
                    'Japan-side costs (auction fees, handling)',
                    'Ocean freight (if entered)',
                    'Local clearing agent costs',
                    'All customs duties (ICD, ENV, ADV, VAT)',
                    'Optional inland delivery costs',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* VEHICLE PRICING DATABASE */}
        <div className="mb-12">
          <VehiclePricingDatabase />
        </div>

        {/* INFO CARDS */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
              How it works
            </p>
            <ul className="space-y-2 text-sm text-zinc-700">
              {[
                'Multi-country support (NA, ZA, BW, ZM)',
                'Japan auction & shipping costs',
                'Container cost sharing',
                'Country-specific duty formulas',
                'ADV & environmental levies',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
              Important notes
            </p>
            <ul className="space-y-1.5 text-sm text-zinc-700">
              <li>· Local clearing costs shared per container</li>
              <li>· Customs duties are per vehicle</li>
              <li>· Exchange rates fluctuate daily</li>
              {country === 'NA' && <li>· CO₂ thresholds · Petrol 120, Diesel 140</li>}
              {country === 'ZA' && <li>· Used imports need ITAC permit</li>}
              {country === 'BW' && <li>· VAT calculated without uplift</li>}
              {country === 'ZM' && <li>· Uses specific duty table by cc/age</li>}
              <li>· ADV capped at 30% of value</li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-semibold pb-2.5 mb-4 border-b border-zinc-200">
              Disclaimers
            </p>
            <ul className="space-y-1.5 text-sm text-zinc-700">
              <li>· Estimates only — not final values</li>
              <li>· Customs may adjust declared values</li>
              <li>· Additional fees may apply</li>
              <li>· Consult clearing agent for accuracy</li>
              <li>· Port charges subject to change</li>
            </ul>
          </div>
        </div>
      </div>

      <PortalPageNavigation currentPath="/portal/calculator" />
    </main>
  )
}
