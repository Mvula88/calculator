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

  // Check if we already have a device ID stored
  let deviceId = localStorage.getItem('device_id')
  
  // If no device ID exists, generate one and store it
  if (!deviceId) {
    deviceId = generateDeviceId()
    localStorage.setItem('device_id', deviceId)
  }

  const userAgent = navigator.userAgent
  
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
  
  return {
    fingerprint: deviceId,
    type: deviceType,
    name: deviceName,
    userAgent
  }
}

// Generate a unique device ID that persists
function generateDeviceId(): string {
  const random = Math.random().toString(36).substring(2, 15)
  const timestamp = Date.now().toString(36)
  const browserData = [
    navigator.userAgent,
    screen.width,
    screen.height,
    navigator.language,
    new Date().getTimezoneOffset()
  ].join('-')
  
  return `device-${timestamp}-${random}-${hashString(browserData)}`
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
    
    // Type assertion for WebGL context
    const webgl = gl as WebGLRenderingContext
    const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      return String(webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) || 'unknown'
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