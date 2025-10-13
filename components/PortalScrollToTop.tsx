'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PortalScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const mainRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Find the main scrollable container
    const mainElement = document.querySelector('main.flex-1.overflow-y-auto') as HTMLElement
    mainRef.current = mainElement

    if (!mainElement) return

    const toggleVisibility = () => {
      // Show button when scrolled down 300px in the main container
      if (mainElement.scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    mainElement.addEventListener('scroll', toggleVisibility)

    return () => {
      mainElement.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
