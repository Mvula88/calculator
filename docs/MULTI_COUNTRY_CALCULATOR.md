# Multi-Country Car Import Calculator

## Overview
The Multi-Country Car Import Calculator supports import duty calculations for vehicles imported from Japan to four Southern African countries:
- **NA** - Namibia
- **ZA** - South Africa
- **BW** - Botswana
- **ZM** - Zambia

## Features

### Country-Specific Calculations
Each country has its own duty formulas, tax rates, and requirements:

#### Namibia (NA)
- **Duty (ICD)**: 25% × CIF
- **Environmental Levy (ENV)**:
  - Petrol: max(0, CO₂ - 120) × 40
  - Diesel: max(0, CO₂ - 140) × 45
- **Ad Valorem (ADV)**: min(30%, (0.00003 × RRP - 0.75)%) × RRP
- **VAT**: 15% × [(CIF × 1.10) + Duty + ADV]

#### South Africa (ZA)
- **Duty**: 25% × CIF (HS 8703 baseline)
- **Ad Valorem (ADV)**: min(30%, (0.00003 × RRP - 0.75)%) × RRP
- **CO₂ Levy**: Only for new vehicles (user toggle)
- **VAT**: 15% × [(CIF × 1.10) + Duty + ADV + CO₂ Levy]
- **Note**: Used vehicle imports require ITAC permit

#### Botswana (BW)
- **Duty**: 25% × CIF (HS 8703 default)
- **Ad Valorem (ADV)**: min(30%, (0.00003 × RRP - 0.75)%) × RRP
- **VAT**: 12% × [CIF + Duty + ADV] (no 10% uplift)

#### Zambia (ZM)
- **Specific Duty**: Table lookup based on vehicle type, engine cc, and age
- **Excise**: Configurable percentage × (CIF + Duty)
  - Standard vehicles: Full rate
  - Hybrids: Half rate
  - EVs: Zero
- **VAT**: 16% × [CIF + Duty + Excise]
- **Special provisions**: EVs get zero duty, Hybrids get reduced excise

### Input Fields

#### Common Fields (All Countries)
- **Country**: Destination country selector
- **CIF Value**: Cost, Insurance & Freight in local currency
- **Fuel Type**: Petrol or Diesel
- **Cars in Container**: For sharing local clearing costs
- **Japan-side Costs**: Auction and shipping fees
- **Local Clearing Costs**: Port and handling charges
- **Inland Delivery**: Optional trucking costs

#### Country-Specific Fields
- **CO₂ Emissions**: Required for NA, optional for ZA (new vehicles only)
- **RRP/Ad Valorem Value**: Required for NA, ZA, BW
- **New Vehicle Toggle**: ZA only (enables CO₂ levy)
- **Vehicle Type**: ZM only (passenger/SUV/pickup/van/truck)
- **Engine CC**: ZM only (for duty table lookup)
- **Vehicle Age**: ZM only (for duty table lookup)
- **Excise Rate**: ZM only (configurable percentage)
- **EV/Hybrid Toggles**: ZM only (for reduced duties)

### Calculation Flow

1. **Select Country**: Choose destination from dropdown
2. **Enter Vehicle Details**: Fill in required fields based on country
3. **Optional Costs**: Add Japan-side fees, clearing costs, inland delivery
4. **Calculate**: System computes all duties and taxes
5. **View Results**: Breakdown shows:
   - Japan-side costs (converted from JPY)
   - Local clearing share (divided by cars in container)
   - All applicable duties and taxes
   - Landed cost total
   - Optional inland delivery
   - Final total

### Exchange Rates
The calculator automatically adjusts JPY exchange rates based on the selected country's currency:
- NAD (Namibia Dollar)
- ZAR (South African Rand)
- BWP (Botswana Pula)
- ZMW (Zambian Kwacha)

### Validation Rules
- CIF value must be positive
- CO₂ emissions required only when country uses environmental levies
- RRP required only for countries with Ad Valorem duty
- Zambia-specific fields only appear when ZM is selected
- Exchange rate must be positive
- Container must have at least 1 car

### Data Sources

#### Zambia Duty Table
The ZRA specific duty rates are stored in `data/zra_specific_duty_2025.json`:
- Organized by vehicle type (passenger/SUV/pickup/van/truck)
- Engine capacity bands (0-1500cc, 1501-2000cc, etc.)
- Age bands (0-2 years, 3-5 years, 6-10 years, 11+ years)
- Returns specific duty amount in Kwacha

### Important Notes

#### South Africa
- Used vehicle imports generally require an ITAC import permit
- Permits limited to specific categories (returning resident, inherited, vintage, etc.)
- Calculator shows warning for used vehicles
- CO₂ levy only applies to new vehicles

#### Botswana
- VAT calculated on CIF + duties without the 10% uplift
- Lower VAT rate (12%) compared to other countries

#### Zambia
- Uses specific duty table instead of percentage
- Electric vehicles receive zero customs duty
- Hybrid vehicles receive reduced excise duty
- Excise rate varies by vehicle category

#### All Countries
- Estimates only - consult clearing agents for final calculations
- Customs may adjust declared values
- Exchange rates fluctuate daily
- Additional fees may apply
- Port charges subject to change

## Testing

### Unit Tests
Run tests with: `npm test lib/calc/countries.test.ts`

Tests cover:
- Each country's calculation logic
- Environmental levy thresholds
- Ad valorem caps
- VAT calculations with/without uplift
- Zambia duty table lookups
- EV/Hybrid special provisions
- Multi-country comparisons

### Sample Calculations

#### Namibia Example
- CIF: NAD 150,000
- CO₂: 150 g/km (Petrol)
- RRP: NAD 250,000
- Results:
  - Duty: NAD 37,500
  - ENV: NAD 1,200
  - ADV: NAD 16,875
  - VAT: NAD 32,906.25
  - Total Taxes: NAD 88,481.25

#### Zambia Example
- CIF: ZMW 150,000
- Type: SUV, 2500cc, 6 years old
- Excise Rate: 35%
- Results:
  - Specific Duty: ZMW 65,000
  - Excise: ZMW 75,250
  - VAT: ZMW 46,440
  - Total Taxes: ZMW 186,690

## API Reference

### Main Function
```typescript
calculateImportDuties(params: Inputs): FullOutput
```

### Country-Specific Functions
```typescript
calcNA(params: Inputs): FullOutput  // Namibia
calcZA(params: Inputs): FullOutput  // South Africa
calcBW(params: Inputs): FullOutput  // Botswana
calcZM(params: Inputs): FullOutput  // Zambia
```

### Helper Function
```typescript
getCountryRequirements(country: Country): {
  requiresCO2: boolean
  requiresRRP: boolean
  requiresZMFields: boolean
  requiresNewVehicleToggle: boolean
  vatRate: number
  currency: string
}
```

## Future Enhancements
- Additional countries (Zimbabwe, Mozambique, etc.)
- Historical exchange rate data
- PDF report generation
- Comparison tool between countries
- API integration with customs authorities
- Mobile app version