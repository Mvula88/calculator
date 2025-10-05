import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { homepageMetadata } from '@/lib/seo/metadata'
import StructuredData from '@/components/seo/StructuredData'
import ConditionalFooter from '@/components/ConditionalFooter'
import ScrollToTop from '@/components/ScrollToTop'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = homepageMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://impota.com" />
        <link rel="alternate" hrefLang="en-na" href="https://impota.com/na" />
        <link rel="alternate" hrefLang="en-za" href="https://impota.com/za" />
        <link rel="alternate" hrefLang="en-bw" href="https://impota.com/bw" />
        <link rel="alternate" hrefLang="en-zm" href="https://impota.com/zm" />
        <link rel="alternate" hrefLang="x-default" href="https://impota.com" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="IMPOTA" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IMPOTA" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/icon-256x256.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/icon-384x384.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <StructuredData type="organization" />
        <StructuredData type="faq" />
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              {children}
            </div>
            <ConditionalFooter />
          </div>
          <ScrollToTop />
          <ExitIntentPopup />
          <Toaster richColors closeButton position="top-center" />
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}