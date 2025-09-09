import { createClient, createServiceClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export interface Entitlement {
  id: string
  user_id: string | null
  email: string
  country: string
  tier: 'mistake' | 'mastery'
  active: boolean
  created_at: string
  product_id?: string
  stripe_customer_id?: string
  stripe_session_id?: string
}

export interface AuthUser {
  id: string
  email: string
  created_at: string
}

/**
 * Server-side authentication service
 */
export class AuthService {
  /**
   * Get the current authenticated user (server-side)
   */
  static async getUser() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email!,
      created_at: user.created_at
    } as AuthUser
  }

  /**
   * Check if user has any entitlement (server-side)
   * Uses service client to bypass RLS
   */
  static async getUserEntitlement(email?: string, userId?: string): Promise<Entitlement | null> {
    if (!email && !userId) {
      return null
    }

    try {
      const supabase = createServiceClient()
      
      // Build query
      let query = supabase
        .from('entitlements')
        .select('*')
        .eq('active', true)
      
      // Check by both email and user_id
      const conditions = []
      if (email) {
        conditions.push(`email.eq.${email.toLowerCase()}`)
      }
      if (userId) {
        conditions.push(`user_id.eq.${userId}`)
      }
      
      if (conditions.length > 0) {
        query = query.or(conditions.join(','))
      }
      
      const { data: entitlements, error } = await query
      
      if (error) {
        console.error('Error fetching entitlements:', error)
        return null
      }
      
      // Return the best entitlement (mastery > mistake)
      if (entitlements && entitlements.length > 0) {
        const masteryEntitlement = entitlements.find((e: Entitlement) => e.tier === 'mastery')
        return masteryEntitlement || entitlements[0]
      }
      
      return null
    } catch (error) {
      console.error('Error in getUserEntitlement:', error)
      return null
    }
  }

  /**
   * Create or update an entitlement (server-side)
   * Uses service client to bypass RLS
   */
  static async createOrUpdateEntitlement(data: {
    email: string
    country: string
    tier: 'mistake' | 'mastery'
    user_id?: string
    stripe_customer_id?: string
    stripe_session_id?: string
    product_id?: string
  }): Promise<Entitlement | null> {
    try {
      const supabase = createServiceClient()
      
      // First check if entitlement exists
      const { data: existing } = await supabase
        .from('entitlements')
        .select('*')
        .eq('email', data.email.toLowerCase())
        .eq('country', data.country)
        .single()
      
      if (existing) {
        // Update existing entitlement (upgrade tier if needed)
        const shouldUpgrade = data.tier === 'mastery' && existing.tier === 'mistake'
        
        if (shouldUpgrade || !existing.active) {
          const { data: updated, error } = await supabase
            .from('entitlements')
            .update({
              tier: data.tier,
              active: true,
              user_id: data.user_id || existing.user_id,
              stripe_customer_id: data.stripe_customer_id || existing.stripe_customer_id,
              stripe_session_id: data.stripe_session_id || existing.stripe_session_id,
              product_id: data.product_id || existing.product_id
            })
            .eq('id', existing.id)
            .select()
            .single()
          
          if (error) {
            console.error('Error updating entitlement:', error)
            return null
          }
          
          return updated
        }
        
        return existing
      } else {
        // Create new entitlement
        const { data: created, error } = await supabase
          .from('entitlements')
          .insert({
            email: data.email.toLowerCase(),
            country: data.country,
            tier: data.tier,
            active: true,
            user_id: data.user_id,
            stripe_customer_id: data.stripe_customer_id,
            stripe_session_id: data.stripe_session_id,
            product_id: data.product_id
          })
          .select()
          .single()
        
        if (error) {
          console.error('Error creating entitlement:', error)
          return null
        }
        
        return created
      }
    } catch (error) {
      console.error('Error in createOrUpdateEntitlement:', error)
      return null
    }
  }

  /**
   * Require authentication (server-side)
   * Redirects to login if not authenticated
   */
  static async requireAuth(redirectTo: string = '/portal') {
    const user = await this.getUser()
    
    if (!user) {
      redirect(`/auth/login?redirect=${encodeURIComponent(redirectTo)}`)
    }
    
    return user
  }

  /**
   * Require entitlement (server-side)
   * Redirects to purchase page if no entitlement
   */
  static async requireEntitlement(redirectTo: string = '/portal') {
    const user = await this.requireAuth(redirectTo)
    const entitlement = await this.getUserEntitlement(user.email, user.id)
    
    if (!entitlement) {
      redirect('/purchase')
    }
    
    return { user, entitlement }
  }

  /**
   * Sign out the user
   */
  static async signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }
}

/**
 * Client-side authentication service
 */
export class ClientAuthService {
  /**
   * Get the current authenticated user (client-side)
   */
  static async getUser() {
    const supabase = createBrowserClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email!,
      created_at: user.created_at
    } as AuthUser
  }

  /**
   * Sign in with email and password
   */
  static async signIn(email: string, password: string) {
    const supabase = createBrowserClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      throw error
    }
    
    return data.user
  }

  /**
   * Sign up with email and password
   */
  static async signUp(email: string, password: string) {
    const supabase = createBrowserClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    if (error) {
      throw error
    }
    
    return data.user
  }

  /**
   * Sign out the user
   */
  static async signOut() {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }
}