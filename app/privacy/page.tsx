import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-gray-600">Last Updated: January 1, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="mb-4">
              ImportCalc SADC ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our Service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Personal Information</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Name and email address (when you register)</li>
              <li>Payment information (processed by Stripe)</li>
              <li>Country location (for currency display)</li>
              <li>WhatsApp number (if provided for support)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Usage Information</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>Calculator inputs and calculations</li>
              <li>Pages visited and features used</li>
              <li>IP address and browser information</li>
              <li>Device type and operating system</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Cookies and Tracking</h3>
            <p className="mb-4">
              We use cookies to:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Remember your country preference</li>
              <li>Maintain your login session</li>
              <li>Analyze usage patterns (via analytics tools)</li>
              <li>Improve user experience</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Provide access to our calculator and resources</li>
              <li>Process payments and manage your account</li>
              <li>Send service-related emails (receipts, updates)</li>
              <li>Respond to support requests</li>
              <li>Improve our Service based on usage patterns</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information. We may share your data with:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Service Providers:</strong> Stripe (payments), Supabase (database), Vercel (hosting)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, sale, or acquisition</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your data:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure password hashing</li>
              <li>Regular security updates</li>
              <li>Limited access to personal data</li>
              <li>Secure third-party services (Stripe, Supabase)</li>
            </ul>
            <p className="mb-4">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Data Retention</h2>
            <p className="mb-4">
              We retain your personal data for as long as necessary to provide our Service and comply with legal obligations:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Account information: Until account deletion</li>
              <li>Payment records: 7 years (legal requirement)</li>
              <li>Calculator data: 90 days</li>
              <li>Support communications: 2 years</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, contact us at support@importcalc.africa
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. International Data Transfers</h2>
            <p className="mb-4">
              Your data may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not directed to individuals under 18. We do not knowingly collect personal information 
              from children. If you believe we have collected data from a child, please contact us.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Third-Party Links</h2>
            <p className="mb-4">
              Our Service may contain links to third-party websites. We are not responsible for their privacy practices. 
              Please review their privacy policies before providing any information.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">11. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any material changes 
              by posting the new policy on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <ul className="list-none mb-4">
              <li>Email: {CONTACT_INFO.email}</li>
              <li>WhatsApp: {CONTACT_INFO.whatsapp.displayNumber}</li>
              <li>Address: {CONTACT_INFO.address}</li>
            </ul>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-sm">
                <strong>Your Privacy Matters:</strong> We only collect what's necessary to provide our Service. 
                We never sell your data, and you can request deletion at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}