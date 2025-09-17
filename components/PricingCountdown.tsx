'use client'

// Component disabled - fake countdown timers violate Stripe policies
// This component created false urgency with a continuously resetting timer
// Stripe prohibits misleading marketing tactics including artificial scarcity and urgency

interface PricingCountdownProps {
  currency: string
  mistakeOriginal: string
  masteryOriginal: string
}

export default function PricingCountdown({ currency, mistakeOriginal, masteryOriginal }: PricingCountdownProps) {
  // Return null to disable the component completely
  return null
}