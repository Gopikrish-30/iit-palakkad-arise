/**
 * Client-side image compression utility
 * Compresses images to fit within file size limits while maintaining quality
 */

export interface CompressionOptions {
  maxSizeMB: number
  maxWidthOrHeight?: number
  useWebWorker?: boolean
  quality?: number
}

/**
 * Compress an image file to reduce its size
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = { maxSizeMB: 4 }
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      try {
        // Calculate new dimensions
        let { width, height } = img
        const maxDimension = options.maxWidthOrHeight || 1920

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width
            width = maxDimension
          } else {
            width = (width * maxDimension) / height
            height = maxDimension
          }
        }

        // Set canvas dimensions
        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        // Try different quality levels to meet size requirement
        let quality = options.quality || 0.8
        const maxSizeBytes = options.maxSizeMB * 1024 * 1024

        const tryCompress = (currentQuality: number): void => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'))
                return
              }

              if (blob.size <= maxSizeBytes || currentQuality <= 0.1) {
                // Create new file with compressed data
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
                resolve(compressedFile)
              } else {
                // Try with lower quality
                tryCompress(currentQuality - 0.1)
              }
            },
            file.type,
            currentQuality
          )
        }

        tryCompress(quality)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Load the image
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Check if a file needs compression
 */
export function needsCompression(file: File, maxSizeMB: number = 4): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size > maxSizeBytes
}

/**
 * Get human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Validate file type for compression
 */
export function canCompress(file: File): boolean {
  const compressibleTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp'
  ]
  return compressibleTypes.includes(file.type.toLowerCase())
}
