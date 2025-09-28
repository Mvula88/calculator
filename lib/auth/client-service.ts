import { createClient as createBrowserClient } from '@/lib/supabase/client'

export interface AuthUser {
  id: string
  email: string
  created_at: string
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