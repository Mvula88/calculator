import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function POST(request: Request) {
  try {
    const { message, level = 'info', user, extra } = await request.json();
    
    // Log to Sentry based on level
    switch (level) {
      case 'error':
        Sentry.captureException(new Error(message), {
          user,
          extra,
        });
        break;
      case 'warning':
        Sentry.captureMessage(message, 'warning');
        break;
      default:
        Sentry.captureMessage(message, 'info');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging to Sentry:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Test endpoint for Sentry
export async function GET() {
  // This endpoint can be used to test if Sentry is working
  try {
    // Capture a test message
    Sentry.captureMessage('Sentry test from ImportCalc SADC', 'info');
    
    return NextResponse.json({ 
      message: 'Sentry test sent successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to send Sentry test',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}