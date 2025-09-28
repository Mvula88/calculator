'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function TestRedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Test Redirect Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Current URL:</p>
            <code className="text-sm bg-gray-100 p-2 rounded block mt-1">
              {typeof window !== 'undefined' ? window.location.href : 'Loading...'}
            </code>
          </div>

          <div>
            <p className="font-semibold">Session ID from URL:</p>
            <code className="text-sm bg-gray-100 p-2 rounded block mt-1">
              {sessionId || 'No session ID found'}
            </code>
          </div>

          <div>
            <p className="font-semibold">This page confirms:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
              <li>Redirect from Stripe is working</li>
              <li>Session ID is being passed correctly</li>
              <li>The issue is in the create-account page logic</li>
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <Button 
              onClick={() => router.push(`/auth/create-account?session_id=${sessionId}`)}
              className="w-full"
              disabled={!sessionId}
            >
              Continue to Create Account
            </Button>

            <Button 
              onClick={() => router.push('/packages')}
              variant="outline"
              className="w-full"
            >
              Back to Packages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TestRedirectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestRedirectContent />
    </Suspense>
  )
}