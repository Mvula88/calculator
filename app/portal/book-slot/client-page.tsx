'use client'

import { useAuth } from '@/lib/hooks/use-auth'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lock, Star, CheckCircle, Ship } from 'lucide-react'
import ShippingContent from './shipping-content'

export default function ShippingClientPage() {
  const { hasAccess, loading, userTier, userEmail } = useAuth()

  // Always show loading first
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shipping companies...</p>
        </div>
      </div>
    )
  }

  // Check access after loading - block Guide members
  if (!hasAccess || userTier !== 'mastery') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center">
          <Ship className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Shipping Companies - Mastery Only</h2>
          <p className="text-gray-600 mb-4">
            This comprehensive shipping companies directory is available for Import Mastery members only.
          </p>
          <button 
            onClick={() => {
              // Store the user's email before redirecting
              const email = userEmail || localStorage.getItem('userEmail')
              if (email) {
                localStorage.setItem('checkout_email', email)
              }
              window.location.href = '/na/upsell'
            }}
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Upgrade to Mastery →
          </button>
        </Card>
      </div>
    )
  }

  // Only render content if user has mastery access
  return <ShippingContent />
}