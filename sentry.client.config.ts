// This file configures the initialization of Sentry on the client side.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore certain errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Facebook related errors
    'fb_xd_fragment',
    // Chrome extensions
    'Non-Error promise rejection captured',
    // Network errors
    'Network request failed',
    'NetworkError',
    'Failed to fetch',
  ],

  beforeSend(event, hint) {
    // Modify or filter events before sending to Sentry
    if (event.exception) {
      const error = hint.originalException;
      // Filter out non-critical errors
      if (error && error.message && error.message.includes('ResizeObserver')) {
        return null;
      }
    }
    return event;
  },
});