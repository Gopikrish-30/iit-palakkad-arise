import { NextRequest, NextResponse } from 'next/server'
import {
  verifyAdminPassword,
  generateToken,
  getClientIP,
  isRateLimited,
  recordFailedAttempt,
  clearFailedAttempts,
  validateOrigin,
  logSecurityEvent
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Validate request origin (CSRF protection)
    if (!validateOrigin(request)) {
      logSecurityEvent('CSRF_ATTEMPT', {
        ip: getClientIP(request),
        origin: request.headers.get('origin'),
        referer: request.headers.get('referer')
      })
      return NextResponse.json(
        { success: false, error: 'Invalid request origin' },
        { status: 403 }
      )
    }

    const clientIP = getClientIP(request)

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      logSecurityEvent('RATE_LIMITED_LOGIN', { ip: clientIP })
      return NextResponse.json(
        { success: false, error: 'Too many failed attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { password } = await request.json()

    // Validate input
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }

    // Verify password
    if (verifyAdminPassword(password)) {
      // Clear failed attempts on successful login
      clearFailedAttempts(clientIP)

      // Generate JWT token
      const token = generateToken({ userId: 'admin', role: 'admin' })

      // Log successful login
      logSecurityEvent('SUCCESSFUL_LOGIN', {
        ip: clientIP,
        timestamp: new Date().toISOString()
      })

      // Create response with secure cookie
      const response = NextResponse.json({
        success: true,
        message: 'Login successful'
      })

      // Set secure HTTP-only cookie
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/'
      })

      return response
    } else {
      // Record failed attempt
      recordFailedAttempt(clientIP)

      // Log failed login attempt
      logSecurityEvent('FAILED_LOGIN', {
        ip: clientIP,
        timestamp: new Date().toISOString()
      })

      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    logSecurityEvent('LOGIN_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: getClientIP(request)
    })

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
