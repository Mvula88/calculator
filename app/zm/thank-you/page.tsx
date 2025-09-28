import { Suspense } from 'react'
import DirectThankYouContent from './direct-content'
import { Loader2 } from 'lucide-react'
export default function ZambiaThankYouPage() {
  return (
    <Suspense 
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </main>
      }
    >
      <DirectThankYouContent />
    </Suspense>
  )
}