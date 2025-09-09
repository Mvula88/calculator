'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
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
  const [user, setUser] = useState<any>(null)
  const [entitlement, setEntitlement] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDocument, setSelectedDocument] = useState<{name: string, url: string} | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login?redirect=/portal/documents')
        return
      }

      setUser(user)
      
      // Store user email for watermark
      if (typeof window !== 'undefined' && user.email) {
        window.localStorage.setItem('userEmail', user.email)
      }

      // Check entitlement
      const { data: entitlements } = await supabase
        .from('entitlements')
        .select('*')
        .eq('active', true)
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)

      if (entitlements && entitlements.length > 0) {
        const masteryEntitlement = entitlements.find(e => e.tier === 'mastery')
        setEntitlement(masteryEntitlement || entitlements[0])
      }
    } catch (error) {
      console.error('Error checking access:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (!entitlement) {
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

  const currency = entitlement.country === 'na' ? 'N$' :
                   entitlement.country === 'za' ? 'R' :
                   entitlement.country === 'bw' ? 'P' :
                   entitlement.country === 'zm' ? 'K' : 'N$'

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
          highlight: "Total cost: ¥614,640 (Vehicle: ¥455,000 + fees)"
        },
        {
          name: "2017 Audi A3 Invoice",
          file: "2017 AUDI A3 INVOICE.pdf",
          description: "Premium sedan import from Japan auction",
          highlight: "Total cost: ¥335,340 (Vehicle: ¥201,000 + fees)"
        },
        {
          name: "2015 Audi A5 Sportback Invoice",
          file: "2015 AUDI A5 SPORTBACK INVOICE.pdf",
          description: "Luxury sportback from Japanese auction",
          highlight: "Total cost: ¥355,440 (Vehicle: ¥231,000 + fees)"
        },
        {
          name: "2012 Audi A4 Invoice",
          file: "2012 AUDI A4 INVOICE.pdf",
          description: "Executive sedan import example",
          highlight: "Total cost: ¥323,560 (Vehicle: ¥200,000 + fees)"
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Real Import Documents</h1>
              <p className="text-gray-600 mt-2">Actual documents from successful imports - with explanations</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Licensed to: {user?.email}</span>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">These Are REAL Documents</p>
                <p className="text-sm text-green-700">
                  From actual vehicle imports. Names/details redacted for privacy. Save {currency}100,000+ by knowing exactly what you need.
                </p>
                <p className="text-xs text-green-600 mt-1">
                  📖 View-only access • Study these examples to understand what you need
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Value Box */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-purple-200">
          <div className="flex items-start gap-4">
            <Star className="h-8 w-8 text-purple-600 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">Why These Documents Are Gold</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Agents charge {currency}5,000 just to "handle paperwork" - now you can DIY</li>
                <li>• See EXACTLY how each form should look when completed correctly</li>
                <li>• Understand what customs officers actually check for</li>
                <li>• Never get scammed with "missing documents" delays</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Document Categories */}
        {documentCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
            
            <div className="space-y-3">
              {category.documents.map((doc, docIndex) => (
                <Card key={docIndex} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doc.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-medium">{doc.highlight}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleViewDocument(doc.name, doc.file)}
                    >
                      <Eye className="h-4 w-4" />
                      View Sample
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Important Notes */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Important Notes About These Documents</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• <strong>Every country varies slightly</strong> - Use these as templates but verify local requirements</li>
                <li>• <strong>Dates matter</strong> - Some documents expire (export certificate = 3 months)</li>
                <li>• <strong>Keep originals safe</strong> - Make multiple copies, customs keeps originals</li>
                <li>• <strong>Translation requirement</strong> - Japanese docs MUST be sworn translated</li>
                <li>• <strong>Order matters</strong> - Can't get Release Order without Assessment Notice</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        {entitlement?.tier === 'mistake' && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">🚀 Want More Document Examples?</h3>
              <p className="mb-4">Import Mastery members get access to multiple import case studies and advanced guides</p>
              <a 
                href={`/${entitlement.country}/upsell`}
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Upgrade to Import Mastery →
              </a>
            </div>
          </Card>
        )}

        {/* Document Timeline */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">📅 When You Need Each Document</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <strong>Before Shipping:</strong> Invoice, Export Certificate, Import Permit
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <strong>During Shipping:</strong> Bill of Lading, Insurance docs
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <strong>At Port Arrival:</strong> SAD 500, Assessment Notice, Payment receipts
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <strong>For Release:</strong> Clearance Certificate, Release Order
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
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