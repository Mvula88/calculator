'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, AlertTriangle, Lock } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Price } from '@/components/ui/Price'
import { useCountry } from '@/lib/country-context'

export default function PricingPage() {
  const { country } = useCountry()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-500 text-white px-4 py-2 text-lg">
            PAYMENT REQUIRED
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            You Need Full Access to Continue
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This is a premium platform for serious importers only. 
            No free tier, no trial - just comprehensive tools that save you thousands.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <Alert className="bg-orange-50 border-orange-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-lg">
              <strong>You're trying to access protected features.</strong> Complete your payment 
              to unlock the calculator and all premium resources.
            </AlertDescription>
          </Alert>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {/* What You're Missing */}
          <Card className="border-2 border-red-500">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-2xl flex items-center gap-2">
                <X className="w-6 h-6 text-red-500" />
                What You Can't Access
              </CardTitle>
              <CardDescription>Without payment, you're missing:</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Lock className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Import Calculator</p>
                    <p className="text-sm text-gray-600">All 27 hidden costs locked</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Import Guides</p>
                    <p className="text-sm text-gray-600">Step-by-step process unavailable</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Verified Agents</p>
                    <p className="text-sm text-gray-600">Risk N$45,000 like I did</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Document Templates</p>
                    <p className="text-sm text-gray-600">No access to forms</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">WhatsApp Support</p>
                    <p className="text-sm text-gray-600">No community access</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What You Get */}
          <Card className="border-2 border-green-500">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Check className="w-6 h-6 text-green-500" />
                What You'll Get Instantly
              </CardTitle>
              <CardDescription>After <Price /> payment:</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Full Calculator Access</p>
                    <p className="text-sm text-gray-600">All 27 costs revealed immediately</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Complete Import Guide</p>
                    <p className="text-sm text-gray-600">Step-by-step with timeline</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">Verified Agent List</p>
                    <p className="text-sm text-gray-600">Avoid costly mistakes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">All Templates</p>
                    <p className="text-sm text-gray-600">Every document you need</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-semibold">WhatsApp Group</p>
                    <p className="text-sm text-gray-600">Direct support from me</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-2">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
              <CardTitle className="text-3xl mb-2">Get Full Access Now</CardTitle>
              <CardDescription className="text-white/90 text-xl">
                One-time payment • Lifetime access • No recurring fees
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-5xl font-bold mb-2"><Price className="text-5xl" /></p>
                <p className="text-gray-600">Save <Price nadAmount={15000} />+ on your first import</p>
              </div>

              <div className="space-y-4">
                <Button asChild size="lg" className="w-full py-6 text-lg font-bold">
                  <Link href="/checkout">Complete Payment Now</Link>
                </Button>
                
                <p className="text-center text-sm text-gray-600">
                  Already paid? <Link href="/auth/login" className="text-blue-600 hover:underline">Sign in here</Link>
                </p>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-center">
                  <strong>⚠️ Price increases to <Price nadAmount={1999} /> next month</strong><br />
                  Lock in lifetime access at <Price /> today
                </p>
              </div>

              <div className="mt-6 flex justify-center space-x-6 text-xs text-gray-500">
                <span>✓ SSL Secure</span>
                <span>✓ No Refunds</span>
                <span>✓ Instant Access</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}