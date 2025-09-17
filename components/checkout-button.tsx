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
    // Redirect to register page with package info
    const registerUrl = `/auth/register?package=${tier}&country=${country}&checkout=pending`
    window.location.href = registerUrl
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