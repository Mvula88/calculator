'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ContentProtectionProps {
  children: React.ReactNode
  tier?: 'mistake' | 'mastery'
}

export default function ContentProtection({ children, tier = 'mistake' }: ContentProtectionProps) {
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    // Get user email for watermark
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getUser()

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      e.clipboardData?.setData('text/plain', 'Content protected - Licensed to ' + userEmail)
      return false
    }

    // Disable print
    const handlePrint = (e: Event) => {
      e.preventDefault()
      alert('Printing is disabled for protected content')
      return false
    }

    // Detect developer tools - DISABLED FOR NOW
    // This feature causes false positives on mobile AND desktop browsers
    // Mobile: Browser UI (address bar, toolbars) exceeds threshold
    // Desktop: Some browsers/zoom levels trigger false positives
    // TODO: Implement more reliable devtools detection or remove entirely

    const devtools = { open: false }
    let checkDevTools: NodeJS.Timeout | null = null

    // DEVTOOLS DETECTION DISABLED - TOO MANY FALSE POSITIVES
    // Watermarks and content protection still active

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.keyCode === 123 || // F12
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J  
          (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
        e.preventDefault()
        return false
      }

      // Disable Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+V
      if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 88 || e.keyCode === 86)) {
        e.preventDefault()
        return false
      }

      // Disable Print (Ctrl+P)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault()
        alert('Printing is disabled for protected content')
        return false
      }

      // Disable Save (Ctrl+S)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        return false
      }
    }

    // Add console warning
    const consoleWarning = () => {

    }
    consoleWarning()
    const warningInterval = setInterval(consoleWarning, 10000)

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('copy', handleCopy)
    window.addEventListener('beforeprint', handlePrint)
    document.addEventListener('keydown', handleKeyDown)

    // Disable drag
    const imgs = document.getElementsByTagName('img')
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].draggable = false
    }

    // Clean up
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('copy', handleCopy)
      window.removeEventListener('beforeprint', handlePrint)
      document.removeEventListener('keydown', handleKeyDown)
      if (checkDevTools) clearInterval(checkDevTools)
      clearInterval(warningInterval)
    }
  }, [userEmail])

  return (
    <div className="relative select-none">
      {/* Anti-screenshot overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none" 
           style={{ 
             backgroundColor: 'transparent',
             mixBlendMode: 'multiply',
             opacity: 0.01
           }} 
      />

      {/* Watermark Grid - Dense Pattern */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-gray-300/25 font-bold text-xl transform rotate-45 whitespace-nowrap"
            style={{
              top: `${(i % 6) * 17}%`,
              left: `${Math.floor(i / 6) * 20}%`,
            }}
          >
            Licensed to {userEmail}
          </div>
        ))}
      </div>

      {/* Moving watermark */}
      <div 
        className="fixed z-40 pointer-events-none text-red-500/30 font-bold text-lg animate-pulse"
        style={{
          animation: 'float 20s infinite linear',
          top: '20%',
          left: '10%'
        }}
      >
        PROTECTED CONTENT - {userEmail}
      </div>

      {/* Main content */}
      <div 
        className="relative z-30 no-select"
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          pointerEvents: 'auto'
        }}
      >
        {children}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(100vw, 0);
          }
          50% {
            transform: translate(100vw, 60vh);
          }
          75% {
            transform: translate(0, 60vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* Disable print */
        @media print {
          body * {
            display: none !important;
          }
          body:after {
            content: "Printing is not allowed for protected content";
            display: block !important;
            font-size: 24px;
            text-align: center;
            margin-top: 50%;
          }
        }

        /* Make everything unselectable */
        * {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          -khtml-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }

        /* Disable highlighting */
        ::selection {
          background: transparent !important;
        }

        ::-moz-selection {
          background: transparent !important;
        }
      `}</style>
    </div>
  )
}