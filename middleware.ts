import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Country detection function
async function detectCountryFromIP(ip: string | null): Promise<string> {
  if (!ip) return 'namibia'
  
  // For local development, return default
  if (ip === '::1' || ip === '127.0.0.1') return 'namibia'
  
  try {
    // Use a free IP geolocation service
    const response = await fetch(`https://ipapi.co/${ip}/country_code/`, {
      signal: AbortSignal.timeout(3000) // 3 second timeout
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
  
  return 'namibia' // Default fallback
}

export async function middleware(request: NextRequest) {
  // Detect country from subdomain first, then IP
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  
  const subdomainMap: { [key: string]: string } = {
    'na': 'namibia',
    'za': 'south-africa',
    'bw': 'botswana',
    'zm': 'zambia'
  }
  
  let country = subdomainMap[subdomain]
  
  // If no valid subdomain, check cookie for saved preference
  if (!country) {
    const savedCountry = request.cookies.get('user-country')?.value
    if (savedCountry) {
      country = savedCountry
    }
  }
  
  // If still no country, detect from IP
  if (!country) {
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
          // Preserve the country headers and cookies
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes that require authentication AND payment
  const protectedPaths = [
    '/dashboard',
    '/calculator',
    '/guides',
    '/resources'
  ]

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // If accessing protected route without authentication, redirect to login
  if (isProtectedPath && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Check if user has made payment (calculator_pro purchase)
  // DEVELOPMENT MODE: Skip payment check if in development
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  // Skip payment check if this is a successful payment redirect or within grace period
  const isPaymentSuccess = request.nextUrl.searchParams.get('payment') === 'success'
  
  // Check for recent payment session cookie (set after successful payment)
  const recentPaymentCookie = request.cookies.get('recent_payment')
  const isRecentPayment = recentPaymentCookie && 
    Date.now() - parseInt(recentPaymentCookie.value) < 300000 // 5 minute grace period
  
  // Check for verified purchase cookie (set after purchase is confirmed)
  const verifiedPurchaseCookie = request.cookies.get('verified_purchase')
  const hasVerifiedPurchase = verifiedPurchaseCookie?.value === 'true'
  
  if (isProtectedPath && user && !isDevelopment && !isPaymentSuccess && !isRecentPayment && !hasVerifiedPurchase) {
    // Check for entitlements (new system)
    const { data: entitlement } = await supabase
      .from('entitlements')
      .select('id')
      .eq('email', user.email?.toLowerCase())
      .eq('active', true)
      .limit(1)
      .maybeSingle()

    if (!entitlement) {
      // User is authenticated but has no entitlement - redirect to country guide
      const redirectUrl = request.nextUrl.clone()
      const countryCode = country.toLowerCase()
      if (countryCode.includes('na') || countryCode.includes('namibia')) {
        redirectUrl.pathname = '/na/guide'
      } else if (countryCode.includes('za') || countryCode.includes('south-africa')) {
        redirectUrl.pathname = '/za/guide'
      } else {
        redirectUrl.pathname = '/na/guide'
      }
      return NextResponse.redirect(redirectUrl)
    } else {
      // Set verified purchase cookie to avoid repeated database checks
      supabaseResponse.cookies.set('verified_purchase', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }
  }
  
  // Set cookies for recent payment if this is a payment success redirect
  if (isPaymentSuccess && user) {
    supabaseResponse.cookies.set('recent_payment', Date.now().toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300 // 5 minutes
    })
    
    // Also set verified purchase cookie immediately
    supabaseResponse.cookies.set('verified_purchase', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
  }

  // Redirect authenticated users away from auth pages
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // PROFESSIONAL FLOW: Redirect entitled users away from public/marketing pages
  const publicPaths = ['/', '/pricing', '/about', '/contact']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)
  
  if (isPublicPath && user) {
    // Check if user has entitlement
    const { data: entitlement } = await supabase
      .from('entitlements')
      .select('id')
      .eq('email', user.email?.toLowerCase())
      .eq('active', true)
      .limit(1)
      .maybeSingle()
    
    // If user has entitlement, redirect to portal
    if (entitlement) {
      return NextResponse.redirect(new URL('/portal', request.url))
    }
    // If authenticated but no entitlement, redirect to country guide
    else if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/pricing') {
      const countryCode = country.toLowerCase()
      if (countryCode.includes('na') || countryCode.includes('namibia')) {
        return NextResponse.redirect(new URL('/na/guide', request.url))
      } else if (countryCode.includes('za') || countryCode.includes('south-africa')) {
        return NextResponse.redirect(new URL('/za/guide', request.url))
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