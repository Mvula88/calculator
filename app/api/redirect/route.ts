import { NextRequest, NextResponse } from 'next/server'

// This endpoint helps debug and handle redirects while preserving query parameters
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const to = searchParams.get('to')

  if (!to) {
    return NextResponse.json({ error: 'Missing "to" parameter' }, { status: 400 })
  }

  // Preserve all other query parameters
  const newUrl = new URL(to, req.url)
  searchParams.forEach((value, key) => {
    if (key !== 'to') {
      newUrl.searchParams.set(key, value)
    }
  })

  console.log('[Redirect API] Redirecting to:', newUrl.toString())

  return NextResponse.redirect(newUrl)
}