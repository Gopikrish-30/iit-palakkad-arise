import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  extractTokenFromRequest,
  verifyToken,
  getClientIP,
  logSecurityEvent
} from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const clientIP = getClientIP(request)

  // Protect all admin routes (including /admin itself)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow public admin pages (login, reset password, verify email)
    const publicAdminPaths = [
      '/admin/login',
      '/admin/reset-password',
      '/admin/verify-email'
    ]

    const isPublicPath = publicAdminPaths.some(path =>
      request.nextUrl.pathname === path
    )

    if (isPublicPath || request.nextUrl.pathname.startsWith('/api/auth/')) {
      return NextResponse.next()
    }

    const token = extractTokenFromRequest(request)

    if (!token) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', {
        ip: clientIP,
        path: request.nextUrl.pathname,
        reason: 'No auth token'
      })
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', {
        ip: clientIP,
        path: request.nextUrl.pathname,
        reason: 'Invalid or expired token'
      })

      // Clear invalid token cookie
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      })
      return response
    }

    // Add auth info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId)
    requestHeaders.set('x-user-role', payload.role)

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

      const token = extractTokenFromRequest(request)

      if (!token) {
        logSecurityEvent('UNAUTHORIZED_API_ACCESS', {
          ip: clientIP,
          path: request.nextUrl.pathname,
          reason: 'No auth token'
        })
        return NextResponse.json(
          { success: false, error: 'Unauthorized - No token' },
          { status: 401 }
        )
      }

      const payload = await verifyToken(token)
      if (!payload) {
        logSecurityEvent('UNAUTHORIZED_API_ACCESS', {
          ip: clientIP,
          path: request.nextUrl.pathname,
          reason: 'Invalid or expired token'
        })
        return NextResponse.json(
          { success: false, error: 'Unauthorized - Invalid token' },
          { status: 401 }
        )
      }

      // Add auth info to request headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.userId)
      requestHeaders.set('x-user-role', payload.role)

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
