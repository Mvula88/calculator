'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, X, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

interface TestimonialRequestProps {
  onClose?: () => void
}

export default function TestimonialRequest({ onClose }: TestimonialRequestProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [testimonial, setTestimonial] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a star rating')
      return
    }

    if (testimonial.trim().length < 10) {
      toast.error('Please write at least 10 characters')
      return
    }

    setLoading(true)

    try {
      // Send to your WhatsApp or email endpoint
      const whatsappNumber = "264814756919"
      const message = `NEW TESTIMONIAL ⭐\n\nRating: ${rating}/5 stars\nName: ${name || 'Anonymous'}\nTestimonial: ${testimonial}\n\nDate: ${new Date().toLocaleDateString()}`

      // Open WhatsApp with pre-filled message (alternative: send to backend)
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank'
      )

      setSubmitted(true)
      toast.success('Thank you for your feedback!')

      // Mark as submitted in localStorage
      localStorage.setItem('impota_testimonial_submitted', 'true')

      setTimeout(() => {
        onClose?.()
      }, 3000)
    } catch (error) {
      toast.error('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Thank You! 🎉
          </h3>
          <p className="text-gray-600">
            Your feedback helps us improve and helps other importers make informed decisions.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <div className="mb-6 text-center">
        <div className="mb-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
            <Star className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          How's Your Experience?
        </h3>
        <p className="text-sm text-gray-600">
          Help us improve and help others by sharing your feedback
        </p>
      </div>

      <div className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rate Your Experience
          </label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John from Windhoek"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Testimonial */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            placeholder="What did you like most? How did IMPOTA help you?"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 10 characters • Will be shared on our website
          </p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading || rating === 0 || testimonial.trim().length < 10}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you agree we may display your feedback on our website
        </p>
      </div>
    </Card>
  )
}
