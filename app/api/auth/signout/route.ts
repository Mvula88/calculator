import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

async function handleSignOut(request: Request) {
  const supabase = await createClient()
  
  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
  }
  
  // Clear the portal session cookie
  const cookieStore = await cookies()
  cookieStore.delete('portal_session')
  
  // Redirect to login page after signout
  return NextResponse.redirect(new URL('/auth/login', request.url))
}

// Handle both GET and POST methods
export async function GET(request: Request) {
  return handleSignOut(request)
}

export async function POST(request: Request) {
  return handleSignOut(request)
}