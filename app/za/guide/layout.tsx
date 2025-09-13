import { southAfricaGuideMetadata, southAfricaGuideJsonLd, southAfricaFAQJsonLd, southAfricaBreadcrumbJsonLd, southAfricaProductJsonLd } from './metadata'
import Script from 'next/script'

export const metadata = southAfricaGuideMetadata

export default function SouthAfricaGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="sa-guide-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(southAfricaGuideJsonLd) }}
      />
      <Script
        id="sa-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(southAfricaFAQJsonLd) }}
      />
      <Script
        id="sa-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(southAfricaBreadcrumbJsonLd) }}
      />
      <Script
        id="sa-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(southAfricaProductJsonLd) }}
      />
      
      {children}
    </>
  )
}