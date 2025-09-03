import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CONTACT_INFO } from '@/lib/constants'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              Sales & Refund Policy
            </CardTitle>
            <p className="text-gray-600">All sales are final - Please read before purchasing</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            
            <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                Important: No Refunds Policy
              </h2>
              <p className="mb-0 text-lg">
                All purchases of ImportCalc SADC are final and non-refundable. 
                Once you gain access to our premium calculator, guides, and resources, the sale cannot be reversed.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Why We Have This Policy</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Digital Product Nature</h3>
                  <p className="text-gray-600">
                    Once you access our calculator and download guides, the value has been delivered instantly. 
                    Unlike physical products, digital information cannot be "returned."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Immediate Access to Proprietary Information</h3>
                  <p className="text-gray-600">
                    Our platform contains 38+ vehicles worth of import experience and proprietary calculations 
                    that save you thousands. This knowledge is delivered immediately upon payment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Prevention of Abuse</h3>
                  <p className="text-gray-600">
                    Without this policy, users could access all our resources, save the information, 
                    and then request a refund - essentially getting everything for free.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">What You're Getting</h2>
            <p className="mb-4">When you purchase ImportCalc SADC, you receive immediate access to:</p>
            <ul className="list-disc ml-6 mb-6 space-y-2">
              <li>Complete import cost calculator with all 27 hidden fees</li>
              <li>Container sharing savings of N$60,000+</li>
              <li>Step-by-step import guides</li>
              <li>Verified agent contacts</li>
              <li>Document templates</li>
              <li>WhatsApp support</li>
              <li>PDF export of calculations</li>
              <li>Multi-country support (Namibia, South Africa, Botswana, Zambia)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Before You Purchase</h2>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Make an Informed Decision
              </h3>
              <p className="mb-3">To ensure you're making the right choice:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Review our detailed features on the <Link href="/pricing" className="text-blue-600 hover:underline">pricing page</Link></li>
                <li>Understand that you need to import vehicles to benefit from this tool</li>
                <li>Know that savings are based on actual import costs, not guaranteed amounts</li>
                <li>Contact us via WhatsApp if you have any questions before purchasing</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Exceptions</h2>
            <p className="mb-4">
              While we maintain a strict no-refunds policy, we may consider exceptions only in these rare cases:
            </p>
            <ul className="list-disc ml-6 mb-6 space-y-2">
              <li><strong>Technical Issues:</strong> If you cannot access the platform due to technical problems on our end that cannot be resolved within 48 hours</li>
              <li><strong>Duplicate Purchases:</strong> If you accidentally purchase twice, we'll refund the duplicate</li>
              <li><strong>Fraudulent Charges:</strong> If your payment was made without your authorization</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Our Commitment to You</h2>
            <p className="mb-4">
              While we don't offer refunds, we are committed to providing:
            </p>
            <ul className="list-disc ml-6 mb-6 space-y-2">
              <li>Accurate and up-to-date import calculations</li>
              <li>Responsive WhatsApp support</li>
              <li>Regular updates to reflect changing regulations</li>
              <li>A platform that genuinely saves you money on imports</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this policy or need support with the platform:
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li>📧 Email: {CONTACT_INFO.email}</li>
              <li>💬 WhatsApp: {CONTACT_INFO.whatsapp.displayNumber}</li>
            </ul>

            <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg mb-6">
              <p className="text-sm text-gray-600 text-center mb-0">
                <strong>By purchasing ImportCalc SADC, you acknowledge and agree to this no-refunds policy.</strong><br />
                This policy is clearly stated before purchase and forms part of our Terms of Service.
              </p>
            </div>

            <div className="text-center py-6">
              <p className="text-lg mb-4">Ready to save thousands on your car import?</p>
              <p className="text-sm text-gray-600 mb-4">Remember: All sales are final</p>
              <Link href="/pricing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Pricing & Features
                </Button>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center">
                Last Updated: January 1, 2025 | This policy is subject to change without notice. 
                Changes will not affect completed purchases retroactively.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}