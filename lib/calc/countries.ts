/**
 * Country-specific import duty calculation functions
 * for NA (Namibia), ZA (South Africa), BW (Botswana), ZM (Zambia)
 */

import zraDutyTable from '@/data/zra_specific_duty_2025.json';

export type Country = 'NA' | 'ZA' | 'BW' | 'ZM';

export type FuelType = 'petrol' | 'diesel';

export type VehicleType = 'passenger' | 'suv' | 'pickup' | 'van' | 'truck';

export interface BaseInputs {
  country: Country;
  cif: number;                  // Customs value in local currency
  fuel: FuelType;
  co2?: number;                 // g/km CO2 emissions
  rrp?: number;                  // Retail recommended price (for ADV calculation)
  isNewVehicle?: boolean;        // For ZA CO2 levy
  containerCars?: number;        // Number of cars sharing container costs
  japanSideCosts?: number;       // Total Japan-side costs in local currency
  localClearingCosts?: number;   // Local clearing costs (total, will be divided by containerCars)
  inlandDelivery?: number;       // Optional inland delivery cost
}

export interface ZambiaSpecifics {
  type?: VehicleType;
  cc?: number;                  // Engine capacity in cc
  ageYears?: number;             // Vehicle age in years
  exciseRate?: number;           // Excise duty percentage
  isEV?: boolean;                // Electric vehicle
  isHybrid?: boolean;            // Hybrid vehicle
}

export interface Inputs extends BaseInputs {
  zm?: ZambiaSpecifics;
}

export interface TaxOutput {
  duty: number;                  // Import/Customs duty
  env: number;                   // Environmental levy (NA only)
  adv: number;                   // Ad valorem excise duty
  excise: number;                // Excise duty (ZM only)
  co2Levy: number;               // CO2 levy (ZA new vehicles only)
  vat: number;                   // Value added tax
  totalTaxes: number;            // Sum of all taxes
}

export interface FullOutput extends TaxOutput {
  cif: number;
  japanSideCosts: number;
  localClearingShare: number;    // Local clearing costs divided by container cars
  inlandDelivery: number;
  landedCost: number;            // Total landed cost
  breakdownNotes?: string[];     // Calculation notes/warnings
}

/**
 * Namibia (NA) Calculation
 * Formula:
 * - Duty = 25% × CIF
 * - ENV (Environmental Levy):
 *   - Petrol: max(0, CO₂ - 120) × 40
 *   - Diesel: max(0, CO₂ - 140) × 45
 * - ADV = min(30%, (0.00003 × RRP - 0.75)%) × RRP
 * - VAT = 15% × [(CIF × 1.10) + Duty + ADV]
 */
export function calcNA(params: Inputs): FullOutput {
  const { cif, fuel, co2 = 0, rrp = cif * 1.5 } = params;

  // Import Customs Duty (ICD) = 25% of CIF
  const duty = cif * 0.25;

  // Environmental Levy (ENV)
  let env = 0;
  if (fuel === 'petrol') {
    env = Math.max(0, co2 - 120) * 40;
  } else if (fuel === 'diesel') {
    env = Math.max(0, co2 - 140) * 45;
  }

  // Ad Valorem Excise Duty (ADV)
  // Formula: ((0.00003 × RRP) - 0.75)% × RRP, capped at 30%
  const advRate = Math.min(0.30, Math.max(0, (0.00003 * rrp - 0.75) / 100));
  const adv = rrp * advRate;

  // VAT = 15% × [(CIF × 1.10) + ICD + ADV]
  const vatBase = (cif * 1.10) + duty + adv;
  const vat = vatBase * 0.15;

  const totalTaxes = duty + env + adv + vat;

  return buildFullOutput(params, {
    duty,
    env,
    adv,
    excise: 0,
    co2Levy: 0,
    vat,
    totalTaxes
  });
}

/**
 * South Africa (ZA) Calculation
 * Formula:
 * - Duty = 25% × CIF (HS 8703 baseline)
 * - ADV = min(30%, (0.00003 × RRP - 0.75)%) × RRP
 * - CO₂ levy = applicable only for new vehicles (user toggle)
 * - VAT = 15% × [(CIF × 1.10) + Duty + ADV + CO₂ levy]
 */
export function calcZA(params: Inputs): FullOutput {
  const { cif, co2 = 0, rrp = cif * 1.5, isNewVehicle = false } = params;

  // Customs Duty = 25% of CIF
  const duty = cif * 0.25;

  // Ad Valorem Duty (ADV) - Schedule 1 Part 2B style
  const advRate = Math.min(0.30, Math.max(0, (0.00003 * rrp - 0.75) / 100));
  const adv = rrp * advRate;

  // CO₂ levy - only for new vehicles
  // Simplified placeholder - actual ZA CO₂ levy has complex bands
  // For demo: R120 per g/km above 120 (adjust as per actual policy)
  let co2Levy = 0;
  if (isNewVehicle && co2 > 120) {
    co2Levy = (co2 - 120) * 120; // Placeholder rate
  }

  // VAT = 15% × [(CIF × 1.10) + Duty + ADV + CO₂ levy]
  const vatBase = (cif * 1.10) + duty + adv + co2Levy;
  const vat = vatBase * 0.15;

  const totalTaxes = duty + adv + co2Levy + vat;

  const output = buildFullOutput(params, {
    duty,
    env: 0,
    adv,
    excise: 0,
    co2Levy,
    vat,
    totalTaxes
  });

  // Add warning for used vehicles
  if (!isNewVehicle) {
    output.breakdownNotes = [
      ...(output.breakdownNotes || []),
      'Used vehicle imports to South Africa generally require an ITAC import permit under limited categories.'
    ];
  }

  return output;
}

/**
 * Botswana (BW) Calculation
 * Formula:
 * - Duty = 25% × CIF (HS 8703 default, make editable)
 * - ADV = min(30%, (0.00003 × RRP - 0.75)%) × RRP
 * - VAT = 12% × [CIF + Duty + ADV] (no 10% uplift)
 */
export function calcBW(params: Inputs): FullOutput {
  const { cif, rrp = cif * 1.5 } = params;

  // Customs Duty = 25% of CIF (default for HS 8703)
  const duty = cif * 0.25;

  // Ad Valorem Duty (ADV)
  const advRate = Math.min(0.30, Math.max(0, (0.00003 * rrp - 0.75) / 100));
  const adv = rrp * advRate;

  // VAT = 12% × [CIF + Duty + ADV] (no uplift in Botswana)
  const vatBase = cif + duty + adv;
  const vat = vatBase * 0.12;

  const totalTaxes = duty + adv + vat;

  return buildFullOutput(params, {
    duty,
    env: 0,
    adv,
    excise: 0,
    co2Levy: 0,
    vat,
    totalTaxes
  });
}

/**
 * Zambia (ZM) Calculation
 * Formula:
 * - Duty = Specific duty from ZRA table based on type/cc/age
 * - Excise = rate% × (CIF + Duty)
 * - VAT = 16% × [CIF + Duty + Excise]
 * - EV/Hybrid get reduced/zero duty and excise
 */
export function calcZM(params: Inputs): FullOutput {
  const { cif, zm = {} } = params;
  const {
    type = 'passenger',
    cc = 1500,
    ageYears = 3,
    exciseRate = 30,
    isEV = false,
    isHybrid = false
  } = zm;

  // Lookup specific duty from ZRA table
  let duty = 0;

  if (isEV) {
    // EVs get zero duty (as per policy)
    duty = 0;
  } else {
    // Find matching duty from table
    const dutyEntry = zraDutyTable.find(entry =>
      entry.type === type &&
      cc >= entry.cc_min &&
      cc <= entry.cc_max &&
      ageYears >= entry.age_min &&
      ageYears <= entry.age_max
    );

    if (dutyEntry) {
      duty = dutyEntry.duty_kwacha;
    } else {
      // Fallback if no exact match - use a percentage
      duty = cif * 0.25;
    }
  }

  // Excise Duty
  let excise = 0;
  if (isEV) {
    // EVs may have reduced/zero excise
    excise = 0;
  } else if (isHybrid) {
    // Hybrids get reduced excise (e.g., half rate)
    excise = (cif + duty) * (exciseRate / 2) / 100;
  } else {
    // Standard excise
    excise = (cif + duty) * exciseRate / 100;
  }

  // VAT = 16% × [CIF + Duty + Excise]
  const vatBase = cif + duty + excise;
  const vat = vatBase * 0.16;

  const totalTaxes = duty + excise + vat;

  const output = buildFullOutput(params, {
    duty,
    env: 0,
    adv: 0,
    excise,
    co2Levy: 0,
    vat,
    totalTaxes
  });

  if (isEV) {
    output.breakdownNotes = [
      ...(output.breakdownNotes || []),
      'Electric vehicles receive zero customs duty and reduced excise in Zambia.'
    ];
  } else if (isHybrid) {
    output.breakdownNotes = [
      ...(output.breakdownNotes || []),
      'Hybrid vehicles receive reduced excise duty in Zambia.'
    ];
  }

  return output;
}

/**
 * Main dispatcher function
 */
export function calculateImportDuties(params: Inputs): FullOutput {
  switch (params.country) {
    case 'NA':
      return calcNA(params);
    case 'ZA':
      return calcZA(params);
    case 'BW':
      return calcBW(params);
    case 'ZM':
      return calcZM(params);
    default:
      throw new Error(`Unsupported country: ${params.country}`);
  }
}

/**
 * Helper to build full output including landed costs
 */
function buildFullOutput(params: Inputs, taxes: TaxOutput): FullOutput {
  const {
    cif,
    japanSideCosts = 0,
    localClearingCosts = 0,
    containerCars = 1,
    inlandDelivery = 0
  } = params;

  const localClearingShare = localClearingCosts / containerCars;

  const landedCost = cif + taxes.totalTaxes + japanSideCosts + localClearingShare + inlandDelivery;

  return {
    ...taxes,
    cif,
    japanSideCosts,
    localClearingShare,
    inlandDelivery,
    landedCost,
    breakdownNotes: []
  };
}

/**
 * Get country-specific field requirements
 */
export function getCountryRequirements(country: Country): {
  requiresCO2: boolean;
  requiresRRP: boolean;
  requiresZMFields: boolean;
  requiresNewVehicleToggle: boolean;
  vatRate: number;
  currency: string;
} {
  switch (country) {
    case 'NA':
      return {
        requiresCO2: true,
        requiresRRP: true,
        requiresZMFields: false,
        requiresNewVehicleToggle: false,
        vatRate: 15,
        currency: 'NAD'
      };
    case 'ZA':
      return {
        requiresCO2: true,
        requiresRRP: true,
        requiresZMFields: false,
        requiresNewVehicleToggle: true,
        vatRate: 15,
        currency: 'ZAR'
      };
    case 'BW':
      return {
        requiresCO2: false,
        requiresRRP: true,
        requiresZMFields: false,
        requiresNewVehicleToggle: false,
        vatRate: 12,
        currency: 'BWP'
      };
    case 'ZM':
      return {
        requiresCO2: false,
        requiresRRP: false,
        requiresZMFields: true,
        requiresNewVehicleToggle: false,
        vatRate: 16,
        currency: 'ZMW'
      };
    default:
      return {
        requiresCO2: false,
        requiresRRP: false,
        requiresZMFields: false,
        requiresNewVehicleToggle: false,
        vatRate: 15,
        currency: 'USD'
      };
  }
}