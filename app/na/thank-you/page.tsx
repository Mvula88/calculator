import { CheckCircle, ArrowRight, Package, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function NamibiaThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Received Successfully! 🎉
          </h1>
          
          <p className="text-lg text-gray-600">
            Check your inbox for login instructions. Your portal access is ready.
          </p>
        </div>

        {/* Portal Access */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Access Your Content</h2>
          <p className="text-gray-600 mb-6">
            Your purchase includes lifetime access to all materials, updates, and our 
            member portal with exclusive resources.
          </p>
          
          <Button asChild size="lg" className="w-full">
            <Link href="/portal">
              Go to Member Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </Card>

        {/* Container Slots CTA */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg">
          <div className="flex gap-4 mb-4">
            <Package className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold">Next Step: Reserve Your Container Slot</h2>
              <p className="text-gray-600 mt-2">
                We've partnered with <strong>Transworld Cargo</strong> and <strong>DB Schenker</strong> to 
                offer exclusive container slots for our members.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Why Reserve Now?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Save 60% through container sharing</li>
              <li>• Guaranteed space on next vessel (no delays)</li>
              <li>• Fixed pricing locked in (no surprises)</li>
              <li>• Full insurance coverage included</li>
            </ul>
          </div>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/portal/book-slot">
              Reserve Container Slot
              <Users className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        {/* Support Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>Need help? Contact support at</p>
          <a href="mailto:support@importcalc.com" className="text-blue-600 hover:underline">
            support@importcalc.com
          </a>
        </div>
      </div>
    </main>
  )
}