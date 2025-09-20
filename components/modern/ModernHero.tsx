'use client'

import { ArrowRight, Sparkles, Shield, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ModernHeroProps {
  country: string
  currency: string
  price: string
  originalPrice: string
}

export default function ModernHero({ country, currency, price, originalPrice }: ModernHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-200 px-4 py-2 rounded-full text-sm font-medium text-indigo-700 mb-8 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>50% OFF LAUNCH SPECIAL</span>
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Import Cars to {country}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-2">
              Like a Professional
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            The complete system that reveals what car dealers won't tell you.
            Save thousands with insider knowledge.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="h-5 w-5 text-green-500" />
              <span>Limited Time Offer</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/purchase">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Get Import Mastery</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Price Display */}
            <div className="flex items-center gap-3">
              <span className="text-2xl text-gray-400 line-through">{currency}{originalPrice}</span>
              <span className="text-3xl font-bold text-gray-900">{currency}{price}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                SAVE 50%
              </span>
            </div>
          </div>

          {/* Countdown */}
          <p className="mt-8 text-sm text-gray-600">
            🔥 Launch pricing ends October 31, 2025
          </p>
        </div>
      </div>

      {/* CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}