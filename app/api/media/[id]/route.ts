import { NextRequest, NextResponse } from 'next/server'
import { deleteMediaFile, updateMediaFileUsage } from '@/lib/media-storage'

// DELETE - Delete a media file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'File ID is required' },
        { status: 400 }
      )
    }

    const success = await deleteMediaFile(id)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}

// PATCH - Update media file usage
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { usedIn } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'File ID is required' },
        { status: 400 }
      )
    }

    const success = await updateMediaFileUsage(id, usedIn)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'File usage updated successfully'
    })
  } catch (error) {
    console.error('Error updating file usage:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update file usage' },
      { status: 500 }
    )
  }
}
