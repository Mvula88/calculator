import { botswanaGuideMetadata, botswanaGuideJsonLd, botswanaFAQJsonLd, botswanaBreadcrumbJsonLd, botswanaProductJsonLd } from './metadata'
import Script from 'next/script'

export const metadata = botswanaGuideMetadata

export default function BotswanaGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="bw-guide-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(botswanaGuideJsonLd) }}
      />
      <Script
        id="bw-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(botswanaFAQJsonLd) }}
      />
      <Script
        id="bw-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(botswanaBreadcrumbJsonLd) }}
      />
      <Script
        id="bw-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(botswanaProductJsonLd) }}
      />
      
      {children}
    </>
  )
}