"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HardDrive, Image, Video, FileText, Info } from "lucide-react"

interface StorageStats {
  totalFiles: number
  totalSize: number
  imageCount: number
  videoCount: number
  documentCount: number
  imageSize: number
  videoSize: number
  documentSize: number
}

export default function StorageInfo() {
  const [stats, setStats] = useState<StorageStats>({
    totalFiles: 0,
    totalSize: 0,
    imageCount: 0,
    videoCount: 0,
    documentCount: 0,
    imageSize: 0,
    videoSize: 0,
    documentSize: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStorageStats()
  }, [])

  const fetchStorageStats = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      
      if (data.success) {
        const files = data.data
        const newStats: StorageStats = {
          totalFiles: files.length,
          totalSize: 0,
          imageCount: 0,
          videoCount: 0,
          documentCount: 0,
          imageSize: 0,
          videoSize: 0,
          documentSize: 0
        }

        files.forEach((file: any) => {
          const sizeInBytes = parseFloat(file.size) * 1024 * 1024 // Convert MB to bytes
          newStats.totalSize += sizeInBytes

          if (file.type === 'image') {
            newStats.imageCount++
            newStats.imageSize += sizeInBytes
          } else if (file.type === 'video') {
            newStats.videoCount++
            newStats.videoSize += sizeInBytes
          } else if (file.type === 'document') {
            newStats.documentCount++
            newStats.documentSize += sizeInBytes
          }
        })

        setStats(newStats)
      }
    } catch (error) {
      console.error('Error fetching storage stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const estimatedCapacity = {
    // Assuming 10GB available storage (adjust based on your server)
    total: 10 * 1024 * 1024 * 1024, // 10GB in bytes
    used: stats.totalSize,
    percentage: (stats.totalSize / (10 * 1024 * 1024 * 1024)) * 100
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Storage Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading storage information...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Storage Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage Used</span>
              <span>{formatSize(estimatedCapacity.used)} / {formatSize(estimatedCapacity.total)}</span>
            </div>
            <Progress value={estimatedCapacity.percentage} className="h-2" />
            <p className="text-xs text-gray-600">
              {estimatedCapacity.percentage.toFixed(1)}% of estimated available storage
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalFiles}</div>
              <div className="text-sm text-gray-600">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.imageCount}</div>
              <div className="text-sm text-gray-600">Images</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.videoCount}</div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.documentCount}</div>
              <div className="text-sm text-gray-600">Documents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Storage by File Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Image className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Images</div>
                  <div className="text-sm text-gray-600">{stats.imageCount} files</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatSize(stats.imageSize)}</div>
                <Badge variant="outline" className="text-xs">Max: 10MB each</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Videos</div>
                  <div className="text-sm text-gray-600">{stats.videoCount} files</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatSize(stats.videoSize)}</div>
                <Badge variant="outline" className="text-xs">Max: 100MB each</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium">Documents</div>
                  <div className="text-sm text-gray-600">{stats.documentCount} files</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatSize(stats.documentSize)}</div>
                <Badge variant="outline" className="text-xs">Max: 50MB each</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Storage Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">For Photo Gallery Images:</div>
              <div className="text-blue-700">Optimize images to 500KB-2MB for best web performance. Current limit: 10MB per image.</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Estimated Capacity:</div>
              <div className="text-green-700">
                With optimized images (1MB avg): ~{Math.floor((estimatedCapacity.total - estimatedCapacity.used) / (1024 * 1024))} more images possible
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900">Best Practices:</div>
              <div className="text-yellow-700">
                • Compress images before upload • Use WebP format when possible • Regular cleanup of unused files
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
