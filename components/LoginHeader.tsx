'use client'

import { Button } from '@/components/ui/button'
import { User, LogIn } from 'lucide-react'
import Link from 'next/link'

interface LoginHeaderProps {
  country?: string
}

export default function LoginHeader({ country = 'na' }: LoginHeaderProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Link href="/auth/login">
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <User className="h-4 w-4" />
          Already Paid? Login
        </Button>
      </Link>
    </div>
  )
}