'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function FixPurchasePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function checkPurchase() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/dev/check-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to check purchase' })
    } finally {
      setLoading(false)
    }
  }

  async function manualFix() {
    setLoading(true)

    try {
      const res = await fetch('/api/dev/check-purchase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          tier: 'mistake', // Change to 'mastery' if you purchased Import Mastery
          country: 'na'
        })
      })

      const data = await res.json()
      setResult(data)

      if (data.entitlement) {
        // Refresh the check
        setTimeout(() => checkPurchase(), 1000)
      }
    } catch (error) {
      setResult({ error: 'Failed to create manual entitlement' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">🔧 Fix Purchase Access</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter the email you used for purchase:
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={checkPurchase}
                disabled={loading || !email}
              >
                {loading ? 'Checking...' : 'Check Purchase'}
              </Button>
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              {/* Diagnosis Summary */}
              {result.diagnosis && (
                <Card className={`p-4 ${
                  result.diagnosis.hasEntitlements ? 'bg-green-50 border-green-200' :
                  result.diagnosis.hasCompletedPayments ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {result.diagnosis.hasEntitlements ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : result.diagnosis.hasCompletedPayments ? (
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">
                        {result.diagnosis.hasEntitlements ? 'Access Found!' :
                         result.diagnosis.hasCompletedPayments ? 'Payment Found - Creating Access' :
                         'No Payment Found'}
                      </h3>
                      <p className="text-sm">
                        {result.diagnosis.hasEntitlements ? 
                          'Your entitlement is active. You should be able to access the portal.' :
                         result.diagnosis.hasCompletedPayments ? 
                          'We found your payment but the entitlement was missing. Creating it now...' :
                          'No completed payment found for this email in Stripe.'}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Created */}
              {result.action === 'CREATED_MISSING_ENTITLEMENT' && (
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900">Access Fixed!</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Your entitlement has been created. You can now:
                      </p>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Go to <Link href="/auth/login" className="underline">Login Page</Link></li>
                        <li>• Use "Email Login" tab (magic link)</li>
                        <li>• Enter: {email}</li>
                        <li>• Check your email for the login link</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {/* Entitlements */}
              {result.entitlements && result.entitlements.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Your Entitlements:</h3>
                  {result.entitlements.map((ent: any, i: number) => (
                    <Card key={i} className="p-3 mb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><strong>Tier:</strong> {ent.tier}</div>
                        <div><strong>Status:</strong> {ent.active ? '✅ Active' : '❌ Inactive'}</div>
                        <div><strong>Country:</strong> {ent.country?.toUpperCase() || 'NA'}</div>
                        <div><strong>Created:</strong> {new Date(ent.created_at).toLocaleDateString()}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Stripe Sessions */}
              {result.stripeSessions && result.stripeSessions.sessions && (
                <div>
                  <h3 className="font-semibold mb-2">Stripe Payment History:</h3>
                  {result.stripeSessions.sessions.length > 0 ? (
                    result.stripeSessions.sessions.map((session: any, i: number) => (
                      <Card key={i} className="p-3 mb-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Status:</strong> {session.status}</div>
                          <div><strong>Payment:</strong> {session.payment_status}</div>
                          <div><strong>Amount:</strong> {session.currency?.toUpperCase()} {(session.amount / 100).toFixed(2)}</div>
                          <div><strong>Date:</strong> {new Date(session.created).toLocaleDateString()}</div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">No Stripe sessions found for this email.</p>
                  )}
                </div>
              )}

              {/* Manual Fix Option */}
              {(!result.entitlements || result.entitlements.length === 0) && !result.action && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="font-semibold mb-2">Manual Fix Available</h3>
                  <p className="text-sm mb-3">
                    If you're certain you purchased but it's not showing, we can manually create your access.
                  </p>
                  <Button 
                    onClick={manualFix}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? 'Creating...' : 'Create Manual Access (Mistake Guide)'}
                  </Button>
                </Card>
              )}

              {/* Raw Data (for debugging) */}
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                  View Raw Data (for debugging)
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>How to access after fix:</strong>
            <br />1. Go to <Link href="/auth/login" className="underline">Login Page</Link>
            <br />2. Click "Email Login" tab
            <br />3. Enter your email and get a magic link
            <br />4. Access the portal at <Link href="/portal" className="underline">/portal</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}