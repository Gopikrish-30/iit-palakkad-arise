import { createHash, createHmac, randomBytes } from 'crypto'
import { NextRequest } from 'next/server'
import { getUserByEmail, getUserById, recordLoginAttempt, logAuditEvent, verifyPassword } from './database'

// Environment variables with fallbacks
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const SESSION_TIMEOUT_MS = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5')
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes in milliseconds

export interface AuthPayload {
  userId: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'editor'
  iat: number
  exp: number
}

export interface LoginResult {
  success: boolean
  user?: AuthPayload
  token?: string
  message: string
  requiresEmailVerification?: boolean
  isLocked?: boolean
  lockoutExpiry?: Date
}

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string,
  ipAddress: string,
  userAgent: string
): Promise<LoginResult> {
  try {
    // Get user from database
    const user = await getUserByEmail(email)

    if (!user) {
      await recordLoginAttempt(email, false, ipAddress, userAgent)
      await logAuditEvent({
        action: 'LOGIN_FAILED_USER_NOT_FOUND',
        details: { email },
        ipAddress,
        userAgent
      })

      return {
        success: false,
        message: 'Invalid email or password'
      }
    }

    // Check if account is active
    if (!user.isActive) {
      await recordLoginAttempt(email, false, ipAddress, userAgent)
      await logAuditEvent({
        userId: user.id,
        action: 'LOGIN_FAILED_ACCOUNT_INACTIVE',
        details: { email },
        ipAddress,
        userAgent
      })

      return {
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      }
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      await logAuditEvent({
        userId: user.id,
        action: 'LOGIN_FAILED_ACCOUNT_LOCKED',
        details: { email, lockedUntil: user.lockedUntil },
        ipAddress,
        userAgent
      })

      return {
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts.',
        isLocked: true,
        lockoutExpiry: user.lockedUntil
      }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash)

    if (!isPasswordValid) {
      await recordLoginAttempt(email, false, ipAddress, userAgent)
      await logAuditEvent({
        userId: user.id,
        action: 'LOGIN_FAILED_INVALID_PASSWORD',
        details: { email },
        ipAddress,
        userAgent
      })

      return {
        success: false,
        message: 'Invalid email or password'
      }
    }

    // Check email verification
    if (!user.isEmailVerified) {
      await logAuditEvent({
        userId: user.id,
        action: 'LOGIN_FAILED_EMAIL_NOT_VERIFIED',
        details: { email },
        ipAddress,
        userAgent
      })

      return {
        success: false,
        message: 'Please verify your email address before logging in.',
        requiresEmailVerification: true
      }
    }

    // Successful login
    await recordLoginAttempt(email, true, ipAddress, userAgent)

    const authPayload: AuthPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + SESSION_TIMEOUT_MS) / 1000)
    }

    const token = await generateToken(authPayload)

    await logAuditEvent({
      userId: user.id,
      action: 'LOGIN_SUCCESSFUL',
      details: { email, role: user.role },
      ipAddress,
      userAgent
    })

    return {
      success: true,
      user: authPayload,
      token,
      message: 'Login successful'
    }

  } catch (error) {
    console.error('Authentication error:', error)
    await logAuditEvent({
      action: 'LOGIN_ERROR',
      details: { email, error: error instanceof Error ? error.message : 'Unknown error' },
      ipAddress,
      userAgent
    })

    return {
      success: false,
      message: 'An error occurred during authentication'
    }
  }
}

/**
 * Generate JWT token (Edge Runtime compatible)
 */
export async function generateToken(payload: { userId: string; role: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (SESSION_TIMEOUT_MS / 1000)

  const tokenPayload = {
    ...payload,
    iat: now,
    exp: exp,
    iss: 'iit-palakkad-admin',
    aud: 'admin-panel'
  }

  // JWT implementation using Web Crypto API (Edge Runtime compatible)
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const encodedHeader = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  const encodedPayload = btoa(JSON.stringify(tokenPayload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

  // Create signature using Web Crypto API
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, data)
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

/**
 * Verify JWT token (Edge Runtime compatible)
 */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const [encodedHeader, encodedPayload, signature] = parts

    // Verify signature using Web Crypto API (Edge Runtime compatible)
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
    const signatureBuffer = Uint8Array.from(atob(signature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBuffer, data)

    if (!isValid) {
      return null
    }

    // Decode payload
    const payload = JSON.parse(atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/')))

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      return null
    }

    // Verify issuer and audience
    if (payload.iss !== 'iit-palakkad-admin' || payload.aud !== 'admin-panel') {
      return null
    }

    return {
      userId: payload.userId,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * Extract token from request
 */
export function extractTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Try to get token from cookie
  const tokenCookie = request.cookies.get('admin-token')
  if (tokenCookie) {
    return tokenCookie.value
  }

  return null
}

/**
 * Get client IP address
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return request.ip || 'unknown'
}

/**
 * Check if IP is rate limited (simplified version)
 * Note: Rate limiting is now handled at the user level in the database
 */
export function isRateLimited(ip: string): boolean {
  // For now, we'll rely on user-level rate limiting in the database
  // This function is kept for compatibility but always returns false
  // Real rate limiting happens in the authenticateUser function
  return false
}

/**
 * Record failed login attempt (deprecated)
 * Note: This is now handled in the database via recordLoginAttempt
 */
export function recordFailedAttempt(ip: string): void {
  // This function is deprecated and kept for compatibility
  // Actual failed attempt recording is handled in the database
  console.log(`Failed login attempt from IP: ${ip}`)
}

/**
 * Clear failed attempts for IP (deprecated)
 * Note: This is now handled in the database
 */
export function clearFailedAttempts(ip: string): void {
  // This function is deprecated and kept for compatibility
  // Actual attempt clearing is handled in the database
  console.log(`Cleared failed attempts for IP: ${ip}`)
}

/**
 * Generate secure random string
 */
export function generateSecureRandom(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Validate request origin (CSRF protection)
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')
  
  if (!origin && !referer) {
    return false
  }
  
  const allowedOrigins = [
    `http://${host}`,
    `https://${host}`,
    'http://localhost:3000',
    'https://localhost:3000'
  ]
  
  if (origin && !allowedOrigins.includes(origin)) {
    return false
  }
  
  if (referer) {
    const refererUrl = new URL(referer)
    if (!allowedOrigins.some(allowed => refererUrl.origin === allowed)) {
      return false
    }
  }
  
  return true
}

/**
 * Log security event (wrapper for database audit logging)
 */
export async function logSecurityEvent(event: string, details: any): Promise<void> {
  const { logAuditEvent } = await import('./database')

  await logAuditEvent({
    action: event,
    details,
    ipAddress: details.ip || details.ipAddress || 'unknown',
    userAgent: details.userAgent || 'unknown'
  })
}
