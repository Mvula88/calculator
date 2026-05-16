'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'
import { Button } from '@/components/ui/button'
import PDFViewer from '@/components/PDFViewer'
import RealImportExamples from '@/components/portal/RealImportExamples'
import PortalPageNavigation from '@/components/portal/PortalPageNavigation'
import {
  FileText,
  Shield,
  AlertTriangle,
  Eye,
  Loader2,
  ArrowUpRight,
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
  const { user, loading, userEmail } = useAuth()
  const [selectedDocument, setSelectedDocument] = useState<{ name: string; url: string } | null>(null)

  const displayEmail = userEmail || 'user@example.com'
  let cleanEmail = displayEmail
  if (
    displayEmail.startsWith('user_cs_test_') ||
    (displayEmail.startsWith('user_') && displayEmail.endsWith('@impota.com'))
  ) {
    cleanEmail = 'Portal User'
  }

  const handleViewDocument = (docName: string, fileName: string) => {
    setSelectedDocument({ name: docName, url: `/api/documents/${fileName}` })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-7 w-7 text-amber-500 animate-spin" strokeWidth={1.75} />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Loading documents
          </p>
        </div>
      </div>
    )
  }

  const documentCategories: DocumentCategory[] = [
    {
      title: 'Actual import examples',
      description: 'Real vehicle imports from Japan to Namibia',
      documents: [
        { name: '2015 VW Golf R Invoice', file: '2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf', description: 'Actual purchase invoice from Japanese auction', highlight: '¥614,640 · N$102,440 · R102,440 · P102,440 · K1,844k' },
        { name: '2017 Audi A3 Invoice', file: '2017 AUDI A3 INVOICE.pdf', description: 'Premium sedan import from Japan auction', highlight: '¥335,340 · N$55,890 · R55,890 · P55,890 · K1,006k' },
        { name: '2015 Audi A5 Sportback Invoice', file: '2015 AUDI A5 SPORTBACK INVOICE.pdf', description: 'Luxury sportback from Japanese auction', highlight: '¥355,440 · N$59,240 · R59,240 · P59,240 · K1,066k' },
        { name: '2012 Audi A4 Invoice', file: '2012 AUDI A4 INVOICE.pdf', description: 'Executive sedan import example', highlight: '¥323,560 · N$53,927 · R53,927 · P53,927 · K971k' },
      ],
    },
    {
      title: 'Customs documents',
      description: "Every form you'll need for customs clearance",
      documents: [
        { name: 'SAD 500 Form', file: 'SAD 500 CUSTOMS.pdf', description: 'Single Administrative Document — main customs form', highlight: 'See exactly how to complete each field' },
        { name: 'Assessment Notice', file: 'Assessment Notice.pdf', description: 'Official duty & VAT calculation from customs', highlight: 'Shows duty: N$36,000, VAT: N$23,400' },
        { name: 'Customs Clearance Certificate', file: 'Customs Clearance Certificate - Motor Vehicle.pdf', description: 'Final clearance document for vehicle release', highlight: 'Required for registration' },
        { name: 'Release Order', file: 'Release Order.pdf', description: 'Authority to collect vehicle from port', highlight: 'Without this, car stays locked at port' },
      ],
    },
    {
      title: 'Japanese export documents',
      description: 'Critical documents from Japan (with translations)',
      documents: [
        { name: 'Export Certificate (Original)', file: 'Export Certificate Japanese.pdf', description: 'Original Japanese deregistration certificate', highlight: 'Must be translated by certified translator' },
        { name: 'Export Certificate (Translated)', file: 'Export Certificate - Sworn Translated.pdf', description: 'Sworn English translation required by customs', highlight: 'Shows proper translation format' },
      ],
    },
    {
      title: 'Shipping documents',
      description: 'Key documents for ocean freight',
      documents: [
        { name: 'Bill of Lading', file: 'ORIGINAL BILL OF LANDING.pdf', description: "Original B/L — your ownership proof", highlight: "NEVER lose this — it's your car's passport" },
        { name: 'Shipping Quote — Transworld Cargo', file: 'Transworld Cargo - signed quote.pdf', description: 'Actual shipping quote from Japan to Walvis Bay', highlight: 'Real costs: $1,850 for 40ft container' },
        { name: 'Ocean Freight Invoice (Per Car)', file: 'Ocean Freight INVOICE per car.pdf', description: 'Individual car shipping cost breakdown', highlight: 'Single vehicle shipping: N$18,500' },
      ],
    },
    {
      title: 'Registration documents',
      description: 'Final steps to get your car on the road',
      documents: [
        { name: 'Police Clearance', file: 'Police Clearance.pdf', description: 'VIN & engine verification by police', highlight: 'Required before registration' },
        { name: 'Import Permit', file: 'Import Permit MIT.pdf', description: 'Ministry of Trade permit', highlight: 'Pre-approval before shipping' },
        { name: 'Import Permit Application Guide', file: 'Import permit screen.png', description: 'Screenshot showing exactly how to fill the online form', highlight: 'Shows all mandatory fields: Vehicle, Model, Year, VIN, Engine No, Value' },
        { name: 'Payment Receipt', file: 'Payment Receipt.pdf', description: 'Proof of all duties paid', highlight: 'Keep forever for resale' },
      ],
    },
  ]

  const valuePoints = [
    'Understand what types of documents are typically required during imports',
    'See how import forms are usually structured and filled in',
    'Learn what customs officers commonly check for',
    'Work more smoothly with clearing agents by knowing the paperwork in advance',
    'Reduce the risk of delays from missing or incomplete information',
  ]

  const importantNotes = [
    { label: 'Countries vary', text: 'Verify local requirements' },
    { label: 'Dates matter', text: 'Some docs expire (3 months)' },
    { label: 'Keep originals safe', text: 'Customs keeps them' },
    { label: 'Translation required', text: 'Japanese docs must be translated' },
    { label: 'Order matters', text: 'Follow the sequence' },
  ]

  const timelineStages = [
    { label: 'Before shipping', docs: 'Invoice, Export Certificate, Import Permit' },
    { label: 'During shipping', docs: 'Bill of Lading, Insurance docs' },
    { label: 'At port arrival', docs: 'SAD 500, Assessment Notice, Payment receipts' },
    { label: 'For release', docs: 'Clearance Certificate, Release Order' },
    { label: 'For registration', docs: 'Police Clearance, All previous docs' },
  ]

  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10 pb-8 border-b border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-600 font-semibold">
              Documents
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              <Shield className="h-3 w-3" strokeWidth={1.75} />
              <span className="truncate max-w-[240px]">Licensed to · {cleanEmail}</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 leading-[1.05]">
            Real import
            <span className="block italic font-light text-amber-600 pl-6 sm:pl-10">documents.</span>
          </h1>
          <div className="mt-4 flex items-start gap-2.5 max-w-xl">
            <span className="text-amber-500 text-xl leading-none mt-0.5" aria-hidden>↳</span>
            <p className="text-sm sm:text-base text-zinc-600 leading-snug italic font-light">
              Actual documents from successful imports — view-only learning resources.
            </p>
          </div>
        </div>

        {/* VALUE BOX */}
        <section className="mb-12 border border-zinc-200 rounded-2xl bg-stone-50/60 p-6 sm:p-8">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-5">
            <span className="text-amber-600 font-semibold">Why these resources are valuable</span>
            <span className="text-zinc-500">{String(valuePoints.length).padStart(2, '0')} reasons</span>
          </div>
          <ul className="space-y-2.5">
            {valuePoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-5 flex-shrink-0 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-zinc-200">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Exchange · ¥1 = N$0.167 = R0.167 = P0.167 = K3.0
            </p>
          </div>
        </section>

        {/* DOCUMENT CATEGORIES */}
        {documentCategories.map((category, ci) => (
          <section key={category.title} className="mb-12">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] border-b border-zinc-200 pb-2.5 mb-5">
              <span className="text-blue-600 font-semibold">
                {String(ci + 1).padStart(2, '0')} · {category.title}
              </span>
              <span className="text-zinc-500">
                {String(category.documents.length).padStart(2, '0')} items
              </span>
            </div>
            <p className="text-sm text-zinc-600 mb-5">{category.description}</p>

            <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200/80">
              {category.documents.map((doc, di) => (
                <div
                  key={doc.file}
                  className="bg-white p-5 sm:p-6 grid sm:grid-cols-[3rem_1fr_auto] gap-4 sm:gap-6 items-start hover:bg-stone-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-3">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] w-6">
                      {String(di + 1).padStart(2, '0')}
                    </span>
                    <FileText className="h-4 w-4 text-blue-600 hidden sm:block" strokeWidth={1.75} />
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-zinc-900">{doc.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{doc.description}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700 font-semibold break-all">
                      ↳ {doc.highlight}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleViewDocument(doc.name, doc.file)}
                    className="group h-10 px-4 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-sm font-medium text-zinc-900 shadow-none whitespace-nowrap"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.75} />
                    View sample
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* IMPORTANT NOTES */}
        <section className="mb-12 border-y border-zinc-200 py-8">
          <div className="flex items-start gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 font-semibold mt-1 whitespace-nowrap">
              [ Important notes ]
            </span>
            <ul className="space-y-2.5 flex-1 max-w-3xl">
              {importantNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-amber-600 flex-shrink-0" strokeWidth={1.75} />
                  <span>
                    <span className="font-semibold text-zinc-900">{note.label}</span> — {note.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TIMELINE OF DOCUMENTS */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-600 font-semibold mb-3">
              Document timeline
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">
              When you need each document.
            </h2>
          </div>

          <div className="border-y border-zinc-200 divide-y divide-zinc-200/80">
            {timelineStages.map((stage, i) => (
              <div key={stage.label} className="grid sm:grid-cols-[4rem_12rem_1fr] gap-4 sm:gap-6 py-4 items-baseline">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold">
                  Stage {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-zinc-900">{stage.label}</span>
                <span className="text-sm text-zinc-600 leading-relaxed">{stage.docs}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* REAL IMPORT EXAMPLES (existing component) */}
      <div className="max-w-7xl mx-auto mt-12">
        <RealImportExamples />
      </div>

      <PortalPageNavigation currentPath="/portal/documents" />

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
