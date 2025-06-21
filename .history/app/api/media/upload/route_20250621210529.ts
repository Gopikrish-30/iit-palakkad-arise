import { NextRequest, NextResponse } from 'next/server'
import { saveUploadedFile } from '@/lib/media-storage'

// POST - Upload new media file
export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')

    const formData = await request.formData()
    console.log('FormData parsed')

    const file = formData.get('file') as File
    const description = formData.get('description') as string

    console.log('File:', file ? `${file.name} (${file.size} bytes)` : 'No file')
    console.log('Description:', description)

    if (!file) {
      console.log('No file provided in request')
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size - Vercel has 4.5MB limit for serverless functions
    let maxSize: number
    let errorMessage: string

    if (file.type.startsWith('image/')) {
      maxSize = 4 * 1024 * 1024 // 4MB for images (under Vercel limit)
      errorMessage = 'Image size too large. Maximum size is 4MB for deployment compatibility. Please compress your image.'
    } else if (file.type.startsWith('video/')) {
      maxSize = 4 * 1024 * 1024 // 4MB for videos (under Vercel limit)
      errorMessage = 'Video size too large. Maximum size is 4MB for deployment compatibility.'
    } else {
      maxSize = 4 * 1024 * 1024 // 4MB for documents (under Vercel limit)
      errorMessage = 'File size too large. Maximum size is 4MB for deployment compatibility.'
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file'
    return NextResponse.json(
      { success: false, error: `Upload failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}
