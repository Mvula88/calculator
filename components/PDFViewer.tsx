'use client'
// PDF Viewer component with custom modal implementation
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ZoomIn, ZoomOut, FileText, AlertCircle } from 'lucide-react'

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

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setError(false)
    }
  }, [isOpen, documentUrl])

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
  }

  // Check if file is an image
  const isImage = documentUrl.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/);

  // For production, you'll need to upload PDFs to a public storage service
  // and update these URLs. For now, using Google Docs Viewer as fallback
  const getViewerUrl = (url: string) => {
    // If it's a full URL, use Google Docs Viewer
    if (url.startsWith('http')) {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    }
    // For local development, show a sample PDF
    // In production, this would be your actual PDF URL from Supabase Storage or similar
    return `/api/documents/${url}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">{documentName}</h2>
            </div>
            <div className="flex items-center gap-2">
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
        
        <div className="relative flex-1 bg-gray-100 overflow-hidden">
          {/* Loading indicator */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
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
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Preview Unavailable</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This document is being prepared for viewing. Please check back later or contact support if the issue persists.
                </p>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* PDF/Image Viewer */}
          {!error && (
            <div className="h-full overflow-auto p-4">
              <div 
                className="mx-auto bg-white shadow-xl transition-all duration-200"
                style={{ 
                  width: `${scale}%`,
                  minHeight: '100%'
                }}
              >
                {isImage ? (
                  // Display image directly
                  <img
                    src={getViewerUrl(documentUrl)}
                    alt={documentName}
                    className="w-full h-auto"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                  />
                ) : (
                  // Display PDF in iframe
                  <iframe
                    src={getViewerUrl(documentUrl)}
                    className="w-full h-full min-h-[800px] border-0"
                    title={documentName}
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    sandbox="allow-same-origin allow-scripts"
                    style={{
                      pointerEvents: 'auto',
                      userSelect: 'none'
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Watermark overlay */}
          <div className="absolute bottom-4 right-4 pointer-events-none select-none opacity-50">
            <div className="bg-gray-900 text-white px-3 py-1 rounded text-xs">
              Licensed to {typeof window !== 'undefined' && window.localStorage.getItem('userEmail') || 'User'}
            </div>
          </div>
        </div>

        {/* Footer notice */}
        <div className="px-6 py-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            📋 This document is for viewing only • Downloads are disabled • Content is protected by copyright
          </p>
        </div>
      </div>
    </div>
  )
}