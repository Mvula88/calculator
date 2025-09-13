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
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-gray-700">
              At IMPOTA, we stand behind the quality of our educational content and are committed to your 
              satisfaction. We offer a fair and transparent refund policy to ensure you can purchase with confidence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7-Day Money-Back Guarantee</h2>
            <p className="text-gray-700 mb-4">
              We offer a 7-day money-back guarantee on all our packages. If you're not satisfied with your 
              purchase, you can request a full refund within 7 days of your purchase date.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-900 font-semibold">
                No questions asked - if you're not happy, we'll refund your purchase.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Eligibility for Refund</h2>
            <p className="text-gray-700 mb-4">To be eligible for a refund:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Request must be made within 7 days of purchase</li>
              <li>You must not have completed more than 30% of the course content</li>
              <li>You have not previously received a refund for the same product</li>
              <li>Your account must be in good standing (no violations of terms of service)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Email us at refunds@impota.com within 7 days of purchase</li>
              <li>Include your order number and email used for purchase</li>
              <li>Briefly explain why you're requesting a refund (optional but helpful)</li>
              <li>We'll process your request within 24-48 hours</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
            <p className="text-gray-700">
              Once approved, refunds are processed immediately. However, it may take 5-10 business days 
              for the refund to appear on your statement, depending on your payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
            <p className="text-gray-700 mb-4">The following are not eligible for refunds:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Purchases made more than 7 days ago</li>
              <li>Accounts that have accessed more than 30% of the content</li>
              <li>Upgrade fees (when upgrading from one package to another)</li>
              <li>Services that have already been rendered (e.g., consultation calls)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Upgrades</h2>
            <p className="text-gray-700">
              If you upgrade from the Mistake Guide to Import Mastery, only the upgrade fee is subject 
              to this refund policy. The original purchase becomes non-refundable once an upgrade is processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
            <p className="text-gray-700">
              If you have any issues with your refund request, please contact our support team at 
              support@impota.com. We're committed to resolving all disputes fairly and promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We reserve the right to modify this refund policy at any time. Changes will apply to 
              purchases made after the policy update date.
            </p>
          </section>

          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Guarantee</h2>
            <p className="text-gray-700">
              We're confident you'll love IMPOTA. That's why we offer this generous refund policy. 
              Your success is our success, and we're here to support you every step of your import journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For refund requests or questions about this policy:
              <br />Email: refunds@impota.com
              <br />Support: support@impota.com
              <br />Response time: 24-48 hours
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}