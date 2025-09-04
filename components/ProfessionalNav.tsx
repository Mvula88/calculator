'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, LogOut, Calculator, BookOpen, Users, Package, CreditCard } from 'lucide-react'

export function ProfessionalNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [hasPurchase, setHasPurchase] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        
        // Check if user has purchase
        const { data: purchase } = await supabase
          .from('purchases')
          .select('id')
          .eq('user_id', user.id)
          .or('status.eq.active,status.is.null')
          .limit(1)
          .maybeSingle()
        
        setHasPurchase(!!purchase)
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [pathname]) // Re-check when route changes

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  // Don't show anything while loading
  if (loading) {
    return (
      <nav className="hidden md:flex items-center gap-6">
        <span className="text-gray-400">Loading...</span>
      </nav>
    )
  }

  // NOT LOGGED IN - Show public navigation
  if (!user) {
    return (
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/pricing" className="hover:text-blue-600">
          Pricing
        </Link>
        <Link href="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm">
            Get Started
          </Button>
        </Link>
      </nav>
    )
  }

  // LOGGED IN BUT NOT PAID - Show limited navigation
  if (user && !hasPurchase) {
    return (
      <nav className="hidden md:flex items-center gap-4">
        <Badge variant="destructive">PAYMENT REQUIRED</Badge>
        <Link href="/pricing">
          <Button size="sm" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Complete Payment
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </nav>
    )
  }

  // LOGGED IN AND PAID - Show full navigation
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Badge className="bg-green-500 text-white">PRO</Badge>
      
      <Link 
        href="/dashboard" 
        className={`hover:text-blue-600 ${pathname === '/dashboard' ? 'text-blue-600 font-semibold' : ''}`}
      >
        Dashboard
      </Link>
      
      <Link 
        href="/calculator" 
        className={`hover:text-blue-600 flex items-center gap-1 ${pathname === '/calculator' ? 'text-blue-600 font-semibold' : ''}`}
      >
        <Calculator className="w-4 h-4" />
        Calculator
      </Link>
      
      <Link 
        href="/guides" 
        className={`hover:text-blue-600 flex items-center gap-1 ${pathname === '/guides' ? 'text-blue-600 font-semibold' : ''}`}
      >
        <BookOpen className="w-4 h-4" />
        Guides
      </Link>
      
      <Link 
        href="/agents" 
        className={`hover:text-blue-600 flex items-center gap-1 ${pathname === '/agents' ? 'text-blue-600 font-semibold' : ''}`}
      >
        <Users className="w-4 h-4" />
        Agents
      </Link>
      
      <Link 
        href="/container-sharing" 
        className={`hover:text-blue-600 flex items-center gap-1 ${pathname === '/container-sharing' ? 'text-blue-600 font-semibold' : ''}`}
      >
        <Package className="w-4 h-4" />
        Containers
      </Link>
      
      <div className="flex items-center gap-2 ml-4 pl-4 border-l">
        <span className="text-sm text-gray-600">
          {user.email}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
}