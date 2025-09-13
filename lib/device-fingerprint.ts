'use client'

interface DeviceInfo {
  fingerprint: string
  type: 'phone' | 'computer'
  name: string
  userAgent: string
}

export function getDeviceFingerprint(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      fingerprint: 'server',
      type: 'computer',
      name: 'Server',
      userAgent: ''
    }
  }

  const userAgent = navigator.userAgent
  const screenResolution = `${screen.width}x${screen.height}`
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const language = navigator.language
  const platform = navigator.platform
  const vendor = navigator.vendor
  
  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isTablet = /iPad|Android.*Tablet|Tablet.*Android/i.test(userAgent)
  const deviceType: 'phone' | 'computer' = (isMobile && !isTablet) ? 'phone' : 'computer'
  
  // Generate device name
  let deviceName = 'Unknown Device'
  if (/iPhone/.test(userAgent)) deviceName = 'iPhone'
  else if (/iPad/.test(userAgent)) deviceName = 'iPad'
  else if (/Android/.test(userAgent)) deviceName = 'Android Device'
  else if (/Windows/.test(userAgent)) deviceName = 'Windows PC'
  else if (/Mac/.test(userAgent)) deviceName = 'Mac'
  else if (/Linux/.test(userAgent)) deviceName = 'Linux PC'
  
  // Create fingerprint from multiple factors
  const fingerprintData = [
    userAgent,
    screenResolution,
    timezone,
    language,
    platform,
    vendor,
    // Add canvas fingerprint for extra uniqueness
    getCanvasFingerprint(),
    // Add WebGL info
    getWebGLFingerprint()
  ].join('|')
  
  // Hash the fingerprint for consistency
  const fingerprint = hashString(fingerprintData)
  
  return {
    fingerprint,
    type: deviceType,
    name: deviceName,
    userAgent
  }
}

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'no-canvas'
    
    const text = 'Browser fingerprint 123'
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText(text, 2, 2)
    
    return canvas.toDataURL().slice(-50)
  } catch {
    return 'canvas-error'
  }
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return 'no-webgl'
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'unknown'
    }
    return 'no-debug-info'
  } catch {
    return 'webgl-error'
  }
}

function hashString(str: string): string {
  // Simple hash function for browser
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

// Generate session token
export function generateSessionToken(): string {
  const random = Math.random().toString(36).substring(2, 15)
  const timestamp = Date.now().toString(36)
  return `${timestamp}-${random}`
}