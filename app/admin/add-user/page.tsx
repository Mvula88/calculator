'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function AddOfflineUserPage() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [tier, setTier] = useState<'mistake' | 'mastery'>('mastery')
  const [country, setCountry] = useState<'na' | 'za' | 'bw' | 'zm'>('na')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [adminSecret, setAdminSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/add-offline-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          displayName: displayName.trim() || null,
          tier,
          country,
          paymentMethod: paymentMethod.trim() || 'offline',
          amount: amount.trim() || null,
          adminSecret: adminSecret.trim()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          type: 'success',
          message: data.message || 'User added successfully!'
        })
        // Clear form
        setEmail('')
        setDisplayName('')
        setPaymentMethod('')
        setAmount('')
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Failed to add user'
        })
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: error instanceof Error ? error.message : 'Network error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add Offline Payment User</CardTitle>
            <p className="text-sm text-gray-600">
              Manually grant access to users who paid offline (cash, bank transfer, etc.)
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Admin Secret */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Admin Secret Key *
                </label>
                <input
                  type="password"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter admin secret"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Set in environment variable ADMIN_SECRET
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  User Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="user@example.com"
                  required
                />
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Display Name (Optional)
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., John Doe"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Will use email prefix if not provided
                </p>
              </div>

              {/* Tier */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Access Tier *
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as 'mistake' | 'mastery')}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="mastery">Mastery (Full Access - $49)</option>
                  <option value="mistake">Mistake (Mistakes Only - $19)</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Country *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as 'na' | 'za' | 'bw' | 'zm')}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="na">Namibia</option>
                  <option value="za">South Africa</option>
                  <option value="bw">Botswana</option>
                  <option value="zm">Zambia</option>
                </select>
              </div>

              {/* Payment Method (Optional) */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method (Optional)
                </label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Cash, Bank Transfer, EFT"
                />
              </div>

              {/* Amount (Optional) */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Amount Paid (Optional)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., N$ 850"
                />
              </div>

              {/* Result Message */}
              {result && (
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    result.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {result.type === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm ${
                      result.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {result.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Adding User...' : 'Grant Access'}
              </Button>
            </form>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">📝 Instructions:</h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Enter the admin secret key (check your .env file)</li>
                <li>Enter the customer's email address</li>
                <li>Select the tier they paid for</li>
                <li>Select their country</li>
                <li>Optionally add payment method and amount for records</li>
                <li>Click "Grant Access"</li>
              </ol>
              <p className="text-xs text-gray-600 mt-3">
                The user will immediately get access when they log in with their email.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
