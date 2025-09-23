import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Globe, Ship, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

export default async function PortalMasteryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Simplified - just check for user authentication
  if (!user) {
    redirect('/auth/login?redirect=/portal/mastery')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Import Mastery Resources</h1>
          <p className="text-gray-600 mt-2">Advanced tools and resources are now integrated throughout the portal</p>
        </div>

        {/* Info Card */}
        <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-blue-900 mb-2">Content Has Been Reorganized</h2>
              <p className="text-blue-800 text-sm">
                To make information more accessible, all mastery content has been moved to relevant sections
                where you'll naturally look for it. No more hunting through special pages!
              </p>
            </div>
          </div>
        </Card>

        {/* Links to Content */}
        <div className="space-y-4">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/portal/agents">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-lg">Service Provider Directory</h3>
                    <p className="text-gray-600 text-sm">
                      Clearing agents, shipping lines, transport companies, and inspection services
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/portal/japan-auctions">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-bold text-lg">Japanese Auction Mastery</h3>
                    <p className="text-gray-600 text-sm">
                      Auction grades, bidding strategies, platform comparisons, and best times to buy
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/portal/beginner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Ship className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-bold text-lg">Container Sharing Guide</h3>
                    <p className="text-gray-600 text-sm">
                      How to save N$30,000+ through container sharing, safety rules, and verified platforms
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          </Card>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            All premium content is now available in the relevant sections for easier access
          </p>
        </div>
      </div>
    </main>
  )
}