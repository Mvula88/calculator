'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Don't show footer on portal pages
  if (pathname?.startsWith('/portal')) {
    return null
  }

  // Show footer on all other pages
  return <Footer />
}