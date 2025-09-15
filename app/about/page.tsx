import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">About IMPOTA</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              IMPOTA is Southern Africa's leading car import education platform. We empower individuals 
              with comprehensive knowledge and tools to import vehicles from Japan safely, legally, and profitably.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-gray-700 mb-4">
              We provide step-by-step guides, cost calculators, and expert insights that demystify the car 
              import process. Our platform serves importers in Namibia, South Africa, Botswana, and Zambia.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Comprehensive import guides tailored to each country</li>
              <li>Real-time duty and tax calculators</li>
              <li>Access to verified shipping agents and companies</li>
              <li>Japan auction house guidance and strategies</li>
              <li>Documentation templates and checklists</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose IMPOTA</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-gray-700">
                  Over 5 years of real import experience providing real guidance across Southern Africa.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Savings</h3>
                <p className="text-gray-700">
                  Our members save an average of 45% compared to local dealership prices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-gray-700">
                  Dedicated support team to guide you through every step of your import journey.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Success Rate</h3>
                <p className="text-gray-700">
                  98% of our members successfully complete their first import within 60 days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p className="text-gray-700 mb-4">
              <strong>Transparency:</strong> We believe in complete transparency in pricing and processes.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Education:</strong> Knowledge is power. We educate rather than gatekeep information.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Community:</strong> We foster a supportive community of importers helping each other succeed.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}