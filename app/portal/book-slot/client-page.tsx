'use client'

import { useUltraSimpleAuth } from '@/lib/auth/ultra-simple'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lock, Star, CheckCircle } from 'lucide-react'
import ShippingContent from './shipping-content'

export default function ShippingClientPage() {
  const { hasAccess, loading, userTier } = useUltraSimpleAuth()

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

  if (!hasAccess || userTier !== 'mastery') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Lock className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Import Mastery Feature</h2>
            <p className="text-gray-600 mb-6">
              Shipping Companies & Booking is available exclusively for Import Mastery members.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                What you get with Import Mastery:
              </h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Access to verified shipping companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Container sharing opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Direct contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Booking assistance and tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Real-time shipping rates</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <Link href="/na/upsell">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Star className="h-4 w-4 mr-2" />
                  Upgrade to Import Mastery
                </Button>
              </Link>
              <div>
                <Link href="/portal" className="text-sm text-gray-600 hover:underline">
                  Back to Portal
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return <ShippingContent />
}