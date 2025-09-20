import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Suppress hydration warnings from browser extensions
  reactStrictMode: true,
  // Image optimization
  images: {
    domains: ['impota.com'],
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
