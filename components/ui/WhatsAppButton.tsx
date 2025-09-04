'use client'

import { MessageCircle } from 'lucide-react'
import { useCountry } from '@/lib/country-context'
import { COUNTRY_SUPPORT } from '@/lib/constants'
import { useState, useEffect } from 'react'

interface WhatsAppButtonProps {
  message?: string
  className?: string
  phoneNumber?: string
  variant?: 'default' | 'compact' | 'icon-only'
}

export function WhatsAppButton({ 
  message, 
  className = '',
  phoneNumber,
  variant = 'default'
}: WhatsAppButtonProps) {
  const { country } = useCountry()
  
  const number = phoneNumber || COUNTRY_SUPPORT[country.code as keyof typeof COUNTRY_SUPPORT] || COUNTRY_SUPPORT['NA']
  
  const defaultMessage = `Hi! I'm from ${country.name} and need help with importing a car from Japan. I found you through ImportCalc SADC.`
  const whatsappMessage = message || defaultMessage
  
  const handleClick = () => {
    // Remove any non-digit characters from phone number
    const cleanNumber = number.replace(/\D/g, '')
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    
    // Open WhatsApp
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank')
  }
  
  // Responsive button styles based on variant
  const getButtonStyles = () => {
    const baseStyles = "flex items-center justify-center bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
    
    switch(variant) {
      case 'icon-only':
        return `${baseStyles} p-3 ${className}`
      case 'compact':
        return `${baseStyles} px-3 py-2 gap-1.5 text-sm ${className}`
      default:
        return `${baseStyles} px-4 py-2.5 gap-2 ${className}`
    }
  }
  
  return (
    <button
      onClick={handleClick}
      className={getButtonStyles()}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className={variant === 'icon-only' ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0'} />
      {variant !== 'icon-only' && (
        <span className="whitespace-nowrap font-medium">
          <span className="hidden sm:inline">WhatsApp Support</span>
          <span className="sm:hidden">WhatsApp</span>
        </span>
      )}
    </button>
  )
}

// Floating WhatsApp Button (fixed position - optimized for mobile)
export function FloatingWhatsAppButton() {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Hide button when scrolling down on mobile, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only apply scroll behavior on mobile
      if (isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isMobile])
  
  return (
    <div 
      className={`fixed z-[9999] transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-20'
      }`}
      style={{
        bottom: 'max(env(safe-area-inset-bottom, 20px), 20px)',
        right: '16px',
      }}
    >
      {isMobile ? (
        // Mobile: Circular icon-only button
        <button
          onClick={() => {
            const number = COUNTRY_SUPPORT['NA'].replace(/\D/g, '')
            const message = encodeURIComponent("Hi! I need help with the import calculator.")
            window.open(`https://wa.me/${number}?text=${message}`, '_blank')
          }}
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Contact on WhatsApp"
          style={{ minWidth: '56px', minHeight: '56px' }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        // Desktop: Full button
        <WhatsAppButton 
          className="shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          message="Hi! I need help with the import calculator."
          variant="default"
        />
      )}
    </div>
  )
}

// Mobile-optimized WhatsApp bar for bottom of screen
export function MobileWhatsAppBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 sm:hidden">
      <WhatsAppButton 
        className="w-full justify-center shadow-sm"
        message="Hi! I need help with the import calculator."
        variant="default"
      />
    </div>
  )
}