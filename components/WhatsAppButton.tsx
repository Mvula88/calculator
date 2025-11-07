'use client'

import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber = "264816683276",
  message = "Hi! I'm interested in learning more about importing cars from Japan."
}: WhatsAppButtonProps) {
  return (.
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline-block group-hover:inline-block text-sm font-bold pr-2">
        Questions? Chat with us
      </span>
    </a>
  )
}
