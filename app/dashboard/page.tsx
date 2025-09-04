import { Suspense } from 'react'
import ProfessionalDashboard from './ProfessionalDashboard'

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    }>
      <ProfessionalDashboard />
    </Suspense>
  )
}