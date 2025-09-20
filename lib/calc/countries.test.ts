/**
 * Unit tests for country-specific import duty calculations
 */

import { calcNA, calcZA, calcBW, calcZM, type Inputs } from './countries';

describe('Country Import Duty Calculations', () => {

  describe('Namibia (NA)', () => {
    it('should calculate duties for a standard petrol vehicle', () => {
      const params: Inputs = {
        country: 'NA',
        cif: 150000,
        fuel: 'petrol',
        co2: 150,
        rrp: 250000,
        containerCars: 1,
        japanSideCosts: 20000,
        localClearingCosts: 26255.65,
        inlandDelivery: 5000
      };

      const result = calcNA(params);

      // ICD = 25% × 150,000 = 37,500
      expect(result.duty).toBe(37500);

      // ENV = (150 - 120) × 40 = 1,200
      expect(result.env).toBe(1200);

      // ADV = ((0.00003 × 250,000) - 0.75)% × 250,000
      // = (7.5 - 0.75)% × 250,000 = 6.75% × 250,000 = 16,875
      expect(result.adv).toBe(16875);

      // VAT = 15% × [(150,000 × 1.10) + 37,500 + 16,875]
      // = 15% × [165,000 + 37,500 + 16,875] = 15% × 219,375 = 32,906.25
      expect(result.vat).toBe(32906.25);

      // Total taxes = 37,500 + 1,200 + 16,875 + 32,906.25 = 88,481.25
      expect(result.totalTaxes).toBe(88481.25);

      // Landed cost = 150,000 + 88,481.25 + 20,000 + 26,255.65 + 5,000 = 289,736.90
      expect(result.landedCost).toBe(289736.9);
    });

    it('should not apply ENV for diesel below threshold', () => {
      const params: Inputs = {
        country: 'NA',
        cif: 100000,
        fuel: 'diesel',
        co2: 130, // Below 140 threshold
        rrp: 150000,
        containerCars: 1,
        japanSideCosts: 15000,
        localClearingCosts: 26255.65
      };

      const result = calcNA(params);

      expect(result.env).toBe(0);
    });
  });

  describe('South Africa (ZA)', () => {
    it('should calculate duties for used vehicle without CO2 levy', () => {
      const params: Inputs = {
        country: 'ZA',
        cif: 200000,
        fuel: 'petrol',
        co2: 180,
        rrp: 350000,
        isNewVehicle: false,
        containerCars: 1,
        japanSideCosts: 25000,
        localClearingCosts: 35000
      };

      const result = calcZA(params);

      // Duty = 25% × 200,000 = 50,000
      expect(result.duty).toBe(50000);

      // No CO2 levy for used vehicles
      expect(result.co2Levy).toBe(0);

      // ADV = ((0.00003 × 350,000) - 0.75)% × 350,000
      // = (10.5 - 0.75)% × 350,000 = 9.75% × 350,000 = 34,125
      expect(result.adv).toBe(34125);

      // VAT = 15% × [(200,000 × 1.10) + 50,000 + 34,125]
      // = 15% × [220,000 + 50,000 + 34,125] = 15% × 304,125 = 45,618.75
      expect(result.vat).toBe(45618.75);

      // Should include warning about ITAC permit
      expect(result.breakdownNotes).toContain(
        'Used vehicle imports to South Africa generally require an ITAC import permit under limited categories.'
      );
    });

    it('should apply CO2 levy for new vehicles', () => {
      const params: Inputs = {
        country: 'ZA',
        cif: 300000,
        fuel: 'petrol',
        co2: 200,
        rrp: 500000,
        isNewVehicle: true,
        containerCars: 1,
        japanSideCosts: 30000,
        localClearingCosts: 35000
      };

      const result = calcZA(params);

      // CO2 levy = (200 - 120) × 120 = 9,600
      expect(result.co2Levy).toBe(9600);

      // VAT should include CO2 levy in base
      const expectedVatBase = (300000 * 1.10) + 75000 + 42750 + 9600;
      expect(result.vat).toBe(expectedVatBase * 0.15);
    });
  });

  describe('Botswana (BW)', () => {
    it('should calculate with 12% VAT and no uplift', () => {
      const params: Inputs = {
        country: 'BW',
        cif: 180000,
        fuel: 'diesel',
        rrp: 300000,
        containerCars: 2,
        japanSideCosts: 22000,
        localClearingCosts: 18000
      };

      const result = calcBW(params);

      // Duty = 25% × 180,000 = 45,000
      expect(result.duty).toBe(45000);

      // ADV = ((0.00003 × 300,000) - 0.75)% × 300,000
      // = (9 - 0.75)% × 300,000 = 8.25% × 300,000 = 24,750
      expect(result.adv).toBe(24750);

      // VAT = 12% × [180,000 + 45,000 + 24,750] (no uplift)
      // = 12% × 249,750 = 29,970
      expect(result.vat).toBe(29970);

      // No environmental levy for Botswana
      expect(result.env).toBe(0);
    });

    it('should cap ADV at 30%', () => {
      const params: Inputs = {
        country: 'BW',
        cif: 500000,
        fuel: 'petrol',
        rrp: 2000000, // High RRP to trigger cap
        containerCars: 1,
        japanSideCosts: 50000,
        localClearingCosts: 18000
      };

      const result = calcBW(params);

      // ADV should be capped at 30% of 2,000,000 = 600,000
      expect(result.adv).toBe(600000);
    });
  });

  describe('Zambia (ZM)', () => {
    it('should apply specific duty from table', () => {
      const params: Inputs = {
        country: 'ZM',
        cif: 120000,
        fuel: 'petrol',
        containerCars: 1,
        japanSideCosts: 18000,
        localClearingCosts: 45000,
        zm: {
          type: 'passenger',
          cc: 1800,
          ageYears: 4,
          exciseRate: 30,
          isEV: false,
          isHybrid: false
        }
      };

      const result = calcZM(params);

      // Duty should match table: passenger, 1501-2000cc, 3-5 years = 30,000
      expect(result.duty).toBe(30000);

      // Excise = 30% × (120,000 + 30,000) = 45,000
      expect(result.excise).toBe(45000);

      // VAT = 16% × [120,000 + 30,000 + 45,000] = 31,200
      expect(result.vat).toBe(31200);

      // No ADV for Zambia
      expect(result.adv).toBe(0);
    });

    it('should apply zero duty for EVs', () => {
      const params: Inputs = {
        country: 'ZM',
        cif: 200000,
        fuel: 'petrol',
        containerCars: 1,
        japanSideCosts: 30000,
        localClearingCosts: 45000,
        zm: {
          type: 'passenger',
          cc: 0,
          ageYears: 2,
          exciseRate: 30,
          isEV: true,
          isHybrid: false
        }
      };

      const result = calcZM(params);

      expect(result.duty).toBe(0);
      expect(result.excise).toBe(0);
      expect(result.breakdownNotes).toContain(
        'Electric vehicles receive zero customs duty and reduced excise in Zambia.'
      );
    });

    it('should apply reduced excise for hybrids', () => {
      const params: Inputs = {
        country: 'ZM',
        cif: 150000,
        fuel: 'petrol',
        containerCars: 1,
        japanSideCosts: 20000,
        localClearingCosts: 45000,
        zm: {
          type: 'passenger',
          cc: 1500,
          ageYears: 1,
          exciseRate: 30,
          isEV: false,
          isHybrid: true
        }
      };

      const result = calcZM(params);

      // Duty from table: passenger, 0-1500cc, 0-2 years = 15,000
      expect(result.duty).toBe(15000);

      // Hybrid excise = (150,000 + 15,000) × 15% = 24,750
      expect(result.excise).toBe(24750);

      expect(result.breakdownNotes).toContain(
        'Hybrid vehicles receive reduced excise duty in Zambia.'
      );
    });
  });

  describe('Multi-country comparison', () => {
    const baseCIF = 200000;
    const baseRRP = 350000;

    it('should show different VAT rates', () => {
      const baseParams = {
        cif: baseCIF,
        fuel: 'petrol' as const,
        co2: 150,
        rrp: baseRRP,
        containerCars: 1,
        japanSideCosts: 25000,
        localClearingCosts: 30000
      };

      const naResult = calcNA({ ...baseParams, country: 'NA' });
      const zaResult = calcZA({ ...baseParams, country: 'ZA', isNewVehicle: false });
      const bwResult = calcBW({ ...baseParams, country: 'BW' });
      const zmResult = calcZM({
        ...baseParams,
        country: 'ZM',
        zm: { type: 'passenger', cc: 1800, ageYears: 3, exciseRate: 30 }
      });

      // Check different VAT calculations
      expect(naResult.vat).toBeGreaterThan(0); // 15% with uplift
      expect(zaResult.vat).toBeGreaterThan(0); // 15% with uplift
      expect(bwResult.vat).toBeGreaterThan(0); // 12% no uplift
      expect(zmResult.vat).toBeGreaterThan(0); // 16% no uplift

      // Botswana should have lowest VAT (12% rate)
      expect(bwResult.vat).toBeLessThan(naResult.vat);
      expect(bwResult.vat).toBeLessThan(zmResult.vat);
    });
  });
});

// Test data export for manual verification
export const testCases = {
  namibia: {
    input: {
      country: 'NA' as const,
      cif: 150000,
      fuel: 'petrol' as const,
      co2: 150,
      rrp: 250000,
      containerCars: 3,
      japanSideCosts: 20000,
      localClearingCosts: 26255.65,
      inlandDelivery: 5000
    },
    expectedOutput: {
      duty: 37500,
      env: 1200,
      adv: 16875,
      vat: 32906.25,
      totalTaxes: 88481.25,
      landedCost: 289736.90 / 3 + 150000 + 88481.25 + 20000 + 5000
    }
  },
  southAfrica: {
    input: {
      country: 'ZA' as const,
      cif: 200000,
      fuel: 'diesel' as const,
      co2: 160,
      rrp: 350000,
      isNewVehicle: true,
      containerCars: 2,
      japanSideCosts: 25000,
      localClearingCosts: 35000
    },
    expectedOutput: {
      duty: 50000,
      co2Levy: 4800, // (160-120)*120
      adv: 34125,
      vat: 'calculated',
      note: 'New vehicle with CO2 levy'
    }
  },
  botswana: {
    input: {
      country: 'BW' as const,
      cif: 180000,
      fuel: 'petrol' as const,
      rrp: 300000,
      containerCars: 1,
      japanSideCosts: 22000,
      localClearingCosts: 18000
    },
    expectedOutput: {
      duty: 45000,
      adv: 24750,
      vat: 29970,
      totalTaxes: 99720,
      note: '12% VAT with no uplift'
    }
  },
  zambia: {
    input: {
      country: 'ZM' as const,
      cif: 150000,
      fuel: 'diesel' as const,
      containerCars: 4,
      japanSideCosts: 20000,
      localClearingCosts: 45000,
      zm: {
        type: 'suv' as const,
        cc: 2500,
        ageYears: 6,
        exciseRate: 35,
        isEV: false,
        isHybrid: false
      }
    },
    expectedOutput: {
      duty: 65000, // From table: SUV 2001-3000cc, 6-10 years
      excise: 75250, // 35% × (150000 + 65000)
      vat: 46440, // 16% × (150000 + 65000 + 75250)
      totalTaxes: 186690,
      note: 'Specific duty from ZRA table'
    }
  }
};