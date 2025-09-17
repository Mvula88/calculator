'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, AlertCircle, Search, UserPlus } from 'lucide-react'

export default function PaymentDebugPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [fixing, setFixing] = useState(false)

  const checkPurchase = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/dev/check-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to check purchase' })
    } finally {
      setLoading(false)
    }
  }

  const fixEntitlement = async () => {
    if (!email) return

    setFixing(true)

    try {
      const response = await fetch('/api/dev/check-purchase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase(),
          tier: 'mistake',
          country: 'na'
        })
      })

      const data = await response.json()

      if (data.entitlement) {
        alert('Entitlement created successfully! You can now log in.')
        // Refresh the check
        await checkPurchase()
      } else {
        alert('Failed to create entitlement: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Error creating entitlement')
    } finally {
      setFixing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2">Payment Debug Tool</h1>
          <p className="text-gray-600 mb-8">Check your payment status and fix any issues</p>

          <div className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address (used for payment)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1"
                />
                <Button
                  onClick={checkPurchase}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check
                    </>
                  )}
                </Button>
              </div>
            </div>

            {result && (
              <div className="space-y-4">
                {/* Diagnosis */}
                {result.diagnosis && (
                  <Alert className={
                    result.diagnosis.hasEntitlements ? 'border-green-200 bg-green-50' :
                    result.diagnosis.hasCompletedPayments ? 'border-orange-200 bg-orange-50' :
                    'border-gray-200'
                  }>
                    <AlertDescription>
                      {result.diagnosis.hasEntitlements ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">You have an active entitlement! You can log in.</span>
                        </div>
                      ) : result.diagnosis.hasCompletedPayments ? (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-800">Payment found but no entitlement. Click "Fix Now" to resolve.</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-gray-600" />
                          <span>No payment found for this email.</span>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Button */}
                {result.diagnosis?.needsManualFix && (
                  <Button
                    onClick={fixEntitlement}
                    disabled={fixing}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {fixing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Fix Now - Create Missing Entitlement
                      </>
                    )}
                  </Button>
                )}

                {/* Entitlements */}
                {result.entitlements && result.entitlements.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Your Entitlements</h3>
                    <div className="space-y-2">
                      {result.entitlements.map((ent: any, i: number) => (
                        <div key={i} className="text-sm p-2 bg-gray-50 rounded">
                          <div>Tier: <span className="font-semibold">{ent.tier}</span></div>
                          <div>Active: <span className="font-semibold">{ent.active ? 'Yes' : 'No'}</span></div>
                          <div>Created: {new Date(ent.created_at).toLocaleDateString()}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Stripe Sessions */}
                {result.stripeSessions && result.stripeSessions.sessions.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Your Payments (from Stripe)</h3>
                    <div className="space-y-2">
                      {result.stripeSessions.sessions.map((session: any, i: number) => (
                        <div key={i} className="text-sm p-2 bg-gray-50 rounded">
                          <div>Status: <span className={`font-semibold ${session.payment_status === 'paid' ? 'text-green-600' : 'text-gray-600'}`}>
                            {session.payment_status}
                          </span></div>
                          <div>Amount: {(session.amount / 100).toFixed(2)} {session.currency.toUpperCase()}</div>
                          <div>Date: {new Date(session.created).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500 mt-1">ID: {session.id.substring(0, 20)}...</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Manual Fix Success */}
                {result.action === 'CREATED_MISSING_ENTITLEMENT' && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div className="font-semibold mb-1">Entitlement Created Successfully!</div>
                      <div>You can now log in with your email: {email}</div>
                      <div className="mt-2">
                        <Link href="/auth/login" className="text-green-700 underline font-semibold">
                          Go to Login Page →
                        </Link>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error */}
                {result.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {result.error}
                      {result.details && <div className="text-sm mt-1">{result.details}</div>}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to use this tool:</h3>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Enter the email address you used for payment</li>
                <li>2. Click "Check" to see your payment status</li>
                <li>3. If payment is found but access isn't working, click "Fix Now"</li>
                <li>4. Once fixed, go to the login page and sign in with your email</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}