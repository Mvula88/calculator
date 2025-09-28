'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Star, Trophy, Users, Calculator, BookOpen, Shield, Mail } from 'lucide-react'
import Link from 'next/link'
export default function NamibiaUpsellPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  useEffect(() => {
    // Try to get email from localStorage (saved during initial purchase)
    const savedEmail = localStorage.getItem('checkout_email')
    if (savedEmail) {
      setEmail(savedEmail)
    } else {
      setShowEmailInput(true)
    }
  }, [])
  async function handleMasteryUpgrade() {
    if (!email) {
      setShowEmailInput(true)
      alert('Please enter your email address')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          country: 'na', 
          tier: 'mastery',
          productId: 'import-mastery-na',
          email: email,
          isUpgrade: true  // Flag this as an upgrade
        })
      })
      const { url, error } = await res.json()
      if (error) {
        alert(`Error: ${error}`)
        return
      }
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      alert('Failed to start checkout')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Special Offer Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">UPGRADE TO IMPORT MASTERY</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Congratulations! You Qualify for<br />
            Import Mastery Package
          </h1>
          <p className="text-xl text-gray-600">
            Join our growing community of successful importers
          </p>
        </div>
        {/* What You Get */}
        <Card className="p-8 mb-8 border-2 border-purple-200 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Import Mastery Includes Everything:</h2>
            <p className="text-gray-600 mt-2">Lifetime access to all premium features</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Star className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <strong>Container Sharing Network</strong>
                  <p className="text-sm text-gray-600">Connect with other importers</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <strong>Verified Agent Directory</strong>
                  <p className="text-sm text-gray-600">Pre-vetted agents with transparent pricing</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Calculator className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <strong>Advanced Calculator</strong>
                  <p className="text-sm text-gray-600">Exact duty with all fees</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <BookOpen className="h-6 w-6 text-purple-500 flex-shrink-0" />
                <div>
                  <strong>Complete Import Course</strong>
                  <p className="text-sm text-gray-600">15 video lessons</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <strong>Fraud Protection Guide</strong>
                  <p className="text-sm text-gray-600">Identify and avoid scams</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Star className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <strong>WhatsApp Support Group</strong>
                  <p className="text-sm text-gray-600">Direct help from experts</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {/* Pricing */}
        <Card className="p-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-4xl font-bold line-through text-gray-400">N$2,999</span>
              <span className="text-5xl font-bold text-green-600 ml-4">N$1,499</span>
              <span className="text-sm ml-2 opacity-80">One-time payment</span>
            </div>
            {showEmailInput && (
              <div className="mb-4 max-w-md mx-auto">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white text-gray-900"
                    required
                  />
                </div>
                <p className="text-xs mt-2 opacity-90">
                  Use the same email from your initial purchase
                </p>
              </div>
            )}
            <Button 
              onClick={handleMasteryUpgrade}
              disabled={loading}
              size="lg"
              className="w-full md:w-auto bg-white text-orange-600 hover:bg-gray-100"
            >
              {loading ? 'Processing...' : 'Upgrade to Import Mastery Now'}
            </Button>
            <div className="mt-6 space-y-2">
              <p className="text-sm opacity-90">
                ✓ Lifetime access & updates
              </p>
              <p className="text-sm opacity-90">
                ✓ Import efficiently on every import
              </p>
              <p className="text-sm opacity-90">
                ✓ Expert support included
              </p>
            </div>
          </div>
        </Card>
        {/* Skip Link */}
        <div className="text-center mt-8">
          <Link 
            href="/portal" 
            className="text-gray-500 underline text-sm hover:text-gray-700"
          >
            No thanks, take me to the basic portal
          </Link>
        </div>
      </div>
    </main>
  )
}