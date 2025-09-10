import { Suspense } from 'react'
import SimpleThankYouContent from './simple-content'
import { Loader2 } from 'lucide-react'

export default function BotswanaThankYouPage() {
  return (
    <Suspense 
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </main>
      }
    >
      <SimpleThankYouContent />
    </Suspense>
  )
}