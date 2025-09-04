'use client'

import DashboardLayout from '@/components/DashboardLayout'
import ComprehensiveCalculator from '@/components/calculator/ComprehensiveCalculator'

export default function CalculatorPage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Import Cost Calculator</h1>
          <p className="text-gray-600 mt-1">Calculate your total vehicle import costs with precision</p>
        </div>
        
        <ComprehensiveCalculator />
      </div>
    </DashboardLayout>
  )
}