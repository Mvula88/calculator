/**
 * Country-specific import duty calculation functions
 * for NA (Namibia), ZA (South Africa), BW (Botswana), ZM (Zambia)
 */

import zraDutyTable from '@/data/zra_specific_duty_2025.json';

export type Country = 'NA' | 'ZA' | 'BW' | 'ZM';

export type FuelType = 'petrol' | 'diesel';

export type VehicleType = 'passenger' | 'suv' | 'pickup' | 'van' | 'truck' | 'double-cab';

export interface BaseInputs {
  country: Country;
  cif: number;                  // Customs value in local currency
  fuel: FuelType;
  co2?: number;                 // g/km CO2 emissions
  rrp?: number;                  // Retail recommended price (for ADV calculation)
  isNewVehicle?: boolean;        // For ZA CO2 levy
  vehicleType?: VehicleType;     // For ZA CO2 levy (passenger vs double-cab)
  containerCars?: number;        // Number of cars user is importing (container holds 4 total)
  japanSideCosts?: number;       // Total Japan-side costs in local currency
  localClearingCosts?: number;   // Total container clearing costs (for all 4 cars)
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
 * - Duty = 25% × FOB (excluding shipping)
 * - ENV (Environmental Levy):
 *   - Engine Size (cc) × 0.05 × 40 (petrol)
 *   - Engine Size (cc) × 0.05 × 45 (diesel)
 * - ADV = min(30%, (0.00003 × RRP - 0.75)%) × RRP
 * - Import VAT = 15% × [(FOB + 10%) + Duty + ADV + ENV] (effective 16.5% rate)
 * Note: Shipping costs are NOT included in duty calculation base for Namibia
 */
export function calcNA(params: Inputs): FullOutput {
  const { cif, fuel, co2 = 0, rrp = cif * 1.5 } = params;

  // For Namibia, we use FOB (Free on Board) value, not CIF
  // Assuming CIF includes about 10% shipping/insurance, we calculate FOB
  // FOB = CIF / 1.10 (removing shipping component)
  const fob = cif / 1.10;

  // Import Customs Duty (ICD) = 25% of FOB (excluding shipping)
  const duty = fob * 0.25;

  // Environmental Levy (ENV)
  // Formula: Engine Size (in cc) × 0.05 × (40 for petrol or 45 for diesel)
  // The co2 parameter is now being used to pass engine size in cc
  let env = 0;
  if (co2 > 0) {  // co2 is actually engine size in cc
    const engineSizeInCC = co2;
    const multiplier = fuel === 'petrol' ? 40 : 45;
    env = engineSizeInCC * 0.05 * multiplier;
  }

  // Ad Valorem Excise Duty (ADV)
  // Formula: ((0.00003 × RRP) - 0.75)% × RRP, capped at 30%
  const advRate = Math.min(0.30, Math.max(0, (0.00003 * rrp - 0.75) / 100));
  const adv = rrp * advRate;

  // Import VAT calculation for Namibia
  // Import VAT = 15% × [(FOB + 10%) + Duty + ADV + ENV]
  // The FOB + 10% markup makes the effective VAT rate 16.5% on the FOB value
  // This is the standard practice for import VAT in Namibia
  const vatBase = (fob * 1.10) + duty + adv + env;
  const vat = vatBase * 0.15;

  const totalTaxes = duty + env + adv + vat;

  const output = buildFullOutput(params, {
    duty,
    env,
    adv,
    excise: 0,
    co2Levy: 0,
    vat,
    totalTaxes
  });

  // Add notes about Namibia-specific calculations
  output.breakdownNotes = [
    'For Namibia, shipping costs are excluded from the customs duty calculation base (FOB value used)',
    `Duty calculated on FOB value of N$${Math.round(fob).toLocaleString()}`,
    'Import VAT calculated at 15% on (FOB + 10%) + duties, giving an effective rate of 16.5%'
  ];

  return output;
}

/**
 * South Africa (ZA) Calculation
 * Formula (Updated 2025):
 * - Duty = 25% × CIF (HS 8703 baseline)
 * - ADV = min(30%, (0.00003 × RRP - 0.75)%) × RRP (verify for imported used vehicles)
 * - CO₂ levy = applicable only for new vehicles (updated April 2024)
 *   - Passenger cars: (CO2 - 95) × R146 per g/km
 *   - Double cabs/goods vehicles: (CO2 - 175) × R195 per g/km
 * - Import VAT = 15% × [(CIF + 10%) + Duty + ADV + CO₂ levy]
 * - Note: 10% uplift applies for imports from outside SACU
 */
export function calcZA(params: Inputs): FullOutput {
  const { cif, co2 = 0, rrp = cif * 1.5, isNewVehicle = false, vehicleType = 'passenger' } = params;

  // Customs Duty = 25% of CIF
  const duty = cif * 0.25;

  // Ad Valorem Duty (ADV) - Schedule 1 Part 2B style
  // Note: Verify applicability to imported used vehicles (typically for locally manufactured)
  const advRate = Math.min(0.30, Math.max(0, (0.00003 * rrp - 0.75) / 100));
  const adv = rrp * advRate;

  // CO₂ levy - only for new vehicles (updated April 2024)
  // Rates: R146/g for passenger cars (95g/km threshold), R195/g for double cabs (175g/km threshold)
  let co2Levy = 0;
  if (isNewVehicle && co2 > 0) {
    if (vehicleType === 'double-cab' || vehicleType === 'pickup') {
      // Double cabs/goods vehicles: 175 g/km threshold at R195 per g/km
      if (co2 > 175) {
        co2Levy = (co2 - 175) * 195;
      }
    } else {
      // Passenger cars: 95 g/km threshold at R146 per g/km
      if (co2 > 95) {
        co2Levy = (co2 - 95) * 146;
      }
    }
  }

  // Import VAT = 15% × [(CIF + 10%) + Duty + ADV + CO₂ levy]
  // The 10% uplift on CIF is standard for imports from outside SACU
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

  // Add South Africa specific notes with prominent ITAC warning
  output.breakdownNotes = [
    ...(output.breakdownNotes || []),
    'South Africa rates updated for 2025. CO2 levy: R146/g (passenger, 95g/km threshold), R195/g (double cab, 175g/km threshold).',
    '10% CIF uplift applies for imports from outside SACU (Southern African Customs Union).',
  ];

  if (!isNewVehicle) {
    output.breakdownNotes.push(
      '🚨 CRITICAL: Used vehicle imports to South Africa are HEAVILY RESTRICTED.',
      'ITAC permits required and only granted for: returning residents with permanent employment abroad, bona fide immigrants with permanent residence, disabled persons, inherited vehicles, or racing vehicles.',
      '⚠️ Commercial used vehicle imports are generally PROHIBITED. Consult ITAC before proceeding.'
    );
  } else {
    output.breakdownNotes.push(
      `CO2 levy applied: ${vehicleType === 'double-cab' || vehicleType === 'pickup' ? 'Double cab rate (R195/g, 175g/km threshold)' : 'Passenger car rate (R146/g, 95g/km threshold)'}`
    );
  }

  return output;
}

/**
 * Botswana (BW) Calculation (Updated 2025)
 * Formula:
 * - Duty = 27% × CIF (for non-SACU imports, HS 8703)
 * - Import VAT = 12% × [CIF + Duty] (no uplift, no ADV)
 * Note: Ad Valorem (ADV) removed - Namibian ADV formula does not apply in Botswana
 * Ad valorem excise duties in SACU are typically for manufacturers, not importers
 */
export function calcBW(params: Inputs): FullOutput {
  const { cif } = params;

  // Customs Duty = 27% of CIF (updated 2025 rate for non-SACU imports)
  const duty = cif * 0.27;

  // No Ad Valorem (ADV) for Botswana
  // The Namibian ADV formula is specific to Namibia and does not apply in Botswana
  const adv = 0;

  // Import VAT = 12% × [CIF + Duty]
  // Botswana does not apply the 10% uplift on CIF (no ADV either)
  const vatBase = cif + duty;
  const vat = vatBase * 0.12;

  const totalTaxes = duty + vat;

  const output = buildFullOutput(params, {
    duty,
    env: 0,
    adv,
    excise: 0,
    co2Levy: 0,
    vat,
    totalTaxes
  });

  // Add Botswana specific notes
  output.breakdownNotes = [
    ...(output.breakdownNotes || []),
    'Botswana rates updated for 2025: 27% customs duty for non-SACU imports (increased from 25%).',
    'VAT at 12% with no CIF uplift applied.',
    '⚠️ Ad Valorem (ADV) removed - only applies to manufacturers in SACU, not vehicle imports.',
    'Formula simplified to: Duty (27%) + VAT (12%). Consult BURS (Botswana Unified Revenue Service) for verification.'
  ];

  return output;
}

/**
 * Zambia (ZM) Calculation
 * Formula:
 * - Duty = Specific duty from ZRA table based on type/cc/age
 * - Excise = rate% × (CIF + Duty)
 * - Import VAT = 16% × [CIF + Duty + Excise]
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

  // Import VAT = 16% × [CIF + Duty + Excise]
  // Zambia applies 16% VAT on the sum of CIF, duty and excise
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

  // Add Zambia specific notes
  output.breakdownNotes = [
    ...(output.breakdownNotes || []),
    'Zambia uses ZRA specific duty table (2025 rates). Verify current rates with customs.',
  ];

  if (isEV) {
    output.breakdownNotes.push('Electric vehicles receive zero customs duty and reduced excise in Zambia.');
  } else if (isHybrid) {
    output.breakdownNotes.push('Hybrid vehicles receive reduced excise duty in Zambia.');
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

  // Container holds 4 cars total, user pays their fraction
  const totalCarsInContainer = 4;
  const localClearingShare = (localClearingCosts / totalCarsInContainer) * containerCars;

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
        requiresRRP: false, // No ADV in Botswana, RRP not needed
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