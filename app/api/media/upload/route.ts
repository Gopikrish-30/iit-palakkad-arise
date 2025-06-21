import { NextRequest, NextResponse } from 'next/server'
import { saveUploadedFile } from '@/lib/media-storage'

// POST - Upload new media file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const description = formData.get('description') as string

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size - different limits for different types
    let maxSize: number
    let errorMessage: string

    if (file.type.startsWith('image/')) {
      maxSize = 10 * 1024 * 1024 // 10MB for images
      errorMessage = 'Image size too large. Maximum size is 10MB. For web use, consider optimizing to 1-2MB.'
    } else if (file.type.startsWith('video/')) {
      maxSize = 100 * 1024 * 1024 // 100MB for videos
      errorMessage = 'Video size too large. Maximum size is 100MB.'
    } else {
      maxSize = 50 * 1024 * 1024 // 50MB for documents
      errorMessage = 'File size too large. Maximum size is 50MB.'
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File type not allowed' },
        { status: 400 }
      )
    }

    const mediaFile = await saveUploadedFile(file, description)

    return NextResponse.json({
      success: true,
      data: mediaFile,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
