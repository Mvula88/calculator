import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Delete the session cookie
    cookieStore.delete('impota_session')

    return NextResponse.json({ success: true })
  } catch (error) {

    return NextResponse.json({ 
      error: 'Failed to sign out' 
    }, { status: 500 })
  }
}