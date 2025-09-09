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
    
    // Direct mapping to exact file names in Supabase Storage
    // Map requested names to actual file names in storage
    const fileNameMapping: { [key: string]: string } = {
      // Vehicle invoices - EXACT names from Supabase
      '2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf': '2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf',
      '2017 AUDI A3 INVOICE.pdf': '2017 AUDI A3 INVOICE.pdf',
      '2015 AUDI A5 SPORTBACK INVOICE.pdf': '2015 AUDI A5 SPORTBACK INVOICE.pdf',  
      '2012 AUDI A4 INVOICE.pdf': '2012 AUDI A4 INVOICE.pdf',
      
      // Try alternate names for problematic files
      '2015_AUDI_A5_SPORTBACK_INVOICE.pdf': '2015 AUDI A5 SPORTBACK INVOICE.pdf',
      '2012_AUDI_A4_INVOICE.pdf': '2012 AUDI A4 INVOICE.pdf',
      
      // Customs documents
      'SAD 500 CUSTOMS.pdf': 'SAD 500 CUSTOMS.pdf',
      'Assessment Notice.pdf': 'Assessment Notice.pdf',
      'Customs Clearance Certificate Motor Vehicle.pdf': 'Customs Clearance Certificate Motor Vehicle.pdf',
      'Customs_Clearance_Certificate_Motor_Vehicle.pdf': 'Customs Clearance Certificate Motor Vehicle.pdf',
      'Release Order.pdf': 'Release Order.pdf',
      
      // Export documents
      'Export Certificate Japanese.pdf': 'Export Certificate Japanese.pdf',
      'Export Certificate - Sworn Translated.pdf': 'Export Certificate - Sworn Translated.pdf',
      
      // Shipping documents
      'ORIGINAL BILL OF LANDING.pdf': 'ORIGINAL BILL OF LANDING.pdf',
      'Transworld Cargo - signed quote.pdf': 'Transworld Cargo - signed quote.pdf',
      'Ocean Freight INVOICE per car.pdf': 'Ocean Freight INVOICE per car.pdf',
      
      // Registration documents
      'Police Clearance.pdf': 'Police Clearance.pdf',
      'Import Permit MIT.pdf': 'Import Permit MIT.pdf',
      'Import permit screen.png': 'Import permit screen.png',
      'Payment Receipt.pdf': 'Payment Receipt.pdf'
    }
    
    // Try direct mapping first, then fallback to the filename as-is
    let actualFileName = fileNameMapping[fileName] || fileName
    
    // If still not found, try without spaces (convert spaces to underscores)
    if (!fileNameMapping[fileName]) {
      const underscoreVersion = fileName.replace(/ /g, '_')
      if (fileNameMapping[underscoreVersion]) {
        actualFileName = fileNameMapping[underscoreVersion]
      }
    }
    
    console.log('Fetching document:', actualFileName, 'from path:', filePath, 'original fileName:', fileName)
    
    // First, try to fetch with the exact filename
    let { data, error } = await supabase.storage
      .from('documents')
      .download(actualFileName)
    
    // If not found, try with underscores instead of spaces
    if (error && actualFileName.includes(' ')) {
      const underscoreName = actualFileName.replace(/ /g, '_')
      console.log('Trying with underscores:', underscoreName)
      const result = await supabase.storage
        .from('documents')
        .download(underscoreName)
      data = result.data
      error = result.error
      if (!error) actualFileName = underscoreName
    }
    
    // If still not found, try with spaces instead of underscores
    if (error && actualFileName.includes('_')) {
      const spaceName = actualFileName.replace(/_/g, ' ')
      console.log('Trying with spaces:', spaceName)
      const result = await supabase.storage
        .from('documents')
        .download(spaceName)
      data = result.data
      error = result.error
      if (!error) actualFileName = spaceName
    }
    
    if (error) {
      console.error('Storage error:', error)
      console.error('Tried to fetch:', actualFileName, 'original:', fileName)
      
      // List files in bucket for debugging
      const { data: files } = await supabase.storage
        .from('documents')
        .list()
      
      // Find similar files that might match
      const similarFiles = files?.filter(f => 
        f.name.toLowerCase().includes('audi') || 
        f.name.toLowerCase().includes('customs') ||
        f.name.toLowerCase().includes('clearance')
      ) || []
      
      console.log('Looking for:', fileName)
      console.log('Tried:', actualFileName)
      console.log('Similar files in bucket:', similarFiles.map(f => f.name))
      console.log('All files:', files?.map(f => f.name))
      
      // Return more helpful error message
      return new NextResponse(
        JSON.stringify({
          error: `Document not found: ${fileName}`,
          tried: actualFileName,
          similar: similarFiles.map(f => f.name)
        }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!data) {
      return new NextResponse('Document not found', { status: 404 })
    }

    // Determine content type based on file extension
    const isImage = actualFileName.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/)
    const contentType = isImage ? `image/${actualFileName.split('.').pop()}` : 'application/pdf'

    // Return file with headers optimized for viewing
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${actualFileName}"`,
        // Remove X-Frame-Options to allow embedding
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('Document fetch error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}