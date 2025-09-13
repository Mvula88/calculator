import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: January 2025</p>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h2 className="text-2xl font-semibold mb-4">No Refund Policy</h2>
            <p className="text-gray-700 font-semibold">
              All sales are final. IMPOTA does not offer refunds on any purchases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Why We Don't Offer Refunds</h2>
            <p className="text-gray-700 mb-4">
              IMPOTA provides instant access to proprietary educational content, guides, and tools. 
              Once you purchase and access our digital products, the value has been delivered immediately. 
              Our no-refund policy helps us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Protect our intellectual property from abuse</li>
              <li>Maintain affordable pricing for all customers</li>
              <li>Focus resources on improving content rather than processing refunds</li>
              <li>Prevent fraudulent purchases and chargebacks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Before You Purchase</h2>
            <p className="text-gray-700 mb-4">
              We encourage you to carefully review the following before making a purchase:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Read the detailed description of what's included in each package</li>
              <li>Review our free content and guides to understand our teaching style</li>
              <li>Contact our support team if you have any questions</li>
              <li>Ensure you're purchasing the right package for your needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Digital Product Nature</h2>
            <p className="text-gray-700">
              Our products are digital educational materials that are delivered instantly upon purchase. 
              Once you've accessed the content, it cannot be "returned" like a physical product. 
              The knowledge and information provided have immediate value and cannot be unlearned.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Commitment to Quality</h2>
            <p className="text-gray-700 mb-4">
              While we don't offer refunds, we are committed to providing high-quality content:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Regular updates to keep information current</li>
              <li>Responsive customer support for technical issues</li>
              <li>Clear, comprehensive guides based on real experience</li>
              <li>Proven strategies used by successful importers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Issues</h2>
            <p className="text-gray-700">
              If you experience technical difficulties accessing your purchased content, please contact 
              our support team immediately. We will work to resolve any technical issues promptly. 
              Technical support does not constitute a refund but ensures you can access what you've purchased.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Duplicate Purchases</h2>
            <p className="text-gray-700">
              If you accidentally make a duplicate purchase, please contact us within 24 hours. 
              While our general policy is no refunds, we may make exceptions for genuine duplicate 
              transactions at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Chargebacks</h2>
            <p className="text-gray-700">
              Filing a chargeback instead of contacting us first will result in immediate account 
              termination and you will be banned from all future purchases. We take fraud seriously 
              and will pursue all available legal remedies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Upgrades</h2>
            <p className="text-gray-700">
              If you purchase the Mistake Guide and later upgrade to Import Mastery, you pay only 
              the difference. However, neither the original purchase nor the upgrade fee is refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Agreement</h2>
            <p className="text-gray-700">
              By making a purchase on IMPOTA, you acknowledge and agree to this no-refund policy. 
              You confirm that you have read and understood what you are purchasing and accept that 
              all sales are final.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Questions Before Purchase?</h2>
            <p className="text-gray-700 mb-4">
              We want you to be confident in your purchase. If you have any questions or concerns 
              before buying, please don't hesitate to contact us:
            </p>
            <p className="text-gray-700">
              Email: support@impota.com
              <br />WhatsApp: +264 81 234 5678
              <br />We typically respond within 24 hours
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
            <p className="text-gray-700">
              We reserve the right to update this policy at any time. Changes will apply to future 
              purchases only. The policy in effect at the time of your purchase will apply to that 
              transaction.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}