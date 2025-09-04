'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCountry } from '@/lib/country-context'
import { getLocalPrice } from '@/lib/stripe/pricing'
import { Check } from 'lucide-react'

interface PricingCardProps {
  productType: 'calculator_pro' | 'avoid_mistake' | 'translation' | 'hidden_platforms'
  title: string
  description: string
  features: string[]
  badge?: string
  onPurchase: (productType: string) => void
}

export function PricingCard({
  productType,
  title,
  description,
  features,
  badge,
  onPurchase
}: PricingCardProps) {
  const { country } = useCountry()
  const price = getLocalPrice(productType, country.code)
  
  return (
    <Card className="relative">
      {badge && (
        <Badge className="absolute -top-2 right-4">{badge}</Badge>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{price.display}</span>
          <span className="text-gray-500 ml-2">one-time</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={() => onPurchase(productType)}
          className="w-full"
        >
          Get Access
        </Button>
      </CardContent>
    </Card>
  )
}