# Adding Offline Payment Users

## Overview
When customers pay you offline (cash, bank transfer, EFT, etc.), you can manually grant them access to the platform.

## Step-by-Step Instructions

### 1. Access the Admin Page
Go to: **https://www.impota.com/admin/add-user**

### 2. Enter User Details
Fill in the form with:
- **Admin Secret Key**: `ImpotaAdmin2025SecureKey` (from .env.local)
- **User Email**: The customer's email address
- **Access Tier**:
  - `Mastery` = Full Access ($49 / N$ 850)
  - `Mistake` = Mistakes Only ($19 / N$ 370)
- **Country**: Select their country (NA/ZA/BW/ZM)
- **Payment Method** (Optional): e.g., "Cash", "Bank Transfer", "EFT"
- **Amount Paid** (Optional): e.g., "N$ 850"

### 3. Click "Grant Access"
The user will immediately get access when they log in with their email.

---

## Alternative: API Method

You can also add users via API call:

```bash
curl -X POST https://www.impota.com/api/admin/add-offline-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "tier": "mastery",
    "country": "na",
    "paymentMethod": "Bank Transfer",
    "amount": "N$ 850",
    "adminSecret": "ImpotaAdmin2025SecureKey"
  }'
```

---

## Security Notes

⚠️ **IMPORTANT:**
- Keep your `ADMIN_SECRET` private
- Never share it in public repos or messages
- Change it if compromised (update .env.local)
- Only you should have access to /admin/add-user page

---

## Checking If User Already Has Access

The system will prevent you from adding duplicate access. If a user already has active access, you'll see an error message.

---

## What Happens After Adding User?

1. User record created in `entitlements` table
2. Marked as `active = true`
3. Session ID: `offline_[timestamp]` (to differentiate from Stripe payments)
4. User can log in with their email immediately
5. They get full access to their tier content

---

## Troubleshooting

**"Unauthorized" error:**
- Check your admin secret is correct
- Make sure it matches .env.local

**"User already has active access":**
- User is already in the system
- Check Supabase database to verify

**"Failed to create entitlement":**
- Check Supabase connection
- Verify database permissions

---

## Tracking Offline Payments

All offline payments are stored in the database with:
- `stripe_session_id`: `offline_[timestamp]`
- `metadata.payment_method`: Your entered payment method
- `metadata.amount`: Amount paid
- `metadata.added_by`: "admin"
- `metadata.added_at`: Timestamp

You can query these in Supabase to track all offline sales.
