'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Award
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
  const [vehicleValue, setVehicleValue] = useState<string>('')
  const [engineSize, setEngineSize] = useState<string>('')
  const [vehicleType, setVehicleType] = useState<string>('')
  const [vehicleAge, setVehicleAge] = useState<string>('')
  const [isLuxury, setIsLuxury] = useState<boolean>(false)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Professional Duty Calculator
          </h1>
          <div className="flex items-center gap-1 ml-4">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">MASTERY ONLY</span>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Calculate estimated import duties and fees based on current South African customs regulations. 
          This calculator provides comprehensive fee breakdowns and optimization strategies.
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-600" />
            <span className="font-semibold text-amber-900">PROFESSIONAL TOOL</span>
          </div>
          <p className="text-amber-800 text-sm mt-1">
            This calculator provides estimates based on publicly available tariff information. Always consult with a qualified clearing agent for final calculations.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Vehicle Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="vehicleValue">Vehicle Value (R)</Label>
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
                className={`mt-2 ${errors.vehicleValue ? 'border-red-500' : ''}`}
              />
              {errors.vehicleValue ? (
                <p className="text-xs text-red-500 mt-1">{errors.vehicleValue}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Market value in South African Rand (customs may adjust this value)
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

            <div className="flex gap-4">
              <Button onClick={calculateDuty} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Duties
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Results */}
        {result ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detailed Cost Breakdown
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
              
              <div className="flex justify-between items-center py-3 bg-gray-50 px-4 rounded text-lg font-bold">
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
          <Card className="p-6">
            <div className="text-center text-gray-500">
              <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Ready to Calculate</h3>
              <p>Enter your vehicle details to see the complete cost breakdown and optimization opportunities.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Additional Information */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            How This Calculator Works
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              Based on current customs tariff classifications
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              Includes all mandatory fees and testing costs
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              Accounts for age-based duty penalties
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              Provides strategic optimization suggestions
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-red-50 border-red-200">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-900">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Important Disclaimers
          </h3>
          <ul className="space-y-2 text-sm text-red-800">
            <li>• Customs authorities may adjust declared vehicle values</li>
            <li>• Additional costs may apply for non-standard vehicles</li>
            <li>• Exchange rate fluctuations affect final costs</li>
            <li>• This calculator is for estimation purposes only</li>
            <li>• Always consult with a professional clearing agent</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}