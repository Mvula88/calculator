'use client'

import { Button } from '@/components/ui/button'
import { User, LogIn } from 'lucide-react'
import Link from 'next/link'

interface LoginHeaderProps {
  country?: string
  className?: string
}

export default function LoginHeader({ country = 'na', className = '' }: LoginHeaderProps) {
  return (
    <Link href="/auth/login">
      <Button
        variant="default"
        size="sm"
        className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg ${className}`}
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Already Paid?</span> Login
      </Button>
    </Link>
  )
}