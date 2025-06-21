import { writeFile, readFile, unlink, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export interface MediaFile {
  id: string
  name: string
  originalName: string
  type: 'image' | 'video' | 'document'
  size: string
  dimensions?: string
  uploadDate: string
  url: string
  usedIn: string[]
  description?: string
  mimeType: string
}

const MEDIA_DATA_FILE = path.join(process.cwd(), 'public', 'uploads', 'media-data.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// Ensure uploads directory exists
async function ensureUploadsDir() {
  const dirs = [
    path.join(UPLOADS_DIR, 'images'),
    path.join(UPLOADS_DIR, 'videos'),
    path.join(UPLOADS_DIR, 'documents')
  ]
  
  for (const dir of dirs) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }
  }
}

// In-memory storage for production (since we can't write to file system)
let inMemoryMediaData: MediaFile[] = []

// Load media data from JSON file or memory
export async function loadMediaData(): Promise<MediaFile[]> {
  try {
    // In production, use in-memory storage
    if (process.env.NODE_ENV === 'production') {
      return inMemoryMediaData
    }

    // In development, try to use file system
    if (!existsSync(MEDIA_DATA_FILE)) {
      return []
    }
    const data = await readFile(MEDIA_DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading media data:', error)
    return []
  }
}

// Save media data to JSON file or memory
export async function saveMediaData(mediaFiles: MediaFile[]): Promise<void> {
  try {
    // In production, use in-memory storage
    if (process.env.NODE_ENV === 'production') {
      inMemoryMediaData = [...mediaFiles]
      return
    }

    // In development, try to save to file system
    await ensureUploadsDir()
    await writeFile(MEDIA_DATA_FILE, JSON.stringify(mediaFiles, null, 2))
  } catch (error) {
    console.warn('Failed to save to file system, using memory:', error)
    inMemoryMediaData = [...mediaFiles]
  }
}

// Generate unique filename
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const ext = path.extname(originalName)
  const nameWithoutExt = path.basename(originalName, ext)
  return `${nameWithoutExt}-${timestamp}-${random}${ext}`
}

// Get file type from mime type
export function getFileType(mimeType: string): 'image' | 'video' | 'document' {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  return 'document'
}

// Get subdirectory based on file type
export function getSubDirectory(type: 'image' | 'video' | 'document'): string {
  switch (type) {
    case 'image': return 'images'
    case 'video': return 'videos'
    case 'document': return 'documents'
    default: return 'documents'
  }
}

// Get image dimensions
async function getImageDimensions(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    // For now, return "Unknown" - in a real app you'd use a library like 'sharp' or 'image-size'
    // But those require native dependencies which can complicate deployment
    return "Unknown"
  } catch (error) {
    return "Unknown"
  }
}

// Save uploaded file
export async function saveUploadedFile(
  file: File,
  description?: string
): Promise<MediaFile> {
  console.log('saveUploadedFile called with:', {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    description
  })

  const fileType = getFileType(file.type)
  const subDir = getSubDirectory(fileType)
  const uniqueFilename = generateUniqueFilename(file.name)

  console.log('File processing:', { fileType, subDir, uniqueFilename })

  // Convert File to Buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // For production deployment, we'll use a data URL instead of file system
  // In a real production app, you'd use cloud storage like AWS S3, Cloudinary, etc.
  let publicUrl: string

  if (process.env.NODE_ENV === 'production') {
    // Create a data URL for production (temporary solution)
    const base64 = buffer.toString('base64')
    publicUrl = `data:${file.type};base64,${base64}`
  } else {
    // For development, try to save to file system
    try {
      await ensureUploadsDir()
      const filePath = path.join(UPLOADS_DIR, subDir, uniqueFilename)
      await writeFile(filePath, buffer)
      publicUrl = `/uploads/${subDir}/${uniqueFilename}`
    } catch (error) {
      console.warn('Failed to save file to disk, using data URL:', error)
      const base64 = buffer.toString('base64')
      publicUrl = `data:${file.type};base64,${base64}`
    }
  }

  // Get dimensions for images
  let dimensions = "N/A"
  if (fileType === 'image') {
    dimensions = await getImageDimensions(buffer, file.type)
  }

  // Create media file object
  const mediaFile: MediaFile = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    name: file.name,
    originalName: file.name,
    type: fileType,
    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    dimensions,
    uploadDate: new Date().toISOString().split('T')[0],
    url: publicUrl,
    usedIn: [],
    description,
    mimeType: file.type
  }
  
  // Load existing media data
  const mediaFiles = await loadMediaData()
  
  // Add new file
  mediaFiles.unshift(mediaFile)
  
  // Save updated data
  await saveMediaData(mediaFiles)
  
  return mediaFile
}

// Delete media file
export async function deleteMediaFile(id: string): Promise<boolean> {
  try {
    const mediaFiles = await loadMediaData()
    const fileIndex = mediaFiles.findIndex(f => f.id === id)

    if (fileIndex === -1) {
      return false
    }

    const file = mediaFiles[fileIndex]

    // Delete physical file (only in development)
    if (process.env.NODE_ENV !== 'production' && !file.url.startsWith('data:')) {
      const filePath = path.join(process.cwd(), 'public', file.url)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    }

    // Remove from data
    mediaFiles.splice(fileIndex, 1)

    // Save updated data
    await saveMediaData(mediaFiles)

    return true
  } catch (error) {
    console.error('Error deleting media file:', error)
    return false
  }
}

// Update media file usage
export async function updateMediaFileUsage(id: string, usedIn: string[]): Promise<boolean> {
  try {
    const mediaFiles = await loadMediaData()
    const fileIndex = mediaFiles.findIndex(f => f.id === id)
    
    if (fileIndex === -1) {
      return false
    }
    
    mediaFiles[fileIndex].usedIn = usedIn
    await saveMediaData(mediaFiles)
    
    return true
  } catch (error) {
    console.error('Error updating media file usage:', error)
    return false
  }
}
