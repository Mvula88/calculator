# Multi-Currency Setup Guide

## How It Works

Your platform now automatically shows prices in the visitor's local currency while using your US Stripe account.

### Currency Detection Flow:
1. User visits from Namibia → Sees N$1,499
2. User visits from South Africa → Sees R1,499  
3. User visits from Botswana → Sees P1,139 (1,499 × 0.76)
4. User visits from Zambia → Sees K2,015 (1,499 × 1.344)

### Payment Processing:
1. Customer clicks "Get Access" 
2. Stripe checkout opens with their local currency
3. Customer pays in their currency
4. Stripe converts to USD for your US bank account
5. You receive USD minus conversion fee (~2%)

## Implementation Details

### 1. Dynamic Pricing (`lib/stripe/pricing.ts`)
```typescript
// Base prices in NAD
export const BASE_PRICES = {
  calculator_pro: 1499,    // N$1,499
  avoid_mistake: 499,      // N$499
  translation: 150,        // N$150
  hidden_platforms: 14999, // N$14,999
}
```

### 2. Exchange Rates (`lib/country-context.tsx`)
Exchange rates (how many units of foreign currency per 1 NAD):
- Namibia (NAD): 1.0 (base currency)
- South Africa (ZAR): 1.0 (pegged to NAD)
- Botswana (BWP): 0.76 (1 NAD = 0.76 BWP, or 1 BWP = 1.31 NAD)
- Zambia (ZMW): 1.344 (1 NAD = 1.344 ZMW)

## Stripe Configuration

### Option 1: Dynamic Pricing (Currently Implemented)
- One base price (NAD)
- Converts dynamically based on country
- Stripe processes in detected currency
- Converts to USD for settlement

### Option 2: Multiple Price IDs (Alternative)
Create separate prices in Stripe Dashboard:
1. Go to Stripe Dashboard → Products
2. Create product "Import Calculator Pro"
3. Add prices:
   - N$1,499 NAD for Namibia
   - R1,499 ZAR for South Africa
   - P1,499 BWP for Botswana
   - K24,999 ZMW for Zambia

## Testing Multi-Currency

### Local Testing:
```bash
# Test with different countries
# Add ?country=south-africa to any URL
http://localhost:3003/pricing?country=south-africa
http://localhost:3003/pricing?country=botswana
http://localhost:3003/pricing?country=zambia
```

### Test Stripe Checkout:
1. Use test cards for different currencies:
   - `4000 0027 6000 3184` - NAD (Namibia)
   - `4000 0056 0000 0042` - ZAR (South Africa)
   - Any test card works for testing

## Updating Exchange Rates

Edit `lib/country-context.tsx`:
```typescript
'south-africa': {
  code: 'ZA',
  name: 'South Africa',
  currency: 'ZAR',
  symbol: 'R',
  exchangeRate: 1.0, // Update this based on NAD/ZAR rate
},
```

## Revenue Calculations

### Example Conversions:
**Namibia/South Africa (N$1,499 / R1,499):**
- Stripe converts to USD: ~$80
- Stripe fees: ~$2.90 (2.9% + $0.30)
- Currency conversion: ~$1.60 (2%)
- You receive: ~$75.50 USD

**Botswana (P1,139):**
- Stripe converts to USD: ~$83
- After fees: ~$78 USD

**Zambia (K2,015):**
- Stripe converts to USD: ~$74
- After fees: ~$70 USD

### Monthly Revenue Estimate (100 sales):
- Gross: $8,000 USD
- Stripe fees: $290
- Conversion fees: $160  
- Net: ~$7,550 USD

## Best Practices

### 1. Price Consistency
Keep prices psychologically consistent:
- N$1,499 (not N$1,500)
- R1,499 (not R1,500)
- Same numerical value, different currency

### 2. Display Currency Clearly
Always show currency symbol AND code:
- "N$1,499 NAD"
- "R1,499 ZAR"

### 3. Update Regularly
Review exchange rates monthly if you want exact parity.

### 4. Legal Compliance
- Register for VAT if required in each country
- Keep records of all international sales
- Consult tax advisor for cross-border sales

## Troubleshooting

### Price Not Showing in Local Currency?
1. Check country detection in browser console
2. Verify exchange rates in `country-context.tsx`
3. Clear browser cache and cookies

### Stripe Checkout Wrong Currency?
1. Ensure `country` parameter is passed to checkout API
2. Check Stripe Dashboard for currency settings
3. Verify your Stripe account supports the currency

### Currency Conversion Issues?
1. Stripe automatically handles conversion
2. Check Stripe Dashboard → Balance → Currency
3. Contact Stripe Support for conversion rates

## FAQ

**Q: Can I charge different amounts per country?**
A: Yes! Adjust the `exchangeRate` in country-context.tsx

**Q: Will Stripe block multi-currency from US account?**
A: No, it's a supported feature.

**Q: How do refunds work?**
A: Stripe refunds in the original currency charged.

**Q: Can I add more countries?**
A: Yes, add them to `COUNTRIES` object in country-context.tsx

## Support

For currency issues:
- Stripe Support: support.stripe.com
- Platform Issues: Use WhatsApp button

## Next Steps

1. ✅ Test checkout with each currency
2. ✅ Verify prices display correctly
3. ✅ Monitor first few transactions
4. 📊 Track conversion rates by country
5. 💰 Optimize pricing based on data