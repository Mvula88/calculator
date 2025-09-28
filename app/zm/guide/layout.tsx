import { zambiaGuideMetadata, zambiaGuideJsonLd, zambiaFAQJsonLd, zambiaBreadcrumbJsonLd, zambiaProductJsonLd } from './metadata'
import Script from 'next/script'
export const metadata = zambiaGuideMetadata
export default function ZambiaGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="zm-guide-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zambiaGuideJsonLd) }}
      />
      <Script
        id="zm-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zambiaFAQJsonLd) }}
      />
      <Script
        id="zm-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zambiaBreadcrumbJsonLd) }}
      />
      <Script
        id="zm-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zambiaProductJsonLd) }}
      />
      {children}
    </>
  )
}