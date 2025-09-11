import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/portal/calculator', '/portal/dashboard', '/portal/account']

// Public auth routes
const AUTH_ROUTES = ['/auth/login', '/auth/setup-account', '/auth/forgot-password', '/auth/callback']

// Country detection function
async function detectCountryFromIP(ip: string | null): Promise<string> {
  if (!ip || ip === '::1' || ip === '127.0.0.1') return 'namibia'
  
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_code/`, {
      signal: AbortSignal.timeout(3000)
    })
    
    if (response.ok) {
      const countryCode = await response.text()
      
      const countryMap: { [key: string]: string } = {
        'NA': 'namibia',
        'ZA': 'south-africa',
        'BW': 'botswana',
        'ZM': 'zambia'
      }
      
      return countryMap[countryCode.trim()] || 'namibia'
    }
  } catch (error) {
    console.error('Country detection failed:', error)
  }
  
  return 'namibia'
}

export async function middleware(request: NextRequest) {
  // Detect country
  let country = 'namibia'
  
  // Check saved preference first
  const savedCountry = request.cookies.get('user-country')?.value
  if (savedCountry) {
    country = savedCountry
  } else {
    // Detect from IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               null
    country = await detectCountryFromIP(ip)
  }
  
  let supabaseResponse = NextResponse.next({
    request,
  })
  
  // Set country in header for use in server components
  supabaseResponse.headers.set('x-user-country', country)
  
  // Save country preference in cookie
  supabaseResponse.cookies.set('user-country', country, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.headers.set('x-user-country', country)
          supabaseResponse.cookies.set('user-country', country, {
            maxAge: 60 * 60 * 24 * 30,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()

  // Get user's entitlements if authenticated
  let userTier = null
  if (user) {
    const { data: entitlements } = await supabase
      .from('entitlements')
      .select('tier')
      .eq('user_id', user.id)
      .single()
    
    userTier = entitlements?.tier
  }

  // Protected portal routes - SECURE AUTH CHECK
  if (request.nextUrl.pathname.startsWith('/portal')) {
    // Public portal routes that don't require auth
    const publicPortalRoutes = ['/portal/login', '/portal/activate']
    if (publicPortalRoutes.includes(request.nextUrl.pathname)) {
      // If user is already authenticated, redirect to calculator
      if (user && userTier) {
        return NextResponse.redirect(new URL('/portal/calculator', request.url))
      }
      return supabaseResponse
    }
    
    // All other portal routes require authentication
    if (!user) {
      // Check for Stripe session in URL (post-payment redirect)
      const stripeSession = request.nextUrl.searchParams.get('session_id')
      if (stripeSession) {
        // Redirect to setup account with session
        const setupUrl = new URL('/auth/setup-account', request.url)
        setupUrl.searchParams.set('session_id', stripeSession)
        return NextResponse.redirect(setupUrl)
      }
      
      // Redirect to login
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Check if user has completed setup
    if (user.user_metadata?.needs_password_reset) {
      // User needs to complete account setup
      if (request.nextUrl.pathname !== '/auth/setup-account') {
        return NextResponse.redirect(new URL('/auth/setup-account', request.url))
      }
    }
    
    // Check if user has entitlements
    if (!userTier) {
      // User is authenticated but has no paid access
      return NextResponse.redirect(new URL('/pricing', request.url))
    }
    
    // Check tier-specific access
    if (request.nextUrl.pathname.includes('/calculator/advanced') && userTier !== 'mastery') {
      // Advanced features require mastery tier
      return NextResponse.redirect(new URL('/upgrade', request.url))
    }
  }

  // API routes - pass through authentication status
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (user) {
      supabaseResponse.headers.set('x-user-id', user.id)
      supabaseResponse.headers.set('x-user-email', user.email || '')
      supabaseResponse.headers.set('x-user-tier', userTier || '')
    }
  }

  // Redirect authenticated users from auth pages (except setup-account if needed)
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    // Allow access to setup-account if user needs to complete setup
    if (request.nextUrl.pathname === '/auth/setup-account' && 
        user.user_metadata?.needs_password_reset) {
      return supabaseResponse
    }
    
    // Otherwise redirect to portal
    return NextResponse.redirect(new URL('/portal/calculator', request.url))
  }

  // Root redirect based on auth and country
  if (request.nextUrl.pathname === '/') {
    if (user && userTier) {
      return NextResponse.redirect(new URL('/portal/calculator', request.url))
    } else {
      // Redirect to country-specific guide
      const countryCode = country.toLowerCase()
      if (countryCode.includes('namibia')) {
        return NextResponse.redirect(new URL('/na/guide', request.url))
      } else if (countryCode.includes('south-africa')) {
        return NextResponse.redirect(new URL('/za/guide', request.url))
      } else if (countryCode.includes('botswana')) {
        return NextResponse.redirect(new URL('/bw/guide', request.url))
      } else if (countryCode.includes('zambia')) {
        return NextResponse.redirect(new URL('/zm/guide', request.url))
      } else {
        return NextResponse.redirect(new URL('/na/guide', request.url))
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}