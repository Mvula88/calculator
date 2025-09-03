export interface JapanCosts {
  vehiclePrice: number
  auctionFee: number
  transportToPort: number
  exportCertificate: number
  radiationInspection: number
  preExportInspection: number
  agentCommission: number
  exportCustomsClearance: number
}

export interface ShippingCosts {
  oceanFreight: number
  bunkerAdjustmentFactor: number
  billOfLadingFee: number
  shippingInsurance: number
  terminalHandlingJapan: number
}

export interface NamibiaCosts {
  terminalHandlingNamibia: number
  containerCleaning: number
  documentationFees: number
  storageFirstThreeDays: number
  storageAfterThreeDays: number
  wharfHandling: number
  breakBulkCharges: number
  customsClearance: number
  importVAT: number
  customsDuty: number
  environmentalLevy: number
  fuelLevy: number
  roadworthyTest: number
  registration: number
  numberPlates: number
  transportToWindhoek: number
  clearingAgentFee: number
}

export interface HiddenCosts {
  japanCosts: JapanCosts
  shippingCosts: ShippingCosts
  namibiaCosts: NamibiaCosts
}

export interface VehicleDetails {
  make: string
  model: string
  year: number
  engineSize: number
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric'
  transmission: 'manual' | 'automatic'
  mileage: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface CalculationResult {
  vehicleDetails: VehicleDetails
  costs: HiddenCosts
  totalCost: number
  estimatedTimelineDays: number
  exchangeRates: {
    jpyToNad: number
    usdToNad: number
  }
  calculatedAt: Date
}