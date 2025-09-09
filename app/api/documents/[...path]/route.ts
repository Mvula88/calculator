import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await params in Next.js 15
    const { path } = await params
    
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

    // Construct the file path - the filename comes from the path parameter
    const filePath = path.join('/')
    const fileName = filePath.split('/').pop() || 'document'
    
    // Remove the file extension to match Supabase storage naming
    // Convert underscores to spaces and match the actual file names in storage
    let storageFileName = fileName
      .replace(/_/g, ' ')  // Replace underscores with spaces
      .replace(/\.pdf$/i, '')  // Remove .pdf extension if present
    
    // Map the file names from the frontend to actual Supabase storage names
    const fileNameMapping: { [key: string]: string } = {
      '2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf': '2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf',
      '2017 AUDI A3 INVOICE.pdf': '2017 AUDI A3 INVOICE.pdf',
      '2015 AUDI A5 SPORTBACK INVOICE.pdf': '2015 AUDI A5 SPORTBACK INVOICE.pdf',
      '2012 AUDI A4 INVOICE.pdf': '2012 AUDI A4 INVOICE.pdf',
      'SAD 500 CUSTOMS.pdf': 'SAD 500 CUSTOMS.pdf',
      'Assessment Notice.pdf': 'Assessment Notice.pdf',
      'Customs Clearance Certificate Motor Vehicle.pdf': 'Customs Clearance Certificate Motor Vehicle.pdf',
      'Release Order.pdf': 'Release Order.pdf',
      'Export Certificate Japanese.pdf': 'Export Certificate Japanese.pdf',
      'Export Certificate - Sworn Translated.pdf': 'Export Certificate - Sworn Translated.pdf',
      'ORIGINAL BILL OF LANDING.pdf': 'ORIGINAL BILL OF LANDING.pdf',
      'Transworld Cargo - signed quote.pdf': 'Transworld Cargo - signed quote.pdf',
      'Ocean Freight INVOICE per car.pdf': 'Ocean Freight INVOICE per car.pdf',
      'Police Clearance.pdf': 'Police Clearance.pdf',
      'Import Permit MIT.pdf': 'Import Permit MIT.pdf',
      'Import permit screen.png': 'Import permit screen.png',
      'Payment Receipt.pdf': 'Payment Receipt.pdf'
    }
    
    // Use the mapped name or fall back to the original
    const actualFileName = fileNameMapping[fileName] || fileName
    
    console.log('Fetching document:', actualFileName, 'from path:', filePath)
    
    // Fetch the PDF from Supabase Storage
    const { data, error } = await supabase.storage
      .from('documents')
      .download(actualFileName)
    
    if (error) {
      console.error('Storage error:', error)
      console.error('Tried to fetch:', actualFileName)
      return new NextResponse(`Document not found: ${actualFileName}`, { status: 404 })
    }

    if (!data) {
      return new NextResponse('Document not found', { status: 404 })
    }

    // Determine content type based on file extension
    const isImage = actualFileName.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/)
    const contentType = isImage ? `image/${actualFileName.split('.').pop()}` : 'application/pdf'

    // Return file with headers to prevent downloads and allow viewing
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${actualFileName}"`,
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