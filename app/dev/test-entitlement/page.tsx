'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TestEntitlementPage() {
  const [email, setEmail] = useState('')
  const [tier, setTier] = useState('mastery')
  const [country, setCountry] = useState('na')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return <div>Not available in production</div>
  }

  async function createEntitlement() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/dev/create-entitlement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier, country })
      })

      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to create entitlement' })
    } finally {
      setLoading(false)
    }
  }

  async function checkEntitlements() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(`/api/dev/create-entitlement?email=${email}`)
      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to check entitlements' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Test Entitlement Creator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tier</label>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mistake">Mistake Guide</SelectItem>
                <SelectItem value="mastery">Import Mastery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="na">Namibia</SelectItem>
                <SelectItem value="za">South Africa</SelectItem>
                <SelectItem value="bw">Botswana</SelectItem>
                <SelectItem value="zm">Zambia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={createEntitlement}
              disabled={loading || !email}
            >
              {loading ? 'Creating...' : 'Create Entitlement'}
            </Button>
            <Button 
              onClick={checkEntitlements}
              disabled={loading || !email}
              variant="outline"
            >
              {loading ? 'Checking...' : 'Check Existing'}
            </Button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This is only available in development mode.
            After creating an entitlement, the user can access /portal and /portal/guide.
          </p>
        </div>
      </Card>
    </div>
  )
}