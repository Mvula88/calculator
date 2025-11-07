# Stripe Pricing Configuration Guide

## Important: Displayed Prices Must Match Stripe Configuration

The following prices are displayed in the application and must be configured in your Stripe dashboard:

### BLACK NOVEMBER SALE PRICES (Valid until Nov 30, 2025)

#### Import Mastery (Current Sale Prices)
- **Namibia (NA)**: N$550 / $32 USD (BLACK NOVEMBER - was N$1,500)
- **South Africa (ZA)**: R550 / $32 USD (BLACK NOVEMBER - was R1,500)
- **Botswana (BW)**: P422 / $32 USD (BLACK NOVEMBER - was P1,151)
- **Zambia (ZM)**: K750 / $32 USD (BLACK NOVEMBER - was K2,043)

**IMPORTANT**: You need to create new Stripe products/prices for these sale prices OR update existing ones:
- Create new price: $32 USD (3200 cents) for each country
- Or update existing Mastery prices temporarily
- Remember to revert back to $87 USD on December 1, 2025

### Previous Prices (to restore Dec 1, 2025)
- **Namibia (NA)**: N$1,500 / $87 USD
- **South Africa (ZA)**: R1,500 / $87 USD
- **Botswana (BW)**: P1,151 / $87 USD
- **Zambia (ZM)**: K2,043 / $87 USD

### Mistake Guide Prices (PAUSED - not actively used)
- **Namibia (NA)**: N$499 (price_1S3tjDK8Avs5uFkK6aBQNdWx)
- **South Africa (ZA)**: R499 (price_1S3tkXK8Avs5uFkKTXRCJJuk)
- **Botswana (BW)**: P404 (price_1S3toYK8Avs5uFkKKRXTeM0g)
- **Zambia (ZM)**: K500 (price_1S3txCK8Avs5uFkKcxVrjVWP)

## Stripe Dashboard Configuration

1. Log into your Stripe Dashboard
2. Navigate to Products → All Products
3. For each product, verify the price matches the amounts above
4. If prices don't match, create new price IDs and update the .env.local file

## Compliance Notes

✅ **DO**: 
- Display actual prices that match Stripe configuration
- Show value propositions ("Save thousands on imports")
- Highlight real benefits and features

❌ **DON'T**:
- Show fake "original" prices that were never charged
- Use false urgency ("ends today" when it doesn't)
- Display time-limited offers that aren't actually time-limited
- Show fake purchase notifications
- Claim false scarcity

## Testing Prices

To verify prices are correctly configured:

1. Test each country's checkout flow
2. Verify the Stripe checkout shows the same price as displayed
3. Complete a test purchase to ensure the correct amount is charged

## Environment Variables

Ensure these are set in your .env.local and production environment:

```env
# Mistake Guide Price IDs
STRIPE_PRODUCT_NA_MISTAKE=price_1S3tjDK8Avs5uFkK6aBQNdWx
STRIPE_PRODUCT_ZA_MISTAKE=price_1S3tkXK8Avs5uFkKTXRCJJuk
STRIPE_PRODUCT_BW_MISTAKE=price_1S3toYK8Avs5uFkKKRXTeM0g
STRIPE_PRODUCT_ZM_MISTAKE=price_1S3txCK8Avs5uFkKcxVrjVWP

# Import Mastery Price IDs
STRIPE_PRODUCT_NA_MASTERY=price_1S3u8ZK8Avs5uFkKvpjaeLYA
STRIPE_PRODUCT_ZA_MASTERY=price_1S3u9pK8Avs5uFkKNAxA1GdK
STRIPE_PRODUCT_BW_MASTERY=price_1S3uC8K8Avs5uFkKxL54iq8Q
STRIPE_PRODUCT_ZM_MASTERY=price_1S3uDaK8Avs5uFkKusc8RdlK
```

## Updates Made for Compliance

1. ✅ Removed all fake crossed-out "original" prices
2. ✅ Removed "today only" and false urgency claims
3. ✅ Changed purchase notifications to import success stories
4. ✅ Removed false scarcity counters
5. ✅ Updated to show value propositions instead of fake discounts
6. ✅ Removed money-back guarantees (per no-refund policy)