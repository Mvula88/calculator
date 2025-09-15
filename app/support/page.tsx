'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Book,
  CreditCard,
  Package,
  Truck,
  FileText,
  HelpCircle,
  Users,
  Shield,
  Zap,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SupportPage() {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)
  
  const toggleIssue = (issueId: string) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId)
  }
  const faqs = [
    {
      category: 'Getting Started',
      icon: Zap,
      questions: [
        {
          q: 'How do I access my purchased guide?',
          a: 'After purchase, you\'ll receive an email with login credentials to access your guide through our portal. You can also access it directly at impota.com/portal.'
        },
        {
          q: 'Which package should I choose?',
          a: 'The Mistake Guide (N$499) is perfect for avoiding costly errors. Import Mastery (N$1,999) includes everything plus calculators, agent contacts, and video tutorials. Most users start with Mistake Guide and upgrade later.'
        },
        {
          q: 'Do I need any prior experience?',
          a: 'No prior experience needed. Our guides are designed for complete beginners with step-by-step instructions and clear explanations.'
        }
      ]
    },
    {
      category: 'Payment & Billing',
      icon: CreditCard,
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment processor.'
        },
        {
          q: 'Is it a one-time payment or subscription?',
          a: 'All our guides are one-time purchases with lifetime access. No recurring fees or hidden charges.'
        },
        {
          q: 'Can I upgrade from Mistake Guide to Import Mastery?',
          a: 'Yes! You can upgrade anytime and only pay the difference. Your Mistake Guide content remains accessible.'
        }
      ]
    },
    {
      category: 'Technical Support',
      icon: AlertCircle,
      questions: [
        {
          q: 'I can\'t access my guide after purchase',
          a: 'Check your email (including spam folder) for login credentials. If you still can\'t access, contact support@impota.com with your order number.'
        },
        {
          q: 'The calculator isn\'t working properly',
          a: 'Try clearing your browser cache and cookies. Ensure JavaScript is enabled. For persistent issues, try a different browser or contact support.'
        },
        {
          q: 'Can I download the guide for offline access?',
          a: 'Yes, PDF versions are available for download in your portal. Video content requires internet connection.'
        }
      ]
    },
    {
      category: 'Import Process',
      icon: Truck,
      questions: [
        {
          q: 'How long does the import process take?',
          a: 'Typically 45-60 days from purchase in Japan to driving in your country. Shipping takes 4-6 weeks, customs clearance 1-2 weeks.'
        },
        {
          q: 'What cars can I import?',
          a: 'Most Japanese vehicles can be imported. Age restrictions vary by country - our guides cover specific regulations for your location.'
        },
        {
          q: 'Do you handle the import for me?',
          a: 'We provide comprehensive guides and support, but you handle the import yourself. This is how you save thousands compared to using agents.'
        }
      ]
    }
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed responses to all your questions',
      contact: 'support@impota.com',
      responseTime: 'Response within 24 hours'
    }
  ]

  const commonIssues = [
    {
      icon: Package,
      title: 'Order Issues',
      items: [
        {
          id: 'order-not-received',
          title: 'Order not received',
          solution: 'Check your email (including spam folder) for the order confirmation. Your login credentials are sent immediately after purchase. If you still haven\'t received it after 30 minutes, contact support@impota.com with your payment receipt.'
        },
        {
          id: 'wrong-product',
          title: 'Wrong product purchased',
          solution: 'If you purchased the wrong guide, contact us immediately at support@impota.com. We can help upgrade you to the right package or provide guidance on which guide best suits your needs.'
        },
        {
          id: 'duplicate-charges',
          title: 'Duplicate charges',
          solution: 'If you see duplicate charges on your statement, this may be a pending authorization that will clear within 3-5 business days. If charges persist, email support@impota.com with your transaction details for immediate refund of the duplicate charge.'
        }
      ]
    },
    {
      icon: FileText,
      title: 'Access Problems',
      items: [
        {
          id: 'login-not-working',
          title: 'Login not working',
          solution: 'Ensure you\'re using the email address you used during purchase. Check for typos and ensure caps lock is off. Try resetting your password using the "Forgot Password" link on the login page. Clear your browser cache and cookies if issues persist.'
        },
        {
          id: 'forgot-password',
          title: 'Forgot password',
          solution: 'Go to impota.com/portal and click "Forgot Password". Enter your email address and check your inbox for reset instructions. The reset link expires after 1 hour. If you don\'t receive it, check spam folder or contact support.'
        },
        {
          id: 'content-not-loading',
          title: 'Content not loading',
          solution: 'Try refreshing the page (Ctrl+F5 or Cmd+Shift+R). Clear your browser cache and cookies. Try a different browser (Chrome, Firefox, Safari). Disable browser extensions that might block content. Check your internet connection. If issues persist, contact support with browser details.'
        }
      ]
    },
    {
      icon: Book,
      title: 'Guide Questions',
      items: [
        {
          id: 'understanding-content',
          title: 'Understanding content',
          solution: 'Each guide section includes detailed explanations and examples. Start with the introduction chapter for overview. Use the table of contents to navigate to specific topics. For Import Mastery users, video tutorials provide visual walkthroughs. Email specific questions to support@impota.com.'
        },
        {
          id: 'missing-information',
          title: 'Missing information',
          solution: 'Our guides are regularly updated with new information. Check the "Updates" section in your portal for recent additions. If you believe something is missing, email support@impota.com with details and we\'ll address it in the next update.'
        },
        {
          id: 'update-requests',
          title: 'Update requests',
          solution: 'We welcome suggestions for guide improvements! Email your feedback to support@impota.com. Include specific sections you\'d like expanded or topics you want covered. Updates are released monthly and all users get free access to new content.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Customer Support Center</h1>
          <p className="text-xl text-gray-600">We're here to help you succeed with your import journey</p>
        </div>

        {/* Quick Support Card */}
        <div className="max-w-md mx-auto mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <method.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <p className="font-semibold text-blue-600">{method.contact}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {method.responseTime}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Common Issues with Solutions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Solutions</h2>
          <div className="space-y-6">
            {commonIssues.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className="border rounded-lg">
                        <button
                          onClick={() => toggleIssue(item.id)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-800">{item.title}</span>
                          {expandedIssue === item.id ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        {expandedIssue === item.id && (
                          <div className="px-4 pb-4 pt-2 bg-gray-50 border-t">
                            <p className="text-sm text-gray-700 leading-relaxed">{item.solution}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold">{category.category}</h3>
                </div>
                <div className="grid gap-4">
                  {category.questions.map((item, index) => (
                    <Card key={index} className="p-6">
                      <h4 className="font-semibold mb-2 flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        {item.q}
                      </h4>
                      <p className="text-gray-600 ml-7">{item.a}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time Expectations */}
        <Card className="p-8 bg-blue-50 border-blue-200 mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Support Response Times
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM CAT</p>
              <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM CAT</p>
              <p className="text-gray-700">Sunday: Closed</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Average Response Times</h3>
              <div className="space-y-1">
                <p className="text-gray-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Email: Within 24 hours
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Urgent issues: Priority handling
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Refund Policy Notice */}
        <Card className="p-6 bg-yellow-50 border-yellow-200 mb-12">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-2">Refund Policy</h3>
              <p className="text-sm text-gray-700">
                We offer refunds for duplicate purchases, technical issues we can't resolve, and pre-access requests. 
                Please review our full <Link href="/refund-policy" className="text-blue-600 hover:underline">refund policy</Link> for details.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Form CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg mb-6">
            Our support team is ready to assist you with any questions or concerns
          </p>
          <div className="flex justify-center">
            <Link href="mailto:support@impota.com">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Mail className="mr-2 h-5 w-5" />
                Email Support
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          For account-specific issues, please have your order number ready when contacting support
        </p>
      </div>
    </div>
  )
}