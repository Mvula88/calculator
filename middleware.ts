import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

  const { data: { user } } = await supabase.auth.getUser()

  // Check for portal session cookie (for post-payment access)
  const portalSession = request.cookies.get('portal_session')?.value
  let hasPortalAccess = false
  
  if (portalSession) {
    try {
      const session = JSON.parse(portalSession)
      hasPortalAccess = !!session.email && !!session.sessionId
    } catch (e) {
      // Invalid session cookie
    }
  }

  // Protected portal routes
  if (request.nextUrl.pathname.startsWith('/portal')) {
    if (!user && !hasPortalAccess) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // API routes - pass through authentication status
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (user) {
      supabaseResponse.headers.set('x-user-id', user.id)
      supabaseResponse.headers.set('x-user-email', user.email || '')
    }
  }

  // Redirect authenticated users from auth pages
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/portal', request.url))
  }

  // Root redirect based on auth and country
  if (request.nextUrl.pathname === '/') {
    if (user) {
      return NextResponse.redirect(new URL('/portal', request.url))
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