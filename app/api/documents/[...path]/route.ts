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

    // Construct the file path
    const filePath = path.join('/')
    const fileName = filePath.split('/').pop() || 'document'
    
    // For now, return a placeholder HTML page since documents aren't uploaded yet
    // In production, you would upload the actual PDFs to Supabase Storage
    const placeholderHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${fileName}</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            max-width: 500px;
            margin: 1rem;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          .filename {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            display: inline-block;
            margin: 1rem 0;
            font-family: monospace;
          }
          .message {
            line-height: 1.6;
            opacity: 0.9;
          }
          .watermark {
            position: fixed;
            bottom: 20px;
            right: 20px;
            opacity: 0.5;
            font-size: 0.875rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📄</div>
          <h1>Document Preview</h1>
          <div class="filename">${fileName}</div>
          <p class="message">
            This is a sample document placeholder.<br>
            The actual import documents will be available here once uploaded to the system.<br><br>
            <strong>What you'll see:</strong><br>
            • Real invoices from Japanese auctions<br>
            • Actual customs documents<br>
            • Step-by-step import paperwork<br>
            • All fees and costs clearly shown
          </p>
        </div>
        <div class="watermark">
          Licensed to ${user.email || 'User'}
        </div>
      </body>
      </html>
    `
    
    // Return HTML placeholder
    return new NextResponse(placeholderHTML, {
      headers: {
        'Content-Type': 'text/html',
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