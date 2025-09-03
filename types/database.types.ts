export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          created_at: string
          payment_date: string
          payment_amount: number
          stripe_customer_id: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          payment_date: string
          payment_amount: number
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          payment_date?: string
          payment_amount?: number
          stripe_customer_id?: string | null
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          product_type: 'calculator_pro' | 'avoid_mistake' | 'translation_provider' | 'hidden_platforms'
          amount: number
          purchased_at: string
          stripe_payment_intent: string | null
        }
        Insert: {
          id?: string
          user_id: string
          product_type: 'calculator_pro' | 'avoid_mistake' | 'translation_provider' | 'hidden_platforms'
          amount: number
          purchased_at?: string
          stripe_payment_intent?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          product_type?: 'calculator_pro' | 'avoid_mistake' | 'translation_provider' | 'hidden_platforms'
          amount?: number
          purchased_at?: string
          stripe_payment_intent?: string | null
        }
      }
      calculations: {
        Row: {
          id: string
          user_id: string
          calculation_data: Json
          vehicle_details: Json
          total_cost: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          calculation_data: Json
          vehicle_details: Json
          total_cost: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          calculation_data?: Json
          vehicle_details?: Json
          total_cost?: number
          created_at?: string
        }
      }
      hidden_platform_access: {
        Row: {
          id: string
          user_id: string
          application_data: Json
          status: 'pending' | 'approved' | 'rejected' | 'paid'
          approved_at: string | null
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          application_data: Json
          status?: 'pending' | 'approved' | 'rejected' | 'paid'
          approved_at?: string | null
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          application_data?: Json
          status?: 'pending' | 'approved' | 'rejected' | 'paid'
          approved_at?: string | null
          paid_at?: string | null
          created_at?: string
        }
      }
    }
  }
}