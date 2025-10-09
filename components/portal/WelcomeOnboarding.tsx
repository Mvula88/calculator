'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Rocket,
  BookOpen,
  Calculator,
  FileText,
  Users,
  Ship,
  CheckCircle,
  ArrowRight,
  Zap,
  Star,
  TrendingUp,
  Clock,
  Shield,
  MessageCircle,
  X
} from 'lucide-react'
import Link from 'next/link'

interface WelcomeOnboardingProps {
  userEmail?: string
  onClose?: () => void
}

export default function WelcomeOnboarding({ userEmail, onClose }: WelcomeOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const learningPath = [
    {
      step: 1,
      title: 'Start with Beginner Journey',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
      href: '/portal/beginner',
      duration: '15-20 min read',
      description: 'Learn import basics, terminology, and see real cost examples',
      keyTakeaways: [
        'Understand FOB, CIF, ICD, ENV, VAT and all import terms',
        'See 4 real vehicle imports with full cost breakdowns',
        'Learn the 5-step import process',
        'Use the quick cost estimator'
      ]
    },
    {
      step: 2,
      title: 'Study the Complete Guide',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      href: '/portal/guide',
      duration: '30-45 min read',
      description: 'Deep dive into the step-by-step import process for your country',
      keyTakeaways: [
        'Pre-import checklists to avoid costly mistakes',
        'Timeline expectations (60-90 days realistic)',
        'Common mistakes that cost thousands',
        'Emergency contacts and templates'
      ]
    },
    {
      step: 3,
      title: 'Review Real Documents',
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      href: '/portal/documents',
      duration: '20-30 min review',
      description: 'Study actual import documents so you know exactly what to expect',
      keyTakeaways: [
        'See real Japanese auction invoices',
        'Customs forms (SAD 500, Assessment Notice)',
        'Bill of Lading and Export Certificates',
        'Learn what customs officers check for'
      ]
    },
    {
      step: 4,
      title: 'Use the Advanced Calculator',
      icon: Calculator,
      color: 'bg-purple-100 text-purple-600',
      href: '/portal/calculator',
      duration: '10 min per calculation',
      description: 'Calculate exact duties, taxes, and total landed costs',
      keyTakeaways: [
        'Multi-country duty calculations (NA, ZA, BW, ZM)',
        'Japan-side costs breakdown',
        'Container sharing cost calculator',
        'Save calculations for comparison'
      ]
    },
    {
      step: 5,
      title: 'Explore Additional Resources',
      icon: Star,
      color: 'bg-rose-100 text-rose-600',
      href: '/portal',
      duration: 'As needed',
      description: 'Access verified agents, shipping companies, and Japan auction guides',
      keyTakeaways: [
        'Verified clearing agents directory',
        'Shipping companies comparison',
        'Japan auction bidding guide',
        'Container sharing platform info'
      ]
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          )}
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="h-8 w-8" />
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Import Mastery!</h1>
          </div>
          <p className="text-blue-100">
            Your complete vehicle import system • Licensed to: {userEmail || 'Portal User'}
          </p>
        </div>

        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-xs text-gray-600">Learning Steps</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">20+</div>
              <div className="text-xs text-gray-600">Real Documents</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-xs text-gray-600">Countries</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1-2h</div>
              <div className="text-xs text-gray-600">Total Learning</div>
            </div>
          </div>

          {/* Value Proposition */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">What You'll Gain:</h3>
                <ul className="space-y-1 text-sm text-green-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Save N$5,000-N$50,000 by avoiding common mistakes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Save N$40,000+ using container sharing strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Save 20+ hours of scattered research
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Know exact costs before buying any vehicle
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Suggested Learning Path */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Your Suggested Learning Path
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Follow this path to master the vehicle import process (1-2 hours total)
            </p>

            <div className="space-y-4">
              {learningPath.map((item) => (
                <Card key={item.step} className="p-4 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`${item.color} rounded-lg p-3`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-500">STEP {item.step}</span>
                            <span className="text-xs text-gray-500">• {item.duration}</span>
                          </div>
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Key Takeaways:</p>
                        <ul className="space-y-1">
                          {item.keyTakeaways.map((takeaway, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link href={item.href}>
                        <Button size="sm" className="w-full sm:w-auto">
                          {item.step === 1 ? 'Start Here' : `Go to Step ${item.step}`}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-800 mb-3">
                  We're here to support your import journey:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-blue-800">
                      <strong>WhatsApp Support:</strong> Get answers to your questions
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-blue-800">
                      <strong>Email Support:</strong> contact@impota.com
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="text-blue-800">
                      <strong>Response Time:</strong> Within 24 hours (usually faster)
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/264816683276?text=Hi,%20I%20need%20help%20with%20the%20Import%20Mastery%20portal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Pro Tips */}
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Pro Tips for Success:</h3>
                <ul className="space-y-1 text-sm text-yellow-800">
                  <li>• Start with Step 1 (Beginner Journey) even if you think you know the basics</li>
                  <li>• Bookmark pages you'll reference often (calculator, documents)</li>
                  <li>• Use the calculator BEFORE making any vehicle purchase</li>
                  <li>• Save/screenshot calculations for your records</li>
                  <li>• Budget 10-15% extra for unexpected costs</li>
                  <li>• Expect 9-10 weeks total timeline (60-70 days)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="/portal/beginner" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Rocket className="h-5 w-5 mr-2" />
                Start Your Journey Now
              </Button>
            </Link>
            {onClose && (
              <Button variant="outline" onClick={onClose} className="flex-1">
                I'll Explore on My Own
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
