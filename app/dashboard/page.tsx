import { Suspense } from 'react'
import DashboardClient from './DashboardClient'

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    }>
      <DashboardClient />
    </Suspense>
  )
}