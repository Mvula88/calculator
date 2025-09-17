'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  tier: 'mistake' | 'mastery'
  country?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export default function CheckoutButton({
  tier,
  country = 'na',
  children,
  className,
  variant,
  size
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)

    try {
      // Call Stripe checkout API directly
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: country,
          tier: tier,
          productId: `${country}-guide`
        })
      })

      const { url, error } = await res.json()

      if (error) {
        alert(`Error: ${error}`)
        setLoading(false)
        return
      }

      if (url) {
        // Go directly to Stripe checkout
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
      variant={variant}
      size={size}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        children
      )}
    </Button>
  )
}