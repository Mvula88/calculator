import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export type UserTier = 'mistake' | 'mastery' | null

export interface AuthUser {
  id: string
  email: string
  tier: UserTier
  country: string
  hasCompletedSetup: boolean
  createdAt: string
}

// Server-side auth check
export async function getServerSession() {
  const supabase = await createServerClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Get user's entitlements from database
    const { data: entitlements } = await supabase
      .from('entitlements')
      .select('tier, country')
      .eq('user_id', user.id)
      .single()

    return {
      id: user.id,
      email: user.email!,
      tier: entitlements?.tier as UserTier || null,
      country: entitlements?.country || 'na',
      hasCompletedSetup: !user.user_metadata?.needs_password_reset,
      createdAt: user.created_at
    } as AuthUser
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

// Protect server routes
export async function requireAuth() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/login')
  }
  
  return session
}

// Protect premium features
export async function requireTier(requiredTier: 'mistake' | 'mastery') {
  const session = await requireAuth()
  
  if (!session.tier) {
    redirect('/packages')
  }
  
  if (requiredTier === 'mastery' && session.tier === 'mistake') {
    redirect('/upgrade')
  }
  
  return session
}

// Client-side auth utilities
export const clientAuth = {
  async signIn(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      throw error
    }
    
    return data
  },

  async signUp(email: string, password: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) {
      throw error
    }
    
    return data
  },

  async signOut() {
    const supabase = createClient()
    
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
  },

  async sendPasswordResetEmail(email: string) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    
    if (error) {
      throw error
    }
  },

  async updatePassword(newPassword: string) {
    const supabase = createClient()
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })
    
    if (error) {
      throw error
    }
  },

  async getSession() {
    const supabase = createClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      return null
    }
    
    // Get user's entitlements
    const { data: entitlements } = await supabase
      .from('entitlements')
      .select('tier, country')
      .eq('user_id', session.user.id)
      .single()
    
    return {
      id: session.user.id,
      email: session.user.email!,
      tier: entitlements?.tier as UserTier || null,
      country: entitlements?.country || 'na',
      hasCompletedSetup: !session.user.user_metadata?.needs_password_reset,
      createdAt: session.user.created_at
    } as AuthUser
  }
}