'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ModernHero from '@/components/modern/ModernHero'
import ModernFeatureCards from '@/components/modern/ModernFeatureCards'
import ModernPricingCard from '@/components/modern/ModernPricingCard'
import {
  Calculator,
  FileText,
  Globe,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Package,
  Truck,
  FileCheck,
  DollarSign,
  AlertTriangle,
  BookOpen,
  Users,
  Zap,
  Target,
  BarChart3,
  Compass
} from 'lucide-react'

export default function ModernNamibiaGuide() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Calculator,
      title: 'Multi-Country Calculator',
      description: 'Calculate exact import costs for Namibia, South Africa, Botswana & Zambia with our advanced calculator.',
      highlight: 'Save thousands'
    },
    {
      icon: FileText,
      title: 'Real Documentation',
      description: 'Access actual import documents, templates, and step-by-step guides used in successful imports.',
      highlight: 'Exclusive access'
    },
    {
      icon: Globe,
      title: 'Japan Auction Access',
      description: 'Learn how to navigate Japanese auction sites and decode auction sheets like a professional.',
      highlight: 'Insider knowledge'
    },
    {
      icon: Shield,
      title: 'Avoid Costly Mistakes',
      description: 'Learn from real import experiences and avoid the expensive mistakes that catch most beginners.',
      highlight: 'Risk-free imports'
    },
    {
      icon: Truck,
      title: 'Shipping Mastery',
      description: 'Compare RoRo vs Container shipping, understand costs, and choose the best option for your import.',
      highlight: 'Optimized logistics'
    },
    {
      icon: FileCheck,
      title: 'Complete Process Guide',
      description: 'Follow our proven step-by-step system from finding your car to driving it in Namibia.',
      highlight: 'Proven system'
    }
  ]

  const pricingFeatures = [
    'Multi-country import calculator (NA, ZA, BW, ZM)',
    'Complete Japan auction guide & decoder',
    'Real import documentation templates',
    'Step-by-step import process walkthrough',
    'Shipping options comparison guide',
    'Customs clearance checklist',
    'Trusted supplier directory',
    'Common mistakes & how to avoid them',
    'WhatsApp support for questions',
    'Lifetime updates & improvements'
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <ModernHero
        country="Namibia"
        currency="N$"
        price="1,499"
        originalPrice="2,999"
      />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Import Successfully</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop paying dealer markups. Learn the exact process to import cars directly from Japan.
            </p>
          </div>

          {/* Feature Cards */}
          <ModernFeatureCards features={features} columns={3} />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Import Journey
            </h2>
            <p className="text-xl text-gray-600">
              Follow our proven 3-step process to import your dream car
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Find & Calculate',
                description: 'Search Japanese auctions, calculate total costs with our multi-country calculator',
                icon: Calculator
              },
              {
                step: '02',
                title: 'Purchase & Ship',
                description: 'Buy through verified agents, arrange shipping via RoRo or container',
                icon: Truck
              },
              {
                step: '03',
                title: 'Clear & Register',
                description: 'Clear customs at Walvis Bay, complete registration, drive your car',
                icon: FileCheck
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 transform translate-x-1/2 -z-10" />
                )}

                <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative p-8 text-center">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                      {step.step}
                    </div>
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 mb-4">
                      <step.icon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Start Importing Like a Pro
            </h2>
            <p className="text-xl text-gray-600">
              One-time payment, lifetime access to everything
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <ModernPricingCard
              currency="N$"
              price="1,499"
              originalPrice="2,999"
              country="na"
              features={pricingFeatures}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How much can I really save by importing?',
                a: 'Most customers save N$50,000 to N$150,000 compared to local dealer prices. The exact amount depends on the vehicle model and specifications.'
              },
              {
                q: 'Is importing legal and safe?',
                a: 'Yes, importing is 100% legal when done correctly. Our guide ensures you follow all regulations and use verified, trustworthy suppliers.'
              },
              {
                q: 'How long does the import process take?',
                a: 'Typically 6-8 weeks from purchase to delivery at Walvis Bay, plus 1-2 weeks for customs clearance and registration.'
              },
              {
                q: 'What if I need help during my import?',
                a: 'You get access to our WhatsApp support where you can ask questions and get guidance throughout your import journey.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Save Thousands on Your Next Car?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of smart importers who've discovered the secret to affordable cars
          </p>

          <Link href="/purchase">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <span>Get Import Mastery Now</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <p className="mt-6 text-white/80 text-sm">
            🔒 Secure checkout • ⚡ Instant access • 💰 50% off ends soon
          </p>
        </div>
      </section>
    </main>
  )
}