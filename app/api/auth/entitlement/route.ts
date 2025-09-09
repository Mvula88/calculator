import { NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/service'

export async function GET() {
  try {
    // Get the current user
    const user = await AuthService.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    // Get user's entitlement
    const entitlement = await AuthService.getUserEntitlement(user.email, user.id)
    
    if (!entitlement) {
      return NextResponse.json(
        { error: 'No entitlement found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ entitlement })
  } catch (error) {
    console.error('Error fetching entitlement:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}