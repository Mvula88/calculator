'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, BookOpen, FileText, Calculator, Gavel, Ship, Users } from 'lucide-react'

// Define the portal page sequence
const PORTAL_PAGES = [
  {
    path: '/portal',
    title: 'Dashboard',
    description: 'Portal overview',
    icon: BookOpen
  },
  {
    path: '/portal/beginner',
    title: 'Beginner Journey',
    description: 'Complete import journey for beginners',
    icon: BookOpen
  },
  {
    path: '/portal/guide',
    title: 'Import Guide',
    description: 'Step-by-step import process',
    icon: BookOpen
  },
  {
    path: '/portal/documents',
    title: 'Documents',
    description: 'Real import documents & examples',
    icon: FileText
  },
  {
    path: '/portal/calculator',
    title: 'Calculator',
    description: 'Calculate all import costs',
    icon: Calculator
  },
  {
    path: '/portal/japan-auctions',
    title: 'Japan Auctions',
    description: 'Auction guide & platforms',
    icon: Gavel
  },
  {
    path: '/portal/book-slot',
    title: 'Shipping',
    description: 'Shipping companies & container sharing',
    icon: Ship
  },
  {
    path: '/portal/agents',
    title: 'Agents',
    description: 'Verified clearing agents directory',
    icon: Users
  },
]

interface PortalPageNavigationProps {
  currentPath: string
  showPrevious?: boolean
  className?: string
}

export default function PortalPageNavigation({
  currentPath,
  showPrevious = true,
  className = ''
}: PortalPageNavigationProps) {
  // Find current page index
  const currentIndex = PORTAL_PAGES.findIndex(page => page.path === currentPath)

  // If page not found in sequence, don't render navigation
  if (currentIndex === -1) return null

  const previousPage = currentIndex > 0 ? PORTAL_PAGES[currentIndex - 1] : null
  const nextPage = currentIndex < PORTAL_PAGES.length - 1 ? PORTAL_PAGES[currentIndex + 1] : null

  return (
    <div className={`mt-12 pt-8 border-t border-gray-200 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Page Button */}
          {showPrevious && previousPage ? (
            <Link href={previousPage.path} className="group">
              <div className="mobile-card border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg active:scale-95 h-full">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Previous
                    </div>
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">
                      {previousPage.title}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {previousPage.description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : showPrevious ? (
            <div className="hidden sm:block" />
          ) : null}

          {/* Next Page Button */}
          {nextPage ? (
            <Link href={nextPage.path} className="group">
              <div className="mobile-card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all active:scale-95 h-full">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      Next Lesson
                    </div>
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate flex items-center gap-2">
                      {nextPage.title}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {nextPage.description}
                    </div>
                    <Button
                      size="sm"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                    >
                      Continue Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="mobile-card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 h-full">
              <div className="text-center py-4">
                <div className="text-4xl mb-2">🎉</div>
                <div className="font-bold text-gray-900 mb-1">
                  You've Completed Everything!
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Congratulations on finishing the learning path
                </div>
                <Link href="/portal/calculator">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    Use Calculator
                    <Calculator className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {nextPage && (
          <div className="mt-6 text-center">
            <div className="text-xs text-gray-500 mb-2">
              Your Progress: {currentIndex + 1} of {PORTAL_PAGES.length} lessons
            </div>
            <div className="max-w-md mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / PORTAL_PAGES.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
