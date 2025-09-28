import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Smartphone, Monitor } from 'lucide-react'

export default function DeviceLimitExceededPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-red-200">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
            Device Limit Reached
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Your account has reached the maximum number of allowed devices.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Account Device Limits:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Phones</span>
                </div>
                <span className="font-bold text-red-600">2 of 2 used</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Computers</span>
                </div>
                <span className="font-bold text-red-600">2 of 2 used</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Only one device can be active at a time. 
              Logging in here will automatically log you out from other devices.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              To use this device, you need to:
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>Log out from one of your other devices</li>
              <li>Wait 24 hours for inactive devices to be automatically removed</li>
              <li>Or contact support for assistance</li>
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/login">
              <Button className="w-full" variant="outline">
                Back to Login
              </Button>
            </Link>
            <Link href="mailto:support@impota.com">
              <Button className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}