import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  experimental: {
    instrumentationHook: true,
  },
};

// Sentry configuration wrapper with minimal required options
export default withSentryConfig(nextConfig, {
  // Suppresses source map uploading logs during build
  silent: true,
  
  // Organization and project from your Sentry account (required for source maps)
  org: process.env.SENTRY_ORG || 'ortios-llc',
  project: process.env.SENTRY_PROJECT || 'calculator',
  
  // Auth token for uploading source maps (optional in development)
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Disable source map uploading if no auth token
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});
