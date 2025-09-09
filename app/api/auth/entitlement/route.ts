import { NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/server-service'

export async function GET() {
  try {
    // Get the current user
    const user = await AuthService.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated', user: null, entitlement: null },
        { status: 401 }
      )
    }
    
    // Get user's entitlement
    const entitlement = await AuthService.getUserEntitlement(user.email, user.id)
    
    if (!entitlement) {
      // User is authenticated but has no entitlement
      return NextResponse.json(
        { 
          error: 'No entitlement found', 
          user,
          entitlement: null 
        },
        { status: 404 }
      )
    }
    
    // Success - user has entitlement
    return NextResponse.json({ 
      user,
      entitlement,
      error: null 
    })
  } catch (error) {
    console.error('Error fetching entitlement:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        user: null,
        entitlement: null 
      },
      { status: 500 }
    )
  }
}