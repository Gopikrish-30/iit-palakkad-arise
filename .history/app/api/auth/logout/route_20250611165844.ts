import { NextRequest, NextResponse } from 'next/server'
import { 
  extractSessionFromRequest, 
  destroySession,
  getClientIP,
  logSecurityEvent
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const sessionId = extractSessionFromRequest(request)
    const clientIP = getClientIP(request)

    if (sessionId) {
      // Destroy the session
      destroySession(sessionId)
      
      // Log logout event
      logSecurityEvent('LOGOUT', { 
        ip: clientIP,
        sessionId,
        timestamp: new Date().toISOString()
      })
    }

    // Create response
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully'
    })

    // Clear the session cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    logSecurityEvent('LOGOUT_ERROR', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: getClientIP(request)
    })
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support GET for logout links
export async function GET(request: NextRequest) {
  return POST(request)
}
