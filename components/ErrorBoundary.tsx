'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorInfo: null 
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Log to error reporting service (Sentry)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        }
      })
    }
    
    this.setState({
      error,
      errorInfo
    })
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return <>{this.props.fallback}</>
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Something went wrong</CardTitle>
                  <CardDescription>
                    An unexpected error occurred. Please try again.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-sm text-gray-700">Error Details:</p>
                  <pre className="text-xs text-red-600 overflow-x-auto">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.error.stack && (
                    <details className="cursor-pointer">
                      <summary className="text-xs text-gray-500 hover:text-gray-700">
                        View stack trace
                      </summary>
                      <pre className="text-xs text-gray-600 mt-2 overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>What you can try:</strong>
                </p>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li>• Refresh the page to try again</li>
                  <li>• Go back to the homepage</li>
                  <li>• Clear your browser cache</li>
                  <li>• Contact support if the problem persists</li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-3">
              <Button 
                onClick={this.handleReload}
                variant="default"
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
              <Button 
                onClick={this.handleHome}
                variant="outline"
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Async Error Boundary for React Suspense
export function AsyncErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Loading Error</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Failed to load this section. Please try refreshing the page.
                </p>
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

// Hook for error handling in functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    // Log to Sentry
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error)
    }
    
    // You can also trigger a state update or navigation here
    throw error // Re-throw to be caught by ErrorBoundary
  }
}

// Declare Sentry on window
declare global {
  interface Window {
    Sentry: any
  }
}