'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Check, Lock, Shield, CreditCard, AlertTriangle } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/register')
      return
    }
    
    setUser(user)
    
    // Check if user already has calculator_pro
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_type', 'calculator_pro')
      .single()
    
    if (purchase) {
      router.push('/dashboard')
    }
  }

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: 'calculator_pro',
          userId: user?.id
        }),
      })
      
      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-500 text-white px-4 py-2">
            STEP 2 OF 2
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Complete Your Registration
          </h1>
          <p className="text-xl text-gray-600">
            One-time payment for lifetime access to all premium features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="border-2 border-blue-500">
            <CardHeader className="bg-blue-50">
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>What you're getting today</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Calculator Pro + Import Guide
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Complete calculator with ALL 27 hidden costs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Step-by-step import process guide</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Document templates & checklists</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Verified agent list (avoid N$45,000 mistakes)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">WhatsApp support community</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Lifetime updates</span>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Potential Savings:</strong>
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    N$15,000+ per import
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    By knowing all hidden costs upfront
                  </p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-bold">N$499</p>
                    <p className="text-sm text-gray-500">One-time payment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Secure Payment
                </CardTitle>
                <CardDescription>
                  Processed securely by Stripe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  size="lg"
                  className="w-full py-6 text-lg font-bold"
                >
                  {loading ? 'Redirecting to payment...' : 'Pay N$499 Now'}
                </Button>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    <span>SSL Encrypted</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    <span>PCI Compliant</span>
                  </div>
                </div>
                
                <Alert className="bg-green-50 border-green-300">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>30-Day Money Back Guarantee</strong><br />
                    If you don't find value, get a full refund
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">What happens next?</h4>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Complete secure payment via Stripe</li>
                  <li>2. Instant access to your dashboard</li>
                  <li>3. Start using the calculator immediately</li>
                  <li>4. Join WhatsApp support group</li>
                  <li>5. Save N$15,000+ on your next import!</li>
                </ol>
              </CardContent>
            </Card>

            <Alert className="bg-orange-50 border-orange-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Limited Time:</strong> Price increases to N$699 next month. 
                Lock in lifetime access at N$499 today!
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}