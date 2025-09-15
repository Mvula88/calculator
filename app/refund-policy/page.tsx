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
          <section className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Refund Policy</h2>
            <p className="text-gray-700 font-semibold">
              Due to the digital nature of our products, we generally do not offer refunds once you have accessed the content. 
              However, we will consider refunds in specific circumstances outlined below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">When We DO Offer Refunds</h2>
            <p className="text-gray-700 mb-4">
              We will provide a full refund in the following situations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Duplicate Purchases:</strong> If you accidentally purchase the same product twice</li>
              <li><strong>Technical Issues:</strong> If you cannot access your purchased content and we cannot resolve the issue within 48 hours</li>
              <li><strong>Payment Errors:</strong> If you were charged incorrectly or without authorization</li>
              <li><strong>Pre-Access Refunds:</strong> If you request a refund before accessing any of the purchased content</li>
              <li><strong>Service Unavailability:</strong> If our platform is down for more than 72 consecutive hours</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">When We DON'T Offer Refunds</h2>
            <p className="text-gray-700 mb-4">
              We cannot offer refunds in these situations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You've already accessed and viewed the digital content</li>
              <li>You've downloaded the guides or materials</li>
              <li>You changed your mind after purchasing</li>
              <li>You claim the content didn't meet expectations (please review before buying)</li>
              <li>You found the information elsewhere after purchasing</li>
              <li>Your financial situation changed after purchase</li>
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
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <p className="text-gray-700 mb-4">
              If you believe you qualify for a refund based on the criteria above:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Contact us within 7 days of purchase</li>
              <li>Email support@impota.com with your order number and reason for refund</li>
              <li>Include any relevant screenshots or error messages for technical issues</li>
              <li>Allow up to 5 business days for review and processing</li>
            </ol>
            <p className="text-gray-700 mt-4">
              Approved refunds will be credited to your original payment method within 5-10 business days.
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
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
            <p className="text-gray-700 mb-4">
              While we maintain a strict refund policy to protect our digital content, we are committed to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Resolving all technical issues within 48 hours</li>
              <li>Providing clear, accurate descriptions of all products</li>
              <li>Offering customer support for any questions before purchase</li>
              <li>Maintaining a fair and transparent refund process</li>
              <li>Protecting both our customers and our business</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              If your refund request is denied and you believe this was in error:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>You may appeal the decision by providing additional information</li>
              <li>We will review appeals within 3 business days</li>
              <li>Our management team will make the final decision</li>
              <li>If still unsatisfied, you may pursue dispute resolution through your payment provider</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Chargebacks</h2>
            <p className="text-gray-700">
              Please contact us before filing a chargeback with your bank or credit card company. 
              Filing a chargeback without first attempting to resolve the issue with us may result in:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Immediate suspension of account access</li>
              <li>Inability to make future purchases</li>
              <li>Collection proceedings for fraudulent chargebacks</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We prefer to resolve all issues directly and fairly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Upgrades</h2>
            <p className="text-gray-700">
              If you purchase the Mistake Guide and later upgrade to Import Mastery, you pay only 
              the difference. Refunds for upgrades are only available if you haven't accessed 
              the additional Import Mastery content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Agreement</h2>
            <p className="text-gray-700">
              By making a purchase on IMPOTA, you acknowledge and agree to this refund policy. 
              You understand that refunds are limited to the specific circumstances outlined above, 
              and that accessing digital content generally makes you ineligible for a refund.
            </p>
          </section>

          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              We're here to help! Contact us for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Questions before purchasing</li>
              <li>Technical support issues</li>
              <li>Refund requests</li>
              <li>Account access problems</li>
            </ul>
            <p className="text-gray-700">
              <strong>Email:</strong> support@impota.com
              <br /><strong>Response Time:</strong> Within 24 hours (usually faster)
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