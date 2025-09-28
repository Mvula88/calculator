'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowRight, 
  ArrowLeft,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle,
  Package
} from 'lucide-react'

export default function CheckoutEmailPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  useEffect(() => {
    // Get the selected package from session storage
    const pkg = sessionStorage.getItem('selectedPackage')
    if (!pkg) {
      // If no package selected, redirect back to packages
      router.push('/portal')
    }
    setSelectedPackage(pkg)
  }, [router])

  const packageDetails = {
    mistake: {
      name: 'Mistake Guide',
      price: 'N$499',
      description: 'Complete guide with documents checklist'
    },
    mastery: {
      name: 'Import Mastery',
      price: 'N$1,999',
      description: 'Full access with calculators and priority support'
    }
  }

  const handleContinue = async () => {
    setError('')

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setError('Please enter your email address')
      return
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tier: selectedPackage,
          country: 'namibia',
          productId: selectedPackage
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const currentPackage = packageDetails[selectedPackage as keyof typeof packageDetails]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="text-sm text-gray-600">Package Selected</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm font-semibold">Enter Email</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm text-gray-400">Payment</span>
            </div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Enter Your Email Address</CardTitle>
            <CardDescription className="text-base mt-2">
              We'll use this for your receipt and account creation
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Selected package display */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Selected Package:</p>
                  <p className="font-bold text-lg">{currentPackage.name}</p>
                  <p className="text-sm text-gray-600">{currentPackage.description}</p>
                  <p className="text-2xl font-black text-purple-600 mt-2">{currentPackage.price}</p>
                </div>
              </div>
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Your Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg h-12"
                autoFocus
              />
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  We'll send your receipt here
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  You'll use this to create your account
                </p>
                <p className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Your email is secure and never shared
                </p>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/packages')}
              disabled={loading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
              onClick={handleContinue}
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Trust indicators */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="mb-2">🔒 Your information is secure</p>
          <p>Powered by Stripe • 256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  )
}