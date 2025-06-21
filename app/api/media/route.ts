import { NextRequest, NextResponse } from 'next/server'
import { loadMediaData } from '@/lib/media-storage'

// GET - Fetch all media files
export async function GET() {
  try {
    const mediaFiles = await loadMediaData()
    return NextResponse.json({ success: true, data: mediaFiles })
  } catch (error) {
    console.error('Error fetching media files:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media files' },
      { status: 500 }
    )
  }
}
