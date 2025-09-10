'use client'

import { ReactNode } from 'react'

interface MobileOptimizedProps {
  children: ReactNode
  className?: string
}

export function MobileContainer({ children, className = '' }: MobileOptimizedProps) {
  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

export function MobileGrid({ children, className = '' }: MobileOptimizedProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${className}`}>
      {children}
    </div>
  )
}

export function MobileCard({ children, className = '' }: MobileOptimizedProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow touch-manipulation ${className}`}>
      {children}
    </div>
  )
}

export function MobileButton({ children, className = '', ...props }: any) {
  return (
    <button
      className={`w-full sm:w-auto px-4 py-3 sm:py-2 text-base sm:text-sm font-medium rounded-lg touch-manipulation active:scale-95 transition-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function MobileHeading({ children, className = '' }: MobileOptimizedProps) {
  return (
    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${className}`}>
      {children}
    </h1>
  )
}

export function MobileText({ children, className = '' }: MobileOptimizedProps) {
  return (
    <p className={`text-sm sm:text-base ${className}`}>
      {children}
    </p>
  )
}