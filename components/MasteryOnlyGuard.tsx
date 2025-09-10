'use client'

import { useUltraSimpleAuth } from '@/lib/auth/ultra-simple'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lock, Star, CheckCircle } from 'lucide-react'

interface MasteryOnlyGuardProps {
  children: React.ReactNode
  feature: string
  benefits?: string[]
}

export default function MasteryOnlyGuard({ 
  children, 
  feature,
  benefits = [
    'Live duty & tax calculator for all vehicle types',
    'Japan auction access guide & bidding strategies',
    'Verified shipping lines & booking assistance',
    'Trusted import agents directory',
    'Priority support & consultation'
  ]
}: MasteryOnlyGuardProps) {
  const { hasAccess, loading, userTier } = useUltraSimpleAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {feature}...</p>
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
              {feature} is available exclusively for Import Mastery members.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                What you get with Import Mastery:
              </h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
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

  return <>{children}</>
}