'use client'
// PDF Viewer component with custom modal implementation
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ZoomIn, ZoomOut, FileText, AlertCircle, CheckCircle } from 'lucide-react'

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
  documentName: string
  documentUrl: string
}

export default function PDFViewer({ isOpen, onClose, documentName, documentUrl }: PDFViewerProps) {
  const [scale, setScale] = useState(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [openedInNewTab, setOpenedInNewTab] = useState(false)

  const handleOpenDocument = () => {
    const url = getViewerUrl(documentUrl)
    window.open(url, '_blank')
    setOpenedInNewTab(true)
    
    // Auto close after opening
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setOpenedInNewTab(false)
      setError(false)
      setLoading(false)
    }
  }, [isOpen])

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 10, 50))
  }

  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleIframeError = () => {
    setLoading(false)
    setError(true)
    // Automatically try to open in new tab if embed fails
    window.open(getViewerUrl(documentUrl), '_blank')
  }

  // Check if file is an image
  const isImage = documentUrl.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/);

  // Always use our API route which fetches from Supabase Storage
  const getViewerUrl = (url: string) => {
    // Use our API route that fetches from Supabase
    // Add timestamp to prevent caching issues
    // Include session info in URL for authentication
    const baseUrl = `/api/documents/${url}?t=${Date.now()}`
    
    // Try to get session from localStorage or cookies
    if (typeof window !== 'undefined') {
      const sessionStr = localStorage.getItem('impota-session')
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr)
          // Add session ID as query param for authentication
          return `${baseUrl}&sid=${session.sessionId}`
        } catch (e) {
          console.log('Could not parse session for document fetch')
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
      
      {/* Modal Content - Simplified */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">{documentName}</h2>
              <p className="text-sm text-gray-600 mt-1">Click below to view the document</p>
            </div>
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
        
        {/* Content */}
        <div className="space-y-4">
          {!openedInNewTab ? (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">Document Viewer</p>
                    <p className="text-blue-700">
                      For security reasons, documents open in a new browser tab. 
                      This ensures the best viewing experience and prevents browser blocking issues.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleOpenDocument}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Open Document in New Tab
              </Button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Document opened in a new tab!</p>
              <p className="text-xs text-gray-500 mt-1">You can close this window.</p>
            </div>
          )}
          
          <div className="pt-2 text-center">
            <p className="text-xs text-gray-500">
              📋 Documents are watermarked and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}