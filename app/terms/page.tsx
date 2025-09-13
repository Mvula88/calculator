import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: January 2025</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using IMPOTA's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              IMPOTA provides educational content, guides, and tools related to importing vehicles from Japan 
              to Southern African countries. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Import guides and documentation</li>
              <li>Cost calculation tools</li>
              <li>Agent and shipping company directories</li>
              <li>Educational content about the import process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              To access certain features, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and complete information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on IMPOTA, including text, graphics, logos, and software, is the property of IMPOTA 
              or its content suppliers and is protected by international copyright laws. You may not reproduce, 
              distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Use</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Share your account with others</li>
              <li>Use our service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Resell or redistribute our content without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-gray-700">
              IMPOTA provides information for educational purposes only. We do not guarantee the accuracy, 
              completeness, or timeliness of the information provided. The import process involves various 
              regulations and requirements that may change. Users should verify all information independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700">
              IMPOTA shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use or inability to use our services. This includes but is not 
              limited to damages related to vehicle imports, customs issues, or financial losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify and hold IMPOTA harmless from any claims, losses, damages, liabilities, 
              and expenses arising from your use of our services or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend your account at our discretion, without notice, 
              for conduct that we believe violates these Terms of Service or is harmful to other users, us, 
              or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by the laws of the Republic of Namibia. Any disputes shall be 
              resolved in the courts of Namibia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes via email or through our platform. Continued use of our services after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at:
              <br />Email: legal@impota.com
              <br />Address: Windhoek, Namibia
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}