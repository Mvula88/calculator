import { namibiaGuideMetadata, namibiaGuideJsonLd, namibiaFAQJsonLd, namibiaBreadcrumbJsonLd, namibiaProductJsonLd } from './metadata'
import Script from 'next/script'

export const metadata = namibiaGuideMetadata

export default function NamibiaGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="namibia-guide-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(namibiaGuideJsonLd) }}
      />
      <Script
        id="namibia-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(namibiaFAQJsonLd) }}
      />
      <Script
        id="namibia-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(namibiaBreadcrumbJsonLd) }}
      />
      <Script
        id="namibia-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(namibiaProductJsonLd) }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {children}
    </>
  )
}