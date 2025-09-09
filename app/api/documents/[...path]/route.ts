import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check entitlement
    const { data: entitlements } = await supabase
      .from('entitlements')
      .select('*')
      .eq('active', true)
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)

    if (!entitlements || entitlements.length === 0) {
      return new NextResponse('No active entitlement', { status: 403 })
    }

    // Construct the file path
    const filePath = params.path.join('/')
    
    // Fetch the PDF from Supabase Storage
    const { data, error } = await supabase.storage
      .from('documents')
      .download(filePath)
    
    if (error) {
      console.error('Storage error:', error)
      return new NextResponse('Document not found', { status: 404 })
    }

    if (!data) {
      return new NextResponse('Document not found', { status: 404 })
    }

    // Return PDF with headers to prevent downloads
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filePath.split('/').pop()}"`,
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Document fetch error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}