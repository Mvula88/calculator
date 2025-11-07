# Quick Stripe Setup for Black November Sale

## 🔥 URGENT: Complete This Before Going Live

Your website is ready, but Stripe needs to be configured with the new $32 USD pricing.

---

## Step-by-Step Stripe Configuration

### 1. Login to Stripe

Go to: https://dashboard.stripe.com

### 2. Navigate to Products

Click **Products** in the left sidebar → **All Products**

### 3. Find Your Import Mastery Product

Look for your existing product (probably named "Import Mastery" or similar)

### 4. Add New Sale Price

For the Import Mastery product:

1. Click **Add another price**
2. **Price model:** Standard pricing
3. **Price:** `32.00`
4. **Billing period:** One time
5. **Currency:** USD
6. **Description/Label:** "Black November Sale 2025"
7. Click **Add price**

### 5. Copy the New Price ID

After creating the price:
- Stripe will generate a price ID like: `price_1XxxxxxxxxxxxxxxXXX`
- **COPY THIS ID** - you'll need it next

### 6. Repeat for All Countries (if using different products)

If you have separate products for each country, repeat step 4-5 for:
- Namibia product → $32 USD
- South Africa product → $32 USD
- Botswana product → $32 USD
- Zambia product → $32 USD

---

## Environment Variable Update

### Method 1: Using Vercel Dashboard (Recommended)

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Find and update these variables:

```
STRIPE_PRODUCT_NA_MASTERY = price_XXXXX_your_new_namibia_32usd_price_id
STRIPE_PRODUCT_ZA_MASTERY = price_XXXXX_your_new_sa_32usd_price_id
STRIPE_PRODUCT_BW_MASTERY = price_XXXXX_your_new_botswana_32usd_price_id
STRIPE_PRODUCT_ZM_MASTERY = price_XXXXX_your_new_zambia_32usd_price_id
```

4. Click **Save**
5. **Redeploy your application** (Vercel will prompt you)

### Method 2: Using .env.local (Local Development)

Update your `.env.local` file:

```env
# BLACK NOVEMBER SALE PRICES (Nov 8-30, 2025)
STRIPE_PRODUCT_NA_MASTERY=price_XXXXX_new_namibia
STRIPE_PRODUCT_ZA_MASTERY=price_XXXXX_new_sa
STRIPE_PRODUCT_BW_MASTERY=price_XXXXX_new_botswana
STRIPE_PRODUCT_ZM_MASTERY=price_XXXXX_new_zambia

# SAVE THESE! Restore on Dec 1, 2025
# OLD_STRIPE_PRODUCT_NA_MASTERY=price_1S3u8ZK8Avs5uFkKvpjaeLYA
# OLD_STRIPE_PRODUCT_ZA_MASTERY=price_1S3u9pK8Avs5uFkKNAxA1GdK
# OLD_STRIPE_PRODUCT_BW_MASTERY=price_1S3uC8K8Avs5uFkKxL54iq8Q
# OLD_STRIPE_PRODUCT_ZM_MASTERY=price_1S3uDaK8Avs5uFkKusc8RdlK
```

---

## Testing Checklist

Before going live, test the checkout:

### Test Mode Purchase

1. In Stripe Dashboard, make sure you're in **Test mode** (toggle at top)
2. Go to your website: https://your-site.vercel.app
3. Click "Get Lifetime Access - $32 USD"
4. You should be redirected to Stripe checkout
5. **Verify the price shows $32.00 USD**
6. Use test card: `4242 4242 4242 4242`
7. Expiry: Any future date (e.g., 12/25)
8. CVC: Any 3 digits (e.g., 123)
9. Complete the purchase
10. Check if you're redirected back and given portal access

### Live Mode Checklist

Once test mode works:

1. Switch Stripe to **Live mode**
2. Verify your bank account is connected (for payouts)
3. Make sure you have live price IDs (not test ones)
4. Update production environment variables with live price IDs
5. Do ONE real test purchase yourself (you can refund it later)

---

## Quick Troubleshooting

### Problem: Checkout shows $87 instead of $32

**Solution:**
- Double-check your environment variables have the NEW price IDs
- Redeploy your application after changing env variables
- Clear your browser cache

### Problem: "Invalid price ID" error

**Solution:**
- Make sure you're using LIVE price IDs in production
- Test price IDs (start with `price_test_`) only work in test mode
- Copy the correct price ID from Stripe dashboard

### Problem: Payment succeeds but user can't access portal

**Solution:**
- Check your webhook is configured correctly
- Go to Stripe Dashboard → Developers → Webhooks
- Verify the endpoint URL is correct
- Check webhook signing secret is in your env variables

---

## December 1st - Price Revert

**SET A CALENDAR REMINDER NOW!**

On December 1, 2025:

1. Go back to Stripe Dashboard
2. Your old $87 prices should still be there (archived)
3. Unarchive the $87 prices
4. Update environment variables back to old price IDs
5. Update codebase prices (or I can help with this later)
6. Redeploy

**OR:** Simply update the env variables to point to the old price IDs and redeploy.

---

## Important Notes

- **Do NOT delete old prices** - just archive them and create new ones
- **Save old price IDs** - you'll need them after the sale
- **Test in test mode first** - don't skip testing
- **Monitor first 5 purchases** - make sure amounts are correct
- **Webhook must be working** - otherwise users won't get access

---

## Need Help?

If you get stuck:

1. Check Stripe Dashboard → Logs for error messages
2. Check Vercel deployment logs for issues
3. Test in Stripe test mode first
4. Verify all environment variables are set correctly
5. Make sure webhooks are configured

---

## Simple 5-Minute Setup (if everything is already configured)

If your Stripe is already working and you just need to change the price:

1. ✅ Create new $32 price in Stripe
2. ✅ Copy the price ID
3. ✅ Update STRIPE_PRODUCT_XX_MASTERY in Vercel env variables
4. ✅ Redeploy
5. ✅ Test one purchase
6. ✅ Go live!

**That's it!** 🚀

---

*Time required: 5-10 minutes*
*Complexity: Easy (just updating prices)*
*Risk: Low (you can always revert)*
