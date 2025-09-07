import { NextRequest } from 'next/server'

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max requests per interval
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: Date
}

// In-memory store for rate limiting (consider Redis for production)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of requestCounts.entries()) {
    if (value.resetTime < now) {
      requestCounts.delete(key)
    }
  }
}, 60000) // Clean up every minute

export function rateLimit(config: RateLimitConfig) {
  return async function checkRateLimit(
    request: NextRequest,
    identifier?: string
  ): Promise<RateLimitResult> {
    // Use IP address or custom identifier for rate limiting
    const id = identifier || 
      request.headers.get('x-forwarded-for')?.split(',')[0] || 
      request.headers.get('x-real-ip') || 
      'anonymous'
    
    const now = Date.now()
    const resetTime = now + config.interval
    
    // Get or initialize request count for this identifier
    let requestData = requestCounts.get(id)
    
    if (!requestData || requestData.resetTime < now) {
      // First request in this interval or interval has expired
      requestData = { count: 1, resetTime }
      requestCounts.set(id, requestData)
      
      return {
        success: true,
        limit: config.uniqueTokenPerInterval,
        remaining: config.uniqueTokenPerInterval - 1,
        reset: new Date(resetTime)
      }
    }
    
    // Check if limit exceeded
    if (requestData.count >= config.uniqueTokenPerInterval) {
      return {
        success: false,
        limit: config.uniqueTokenPerInterval,
        remaining: 0,
        reset: new Date(requestData.resetTime)
      }
    }
    
    // Increment count
    requestData.count++
    requestCounts.set(id, requestData)
    
    return {
      success: true,
      limit: config.uniqueTokenPerInterval,
      remaining: config.uniqueTokenPerInterval - requestData.count,
      reset: new Date(requestData.resetTime)
    }
  }
}

// Pre-configured rate limiters for different endpoints
export const paymentRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})

export const apiRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 30 // 30 requests per minute
})

export const strictRateLimit = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 10 // 10 requests per hour
})