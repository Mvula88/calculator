import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if user exists with this email
    const { data: existingUser, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.error('Database error checking email:', error)
      return NextResponse.json(
        { error: 'Failed to check email' },
        { status: 500 }
      )
    }

    // Also check auth.users table for complete verification
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()
    let userExistsInAuth = false

    if (!authError && authData?.users) {
      userExistsInAuth = authData.users.some(
        user => user.email?.toLowerCase() === email.toLowerCase()
      )
    }

    const exists = !!(existingUser || userExistsInAuth)

    return NextResponse.json({
      exists,
      message: exists
        ? 'An account with this email already exists. Please login to access your portal.'
        : null
    })

  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json(
      { error: 'Failed to check email' },
      { status: 500 }
    )
  }
}