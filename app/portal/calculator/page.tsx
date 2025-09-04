'use client'

import ComprehensiveCalculator from '@/components/calculator/ComprehensiveCalculator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

export default function PortalCalculatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Import Cost Calculator
        </h1>
        <p className="text-gray-600">
          Calculate exact import costs including duties, VAT, shipping, and clearing fees
        </p>
      </div>
      
      {/* Notice about watermark */}
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This calculator is for your personal use only. Results include your email watermark for security.
        </AlertDescription>
      </Alert>
      
      <ComprehensiveCalculator />
      
      {/* Anti-copy notice */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center text-sm text-gray-600">
        <p>⚠️ This calculator is licensed for single-user access only</p>
        <p>Sharing or redistributing access is strictly prohibited</p>
      </div>
    </div>
  )
}