# ✅ PRODUCTION TEST CHECKLIST

**Date:** September 3, 2025
**Platform:** ImportCalc SADC
**Test Environment:** https://calculator-six-omega-56.vercel.app

## 🧪 FEATURE TESTING CHECKLIST

### 1. Authentication Flow ⬜
- [ ] User can register with email/password
- [ ] Registration creates Supabase account
- [ ] Login works with correct credentials
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] After login, redirects to intended page

### 2. Payment Flow ⬜
- [ ] Pricing page shows correct price (N$1,499)
- [ ] Checkout page loads Stripe elements
- [ ] Test card: 4242 4242 4242 4242
- [ ] Payment processes successfully
- [ ] Webhook updates purchase in database
- [ ] User gets access after payment
- [ ] No refunds policy clearly shown

### 3. Multi-Country Support ⬜
- [ ] Country selector works in header
- [ ] Prices show in local currency
- [ ] Calculator uses country-specific costs
- [ ] Country preference saves in cookie
- [ ] Landing page shows country-specific content

### 4. Calculator Features ⬜
- [ ] All input fields accept values
- [ ] Calculations update in real-time
- [ ] All 27 costs are calculated
- [ ] Save calculation works (saves to DB)
- [ ] PDF export generates correctly
- [ ] PDF includes all details
- [ ] Currency displays correctly

### 5. WhatsApp Integration ⬜
- [ ] Floating WhatsApp button visible
- [ ] Clicking opens WhatsApp with number: +264813214813
- [ ] Pre-filled message includes country
- [ ] Works on mobile and desktop

### 6. Legal Pages ⬜
- [ ] Terms of Service loads (/terms)
- [ ] Privacy Policy loads (/privacy)
- [ ] Refund Policy loads (/refund)
- [ ] Footer links work
- [ ] Contact info shows: +264 81 321 4813

### 7. Dashboard ⬜
- [ ] Dashboard shows after login
- [ ] Displays user email
- [ ] Shows purchase status
- [ ] Calculator access button works
- [ ] Saved calculations appear

### 8. Mobile Responsiveness ⬜
- [ ] Landing page responsive
- [ ] Calculator works on mobile
- [ ] Country selector works on mobile
- [ ] WhatsApp button positioned correctly
- [ ] Payment form responsive

### 9. Error Handling ⬜
- [ ] 404 page works for invalid routes
- [ ] Error messages show for failed login
- [ ] Payment failure handled gracefully
- [ ] Network errors don't crash app

### 10. Performance ⬜
- [ ] Pages load within 3 seconds
- [ ] No console errors
- [ ] Images load properly
- [ ] No broken links

## 🔐 SECURITY CHECKS

### API Security ⬜
- [ ] API routes require authentication
- [ ] Database queries are parameterized
- [ ] No sensitive data in responses
- [ ] CORS configured properly

### Data Protection ⬜
- [ ] SSL certificate active (HTTPS)
- [ ] Passwords hashed (Supabase handles)
- [ ] No API keys exposed in frontend
- [ ] Environment variables secure

## 📱 BROWSER TESTING

### Desktop Browsers ⬜
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers ⬜
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Samsung Internet

## 🚀 PRE-LAUNCH CHECKLIST

### Before Going Live ⬜
- [ ] Switch to Stripe production keys
- [ ] Update WhatsApp to real number ✅ (+264813214813)
- [ ] Remove test data from database
- [ ] Set up error monitoring (optional)
- [ ] Backup database
- [ ] Document admin credentials

### Stripe Production Setup ⬜
1. Log into Stripe Dashboard
2. Switch to Live mode
3. Create products and prices:
   - Calculator Pro: N$1,499
4. Update .env.local:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   STRIPE_SECRET_KEY=sk_live_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
5. Add webhook endpoint: https://yourdomain.com/api/stripe/webhook
6. Test with real card (small amount)

## 🐛 KNOWN ISSUES

### Minor Issues (Non-blocking)
- Calculator bundle size large (533KB)
- Some guide pages empty (placeholder)
- Email notifications not implemented

### Fixed Issues ✅
- Duplicate calculateTotal function
- WhatsApp number updated
- No refunds policy implemented
- Legal pages added
- PDF export working

## 📝 TEST RESULTS

### Test Date: _____________
### Tester: _____________

### Overall Status: ⬜ PASS / ⬜ FAIL

### Critical Issues Found:
1. _________________________________
2. _________________________________
3. _________________________________

### Notes:
_____________________________________
_____________________________________
_____________________________________

## 🎯 LAUNCH READINESS

- [ ] All critical features tested
- [ ] No blocking bugs found
- [ ] Legal compliance confirmed
- [ ] Payment system verified
- [ ] Support contact working

### Final Verdict: ⬜ READY / ⬜ NOT READY

**Signature:** _______________ **Date:** _______________