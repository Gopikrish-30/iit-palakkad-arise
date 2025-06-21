import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  extractTokenFromRequest,
  verifyToken,
  getClientIP,
  logSecurityEvent
} from '@/lib/auth'

export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request)

  // Protect all admin routes (including /admin itself)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow login page and auth API routes
    if (request.nextUrl.pathname === '/admin/login' ||
        request.nextUrl.pathname.startsWith('/api/auth/')) {
      return NextResponse.next()
    }

    const sessionId = extractSessionFromRequest(request)

    if (!sessionId) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', {
        ip: clientIP,
        path: request.nextUrl.pathname,
        reason: 'No session token'
      })
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const session = verifySession(sessionId)
    if (!session) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', {
        ip: clientIP,
        path: request.nextUrl.pathname,
        reason: 'Invalid or expired session'
      })

      // Clear invalid session cookie
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('admin-session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      })
      return response
    }

    // Add session info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-session-id', sessionId)
    requestHeaders.set('x-user-id', session.userId)
    requestHeaders.set('x-user-role', session.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Protect API routes (except auth routes)
  if (request.nextUrl.pathname.startsWith('/api/') &&
      !request.nextUrl.pathname.startsWith('/api/auth/')) {

    // Only protect admin-specific API routes
    if (request.nextUrl.pathname.startsWith('/api/media') ||
        request.nextUrl.pathname.startsWith('/api/admin')) {

      const sessionId = extractSessionFromRequest(request)

      if (!sessionId) {
        logSecurityEvent('UNAUTHORIZED_API_ACCESS', {
          ip: clientIP,
          path: request.nextUrl.pathname,
          reason: 'No session token'
        })
        return NextResponse.json(
          { success: false, error: 'Unauthorized - No session' },
          { status: 401 }
        )
      }

      const session = verifySession(sessionId)
      if (!session) {
        logSecurityEvent('UNAUTHORIZED_API_ACCESS', {
          ip: clientIP,
          path: request.nextUrl.pathname,
          reason: 'Invalid or expired session'
        })
        return NextResponse.json(
          { success: false, error: 'Unauthorized - Invalid session' },
          { status: 401 }
        )
      }

      // Add session info to request headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-session-id', sessionId)
      requestHeaders.set('x-user-id', session.userId)
      requestHeaders.set('x-user-role', session.role)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/media/:path*',
    '/api/admin/:path*'
  ]
}
