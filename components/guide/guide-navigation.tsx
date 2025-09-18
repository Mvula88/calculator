'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  CheckCircle, 
  Calculator, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  FileText,
  ChevronRight 
} from 'lucide-react'

interface NavigationProps {
  currentSection?: string
  onNavigate: (sectionId: string) => void
}

export function GuideNavigation({ currentSection, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  // Handle scroll to make navigation sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    {
      id: 'overview',
      title: 'Quick Overview',
      icon: CheckCircle,
      description: 'Can you import? What will it cost?'
    },
    {
      id: 'essentials',
      title: 'Pre-Import Essentials',
      icon: AlertTriangle,
      description: 'Eligibility, capital, time, skills needed'
    },
    {
      id: 'costs',
      title: 'Cost Calculator',
      icon: Calculator,
      description: 'Total breakdown with payment timeline'
    },
    {
      id: 'timeline',
      title: 'Step-by-Step Process',
      icon: Clock,
      description: 'Complete timeline with costs per stage'
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      icon: AlertTriangle,
      description: 'Costly errors to avoid at each stage'
    },
    {
      id: 'templates',
      title: 'Documents & Templates',
      icon: FileText,
      description: 'Ready-to-use forms and scripts'
    },
    {
      id: 'emergency',
      title: 'Emergency Help',
      icon: HelpCircle,
      description: 'Crisis management when things go wrong'
    }
  ]

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Sticky Navigation */}
      <div className={`hidden lg:block transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-lg' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className={`${isSticky ? 'py-2' : 'py-4'}`}>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                {navigationItems.map(item => {
                  const Icon = item.icon
                  const isActive = currentSection === item.id
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? 'default' : 'ghost'}
                      size={isSticky ? 'sm' : 'default'}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-2 ${
                        isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.title}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b shadow-sm mb-6">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-bold">Guide Navigation</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="border-t bg-white">
            <div className="p-4 space-y-2">
              {navigationItems.map(item => {
                const Icon = item.icon
                const isActive = currentSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      isActive 
                        ? 'bg-blue-50 border-blue-200 text-blue-900' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Cards for Desktop (non-sticky state) */}
      {!isSticky && (
        <Card className="hidden lg:block mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <h3 className="text-xl font-bold mb-2">📋 Guide Sections</h3>
            <p className="text-sm text-gray-600">
              Jump to any section or follow the logical flow from top to bottom
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {navigationItems.map(item => {
                const Icon = item.icon
                const isActive = currentSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left p-4 rounded-lg border transition-all hover:shadow-md ${
                      isActive 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          isActive ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Add spacing when navigation becomes sticky */}
      {isSticky && <div className="h-16 lg:h-20" />}
    </>
  )
}