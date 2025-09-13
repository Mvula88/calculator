import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { homepageMetadata } from '@/lib/seo/metadata'
import StructuredData from '@/components/seo/StructuredData'
import Footer from '@/components/Footer'
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
      </head>
      <body className={inter.className}>
        <StructuredData type="organization" />
        <StructuredData type="faq" />
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}