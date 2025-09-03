'use client'

import { MessageCircle } from 'lucide-react'
import { useCountry } from '@/lib/country-context'
import { COUNTRY_SUPPORT } from '@/lib/constants'

interface WhatsAppButtonProps {
  message?: string
  className?: string
  phoneNumber?: string
}

export function WhatsAppButton({ 
  message, 
  className = '',
  phoneNumber
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
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors ${className}`}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span>WhatsApp Support</span>
    </button>
  )
}

// Floating WhatsApp Button (fixed position)
export function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <WhatsAppButton 
        className="shadow-lg hover:shadow-xl transition-shadow"
        message="Hi! I need help with the import calculator."
      />
    </div>
  )
}