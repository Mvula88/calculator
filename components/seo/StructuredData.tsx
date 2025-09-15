import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'course' | 'faq' | 'howto' | 'product'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {}

  switch (type) {
    case 'organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "IMPOTA",
        "description": "Africa's #1 Car Import Education Platform",
        "url": "https://impota.com",
        "logo": "https://impota.com/logo.png",
        "sameAs": [
          "https://facebook.com/impota",
          "https://twitter.com/impota_africa",
          "https://linkedin.com/company/impota",
          "https://youtube.com/@impota"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+264-81-XXX-XXXX",
          "contactType": "customer support",
          "areaServed": ["NA", "ZA", "BW", "ZM"],
          "availableLanguage": ["en"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NA",
          "addressLocality": "Windhoek"
        }
      }
      break

    case 'course':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": data?.name || "Import Mastery - Complete Car Import Course",
        "description": data?.description || "Professional car import training for African countries. Learn to import cars from Japan. Members report significant savings compared to local dealerships.",
        "provider": {
          "@type": "Organization",
          "name": "IMPOTA",
          "sameAs": "https://impota.com"
        },
        "courseMode": "online",
        "educationalLevel": "beginner",
        "offers": [{
          "@type": "Offer",
          "price": data?.price || "1999",
          "priceCurrency": data?.currency || "NAD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01"
        }],
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "PT20H"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "8",
          "reviewCount": "8"
        }
      }
      break

    case 'faq':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data?.questions || [
          {
            "@type": "Question",
            "name": "How much can I save by importing a car myself?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most importers save between N$30,000 to N$100,000 per vehicle by avoiding dealer markups and middleman fees. The exact savings depend on the vehicle type and your country's import duties."
            }
          },
          {
            "@type": "Question",
            "name": "How long does the import process take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The typical import process takes 45-60 days from purchase to delivery. This includes: Japan auction purchase (1-3 days), shipping (30-45 days), and customs clearance (7-14 days)."
            }
          },
          {
            "@type": "Question",
            "name": "Is it legal to import cars from Japan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, importing cars from Japan is legal in Namibia, South Africa, Botswana, and Zambia. Each country has specific regulations and requirements which our guides are designed to help you understand and follow."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to travel to Japan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you don't need to travel to Japan. The entire process can be done online through auction agents and shipping companies. Our guide shows you exactly how to do this remotely."
            }
          },
          {
            "@type": "Question",
            "name": "What documents do I need to import a car?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Required documents typically include: Export Certificate from Japan, Bill of Lading, Commercial Invoice, Import Permit, and country-specific documents. Our platform provides templates for all required documents."
            }
          }
        ]
      }
      break

    case 'howto':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": data?.title || "How to Import a Car from Japan to Africa",
        "description": data?.description || "Step-by-step guide to importing vehicles from Japan to African countries",
        "image": "https://impota.com/import-guide-hero.jpg",
        "totalTime": "PT60D",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "2000-5000"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Import permit"
          },
          {
            "@type": "HowToSupply",
            "name": "Proof of funds"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "Import duty calculator"
          },
          {
            "@type": "HowToTool",
            "name": "Documentation templates"
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Research and select vehicle",
            "text": "Use Japan auction sites to find suitable vehicles within your budget",
            "url": "https://impota.com/japan-auctions"
          },
          {
            "@type": "HowToStep",
            "name": "Calculate total costs",
            "text": "Use our import duty calculator to determine total landed cost",
            "url": "https://impota.com/calculator"
          },
          {
            "@type": "HowToStep",
            "name": "Purchase through agent",
            "text": "Work with verified auction agent to bid and purchase vehicle",
            "url": "https://impota.com/agents"
          },
          {
            "@type": "HowToStep",
            "name": "Arrange shipping",
            "text": "Book shipping through reliable freight forwarder",
            "url": "https://impota.com/shipping"
          },
          {
            "@type": "HowToStep",
            "name": "Clear customs",
            "text": "Submit documents and pay duties at port of entry",
            "url": "https://impota.com/customs"
          }
        ]
      }
      break

    case 'product':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data?.name || "IMPOTA Import Guide",
        "description": data?.description || "Complete car import guide for African countries",
        "brand": {
          "@type": "Brand",
          "name": "IMPOTA"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://impota.com/packages",
          "priceCurrency": data?.currency || "NAD",
          "price": data?.price || "499",
          "priceValidUntil": "2024-12-31",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "8"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "John M."
            },
            "reviewBody": "The guide helped me significantly reduce my import costs. Excellent value and comprehensive information."
          }
        ]
      }
      break
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
      strategy="afterInteractive"
    />
  )
}