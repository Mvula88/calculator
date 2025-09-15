import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Refund Policy', href: '/refund-policy' },
    ],
    resources: [
      { name: 'Import Guide', href: '/na/guide' },
      { name: 'Portal', href: '/portal' },
      { name: 'Calculator', href: '/portal/calculator' },
      { name: 'Support', href: '/support' },
    ],
    countries: [
      { name: 'Namibia', href: '/na/guide' },
      { name: 'South Africa', href: '/za/guide' },
      { name: 'Botswana', href: '/bw/guide' },
      { name: 'Zambia', href: '/zm/guide' },
    ]
  }
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/impota-logo.png" 
                alt="IMPOTA" 
                width={120} 
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner for importing cars from Japan to Southern Africa.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © {currentYear} IMPOTA. All rights reserved.
            </p>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Countries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Countries</h3>
            <ul className="space-y-2">
              {footerLinks.countries.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              Empowering Southern African importers since 2024
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a 
                href="mailto:support@impota.com" 
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                support@impota.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}