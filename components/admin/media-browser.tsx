"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, CheckCircle } from "lucide-react"
import Image from "next/image"

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

interface MediaBrowserProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  fileType?: 'image' | 'video' | 'document' | 'all'
  title?: string
}

export default function MediaBrowser({ 
  isOpen, 
  onClose, 
  onSelect, 
  fileType = 'all',
  title = "Select Media File"
}: MediaBrowserProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState(fileType === 'all' ? 'all' : fileType)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadMediaFiles()
    }
  }, [isOpen])

  const loadMediaFiles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/media')
      const data = await response.json()
      
      if (data.success) {
        setMediaFiles(data.data)
      }
    } catch (error) {
      console.error('Failed to load media files:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || file.type === filterType
    const matchesFileType = fileType === 'all' || file.type === fileType
    return matchesSearch && matchesType && matchesFileType
  })

  const handleSelect = () => {
    if (selectedFile) {
      onSelect(selectedFile)
      onClose()
      setSelectedFile(null)
    }
  }

  const handleClose = () => {
    onClose()
    setSelectedFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {fileType === 'all' && (
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Media Grid */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">Loading media files...</div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">No media files found</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`relative border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedFile === file.url 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFile(file.url)}
                  >
                    {selectedFile === file.url && (
                      <div className="absolute top-2 right-2 text-blue-500">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                    
                    <div className="aspect-square mb-2 bg-gray-100 rounded overflow-hidden">
                      {file.type === 'image' ? (
                        <Image
                          src={file.url}
                          alt={file.name}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-1">
                              {file.type === 'video' ? '🎥' : '📄'}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {file.type}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSelect} disabled={!selectedFile}>
              Select File
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
