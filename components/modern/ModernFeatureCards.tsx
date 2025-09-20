'use client'

import { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  highlight?: string
}

interface ModernFeatureCardsProps {
  features: Feature[]
  columns?: 2 | 3 | 4
}

export default function ModernFeatureCards({ features, columns = 3 }: ModernFeatureCardsProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {features.map((feature, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative p-6">
            {/* Icon Container */}
            <div className="mb-4">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>

            {/* Optional Highlight */}
            {feature.highlight && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  {feature.highlight}
                </span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}