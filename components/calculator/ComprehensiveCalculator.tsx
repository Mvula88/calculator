'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calculator, AlertTriangle, Download, Save, RefreshCw, TrendingUp } from 'lucide-react'
import type { VehicleDetails, HiddenCosts, CalculationResult } from '@/types/calculator.types'
import { useCountry, getCountryImportCosts, formatLocalPrice } from '@/lib/country-context'
import { Price } from '@/components/ui/Price'
import { PDFExportButton } from './PDFReport'

export default function ComprehensiveCalculator() {
  const { country } = useCountry()
  const countrySpecificCosts = getCountryImportCosts(country)
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    make: '',
    model: '',
    year: new Date().getFullYear() - 5,
    engineSize: 1500,
    fuelType: 'petrol',
    transmission: 'automatic',
    mileage: 50000,
    condition: 'good'
  })

  const [costs, setCosts] = useState<HiddenCosts>({
    japanCosts: {
      vehiclePrice: 0,
      auctionFee: 5800,
      transportToPort: 4500,
      exportCertificate: 600,
      radiationInspection: 750,
      preExportInspection: 1500,
      agentCommission: 3500,
      exportCustomsClearance: 1200
    },
    shippingCosts: {
      oceanFreight: countrySpecificCosts.shipping,
      bunkerAdjustmentFactor: 2500,
      billOfLadingFee: 1125,
      shippingInsurance: 1800,
      terminalHandlingJapan: 1500
    },
    namibiaCosts: {
      terminalHandlingNamibia: 3500,
      containerCleaning: 450,
      documentationFees: 800,
      storageFirstThreeDays: 0,
      storageAfterThreeDays: 0,
      wharfHandling: 1200,
      breakBulkCharges: 2500,
      customsClearance: 1500,
      importVAT: 0,
      customsDuty: 0,
      environmentalLevy: countrySpecificCosts.environmentalLevy,
      fuelLevy: 0,
      roadworthyTest: 850,
      registration: 1200,
      numberPlates: 150,
      transportToWindhoek: 3500,
      clearingAgentFee: countrySpecificCosts.clearingAgent
    }
  })

  const [exchangeRates, setExchangeRates] = useState({
    jpyToNad: 0.13,
    usdToNad: 18.5
  })

  const [storageDays, setStorageDays] = useState(0)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [savedCalculations, setSavedCalculations] = useState<CalculationResult[]>([])

  // Calculate derived costs
  useEffect(() => {
    // Calculate storage fees (first 3 days free, then N$200/day)
    const storageAfterThree = Math.max(0, storageDays - 3) * 200
    
    // Calculate vehicle age for duty purposes
    const vehicleAge = new Date().getFullYear() - vehicleDetails.year
    
    // Calculate CIF (Cost, Insurance, Freight)
    const cifValue = costs.japanCosts.vehiclePrice + 
                    costs.japanCosts.auctionFee +
                    costs.japanCosts.transportToPort +
                    costs.japanCosts.exportCertificate +
                    costs.japanCosts.radiationInspection +
                    costs.japanCosts.preExportInspection +
                    costs.japanCosts.agentCommission +
                    costs.japanCosts.exportCustomsClearance +
                    Object.values(costs.shippingCosts).reduce((a, b) => a + b, 0)
    
    // Calculate customs duty using country-specific rate
    let dutyRate = countrySpecificCosts.dutyRate
    // Additional rate adjustments based on vehicle age for some countries
    if (country.code === 'NA' || country.code === 'ZA') {
      if (vehicleAge <= 5) {
        dutyRate = vehicleDetails.engineSize <= 1500 ? 0.20 : 0.25
      } else if (vehicleAge <= 10) {
        dutyRate = vehicleDetails.engineSize <= 1500 ? 0.30 : 0.35
      } else {
        dutyRate = 0.40
      }
    }
    const customsDuty = cifValue * dutyRate
    
    // Calculate VAT using country-specific rate
    const importVAT = (cifValue + customsDuty) * countrySpecificCosts.vat
    
    // Calculate fuel levy (based on engine size)
    const fuelLevy = vehicleDetails.engineSize <= 1500 ? 750 : 
                     vehicleDetails.engineSize <= 2500 ? 1500 : 2500

    setCosts(prev => ({
      ...prev,
      namibiaCosts: {
        ...prev.namibiaCosts,
        storageAfterThreeDays: storageAfterThree,
        customsDuty: customsDuty,
        importVAT: importVAT,
        fuelLevy: fuelLevy
      }
    }))
  }, [vehicleDetails, storageDays, costs.japanCosts, costs.shippingCosts])

  const calculateTotal = (): number => {
    const japanTotal = Object.values(costs.japanCosts).reduce((a, b) => a + b, 0)
    const shippingTotal = Object.values(costs.shippingCosts).reduce((a, b) => a + b, 0)
    const namibiaTotal = Object.values(costs.namibiaCosts).reduce((a, b) => a + b, 0)
    return japanTotal + shippingTotal + namibiaTotal
  }

  const [isSaving, setIsSaving] = useState(false)
  
  const saveCalculation = async () => {
    setIsSaving(true)
    try {
      const totalCost = calculateTotal()
      
      const response = await fetch('/api/calculator/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicle_details: vehicleDetails,
          japan_costs: costs.japanCosts,
          shipping_costs: costs.shippingCosts,
          destination_costs: costs.namibiaCosts,
          total_cost: totalCost,
          country: country.name,
          currency: country.currency
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Also save locally for immediate display
        const result: CalculationResult = {
          vehicleDetails,
          costs,
          totalCost,
          estimatedTimelineDays: 45 + storageDays,
          exchangeRates,
          calculatedAt: new Date()
        }
        setSavedCalculations(prev => [...prev, result])
        
        // Show success message (you could add a toast here)
        console.log('Calculation saved to database!')
      } else {
        console.error('Failed to save calculation:', data.error)
      }
    } catch (error) {
      console.error('Error saving calculation:', error)
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calculator className="w-8 h-8" />
              Comprehensive Import Calculator Pro
            </h1>
            <p className="text-gray-600 mt-2">Calculate ALL 27 hidden costs - No surprises!</p>
          </div>
          <Badge className="text-lg px-4 py-2 bg-green-500">
            FULL ACCESS
          </Badge>
        </div>
        
        <Alert className="bg-yellow-50 border-yellow-300">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This calculator reveals costs that dealers and agents never mention. 
            Total savings potential: N$15,000+ per import
          </AlertDescription>
        </Alert>
      </div>

      <Tabs defaultValue="vehicle" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
          <TabsTrigger value="japan">Japan Costs</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="namibia">Namibia Costs</TabsTrigger>
          <TabsTrigger value="summary">Total Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicle">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Enter the details of the vehicle you want to import</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={vehicleDetails.make}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, make: e.target.value }))}
                  placeholder="Toyota, Nissan, Honda..."
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={vehicleDetails.model}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="Corolla, Note, Fit..."
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={vehicleDetails.year}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div>
                <Label htmlFor="engineSize">Engine Size (cc)</Label>
                <Input
                  id="engineSize"
                  type="number"
                  value={vehicleDetails.engineSize}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, engineSize: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select
                  value={vehicleDetails.fuelType}
                  onValueChange={(value: any) => setVehicleDetails(prev => ({ ...prev, fuelType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={vehicleDetails.transmission}
                  onValueChange={(value: any) => setVehicleDetails(prev => ({ ...prev, transmission: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={vehicleDetails.mileage}
                  onChange={(e) => setVehicleDetails(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={vehicleDetails.condition}
                  onValueChange={(value: any) => setVehicleDetails(prev => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (Grade 4+)</SelectItem>
                    <SelectItem value="good">Good (Grade 3.5)</SelectItem>
                    <SelectItem value="fair">Fair (Grade 3)</SelectItem>
                    <SelectItem value="poor">Poor (Grade 2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="japan">
          <Card>
            <CardHeader>
              <CardTitle>Japan Side Costs (8 Hidden Fees)</CardTitle>
              <CardDescription>These costs are often hidden or underestimated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehiclePrice">Vehicle Purchase Price (N$)</Label>
                  <Input
                    id="vehiclePrice"
                    type="number"
                    value={costs.japanCosts.vehiclePrice}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      japanCosts: { ...prev.japanCosts, vehiclePrice: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Base auction price</p>
                </div>
                <div>
                  <Label htmlFor="auctionFee">Auction Fee</Label>
                  <Input
                    id="auctionFee"
                    type="number"
                    value={costs.japanCosts.auctionFee}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      japanCosts: { ...prev.japanCosts, auctionFee: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">N$2,800 - N$5,800</p>
                </div>
                <div>
                  <Label htmlFor="transportToPort">Transport to Port</Label>
                  <Input
                    id="transportToPort"
                    type="number"
                    value={costs.japanCosts.transportToPort}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      japanCosts: { ...prev.japanCosts, transportToPort: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">N$3,000 - N$6,000</p>
                </div>
                <div>
                  <Label htmlFor="exportCertificate">Export Certificate</Label>
                  <Input
                    id="exportCertificate"
                    type="number"
                    value={costs.japanCosts.exportCertificate}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
                <div>
                  <Label htmlFor="radiationInspection">Radiation Inspection</Label>
                  <Input
                    id="radiationInspection"
                    type="number"
                    value={costs.japanCosts.radiationInspection}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
                <div>
                  <Label htmlFor="preExportInspection">Pre-Export Inspection</Label>
                  <Input
                    id="preExportInspection"
                    type="number"
                    value={costs.japanCosts.preExportInspection}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">JEVIC/QISJ inspection</p>
                </div>
                <div>
                  <Label htmlFor="agentCommission">Agent Commission</Label>
                  <Input
                    id="agentCommission"
                    type="number"
                    value={costs.japanCosts.agentCommission}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      japanCosts: { ...prev.japanCosts, agentCommission: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">N$2,250 - N$4,500</p>
                </div>
                <div>
                  <Label htmlFor="exportCustomsClearance">Export Customs Clearance</Label>
                  <Input
                    id="exportCustomsClearance"
                    type="number"
                    value={costs.japanCosts.exportCustomsClearance}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
              </div>
              <Alert className="bg-red-50 border-red-300">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Japan Total: N${Object.values(costs.japanCosts).reduce((a, b) => a + b, 0).toLocaleString()}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Costs (5 Components)</CardTitle>
              <CardDescription>Ocean freight and related charges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="oceanFreight">Ocean Freight</Label>
                  <Input
                    id="oceanFreight"
                    type="number"
                    value={costs.shippingCosts.oceanFreight}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      shippingCosts: { ...prev.shippingCosts, oceanFreight: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">N$18,000 - N$25,000</p>
                </div>
                <div>
                  <Label htmlFor="bunkerAdjustmentFactor">Bunker Adjustment Factor (BAF)</Label>
                  <Input
                    id="bunkerAdjustmentFactor"
                    type="number"
                    value={costs.shippingCosts.bunkerAdjustmentFactor}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE! Fuel surcharge</p>
                </div>
                <div>
                  <Label htmlFor="billOfLadingFee">Bill of Lading Fee</Label>
                  <Input
                    id="billOfLadingFee"
                    type="number"
                    value={costs.shippingCosts.billOfLadingFee}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
                <div>
                  <Label htmlFor="shippingInsurance">Shipping Insurance</Label>
                  <Input
                    id="shippingInsurance"
                    type="number"
                    value={costs.shippingCosts.shippingInsurance}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      shippingCosts: { ...prev.shippingCosts, shippingInsurance: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended</p>
                </div>
                <div>
                  <Label htmlFor="terminalHandlingJapan">Terminal Handling - Japan</Label>
                  <Input
                    id="terminalHandlingJapan"
                    type="number"
                    value={costs.shippingCosts.terminalHandlingJapan}
                    readOnly
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
              </div>
              <Alert className="bg-blue-50 border-blue-300">
                <AlertDescription>
                  Shipping Total: N${Object.values(costs.shippingCosts).reduce((a, b) => a + b, 0).toLocaleString()}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="namibia">
          <Card>
            <CardHeader>
              <CardTitle>Namibia Side Costs (17 Fees!)</CardTitle>
              <CardDescription>The most hidden costs are here - be prepared!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="storageDays">Days in Port Storage</Label>
                <Input
                  id="storageDays"
                  type="number"
                  value={storageDays}
                  onChange={(e) => setStorageDays(parseInt(e.target.value) || 0)}
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">First 3 days free, then N$200/day</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Terminal Handling - Namibia</Label>
                  <Input value={costs.namibiaCosts.terminalHandlingNamibia} readOnly className="bg-gray-50" />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
                <div>
                  <Label>Container Cleaning</Label>
                  <Input value={costs.namibiaCosts.containerCleaning} readOnly className="bg-gray-50" />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
                <div>
                  <Label>Documentation Fees</Label>
                  <Input value={costs.namibiaCosts.documentationFees} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Storage After 3 Days</Label>
                  <Input value={costs.namibiaCosts.storageAfterThreeDays} readOnly className="bg-yellow-50" />
                  <p className="text-xs text-yellow-600 mt-1">Calculated: N$200/day</p>
                </div>
                <div>
                  <Label>Wharf Handling</Label>
                  <Input value={costs.namibiaCosts.wharfHandling} readOnly className="bg-gray-50" />
                  <p className="text-xs text-red-500 mt-1">HIDDEN FEE!</p>
                </div>
                <div>
                  <Label>Break-bulk Charges</Label>
                  <Input value={costs.namibiaCosts.breakBulkCharges} readOnly className="bg-gray-50" />
                  <p className="text-xs text-red-500 mt-1">MAJOR HIDDEN FEE!</p>
                </div>
                <div>
                  <Label>Customs Clearance</Label>
                  <Input value={costs.namibiaCosts.customsClearance} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Customs Duty</Label>
                  <Input value={costs.namibiaCosts.customsDuty.toFixed(2)} readOnly className="bg-yellow-50" />
                  <p className="text-xs text-yellow-600 mt-1">Calculated by age/engine</p>
                </div>
                <div>
                  <Label>Import VAT (15%)</Label>
                  <Input value={costs.namibiaCosts.importVAT.toFixed(2)} readOnly className="bg-yellow-50" />
                  <p className="text-xs text-yellow-600 mt-1">15% of (CIF + Duty)</p>
                </div>
                <div>
                  <Label>Environmental Levy</Label>
                  <Input value={costs.namibiaCosts.environmentalLevy} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Fuel Levy</Label>
                  <Input value={costs.namibiaCosts.fuelLevy} readOnly className="bg-yellow-50" />
                  <p className="text-xs text-yellow-600 mt-1">Based on engine size</p>
                </div>
                <div>
                  <Label>Roadworthy Test</Label>
                  <Input value={costs.namibiaCosts.roadworthyTest} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Registration</Label>
                  <Input value={costs.namibiaCosts.registration} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Number Plates</Label>
                  <Input value={costs.namibiaCosts.numberPlates} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Transport to Windhoek</Label>
                  <Input value={costs.namibiaCosts.transportToWindhoek} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Clearing Agent Fee</Label>
                  <Input
                    type="number"
                    value={costs.namibiaCosts.clearingAgentFee}
                    onChange={(e) => setCosts(prev => ({
                      ...prev,
                      namibiaCosts: { ...prev.namibiaCosts, clearingAgentFee: parseFloat(e.target.value) || 0 }
                    }))}
                  />
                  <p className="text-xs text-orange-500 mt-1">⚠️ Verify agent first!</p>
                </div>
              </div>
              
              <Alert className="bg-orange-50 border-orange-300">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>WARNING:</strong> Verify clearing agent has no debts with shipping lines! 
                  My car is still stuck because of this!
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-green-50 border-green-300">
                <AlertDescription>
                  Namibia Total: N${Object.values(costs.namibiaCosts).reduce((a, b) => a + b, 0).toLocaleString()}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card className="border-2 border-green-500">
            <CardHeader>
              <CardTitle className="text-2xl">Complete Cost Breakdown</CardTitle>
              <CardDescription>All 27 costs revealed - no surprises!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Japan Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">
                      N${Object.values(costs.japanCosts).reduce((a, b) => a + b, 0).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Shipping Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-purple-600">
                      N${Object.values(costs.shippingCosts).reduce((a, b) => a + b, 0).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Namibia Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600">
                      N${Object.values(costs.namibiaCosts).reduce((a, b) => a + b, 0).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <p className="text-gray-600 mb-2">TOTAL IMPORT COST</p>
                <p className="text-5xl font-bold text-green-600">
                  N${calculateTotal().toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Estimated timeline: {45 + storageDays} days
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Hidden Costs Revealed
                </h4>
                <p className="text-sm text-gray-600">
                  This calculation includes N$12,000-18,000 in costs that most calculators hide. 
                  You're now prepared for the REAL import cost!
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={saveCalculation} disabled={isSaving} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Calculation'}
                </Button>
                <PDFExportButton 
                  vehicleDetails={vehicleDetails}
                  costs={costs}
                  country={country}
                  totalCost={calculateTotal()}
                />
                <Button onClick={() => window.location.reload()} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Calculation
                </Button>
              </div>
              
              {savedCalculations.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Saved Calculations ({savedCalculations.length})</h4>
                  <div className="space-y-2">
                    {savedCalculations.map((calc, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">
                          {calc.vehicleDetails.make} {calc.vehicleDetails.model} ({calc.vehicleDetails.year})
                        </span>
                        <span className="font-semibold">
                          N${calc.totalCost.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}