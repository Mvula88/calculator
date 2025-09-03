import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get calculation data from request
    const body = await request.json()
    const {
      vehicle_details,
      japan_costs,
      shipping_costs,
      destination_costs,
      total_cost,
      country,
      currency
    } = body

    // Save calculation to database
    const { data, error } = await supabase
      .from('calculations')
      .insert({
        user_id: user.id,
        vehicle_make: vehicle_details.make,
        vehicle_model: vehicle_details.model,
        vehicle_year: vehicle_details.year,
        engine_size: vehicle_details.engineSize,
        mileage: vehicle_details.mileage,
        vehicle_price: japan_costs.vehiclePrice,
        total_japan_costs: Object.values(japan_costs).reduce((a: number, b: any) => a + b, 0),
        total_shipping_costs: Object.values(shipping_costs).reduce((a: number, b: any) => a + b, 0),
        total_destination_costs: Object.values(destination_costs).reduce((a: number, b: any) => a + b, 0),
        total_cost: total_cost,
        country: country,
        currency: currency,
        calculation_data: {
          japan_costs,
          shipping_costs,
          destination_costs,
          vehicle_details
        }
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving calculation:', error)
      return NextResponse.json(
        { error: 'Failed to save calculation' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      calculation_id: data.id,
      message: 'Calculation saved successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's calculations
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Error fetching calculations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch calculations' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      calculations: data || []
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}