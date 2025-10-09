'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function SupportContact() {
  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
      <div className="flex items-start gap-3">
        <MessageCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold text-blue-900 mb-2 text-base sm:text-lg">Need Help?</h3>
          <p className="text-sm text-blue-800 mb-4">
            We're here to support your import journey. Get answers to your questions quickly!
          </p>

          <div className="space-y-3 mb-4">
            {/* WhatsApp Support */}
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">WhatsApp Support</p>
                <p className="text-xs text-gray-600">+264 81 668 3276</p>
                <p className="text-xs text-gray-500">Fastest response - usually within hours</p>
              </div>
            </div>

            {/* Email Support */}
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Email Support</p>
                <p className="text-xs text-gray-600">contact@impota.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Response Time</p>
                <p className="text-xs text-gray-600">Mon-Fri: 8AM - 6PM WAT</p>
                <p className="text-xs text-gray-500">We typically respond within a few hours</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="https://wa.me/264816683276?text=Hi,%20I%20need%20help%20with%20the%20Import%20Mastery%20portal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Us
              </Button>
            </a>
            <a
              href="mailto:contact@impota.com?subject=Import%20Mastery%20Portal%20Support"
              className="flex-1"
            >
              <Button size="sm" variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
            </a>
          </div>

          {/* What We Can Help With */}
          <div className="mt-4 p-3 bg-white/60 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-2">We can help with:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Understanding the import process</li>
              <li>• Using the calculator correctly</li>
              <li>• Interpreting documents and forms</li>
              <li>• Country-specific requirements</li>
              <li>• General import questions</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}
