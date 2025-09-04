// This file configures the initialization of Sentry on the server side.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Environment
  environment: process.env.NODE_ENV,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
  
  // Additional options for server-side
  autoSessionTracking: true,

  // Filter sensitive data
  beforeSend(event, hint) {
    // Remove sensitive data from events
    if (event.request) {
      // Remove auth headers
      if (event.request.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
      }
      // Remove sensitive query params
      if (event.request.query_string) {
        event.request.query_string = event.request.query_string.replace(
          /api_key=[^&]+/g,
          'api_key=[FILTERED]'
        );
      }
    }

    // Filter out non-critical errors
    if (event.exception) {
      const error = hint.originalException;
      if (error && typeof error === 'object' && 'statusCode' in error) {
        // Don't send 404 errors
        if (error.statusCode === 404) {
          return null;
        }
      }
    }

    return event;
  },
});