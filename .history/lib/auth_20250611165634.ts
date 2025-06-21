import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

// Environment variables with fallbacks
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const SESSION_TIMEOUT = process.env.SESSION_TIMEOUT || '24h'
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5')
const LOCKOUT_DURATION = process.env.LOCKOUT_DURATION || '15m'

// In-memory store for login attempts (in production, use Redis or database)
const loginAttempts = new Map<string, { count: number; lastAttempt: Date; lockedUntil?: Date }>()

export interface AuthPayload {
  userId: string
  role: 'admin'
  iat: number
  exp: number
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Verify admin password (for simple password-based auth)
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  // In production, you should hash the admin password and store it securely
  return password === ADMIN_PASSWORD
}

/**
 * Generate JWT token
 */
export function generateToken(payload: Omit<AuthPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: SESSION_TIMEOUT,
    issuer: 'iit-palakkad-admin',
    audience: 'admin-panel'
  })
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): AuthPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'iit-palakkad-admin',
      audience: 'admin-panel'
    }) as AuthPayload
    return decoded
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
 * Check if IP is rate limited
 */
export function isRateLimited(ip: string): boolean {
  const attempts = loginAttempts.get(ip)
  
  if (!attempts) {
    return false
  }
  
  // Check if still locked out
  if (attempts.lockedUntil && attempts.lockedUntil > new Date()) {
    return true
  }
  
  // Reset if lockout period has passed
  if (attempts.lockedUntil && attempts.lockedUntil <= new Date()) {
    loginAttempts.delete(ip)
    return false
  }
  
  return attempts.count >= MAX_LOGIN_ATTEMPTS
}

/**
 * Record failed login attempt
 */
export function recordFailedAttempt(ip: string): void {
  const now = new Date()
  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: now }
  
  attempts.count += 1
  attempts.lastAttempt = now
  
  // Lock out if max attempts reached
  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    const lockoutMs = parseDuration(LOCKOUT_DURATION)
    attempts.lockedUntil = new Date(now.getTime() + lockoutMs)
  }
  
  loginAttempts.set(ip, attempts)
}

/**
 * Clear failed attempts for IP (on successful login)
 */
export function clearFailedAttempts(ip: string): void {
  loginAttempts.delete(ip)
}

/**
 * Parse duration string to milliseconds
 */
function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/)
  if (!match) {
    return 15 * 60 * 1000 // Default 15 minutes
  }
  
  const value = parseInt(match[1])
  const unit = match[2]
  
  switch (unit) {
    case 's': return value * 1000
    case 'm': return value * 60 * 1000
    case 'h': return value * 60 * 60 * 1000
    case 'd': return value * 24 * 60 * 60 * 1000
    default: return 15 * 60 * 1000
  }
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
 * Log security event
 */
export function logSecurityEvent(event: string, details: any): void {
  const timestamp = new Date().toISOString()
  console.log(`[SECURITY] ${timestamp} - ${event}:`, details)
  
  // In production, you might want to send this to a logging service
  // or store in a database for audit purposes
}
