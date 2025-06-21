import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password-based authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function middleware(request: NextRequest) {
  // Protect admin routes (but allow login page)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const authCookie = request.cookies.get('admin-auth')

    if (!authCookie || authCookie.value !== ADMIN_PASSWORD) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect API routes
  if (request.nextUrl.pathname.startsWith('/api/media')) {
    const authCookie = request.cookies.get('admin-auth')
    
    if (!authCookie || authCookie.value !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/media/:path*']
}
