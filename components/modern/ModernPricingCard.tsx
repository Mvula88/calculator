'use client'

import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface ModernPricingCardProps {
  currency: string
  price: string
  originalPrice: string
  country: string
  features: string[]
}

export default function ModernPricingCard({
  currency,
  price,
  originalPrice,
  country,
  features
}: ModernPricingCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-2xl">
      {/* Popular Badge */}
      <div className="absolute -right-12 top-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-2 rotate-45 text-xs font-bold tracking-wider">
        POPULAR
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-10" />

      <div className="relative p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">LIMITED TIME OFFER</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Import Mastery</h3>
          <p className="text-gray-600">Everything you need to import like a pro</p>
        </div>

        {/* Pricing */}
        <div className="text-center mb-8">
          <div className="flex items-end justify-center gap-3 mb-2">
            <span className="text-3xl text-gray-400 line-through">{currency}{originalPrice}</span>
            <span className="text-5xl font-bold text-gray-900">{currency}{price}</span>
          </div>
          <p className="text-sm text-green-600 font-semibold">Save 50% - Limited Time</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link href={`/register?country=${country.toLowerCase()}&package=mastery`}>
          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span>Get Instant Access</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        {/* Trust Text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Secure checkout • Instant access • Lifetime updates
        </p>
      </div>
    </Card>
  )
}