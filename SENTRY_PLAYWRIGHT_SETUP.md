# Playwright & Sentry Setup Guide

## ✅ Playwright Testing Framework

Playwright has been installed and configured for end-to-end testing.

### Installation Complete
- Playwright test framework installed
- Test configuration created
- Example tests written

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests with browser visible
npm run test:headed

# Install Playwright browsers (if needed)
npm run playwright:install
```

### Test Files Created
- `tests/calculator.spec.ts` - Calculator page tests
- `tests/auth.spec.ts` - Authentication flow tests  
- `tests/pricing.spec.ts` - Pricing page tests

### Configuration
- `playwright.config.ts` - Main Playwright configuration
- Tests run against localhost:3003 in development
- Tests run against production URL in CI
- Configured for Chrome, Firefox, Safari, and mobile browsers

## ✅ Sentry Error Monitoring

Sentry has been installed and configured for error tracking and performance monitoring.

### Installation Complete
- @sentry/nextjs package installed
- Configuration files created
- Error boundaries set up

### Configuration Files Created
- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking
- `app/global-error.tsx` - Global error boundary
- `app/api/sentry/route.ts` - Manual error logging endpoint

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### Getting Sentry Credentials

1. **Create a Sentry Account**
   - Go to https://sentry.io/signup/
   - Create a free account

2. **Create a Project**
   - Click "Create Project"
   - Select "Next.js" as platform
   - Name it "importcalc-sadc"

3. **Get Your DSN**
   - Go to Settings → Projects → importcalc-sadc → Client Keys
   - Copy the DSN value

4. **Get Auth Token**
   - Go to Settings → Account → API → Auth Tokens
   - Create a new token with project:write scope

5. **Get Organization & Project Names**
   - Organization: Your username or org name
   - Project: "importcalc-sadc"

### Features Configured

#### Client-Side
- Automatic error capture
- Performance monitoring
- Session replay on errors
- Network error filtering
- Browser extension error filtering

#### Server-Side
- API error tracking
- Database error monitoring
- Sensitive data filtering (auth headers, cookies)
- 404 error filtering

#### Additional Features
- Source map uploading (production)
- Ad-blocker circumvention via /monitoring route
- Automatic Vercel cron monitoring
- Custom error logging endpoint

### Testing Sentry

1. **Test Error Capture**
   ```bash
   # Visit this endpoint to test Sentry
   curl http://localhost:3003/api/sentry
   ```

2. **Manual Error Logging**
   ```javascript
   // From your frontend code
   fetch('/api/sentry', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       message: 'Test error',
       level: 'error',
       user: { email: 'user@example.com' },
       extra: { context: 'testing' }
     })
   })
   ```

### Monitoring in Production

Once deployed with proper environment variables:
1. All unhandled errors will be captured
2. Performance metrics will be tracked
3. You'll receive alerts for errors
4. Access dashboard at https://sentry.io

## Next Steps

1. **Set up Sentry account** and add credentials to `.env.local`
2. **Run Playwright tests** with `npm test`
3. **Deploy to production** to start error monitoring
4. **Configure alerts** in Sentry dashboard

## Important Notes

- Sentry will only work with valid credentials
- Playwright tests need browsers installed (`npm run playwright:install`)
- Tests run in development mode bypass authentication
- Production tests will need real test accounts