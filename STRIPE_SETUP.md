# Stripe Product Setup Guide

## How to Create Your Products in Stripe Dashboard

### 1. Calculator Pro (Basic Plan) - N$499
1. Go to Stripe Dashboard > Products
2. Click "Add Product"
3. Fill in:
   - **Name**: Calculator Pro + Import Guide
   - **Description**: Complete import calculator with all 27 hidden costs + import mastery guide
   - **Price**: 499.00 NAD (one-time)
   - **Price ID**: Will be auto-generated (e.g., `price_1QjABC...`)
4. Copy the Price ID to `.env.local` as `STRIPE_PRICE_CALCULATOR_PRO`

### 2. Avoid My Mistake Guide - N$499
1. Add new product:
   - **Name**: Avoid My Mistake Guide
   - **Description**: Complete consignee disaster story + verification guide
   - **Price**: 499.00 NAD (one-time)
2. Copy Price ID to `STRIPE_PRICE_AVOID_MISTAKE`

### 3. Translation Provider Access - N$150
1. Add new product:
   - **Name**: Translation Provider Access
   - **Description**: Professional auction sheet translators + grade verification experts
   - **Price**: 150.00 NAD (one-time)
2. Copy Price ID to `STRIPE_PRICE_TRANSLATION`

### 4. Hidden Platform Access - N$14,999
1. Add new product:
   - **Name**: Hidden Platform Access (Application Required)
   - **Description**: Secret platforms with 40% cheaper cars - Limited to 20 members
   - **Price**: 14,999.00 NAD (one-time)
2. Copy Price ID to `STRIPE_PRICE_HIDDEN_PLATFORMS`

## Setting Up Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Set endpoint URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

## Testing in Development

For local testing with Stripe CLI:
```bash
stripe listen --forward-to localhost:3003/api/stripe/webhook
```

## Environment Variables for Vercel

Add these to your Vercel project settings:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (after creating products)
STRIPE_PRICE_CALCULATOR_PRO=price_...
STRIPE_PRICE_AVOID_MISTAKE=price_...
STRIPE_PRICE_TRANSLATION=price_...
STRIPE_PRICE_HIDDEN_PLATFORMS=price_...
```

## Currency Note

If NAD (Namibian Dollar) is not available in your Stripe account, you can use:
- **ZAR** (South African Rand) - 1:1 with NAD
- **USD** with converted prices:
  - N$499 ≈ $27 USD
  - N$150 ≈ $8 USD
  - N$14,999 ≈ $810 USD

## Testing Cards

For testing payments:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155