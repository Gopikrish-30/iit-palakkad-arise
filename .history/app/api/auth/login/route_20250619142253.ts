import { NextRequest, NextResponse } from 'next/server'
import {
  authenticateUser,
  getClientIP,
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

    const { email, password } = await request.json()

    // Validate input
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Authenticate user
    const authResult = await authenticateUser(
      email.toLowerCase().trim(),
      password,
      clientIP,
      request.headers.get('user-agent') || 'unknown'
    )

    if (authResult.success && authResult.token) {
      // Create response with user info
      const response = NextResponse.json({
        success: true,
        message: authResult.message,
        user: {
          id: authResult.user!.userId,
          email: authResult.user!.email,
          name: authResult.user!.name,
          role: authResult.user!.role
        }
      })

      // Set secure HTTP-only cookie
      response.cookies.set('admin-token', authResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/'
      })

      return response
    } else {
      // Handle different failure scenarios
      let statusCode = 401
      let errorMessage = authResult.message

      if (authResult.requiresEmailVerification) {
        statusCode = 403
      } else if (authResult.isLocked) {
        statusCode = 423 // Locked
      }

      const responseData: any = {
        success: false,
        error: errorMessage
      }

      if (authResult.requiresEmailVerification) {
        responseData.requiresEmailVerification = true
      }

      if (authResult.isLocked && authResult.lockoutExpiry) {
        responseData.isLocked = true
        responseData.lockoutExpiry = authResult.lockoutExpiry.toISOString()
      }

      return NextResponse.json(responseData, { status: statusCode })
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
