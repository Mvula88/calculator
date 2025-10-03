'use client'
// PDF Viewer component with custom modal implementation
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { X, ZoomIn, ZoomOut, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker for mobile compatibility
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`
}

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
  documentName: string
  documentUrl: string
}

export default function PDFViewer({ isOpen, onClose, documentName, documentUrl }: PDFViewerProps) {
  const [scale, setScale] = useState(100)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [documentContent, setDocumentContent] = useState<string | null>(null)
  const [numPages, setNumPages] = useState(0)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const [pdfDocument, setPdfDocument] = useState<any>(null)

  useEffect(() => {
    if (isOpen && documentUrl) {
      setLoading(true)
      setError(false)
      setDocumentContent(null)

      // Fetch the document content directly
      fetchDocumentContent(documentUrl)

      // Disable right-click context menu
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault()
        return false
      }

      // Disable print
      const handlePrint = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
          e.preventDefault()
          return false
        }
      }

      document.addEventListener('contextmenu', handleContextMenu)
      document.addEventListener('keydown', handlePrint)

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu)
        document.removeEventListener('keydown', handlePrint)
      }
    }
  }, [isOpen, documentUrl])

  const fetchDocumentContent = async (url: string) => {
    try {
      console.log('Fetching document:', url)
      const response = await fetch(getViewerUrl(url))

      if (!response.ok) {
        console.error('Fetch failed:', response.status, response.statusText)
        throw new Error('Failed to load document')
      }

      // Check if it's an image or PDF
      const contentType = response.headers.get('content-type')
      console.log('Content type:', contentType)

      if (contentType?.includes('image')) {
        // For images, convert to base64
        const blob = await response.blob()
        const reader = new FileReader()
        reader.onloadend = () => {
          setDocumentContent(reader.result as string)
          setLoading(false)
        }
        reader.readAsDataURL(blob)
      } else {
        // For PDFs, use PDF.js to render as canvas
        console.log('Loading PDF with PDF.js')
        const arrayBuffer = await response.arrayBuffer()
        console.log('ArrayBuffer size:', arrayBuffer.byteLength)

        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        })

        const pdf = await loadingTask.promise
        console.log('PDF loaded, pages:', pdf.numPages)
        setPdfDocument(pdf)
        setNumPages(pdf.numPages)
        setLoading(false)
      }
    } catch (err) {
      console.error('Error loading document:', err)
      setError(true)
      setLoading(false)
    }
  }

  // Render PDF pages when document is loaded
  useEffect(() => {
    if (pdfDocument && numPages > 0) {
      // Small delay to ensure canvas elements are mounted
      const timer = setTimeout(() => {
        renderAllPages()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [pdfDocument, numPages, scale])

  const renderAllPages = async () => {
    if (!pdfDocument) return

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdfDocument.getPage(pageNum)
        const canvas = canvasRefs.current[pageNum - 1]
        if (!canvas) continue

        // Use higher scale for better quality on mobile
        const baseScale = 1.5
        const viewport = page.getViewport({ scale: baseScale * (scale / 100) })
        const context = canvas.getContext('2d')
        if (!context) continue

        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        await page.render(renderContext).promise
      } catch (err) {
        console.error(`Error rendering page ${pageNum}:`, err)
      }
    }
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 10, 50))
  }

  // Check if file is an image
  const isImage = documentUrl.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/);

  // Always use our API route which fetches from Supabase Storage
  const getViewerUrl = (url: string) => {
    // If URL already starts with /api/documents/, use it as-is
    // Otherwise, prepend the API path
    let baseUrl: string
    if (url.startsWith('/api/documents/')) {
      baseUrl = `${url}?t=${Date.now()}`
    } else {
      baseUrl = `/api/documents/${url}?t=${Date.now()}`
    }

    // Try to get session from localStorage or cookies
    if (typeof window !== 'undefined') {
      const sessionStr = localStorage.getItem('impota-session')
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr)
          // Add session ID as query param for authentication
          return `${baseUrl}&sid=${session.sessionId}`
        } catch (e) {

        }
      }
    }

    return baseUrl
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content - Mobile Optimized */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-7xl w-full mx-2 sm:mx-4 h-[95vh] sm:h-[90vh] flex flex-col"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Header - Mobile Optimized */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
              <h2 className="text-sm sm:text-lg font-semibold truncate">{documentName}</h2>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={scale <= 50}
                  className="hover:bg-gray-100"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2 min-w-[50px] text-center">{scale}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={scale >= 200}
                  className="hover:bg-gray-100"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-200 mx-1" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="relative flex-1 bg-gray-100 overflow-hidden">
          {/* Loading indicator */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading document...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center max-w-md">
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Document</h3>
                <p className="text-sm text-gray-600 mb-4">
                  The document could not be loaded. Please try again or contact support if the issue persists.
                </p>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Document Display */}
          {!loading && !error && (
            <div className="h-full overflow-auto p-4">
              <div
                className="mx-auto bg-white shadow-xl transition-all duration-200"
                style={{
                  width: isImage ? `${scale}%` : '100%',
                  minHeight: '100%'
                }}
              >
                {isImage && documentContent ? (
                  // Display image
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={documentContent}
                    alt={documentName}
                    className="w-full h-auto"
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                  />
                ) : (
                  // Display PDF as canvas pages (prevents download)
                  <div className="flex flex-col gap-2 sm:gap-4 items-center w-full">
                    {Array.from({ length: numPages }, (_, i) => (
                      <canvas
                        key={i}
                        ref={(el) => {
                          canvasRefs.current[i] = el
                        }}
                        className="shadow-lg w-full h-auto"
                        style={{
                          maxWidth: '100%',
                          userSelect: 'none',
                          pointerEvents: 'none',
                          display: 'block'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Watermark overlay */}
          <div className="absolute bottom-4 right-4 pointer-events-none select-none opacity-50">
            <div className="bg-gray-900 text-white px-3 py-1 rounded text-xs">
              Licensed to {typeof window !== 'undefined' && localStorage.getItem('userEmail')?.replace(/"/g, '') || 'User'}
            </div>
          </div>
        </div>

        {/* Footer notice - Mobile Optimized */}
        <div className="px-3 sm:px-6 py-2 sm:py-3 border-t bg-gray-50 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">
            📋 This document is for viewing only • Downloads are disabled • Content is protected by copyright
          </p>
        </div>
      </div>
    </div>
  )
}