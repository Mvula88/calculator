import { CheckCircle, ArrowRight, Package, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function SouthAfricaThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          
          <p className="text-lg text-gray-600">
            Check your email for portal access. Your import resources are ready.
          </p>
        </div>

        {/* Portal Access */}
        <Card className="p-8 mb-8 border-0 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Access Your Portal</h2>
          <p className="text-gray-600 mb-6">
            You now have full access to the calculator, guides, verified agents, 
            and all premium resources in your member portal.
          </p>
          
          <Button asChild size="lg" className="w-full">
            <Link href="/portal">
              Enter Member Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </Card>

        {/* Container Slots CTA */}
        <Card className="p-8 bg-gradient-to-br from-green-50 to-white border-0 shadow-lg">
          <div className="flex gap-4 mb-4">
            <Package className="h-8 w-8 text-green-600" />
            <div>
              <h2 className="text-xl font-bold">Reserve Your Durban Container Slot</h2>
              <p className="text-gray-600 mt-2">
                Our partners <strong>Transworld Cargo</strong> and <strong>DB Schenker</strong> have 
                exclusive slots for Japan-Durban shipments.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Member Benefits:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Save 60% with container sharing</li>
              <li>• Priority berth allocation at Durban</li>
              <li>• Pre-negotiated Transnet rates</li>
              <li>• Full marine insurance included</li>
            </ul>
          </div>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/portal/book-slot">
              Book Container Slot
              <Users className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        {/* Support Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>Questions? WhatsApp us:</p>
          <a href="https://wa.me/27123456789" className="text-green-600 hover:underline">
            +27 12 345 6789
          </a>
        </div>
      </div>
    </main>
  )
}