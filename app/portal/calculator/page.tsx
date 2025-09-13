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
  Star
} from 'lucide-react'

// This would normally be fetched from a database or API
const dutyRates: Record<string, { duty: number; description: string }> = {
  'passenger_under_1500cc': {
    duty: 25,
    description: 'Passenger vehicles with engines under 1500cc'
  },
  'passenger_1500_to_3000cc': {
    duty: 30,
    description: 'Passenger vehicles 1500cc - 3000cc'
  },
  'passenger_over_3000cc': {
    duty: 35,
    description: 'Passenger vehicles over 3000cc'
  },
  'suv_under_3000cc': {
    duty: 35,
    description: 'SUVs and light trucks under 3000cc'
  },
  'suv_over_3000cc': {
    duty: 40,
    description: 'SUVs and light trucks over 3000cc'
  },
  'luxury_sports': {
    duty: 45,
    description: 'Luxury and sports vehicles'
  }
}

const vatRate = 15 // VAT percentage
const additionalFees = {
  nrcs: 12000,
  clearing: 10000,
  transport: 6000,
  admin: 3500
}

interface CalculationResult {
  vehicleValue: number
  dutyAmount: number
  vatAmount: number
  totalFees: number
  totalCost: number
  dutyRate: number
  category: string
  savingsOpportunities: string[]
}

export default function DutyCalculator() {
  const { hasAccess, loading, userTier, debugInfo } = useAuthDebug()
  const [vehicleValue, setVehicleValue] = useState<string>('')
  const [engineSize, setEngineSize] = useState<string>('')
  const [vehicleType, setVehicleType] = useState<string>('')
  const [vehicleAge, setVehicleAge] = useState<string>('')
  const [isLuxury, setIsLuxury] = useState<boolean>(false)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  if (!hasAccess || userTier !== 'mastery') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Lock className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Import Mastery Feature</h2>
            <p className="text-gray-600 mb-6">
              The Import Cost Calculator is available exclusively for Import Mastery members.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                What you get with Import Mastery:
              </h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Live duty & tax calculator for all vehicle types</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Japan auction access guide & bidding strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Verified shipping lines & booking assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Trusted import agents directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Priority support & consultation</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => {
                  // Store the user's email before redirecting
                  const email = userEmail || localStorage.getItem('userEmail')
                  if (email) {
                    localStorage.setItem('checkout_email', email)
                  }
                  window.location.href = '/na/upsell'
                }}
              >
                <Star className="h-4 w-4 mr-2" />
                Upgrade to Import Mastery
              </Button>
              <div>
                <Link href="/portal" className="text-sm text-gray-600 hover:underline">
                  Back to Portal
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // Validate vehicle value
    const value = parseFloat(vehicleValue)
    if (!vehicleValue) {
      newErrors.vehicleValue = 'Vehicle value is required'
    } else if (isNaN(value) || value <= 0) {
      newErrors.vehicleValue = 'Please enter a valid positive amount'
    } else if (value > 50000000) {
      newErrors.vehicleValue = 'Value exceeds maximum limit (R50,000,000)'
    }
    
    // Validate engine size
    const engine = parseFloat(engineSize)
    if (!engineSize) {
      newErrors.engineSize = 'Engine size is required'
    } else if (isNaN(engine) || engine <= 0) {
      newErrors.engineSize = 'Please enter a valid engine size'
    } else if (engine > 10000) {
      newErrors.engineSize = 'Engine size exceeds maximum limit (10,000cc)'
    }
    
    // Validate vehicle type
    if (!vehicleType) {
      newErrors.vehicleType = 'Please select a vehicle type'
    }
    
    // Validate vehicle age
    const age = parseInt(vehicleAge)
    if (!vehicleAge) {
      newErrors.vehicleAge = 'Vehicle age is required'
    } else if (isNaN(age) || age < 0) {
      newErrors.vehicleAge = 'Please enter a valid age'
    } else if (age > 50) {
      newErrors.vehicleAge = 'Vehicle age exceeds maximum limit (50 years)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateDuty = () => {
    if (!validateInputs()) {
      return
    }

    const value = parseFloat(vehicleValue)
    const engine = parseFloat(engineSize)
    const age = parseInt(vehicleAge)

    // Determine duty category
    let category = ''
    let dutyRate = 0
    
    if (isLuxury || value > 800000) {
      category = 'luxury_sports'
      dutyRate = dutyRates[category].duty
    } else if (vehicleType === 'suv') {
      if (engine <= 3000) {
        category = 'suv_under_3000cc'
      } else {
        category = 'suv_over_3000cc'
      }
      dutyRate = dutyRates[category].duty
    } else {
      if (engine <= 1500) {
        category = 'passenger_under_1500cc'
      } else if (engine <= 3000) {
        category = 'passenger_1500_to_3000cc'
      } else {
        category = 'passenger_over_3000cc'
      }
      dutyRate = dutyRates[category].duty
    }

    // Age penalty
    if (age > 5) {
      dutyRate += 5
    }
    if (age > 8) {
      dutyRate += 5
    }

    const dutyAmount = (value * dutyRate) / 100
    const subtotal = value + dutyAmount + Object.values(additionalFees).reduce((sum, fee) => sum + fee, 0)
    const vatAmount = (subtotal * vatRate) / 100
    const totalFees = Object.values(additionalFees).reduce((sum, fee) => sum + fee, 0)
    const totalCost = subtotal + vatAmount

    // Calculate savings opportunities
    const savingsOpportunities = []
    if (engine > 1500 && vehicleType === 'passenger') {
      savingsOpportunities.push(`Smaller engine could save R${((value * 5) / 100).toLocaleString()}`)
    }
    if (age > 5) {
      savingsOpportunities.push(`Newer vehicle could save R${((value * (age > 8 ? 10 : 5)) / 100).toLocaleString()}`)
    }
    if (isLuxury && value < 600000) {
      savingsOpportunities.push('Consider non-luxury variant for lower duty rate')
    }

    setResult({
      vehicleValue: value,
      dutyAmount,
      vatAmount,
      totalFees,
      totalCost,
      dutyRate,
      category,
      savingsOpportunities
    })
  }

  const resetCalculator = () => {
    setVehicleValue('')
    setEngineSize('')
    setVehicleType('')
    setVehicleAge('')
    setIsLuxury(false)
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
              Duty Calculator
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium text-purple-600">MASTERY ONLY</span>
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Calculate import duties and fees for South African customs.
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
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Vehicle Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="vehicleValue" className="text-sm sm:text-base">Vehicle Value (R)</Label>
              <Input
                id="vehicleValue"
                type="number"
                placeholder="e.g. 450000"
                value={vehicleValue}
                onChange={(e) => {
                  setVehicleValue(e.target.value)
                  if (errors.vehicleValue) {
                    setErrors(prev => ({ ...prev, vehicleValue: '' }))
                  }
                }}
                className={`mt-1 sm:mt-2 text-sm sm:text-base ${errors.vehicleValue ? 'border-red-500' : ''}`}
              />
              {errors.vehicleValue ? (
                <p className="text-xs text-red-500 mt-1">{errors.vehicleValue}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Market value in South African Rand
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="engineSize">Engine Size (cc)</Label>
              <Input
                id="engineSize"
                type="number"
                placeholder="e.g. 2000"
                value={engineSize}
                onChange={(e) => {
                  setEngineSize(e.target.value)
                  if (errors.engineSize) {
                    setErrors(prev => ({ ...prev, engineSize: '' }))
                  }
                }}
                className={`mt-2 ${errors.engineSize ? 'border-red-500' : ''}`}
              />
              {errors.engineSize ? (
                <p className="text-xs text-red-500 mt-1">{errors.engineSize}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Engine displacement in cubic centimeters
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <select
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value)
                  if (errors.vehicleType) {
                    setErrors(prev => ({ ...prev, vehicleType: '' }))
                  }
                }}
                className={`mt-2 w-full p-2 border rounded-md ${errors.vehicleType ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select vehicle type</option>
                <option value="passenger">Passenger Car</option>
                <option value="suv">SUV/Light Truck</option>
                <option value="sports">Sports Car</option>
              </select>
              {errors.vehicleType && (
                <p className="text-xs text-red-500 mt-1">{errors.vehicleType}</p>
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
                  Age affects duty rates significantly
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isLuxury"
                checked={isLuxury}
                onChange={(e) => setIsLuxury(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="isLuxury">Luxury/High-Performance Vehicle</Label>
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
                Cost Breakdown
              </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span>Vehicle Value</span>
                <span className="font-semibold">R{result.vehicleValue.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span>Import Duty ({result.dutyRate}%)</span>
                <span className="font-semibold text-red-600">R{result.dutyAmount.toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">NRCS Testing</span>
                  <span>R{additionalFees.nrcs.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Clearing Agent</span>
                  <span>R{additionalFees.clearing.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Transport & Storage</span>
                  <span>R{additionalFees.transport.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Admin Fees</span>
                  <span>R{additionalFees.admin.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span>VAT (15%)</span>
                <span className="font-semibold text-blue-600">R{result.vatAmount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 sm:py-3 bg-gray-50 px-3 sm:px-4 rounded text-base sm:text-lg font-bold">
                <span>Total Import Cost</span>
                <span>R{result.totalCost.toLocaleString()}</span>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Category Classification</h3>
                <p className="text-sm text-blue-800">
                  {dutyRates[result.category as keyof typeof dutyRates]?.description}
                </p>
              </div>

              {result.savingsOpportunities.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Money-Saving Opportunities
                  </h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    {result.savingsOpportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {opportunity}
                      </li>
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
                <p className="text-sm sm:text-base">Enter vehicle details to see cost breakdown.</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Additional Information - Mobile Optimized */}
      <div className="mt-8 sm:mt-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              How It Works
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Current customs tariffs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                All mandatory fees included
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Age-based penalties
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Optimization tips
              </li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-red-50 border-red-200">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2 text-red-900">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              Disclaimers
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-red-800">
              <li>• Customs may adjust values</li>
              <li>• Additional costs possible</li>
              <li>• Exchange rates vary</li>
              <li>• Estimates only</li>
              <li>• Consult clearing agent</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}