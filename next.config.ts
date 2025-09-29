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
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // Cache images for 24 hours
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-select'],
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
