import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-gray-600">Effective Date: January 1, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the ImportCalc SADC platform ("Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Service Description</h2>
            <p className="mb-4">
              ImportCalc SADC provides car import cost calculations, guides, and resources for importing vehicles from Japan to SADC countries. 
              The Service includes:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Import cost calculator with all fees and charges</li>
              <li>Step-by-step import guides</li>
              <li>Container sharing coordination resources</li>
              <li>Verified agent information</li>
              <li>Document templates and checklists</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Payment Terms</h2>
            <p className="mb-4">
              Access to our premium features requires a one-time payment of the advertised price in your local currency. 
              All payments are processed through Stripe and are subject to their terms of service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The information provided through our Service is for informational purposes only. We make no warranties about:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>The accuracy of import cost calculations</li>
              <li>The reliability of third-party agents or services</li>
              <li>The completeness of import regulations</li>
              <li>The success of your import transaction</li>
            </ul>
            <p className="mb-4">
              Import regulations, costs, and procedures can change without notice. Always verify current information with official sources.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Limitation of Liability</h2>
            <p className="mb-4">
              ImportCalc SADC and its operators shall not be liable for any direct, indirect, incidental, special, consequential, 
              or punitive damages resulting from:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Your use or inability to use the Service</li>
              <li>Errors in calculations or information</li>
              <li>Actions of third-party agents or services</li>
              <li>Import delays, fees, or complications</li>
              <li>Financial losses related to vehicle imports</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Provide accurate information when using our calculators</li>
              <li>Independently verify all import requirements and costs</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not share your account access with others</li>
              <li>Not reverse engineer or copy our Service</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality of the Service are owned by ImportCalc SADC and are protected by 
              international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Refund Policy</h2>
            <p className="mb-4">
              All sales are final and non-refundable. Due to the digital nature of our product and immediate access to proprietary information, 
              we do not offer refunds once access has been granted. See our <Link href="/refund" className="text-blue-600 hover:underline">Refund Policy</Link> for details.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend access to our Service immediately, without prior notice, 
              for any breach of these Terms of Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
              to the website. Your continued use of the Service constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">11. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Namibia, 
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us at:<br />
              Email: {CONTACT_INFO.email}<br />
              WhatsApp: {CONTACT_INFO.whatsapp.displayNumber}
            </p>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm">
                <strong>Important Note:</strong> This Service provides information and tools to assist with vehicle imports 
                but does not guarantee any specific outcomes. Always consult with official authorities and licensed import agents.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}