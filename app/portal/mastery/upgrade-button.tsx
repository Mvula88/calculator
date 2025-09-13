'use client'

import { useEffect } from 'react'

interface UpgradeButtonProps {
  userEmail: string | null
  country?: string
}

export default function UpgradeButton({ userEmail, country = 'na' }: UpgradeButtonProps) {
  useEffect(() => {
    // Store email in localStorage when component mounts
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail)
    }
  }, [userEmail])

  return (
    <button 
      onClick={() => {
        // Store the user's email before redirecting
        if (userEmail) {
          localStorage.setItem('checkout_email', userEmail)
        }
        window.location.href = `/${country}/upsell`
      }}
      className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
    >
      Upgrade to Import Mastery →
    </button>
  )
}