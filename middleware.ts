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
    // Check for entitlements by BOTH user_id and email
    // This handles cases where payment was made before account creation
    const { data: entitlements } = await supabase
      .from('entitlements')
      .select('*')
      .or(`user_id.eq.${user.id},email.eq.${user.email?.toLowerCase()}`)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (entitlements) {
      userTier = entitlements.tier

      // Auto-link orphaned entitlements (where user_id is null but email matches)
      if (!entitlements.user_id && entitlements.email === user.email?.toLowerCase()) {
        await supabase
          .from('entitlements')
          .update({
            user_id: user.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', entitlements.id)

        console.log('Auto-linked entitlement for user:', user.email)
      }
    }
  }

  // Protected portal routes - SECURE AUTH CHECK
  if (request.nextUrl.pathname.startsWith('/portal')) {
    // Public portal routes that don't require auth
    // /portal/welcome is public to handle Stripe payment success redirects
    const publicPortalRoutes = ['/portal/login', '/portal/activate', '/portal/welcome']
    if (publicPortalRoutes.includes(request.nextUrl.pathname)) {
      // Special handling for /portal/welcome - NEVER redirect away from it
      if (request.nextUrl.pathname === '/portal/welcome') {
        console.log('[Middleware] Welcome page accessed:', {
          hasUser: !!user,
          userEmail: user?.email,
          hasTier: !!userTier,
          tier: userTier,
          hasSessionId: !!request.nextUrl.searchParams.get('session_id'),
          sessionId: request.nextUrl.searchParams.get('session_id')?.substring(0, 20),
          paymentStatus: request.nextUrl.searchParams.get('payment_status')
        })
        // Let the welcome page handle all logic
        return supabaseResponse
      }

      // For other public routes, redirect if already authenticated with tier
      // UNLESS they're coming from a Stripe payment
      const fromStripe = request.nextUrl.searchParams.get('session_id')
      if (user && userTier && !fromStripe) {
        return NextResponse.redirect(new URL('/portal', request.url))
      }
      return supabaseResponse
    }

    // All other portal routes require authentication
    if (!user) {
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
      return NextResponse.redirect(new URL('/packages', request.url))
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

  // Redirect authenticated users from auth pages (except setup-account if needed or create-account after payment)
  if (user && userTier && request.nextUrl.pathname.startsWith('/auth')) {
    // Only redirect if user has full access (both user AND tier)
    // This prevents issues where user exists but has no entitlements
    
    // Allow access to setup-account if user needs to complete setup
    if (request.nextUrl.pathname === '/auth/setup-account' && 
        user.user_metadata?.needs_password_reset) {
      return supabaseResponse
    }
    
    // Allow access to create-account if coming from Stripe payment
    if (request.nextUrl.pathname === '/auth/create-account') {
      const sessionId = request.nextUrl.searchParams.get('session_id')
      if (sessionId) {
        // Coming from Stripe payment, allow access
        return supabaseResponse
      }
    }
    
    // Only redirect if user has tier/entitlements
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  // Root redirect - ALWAYS go to guide page first
  if (request.nextUrl.pathname === '/') {
    // Always redirect to country-specific guide, regardless of auth status
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

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}