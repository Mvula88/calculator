'use client'

import { useState } from 'react'
import { useUltraSimpleAuth } from '@/lib/auth/ultra-simple'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PDFViewer from '@/components/PDFViewer'
import { 
  FileText, 
  Lock, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Eye,
  Star
} from 'lucide-react'

interface Document {
  name: string
  file: string
  description: string
  highlight: string
}

interface DocumentCategory {
  title: string
  description: string
  documents: Document[]
}

export default function DocumentsPage() {
  const { hasAccess, loading, userEmail, userTier } = useUltraSimpleAuth()
  
  // Clean up email display if it's a session-based email
  const displayEmail = userEmail || 'user@example.com'
  let cleanEmail = displayEmail
  if (displayEmail.startsWith('user_cs_test_') || (displayEmail.startsWith('user_') && displayEmail.endsWith('@impota.com'))) {
    cleanEmail = 'Portal User'
  }
  
  // Use actual tier from session
  const user = hasAccess ? { email: cleanEmail } : null
  const entitlement = hasAccess ? {
    country: 'na',
    tier: userTier
  } : null
  const [selectedDocument, setSelectedDocument] = useState<{name: string, url: string} | null>(null)

  const handleViewDocument = (docName: string, fileName: string) => {
    // In production, this would be the actual URL to your PDF
    // For now, we'll use a placeholder
    setSelectedDocument({
      name: docName,
      url: `/documents/${fileName}` // This would be your actual PDF URL
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center">
          <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Documents Access Required</h2>
          <p className="text-gray-600 mb-4">
            You need to purchase the Mistake Guide or Import Mastery to access these documents.
          </p>
          <a 
            href="/na/guide"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Access →
          </a>
        </Card>
      </div>
    )
  }

  const currency = entitlement?.country === 'na' ? 'N$' :
                   entitlement?.country === 'za' ? 'R' :
                   entitlement?.country === 'bw' ? 'P' :
                   entitlement?.country === 'zm' ? 'K' : 'N$'

  // Document categories with descriptions
  const documentCategories: DocumentCategory[] = [
    {
      title: "🚗 Actual Import Examples",
      description: "Real vehicle imports from Japan to Namibia",
      documents: [
        {
          name: "2015 VW Golf R Invoice",
          file: "2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf",
          description: "Actual purchase invoice from Japanese auction",
          highlight: "¥614,640 • N$102,440 • R102,440 • P102,440 • K1,844k"
        },
        {
          name: "2017 Audi A3 Invoice",
          file: "2017 AUDI A3 INVOICE.pdf",
          description: "Premium sedan import from Japan auction",
          highlight: "¥335,340 • N$55,890 • R55,890 • P55,890 • K1,006k"
        },
        {
          name: "2015 Audi A5 Sportback Invoice",
          file: "2015 AUDI A5 SPORTBACK INVOICE.pdf",
          description: "Luxury sportback from Japanese auction",
          highlight: "¥355,440 • N$59,240 • R59,240 • P59,240 • K1,066k"
        },
        {
          name: "2012 Audi A4 Invoice",
          file: "2012 AUDI A4 INVOICE.pdf",
          description: "Executive sedan import example",
          highlight: "¥323,560 • N$53,927 • R53,927 • P53,927 • K971k"
        }
      ]
    },
    {
      title: "📋 Customs Documents",
      description: "Every form you'll need for customs clearance",
      documents: [
        {
          name: "SAD 500 Form",
          file: "SAD 500 CUSTOMS.pdf",
          description: "Single Administrative Document - main customs form",
          highlight: "See exactly how to complete each field"
        },
        {
          name: "Assessment Notice",
          file: "Assessment Notice.pdf",
          description: "Official duty & VAT calculation from customs",
          highlight: "Shows duty: N$36,000, VAT: N$23,400"
        },
        {
          name: "Customs Clearance Certificate",
          file: "Customs Clearance Certificate - Motor Vehicle.pdf",
          description: "Final clearance document for vehicle release",
          highlight: "Required for registration"
        },
        {
          name: "Release Order",
          file: "Release Order.pdf",
          description: "Authority to collect vehicle from port",
          highlight: "Without this, car stays locked at port"
        }
      ]
    },
    {
      title: "🇯🇵 Japanese Export Documents",
      description: "Critical documents from Japan (with translations)",
      documents: [
        {
          name: "Export Certificate (Original)",
          file: "Export Certificate Japanese.pdf",
          description: "Original Japanese deregistration certificate",
          highlight: "Must be translated by certified translator"
        },
        {
          name: "Export Certificate (Translated)",
          file: "Export Certificate - Sworn Translated.pdf",
          description: "Sworn English translation required by customs",
          highlight: "Shows proper translation format"
        }
      ]
    },
    {
      title: "🚢 Shipping Documents",
      description: "Key documents for ocean freight",
      documents: [
        {
          name: "Bill of Lading",
          file: "ORIGINAL BILL OF LANDING.pdf",
          description: "Original B/L - your ownership proof",
          highlight: "NEVER lose this - it's your car's passport"
        },
        {
          name: "Shipping Quote - Transworld Cargo",
          file: "Transworld Cargo - signed quote.pdf",
          description: "Actual shipping quote from Japan to Walvis Bay",
          highlight: "Real costs: $1,850 for 40ft container"
        },
        {
          name: "Ocean Freight Invoice (Per Car)",
          file: "Ocean Freight INVOICE per car.pdf",
          description: "Individual car shipping cost breakdown",
          highlight: "Single vehicle shipping: N$18,500"
        }
      ]
    },
    {
      title: "✅ Registration Documents",
      description: "Final steps to get your car on the road",
      documents: [
        {
          name: "Police Clearance",
          file: "Police Clearance.pdf",
          description: "VIN & engine verification by police",
          highlight: "Required before registration"
        },
        {
          name: "Import Permit",
          file: "Import Permit MIT.pdf",
          description: "Ministry of Trade permit",
          highlight: "Pre-approval before shipping"
        },
        {
          name: "Import Permit Application Guide",
          file: "Import permit screen.png",
          description: "Screenshot showing exactly how to fill the online form",
          highlight: "Shows all mandatory fields: Vehicle, Model, Year, VIN, Engine No, Value"
        },
        {
          name: "Payment Receipt",
          file: "Payment Receipt.pdf",
          description: "Proof of all duties paid",
          highlight: "Keep forever for resale"
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="w-full">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Real Import Documents</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Actual documents from successful imports</p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-[150px] sm:max-w-none">Licensed to: {user?.email}</span>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base font-semibold text-green-900">These Are REAL Documents</p>
                <p className="text-xs sm:text-sm text-green-700">
                  From actual vehicle imports. Save {currency}100K+ by knowing what you need.
                </p>
                <p className="text-xs text-green-600 mt-1">
                  📖 View-only • Study these examples
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Value Box - Mobile Optimized */}
        <div className="px-4 sm:px-6 max-w-5xl mx-auto">
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200">
            <div className="flex items-start gap-3 sm:gap-4">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold mb-2">Why These Documents Are Gold</h2>
                <ul className="space-y-1 text-xs sm:text-sm text-gray-700">
                  <li>• Agents charge {currency}5,000 for paperwork - now DIY</li>
                  <li>• See EXACTLY how forms should look</li>
                  <li>• Know what customs checks for</li>
                  <li>• Avoid "missing documents" delays</li>
                </ul>
                <div className="mt-2 sm:mt-3 p-2 bg-white/50 rounded text-xs text-gray-600">
                  💱 ¥1 = N$0.167 = R0.167 = P0.167 = K3.0
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Document Categories - Mobile Optimized */}
        <div className="px-4 sm:px-6 max-w-5xl mx-auto">
          {documentCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8 sm:mb-10">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">{category.title}</h2>
                <p className="text-sm sm:text-base text-gray-600">{category.description}</p>
              </div>
              
              <div className="space-y-3">
                {category.documents.map((doc, docIndex) => (
                  <Card key={docIndex} className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-2 sm:gap-3 flex-1">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-base sm:text-lg">{doc.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{doc.description}</p>
                          <div className="flex items-start sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-green-600">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 sm:mt-0" />
                            <span className="font-medium break-all">{doc.highlight}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto flex items-center justify-center gap-1 text-xs sm:text-sm"
                        onClick={() => handleViewDocument(doc.name, doc.file)}
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        View Sample
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes - Mobile Optimized */}
        <div className="px-4 sm:px-6 max-w-5xl mx-auto">
          <Card className="p-4 sm:p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-yellow-900 mb-2 text-sm sm:text-base">Important Notes</h3>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-yellow-800">
                  <li>• <strong>Countries vary</strong> - Verify local requirements</li>
                  <li>• <strong>Dates matter</strong> - Some docs expire (3 months)</li>
                  <li>• <strong>Keep originals safe</strong> - Customs keeps them</li>
                  <li>• <strong>Translation required</strong> - Japanese docs must be translated</li>
                  <li>• <strong>Order matters</strong> - Follow the sequence</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>


        {/* Document Timeline - Mobile Optimized */}
        <div className="mt-8 sm:mt-12 px-4 sm:px-6 max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">📅 When You Need Each Document</h2>
          <div className="space-y-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1 text-xs sm:text-sm">
                <strong>Before Shipping:</strong> Invoice, Export Certificate, Import Permit
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1 text-xs sm:text-sm">
                <strong>During Shipping:</strong> Bill of Lading, Insurance docs
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1 text-xs sm:text-sm">
                <strong>At Port Arrival:</strong> SAD 500, Assessment Notice, Payment receipts
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div className="flex-1 text-xs sm:text-sm">
                <strong>For Release:</strong> Clearance Certificate, Release Order
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div className="flex-1 text-xs sm:text-sm">
                <strong>For Registration:</strong> Police Clearance, All previous docs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedDocument && (
        <PDFViewer
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          documentName={selectedDocument.name}
          documentUrl={selectedDocument.url}
        />
      )}
    </main>
  )
}