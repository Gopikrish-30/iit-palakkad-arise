'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MediaPicker from "@/components/admin/media-picker"
import Image from "next/image"
import { ImageIcon, Video, FileText, X } from "lucide-react"

interface MediaFile {
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

export default function MediaPickerExample() {
  const [selectedImage, setSelectedImage] = useState<MediaFile | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<MediaFile | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<MediaFile | null>(null)
  const [selectedAny, setSelectedAny] = useState<MediaFile | null>(null)

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case 'video':
        return <Video className="h-5 w-5 text-purple-500" />
      case 'document':
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const renderSelectedFile = (file: MediaFile | null, onClear: () => void) => {
    if (!file) return null

    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Selected File</h4>
          <Button variant="outline" size="sm" onClick={onClear}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {file.type === 'image' ? (
              <Image
                src={file.url}
                alt={file.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              getFileIcon(file.type)
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium">{file.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs capitalize">
                {file.type}
              </Badge>
              <span className="text-sm text-gray-600">{file.size}</span>
            </div>
            {file.description && (
              <p className="text-sm text-gray-600 mt-1">{file.description}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Media Picker Examples</h1>
        <p className="text-gray-600">
          Examples of how to use the MediaPicker component in different scenarios.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Only Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Image Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Select only image files for hero banners, gallery images, etc.
            </p>
            <MediaPicker
              fileType="image"
              selectedFile={selectedImage}
              onSelect={setSelectedImage}
              title="Select Image"
              trigger={
                <Button variant="outline" className="w-full">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {selectedImage ? selectedImage.name : "Choose Image"}
                </Button>
              }
            />
            {renderSelectedFile(selectedImage, () => setSelectedImage(null))}
          </CardContent>
        </Card>

        {/* Video Only Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Video Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Select only video files for promotional content, tutorials, etc.
            </p>
            <MediaPicker
              fileType="video"
              selectedFile={selectedVideo}
              onSelect={setSelectedVideo}
              title="Select Video"
              trigger={
                <Button variant="outline" className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  {selectedVideo ? selectedVideo.name : "Choose Video"}
                </Button>
              }
            />
            {renderSelectedFile(selectedVideo, () => setSelectedVideo(null))}
          </CardContent>
        </Card>

        {/* Document Only Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Document Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Select only document files for PDFs, reports, presentations, etc.
            </p>
            <MediaPicker
              fileType="document"
              selectedFile={selectedDocument}
              onSelect={setSelectedDocument}
              title="Select Document"
              trigger={
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  {selectedDocument ? selectedDocument.name : "Choose Document"}
                </Button>
              }
            />
            {renderSelectedFile(selectedDocument, () => setSelectedDocument(null))}
          </CardContent>
        </Card>

        {/* Any File Type Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Any File Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Select any type of file - images, videos, or documents.
            </p>
            <MediaPicker
              fileType="all"
              selectedFile={selectedAny}
              onSelect={setSelectedAny}
              title="Select Any File"
              trigger={
                <Button variant="outline" className="w-full">
                  {getFileIcon(selectedAny?.type || 'document')}
                  <span className="ml-2">
                    {selectedAny ? selectedAny.name : "Choose Any File"}
                  </span>
                </Button>
              }
            />
            {renderSelectedFile(selectedAny, () => setSelectedAny(null))}
          </CardContent>
        </Card>
      </div>

      {/* Usage Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import MediaPicker from "@/components/admin/media-picker"

// Basic usage
<MediaPicker
  fileType="image"           // 'image' | 'video' | 'document' | 'all'
  selectedFile={selectedFile}
  onSelect={setSelectedFile}
  title="Select Image"
  trigger={<Button>Choose Image</Button>}
/>

// In your component state
const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)

// Handle selection
const handleFileSelect = (file: MediaFile) => {
  setSelectedFile(file)
  // Use file.url for display
  // Use file.name, file.type, file.size for metadata
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
