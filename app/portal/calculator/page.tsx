'use client'

import { useState, useEffect } from 'react'
import { useAuthDebug } from '@/lib/hooks/use-auth-debug'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  Calculator,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Info,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Award,
  Lock,
  Star,
  Car,
  Ship,
  Globe,
  Zap,
  HelpCircle
} from 'lucide-react'
import {
  Country,
  VehicleType,
  calculateImportDuties,
  getCountryRequirements,
  type FullOutput
} from '@/lib/calc/countries'

// Japan-side costs (in JPY)
const japanCosts = {
  biddingCharge: 11000,
  recyclingFee: 440,
  deliveryFee: 57200,
  thc: 18000,
  operationFee: 33000,
  loadingCharges: 40000,
  specialHandlingFee: 0 // Optional, user can input
}

// Default clearing costs by country (in local currency)
const defaultClearingCosts: Record<Country, number> = {
  'NA': 26255.65,  // Namibia clearing costs
  'ZA': 35000.00,  // South Africa clearing costs (estimate)
  'BW': 18000.00,  // Botswana clearing costs (estimate)
  'ZM': 45000.00   // Zambia clearing costs (estimate)
}

// Country display names
const countryNames: Record<Country, string> = {
  'NA': 'Namibia',
  'ZA': 'South Africa',
  'BW': 'Botswana',
  'ZM': 'Zambia'
}

// Exchange rates to NAD (for display purposes)
const exchangeRates: Record<Country, number> = {
  'NA': 1.00,      // NAD to NAD
  'ZA': 1.00,      // ZAR to NAD (roughly 1:1)
  'BW': 1.35,      // BWP to NAD
  'ZM': 0.68       // ZMW to NAD
}


export default function DutyCalculator() {
  const { user, loading, userTier, debugInfo, userEmail } = useAuthDebug()

  // Country selection
  const [country, setCountry] = useState<Country>('NA')

  // Vehicle details
  const [cifValue, setCifValue] = useState<string>('')
  const [jpyToLocalRate, setJpyToLocalRate] = useState<string>('0.13')
  const [co2Emissions, setCo2Emissions] = useState<string>('')
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel'>('petrol')
  const [rrpValue, setRrpValue] = useState<string>('')
  const [carsInContainer, setCarsInContainer] = useState<string>('1')
  const [isNewVehicle, setIsNewVehicle] = useState<boolean>(false)

  // Zambia-specific fields
  const [vehicleType, setVehicleType] = useState<VehicleType>('passenger')
  const [engineCC, setEngineCC] = useState<string>('')
  const [vehicleAge, setVehicleAge] = useState<string>('')
  const [exciseRate, setExciseRate] = useState<string>('30')
  const [isEV, setIsEV] = useState<boolean>(false)
  const [isHybrid, setIsHybrid] = useState<boolean>(false)

  // Optional costs
  const [specialHandlingFee, setSpecialHandlingFee] = useState<string>('0')
  const [localClearingTotal, setLocalClearingTotal] = useState<string>('')
  const [inlandDelivery, setInlandDelivery] = useState<string>('0')

  const [result, setResult] = useState<FullOutput | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Get country-specific requirements
  const countryReqs = getCountryRequirements(country)

  // Update clearing costs when country changes
  useEffect(() => {
    setLocalClearingTotal(defaultClearingCosts[country].toFixed(2))
    // Update exchange rate based on country
    const baseJpyRate = 0.13 // JPY to NAD
    const countryRate = baseJpyRate / exchangeRates[country]
    setJpyToLocalRate(countryRate.toFixed(4))
  }, [country])

  // Check if user has mastery tier
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading calculator...</p>
          <div className="mt-4 text-xs text-gray-500">
            <p>Debug Info:</p>
            <p>User Checked: {debugInfo.userChecked ? 'Yes' : 'No'}</p>
            <p>Entitlements Checked: {debugInfo.entitlementsChecked ? 'Yes' : 'No'}</p>
            {debugInfo.error && <p className="text-red-500">Error: {debugInfo.error}</p>}
          </div>
        </div>
      </div>
    )
  }

  // Remove tier check - all portal users have access
  // Only check if user is authenticated, not tier
  if (!user && !loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
            <p className="text-gray-600">
              You need to be signed in to use the Namibian Car Import Calculator.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate CIF value
    const cif = parseFloat(cifValue)
    if (!cifValue) {
      newErrors.cifValue = `CIF value in ${countryReqs.currency} is required`
    } else if (isNaN(cif) || cif <= 0) {
      newErrors.cifValue = 'Please enter a valid positive amount'
    }

    // Validate exchange rate
    const rate = parseFloat(jpyToLocalRate)
    if (!jpyToLocalRate) {
      newErrors.jpyToLocalRate = 'Exchange rate is required'
    } else if (isNaN(rate) || rate <= 0) {
      newErrors.jpyToLocalRate = 'Please enter a valid exchange rate'
    }

    // Validate CO2 emissions (if required)
    if (countryReqs.requiresCO2 || (country === 'ZA' && isNewVehicle)) {
      const co2 = parseFloat(co2Emissions)
      if (!co2Emissions) {
        newErrors.co2Emissions = 'CO₂ emissions are required for this country'
      } else if (isNaN(co2) || co2 < 0) {
        newErrors.co2Emissions = 'Please enter valid CO₂ emissions'
      }
    }

    // Validate RRP value (if required)
    if (countryReqs.requiresRRP) {
      const rrp = parseFloat(rrpValue)
      if (!rrpValue) {
        newErrors.rrpValue = 'Value for Ad Valorem calculation is required'
      } else if (isNaN(rrp) || rrp <= 0) {
        newErrors.rrpValue = 'Please enter a valid value'
      }
    }

    // Zambia-specific validations
    if (country === 'ZM') {
      const cc = parseFloat(engineCC)
      if (!engineCC) {
        newErrors.engineCC = 'Engine capacity is required for Zambia'
      } else if (isNaN(cc) || cc <= 0) {
        newErrors.engineCC = 'Please enter valid engine capacity'
      }

      const age = parseFloat(vehicleAge)
      if (!vehicleAge) {
        newErrors.vehicleAge = 'Vehicle age is required for Zambia'
      } else if (isNaN(age) || age < 0) {
        newErrors.vehicleAge = 'Please enter valid vehicle age'
      }

      const excise = parseFloat(exciseRate)
      if (!exciseRate) {
        newErrors.exciseRate = 'Excise rate is required'
      } else if (isNaN(excise) || excise < 0 || excise > 100) {
        newErrors.exciseRate = 'Please enter a valid percentage (0-100)'
      }
    }

    // Validate cars in container
    const cars = parseInt(carsInContainer)
    if (!carsInContainer) {
      newErrors.carsInContainer = 'Number of cars is required'
    } else if (isNaN(cars) || cars < 1) {
      newErrors.carsInContainer = 'Please enter at least 1 car'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateDuty = () => {
    if (!validateInputs()) {
      return
    }

    const cif = parseFloat(cifValue)
    const rate = parseFloat(jpyToLocalRate)
    const co2 = parseFloat(co2Emissions) || 0
    const rrp = parseFloat(rrpValue) || cif * 1.5
    const cars = parseInt(carsInContainer)
    const specialHandling = parseFloat(specialHandlingFee) || 0
    const localClearing = parseFloat(localClearingTotal) || defaultClearingCosts[country]
    const inland = parseFloat(inlandDelivery) || 0

    // Calculate Japan-side costs
    const japanSideTotalJPY = Object.values(japanCosts).reduce((sum, cost) => sum + cost, 0) + specialHandling
    const japanSideCosts = japanSideTotalJPY * rate

    // Prepare input parameters
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
      zm: country === 'ZM' ? {
        type: vehicleType,
        cc: parseFloat(engineCC) || 1500,
        ageYears: parseFloat(vehicleAge) || 3,
        exciseRate: parseFloat(exciseRate) || 30,
        isEV,
        isHybrid
      } : undefined
    }

    // Calculate using the appropriate country function
    const calculationResult = calculateImportDuties(params)
    setResult(calculationResult)
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
    setInlandDelivery('0')
    setResult(null)
    setErrors({})
  }

  return (
    <div className="w-full pb-20">
      {/* Header - Mobile Optimized */}
      <div className="mb-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Multi-Country Car Import Calculator
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium text-purple-600">MASTERY ONLY</span>
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Calculate import duties and fees for vehicles imported from Japan to Southern Africa.
        </p>
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
            <span className="text-xs sm:text-sm font-semibold text-amber-900">PROFESSIONAL TOOL</span>
          </div>
          <p className="text-amber-800 text-xs sm:text-sm mt-1">
            Estimates only. Consult a clearing agent for final calculations.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Calculator Form - Mobile Optimized */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Vehicle & Import Details</h2>
            <div className="space-y-6">
              {/* Country Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Destination Country
                </h3>

                <div>
                  <Label htmlFor="country">Import Destination</Label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value as Country)}
                    className="mt-2 w-full p-2 border rounded-md border-gray-300"
                  >
                    {Object.entries(countryNames).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name} ({code})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select the country where the vehicle will be imported
                  </p>
                </div>

                {/* South Africa Used Vehicle Warning */}
                {country === 'ZA' && !isNewVehicle && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-yellow-900">ITAC Permit Required</p>
                        <p className="text-xs text-yellow-800 mt-1">
                          Used vehicle imports to South Africa generally require an ITAC import permit
                          under limited categories (returning resident, inherited, vintage, etc.).
                          These calculations are estimates only.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Basic Vehicle Info */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Vehicle Information
                </h3>

                <div>
                  <Label htmlFor="cifValue" className="text-sm sm:text-base">
                    CIF Value ({countryReqs.currency})
                  </Label>
                  <Input
                    id="cifValue"
                    type="number"
                    placeholder="e.g. 150000"
                    value={cifValue}
                    onChange={(e) => {
                      setCifValue(e.target.value)
                      if (errors.cifValue) {
                        setErrors(prev => ({ ...prev, cifValue: '' }))
                      }
                    }}
                    className={`mt-1 sm:mt-2 text-sm sm:text-base ${errors.cifValue ? 'border-red-500' : ''}`}
                  />
                  {errors.cifValue ? (
                    <p className="text-xs text-red-500 mt-1">{errors.cifValue}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Cost, Insurance & Freight value in {countryReqs.currency}
                      {country === 'NA' && ' (Shipping excluded from duty calculation)'}
                    </p>
                  )}
                </div>

                {countryReqs.requiresRRP && (
                  <div>
                    <Label htmlFor="rrpValue">
                      Value for Ad Valorem ({countryReqs.currency})
                      <HelpCircle className="inline h-3 w-3 ml-1 text-gray-400" />
                    </Label>
                  <Input
                    id="rrpValue"
                    type="number"
                    placeholder="e.g. 250000"
                    value={rrpValue}
                    onChange={(e) => {
                      setRrpValue(e.target.value)
                      if (errors.rrpValue) {
                        setErrors(prev => ({ ...prev, rrpValue: '' }))
                      }
                    }}
                    className={`mt-2 ${errors.rrpValue ? 'border-red-500' : ''}`}
                  />
                  {errors.rrpValue ? (
                    <p className="text-xs text-red-500 mt-1">{errors.rrpValue}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Retail/market value for luxury tax calculation (estimate if unknown)
                    </p>
                  )}
                  </div>
                )}

                {(countryReqs.requiresCO2 || (country === 'ZA' && isNewVehicle)) && (
                  <div>
                    <Label htmlFor="co2Emissions">CO₂ Emissions (g/km)</Label>
                  <Input
                    id="co2Emissions"
                    type="number"
                    placeholder="e.g. 150"
                    value={co2Emissions}
                    onChange={(e) => {
                      setCo2Emissions(e.target.value)
                      if (errors.co2Emissions) {
                        setErrors(prev => ({ ...prev, co2Emissions: '' }))
                      }
                    }}
                    className={`mt-2 ${errors.co2Emissions ? 'border-red-500' : ''}`}
                  />
                  {errors.co2Emissions ? (
                    <p className="text-xs text-red-500 mt-1">{errors.co2Emissions}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      {country === 'NA' ? 'For environmental levy calculation' :
                       country === 'ZA' ? 'For CO₂ levy on new vehicles' :
                       'For environmental calculations'}
                    </p>
                  )}
                  </div>
                )}

                <div>
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <select
                    id="fuelType"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as 'petrol' | 'diesel')}
                    className="mt-2 w-full p-2 border rounded-md border-gray-300"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {country === 'NA'
                      ? (fuelType === 'petrol' ? 'ENV applies if CO₂ > 120' : 'ENV applies if CO₂ > 140')
                      : 'Select fuel type for vehicle'
                    }
                  </p>
                </div>

                {/* South Africa New Vehicle Toggle */}
                {country === 'ZA' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isNewVehicle"
                      checked={isNewVehicle}
                      onChange={(e) => setIsNewVehicle(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="isNewVehicle">New Vehicle (enables CO₂ levy)</Label>
                  </div>
                )}

                {/* Zambia-specific fields */}
                {country === 'ZM' && (
                  <>
                    <div>
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <select
                        id="vehicleType"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                        className="mt-2 w-full p-2 border rounded-md border-gray-300"
                      >
                        <option value="passenger">Passenger Car</option>
                        <option value="suv">SUV</option>
                        <option value="pickup">Pickup Truck</option>
                        <option value="van">Van</option>
                        <option value="truck">Truck</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="engineCC">Engine Capacity (cc)</Label>
                      <Input
                        id="engineCC"
                        type="number"
                        placeholder="e.g. 1800"
                        value={engineCC}
                        onChange={(e) => {
                          setEngineCC(e.target.value)
                          if (errors.engineCC) {
                            setErrors(prev => ({ ...prev, engineCC: '' }))
                          }
                        }}
                        className={`mt-2 ${errors.engineCC ? 'border-red-500' : ''}`}
                      />
                      {errors.engineCC ? (
                        <p className="text-xs text-red-500 mt-1">{errors.engineCC}</p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-1">
                          Engine size for specific duty lookup
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="vehicleAge">Vehicle Age (years)</Label>
                      <Input
                        id="vehicleAge"
                        type="number"
                        placeholder="e.g. 3"
                        value={vehicleAge}
                        onChange={(e) => {
                          setVehicleAge(e.target.value)
                          if (errors.vehicleAge) {
                            setErrors(prev => ({ ...prev, vehicleAge: '' }))
                          }
                        }}
                        className={`mt-2 ${errors.vehicleAge ? 'border-red-500' : ''}`}
                      />
                      {errors.vehicleAge ? (
                        <p className="text-xs text-red-500 mt-1">{errors.vehicleAge}</p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-1">
                          Age affects specific duty amount
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="exciseRate">Excise Rate (%)</Label>
                      <Input
                        id="exciseRate"
                        type="number"
                        placeholder="e.g. 30"
                        value={exciseRate}
                        onChange={(e) => {
                          setExciseRate(e.target.value)
                          if (errors.exciseRate) {
                            setErrors(prev => ({ ...prev, exciseRate: '' }))
                          }
                        }}
                        className={`mt-2 ${errors.exciseRate ? 'border-red-500' : ''}`}
                      />
                      {errors.exciseRate ? (
                        <p className="text-xs text-red-500 mt-1">{errors.exciseRate}</p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-1">
                          Excise duty percentage (varies by vehicle category)
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isEV"
                          checked={isEV}
                          onChange={(e) => {
                            setIsEV(e.target.checked)
                            if (e.target.checked) setIsHybrid(false)
                          }}
                          className="rounded"
                        />
                        <Label htmlFor="isEV">
                          <Zap className="inline h-3 w-3 mr-1" />
                          Electric Vehicle (zero duty)
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isHybrid"
                          checked={isHybrid}
                          onChange={(e) => {
                            setIsHybrid(e.target.checked)
                            if (e.target.checked) setIsEV(false)
                          }}
                          className="rounded"
                        />
                        <Label htmlFor="isHybrid">Hybrid Vehicle (reduced excise)</Label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Shipping & Exchange */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <Ship className="h-4 w-4" />
                  Shipping & Exchange
                </h3>

                <div>
                  <Label htmlFor="jpyToLocalRate">Exchange Rate (JPY to {countryReqs.currency})</Label>
                  <Input
                    id="jpyToLocalRate"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1.30"
                    value={jpyToLocalRate}
                    onChange={(e) => {
                      setJpyToLocalRate(e.target.value)
                      if (errors.jpyToLocalRate) {
                        setErrors(prev => ({ ...prev, jpyToLocalRate: '' }))
                      }
                    }}
                    className={`mt-2 ${errors.jpyToLocalRate ? 'border-red-500' : ''}`}
                  />
                  {errors.jpyToLocalRate ? (
                    <p className="text-xs text-red-500 mt-1">{errors.jpyToLocalRate}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Current JPY to {countryReqs.currency} conversion rate
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="carsInContainer">Cars in Container</Label>
                  <Input
                    id="carsInContainer"
                    type="number"
                    placeholder="e.g. 3"
                    value={carsInContainer}
                    onChange={(e) => {
                      setCarsInContainer(e.target.value)
                      if (errors.carsInContainer) {
                        setErrors(prev => ({ ...prev, carsInContainer: '' }))
                      }
                    }}
                    className={`mt-2 ${errors.carsInContainer ? 'border-red-500' : ''}`}
                  />
                  {errors.carsInContainer ? (
                    <p className="text-xs text-red-500 mt-1">{errors.carsInContainer}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      For sharing local clearing costs
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Costs */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-sm text-gray-700">Optional Costs</h3>

                <div>
                  <Label htmlFor="specialHandlingFee">Special Handling Fee (JPY)</Label>
                  <Input
                    id="specialHandlingFee"
                    type="number"
                    placeholder="Optional"
                    value={specialHandlingFee}
                    onChange={(e) => setSpecialHandlingFee(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Additional Japan-side handling if needed
                  </p>
                </div>

                <div>
                  <Label htmlFor="localClearingTotal">Local Clearing Total ({countryReqs.currency})</Label>
                  <Input
                    id="localClearingTotal"
                    type="number"
                    step="0.01"
                    value={localClearingTotal}
                    onChange={(e) => setLocalClearingTotal(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Default: {countryReqs.currency} {defaultClearingCosts[country].toFixed(2)} (editable)
                  </p>
                </div>

                <div>
                  <Label htmlFor="inlandDelivery">Inland Delivery ({countryReqs.currency})</Label>
                  <Input
                    id="inlandDelivery"
                    type="number"
                    placeholder="Optional trucking cost"
                    value={inlandDelivery}
                    onChange={(e) => setInlandDelivery(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Trucking from port to final destination
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Button onClick={calculateDuty} className="flex-1 text-sm sm:text-base">
                  <Calculator className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Calculate
                </Button>
                <Button variant="outline" onClick={resetCalculator} className="text-sm sm:text-base">
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Results - Mobile Optimized */}
          {result ? (
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                Import Cost Breakdown - {countryNames[country]}
              </h2>
              <div className="space-y-6">
                {/* Japan-side Costs */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Ship className="h-4 w-4" />
                    Japan-Side Costs
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Japan Costs</span>
                      <span>¥{(result.japanSideCosts / parseFloat(jpyToLocalRate)).toLocaleString('en', {maximumFractionDigits: 0})}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Converted to {countryReqs.currency}</span>
                      <span>{countryReqs.currency} {result.japanSideCosts.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Local Clearing Costs */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-3">Local Clearing Costs</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Container Cost</span>
                      <span>{countryReqs.currency} {(result.localClearingShare * (parseInt(carsInContainer) || 1)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Cars in Container</span>
                      <span>{parseInt(carsInContainer) || 1}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Your Share</span>
                      <span>{countryReqs.currency} {result.localClearingShare.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-amber-700 mt-2">
                    * Costs shared equally among {parseInt(carsInContainer) || 1} car{(parseInt(carsInContainer) || 1) > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Customs Duties */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-3">Customs Duties & Taxes</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CIF Value</span>
                      <span className="text-sm">{countryReqs.currency} {result.cif.toFixed(2)}</span>
                    </div>
                    {result.duty > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {country === 'ZM' ? 'Specific Duty' : `Customs Duty (${country === 'NA' ? 'ICD' : 'Duty'})`}
                        </span>
                        <span className="font-medium">{countryReqs.currency} {result.duty.toFixed(2)}</span>
                      </div>
                    )}
                    {result.env > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          ENV ({fuelType === 'petrol' ? `CO₂-120` : `CO₂-140`} × {fuelType === 'petrol' ? '40' : '45'})
                        </span>
                        <span className="font-medium">{countryReqs.currency} {result.env.toFixed(2)}</span>
                      </div>
                    )}
                    {result.adv > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ADV (Ad Valorem)</span>
                        <span className="font-medium">{countryReqs.currency} {result.adv.toFixed(2)}</span>
                      </div>
                    )}
                    {result.excise > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Excise Duty</span>
                        <span className="font-medium">{countryReqs.currency} {result.excise.toFixed(2)}</span>
                      </div>
                    )}
                    {result.co2Levy > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">CO₂ Levy (New Vehicle)</span>
                        <span className="font-medium">{countryReqs.currency} {result.co2Levy.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">VAT ({countryReqs.vatRate}%)</span>
                      <span className="font-medium">{countryReqs.currency} {result.vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t font-semibold">
                      <span>Total Duties & Taxes</span>
                      <span className="text-red-700">{countryReqs.currency} {result.totalTaxes.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg font-bold">
                    <span>Landed Cost</span>
                    <span className="text-lg">{countryReqs.currency} {result.landedCost.toFixed(2)}</span>
                  </div>

                  {result.inlandDelivery > 0 && (
                    <>
                      <div className="flex justify-between items-center px-4">
                        <span>+ Inland Delivery</span>
                        <span>{countryReqs.currency} {result.inlandDelivery.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 px-4 bg-green-100 rounded-lg font-bold">
                        <span className="text-green-900">Final Total</span>
                        <span className="text-lg text-green-900">{countryReqs.currency} {(result.landedCost + result.inlandDelivery).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Calculation Details */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <h4 className="font-semibold text-gray-800 mb-2">Calculation Notes for {countryNames[country]}:</h4>
                  <ul className="space-y-1">
                    {country === 'NA' && (
                      <>
                        <li>• ICD = 25% × FOB (shipping excluded)</li>
                        <li>• ENV = {fuelType === 'petrol' ? '(CO₂ - 120) × 40' : '(CO₂ - 140) × 45'} {result.env === 0 ? '(below threshold)' : ''}</li>
                        <li>• ADV = ((0.00003 × RRP) - 0.75)% × RRP (capped at 30%)</li>
                        <li>• Import VAT = 15% × [(FOB + 10%) + Duty + ADV + ENV] = 16.5% effective rate</li>
                      </>
                    )}
                    {country === 'ZA' && (
                      <>
                        <li>• Duty = 25% × CIF (HS 8703)</li>
                        <li>• ADV = ((0.00003 × RRP) - 0.75)% × RRP (capped at 30%)</li>
                        {isNewVehicle && <li>• CO₂ Levy applies to new vehicles only</li>}
                        <li>• VAT = 15% × [(CIF × 1.10) + Duty + ADV {isNewVehicle ? '+ CO₂ Levy' : ''}]</li>
                      </>
                    )}
                    {country === 'BW' && (
                      <>
                        <li>• Duty = 25% × CIF (HS 8703 default)</li>
                        <li>• ADV = ((0.00003 × RRP) - 0.75)% × RRP (capped at 30%)</li>
                        <li>• VAT = 12% × [CIF + Duty + ADV] (no uplift)</li>
                      </>
                    )}
                    {country === 'ZM' && (
                      <>
                        <li>• Specific Duty from ZRA table by type/cc/age</li>
                        <li>• Excise = {exciseRate}% × (CIF + Duty)</li>
                        <li>• VAT = 16% × [CIF + Duty + Excise]</li>
                        {isEV && <li>• EVs receive zero duty and reduced excise</li>}
                        {isHybrid && <li>• Hybrids receive reduced excise duty</li>}
                      </>
                    )}
                  </ul>
                </div>

                {/* Breakdown Notes */}
                {result.breakdownNotes && result.breakdownNotes.length > 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2 text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      Important Information
                    </h4>
                    <ul className="text-xs text-yellow-800 space-y-1">
                      {result.breakdownNotes.map((note, idx) => (
                        <li key={idx}>• {note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-4 sm:p-6">
              <div className="text-center text-gray-500">
                <Calculator className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Ready to Calculate</h3>
                <p className="text-sm sm:text-base">Enter vehicle details to see full import cost breakdown.</p>
                <div className="mt-6 text-left bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm">What's Included:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      Japan-side costs (auction fees, shipping)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      Local clearing costs (port charges, handling)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      All customs duties (ICD, ENV, ADV, VAT)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      Optional inland delivery costs
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Additional Information - Mobile Optimized */}
      <div className="mt-8 sm:mt-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              How It Works
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Multi-country support (NA, ZA, BW, ZM)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Japan auction & shipping costs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Container cost sharing
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Country-specific duty formulas
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                ADV & environmental levies
              </li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-amber-50 border-amber-200">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2 text-amber-900">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
              Important Notes
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-amber-800">
              <li>• Local clearing costs shared per container</li>
              <li>• Customs duties are per vehicle</li>
              <li>• Exchange rates fluctuate daily</li>
              {country === 'NA' && <li>• CO₂ thresholds: Petrol 120, Diesel 140</li>}
              {country === 'ZA' && <li>• Used imports need ITAC permit</li>}
              {country === 'BW' && <li>• VAT calculated without uplift</li>}
              {country === 'ZM' && <li>• Uses specific duty table by cc/age</li>}
              <li>• ADV capped at 30% of value</li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-red-50 border-red-200">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2 text-red-900">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              Disclaimers
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-red-800">
              <li>• Estimates only - not final values</li>
              <li>• Customs may adjust declared values</li>
              <li>• Additional fees may apply</li>
              <li>• Consult clearing agent for accuracy</li>
              <li>• Port charges subject to change</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}