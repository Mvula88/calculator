import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-gray-400">
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Logo and Tagline */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-3">
            <Image
              src="/impota-logo.png"
              alt="IMPOTA"
              width={150}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-sm text-gray-500">
            Educational content for car import understanding
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 text-sm">
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li>
              <Link href="/refund-policy" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li className="text-gray-600">•</li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Disclaimer */}
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-sm text-gray-300">
            <strong>📚 Educational Content Only:</strong> We provide guides and information. We do not import vehicles, provide clearing services, or act as agents.
          </p>
        </div>

        {/* Copyright and Disclaimers */}
        <div className="space-y-3 text-xs text-gray-500">
          <p>© {currentYear} IMPOTA Guide. All rights reserved.</p>
          <p className="text-gray-400">Support: <a href="mailto:support@impota.com" className="hover:text-white transition-colors">support@impota.com</a></p>
        </div>
      </div>
    </footer>
  )
}