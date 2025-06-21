'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  ImageIcon, 
  Video, 
  FileText, 
  Upload,
  Check,
  X
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

interface MediaPickerProps {
  onSelect: (file: MediaFile) => void
  selectedFile?: MediaFile | null
  fileType?: 'image' | 'video' | 'document' | 'all'
  trigger?: React.ReactNode
  title?: string
}

export default function MediaPicker({ 
  onSelect, 
  selectedFile, 
  fileType = 'all',
  trigger,
  title = "Select Media File"
}: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>(fileType)
  const { toast } = useToast()

  // Load media files when dialog opens
  useEffect(() => {
    if (isOpen) {
      loadMediaFiles()
    }
  }, [isOpen])

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || file.type === filterType
    return matchesSearch && matchesType
  })

  const loadMediaFiles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/media', {
        credentials: 'include',
      })
      const data = await response.json()

      if (data.success) {
        setMediaFiles(data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to load media files",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (file: MediaFile) => {
    onSelect(file)
    setIsOpen(false)
  }

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

  const defaultTrigger = (
    <Button variant="outline">
      <Upload className="h-4 w-4 mr-2" />
      {selectedFile ? selectedFile.name : "Select Media"}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
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
          </div>

          {/* Media Grid */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading media files...</p>
                </div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No media files found</p>
                  <p className="text-sm text-gray-500">Upload some files to get started</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <Card 
                    key={file.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedFile?.id === file.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleSelect(file)}
                  >
                    <CardContent className="p-3">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-2 relative">
                        {file.type === 'image' ? (
                          <Image
                            src={file.url}
                            alt={file.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          getFileIcon(file.type)
                        )}
                        {selectedFile?.id === file.id && (
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                            <Check className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {file.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{file.size}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {selectedFile.type === 'image' ? (
                      <Image
                        src={selectedFile.url}
                        alt={selectedFile.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      getFileIcon(selectedFile.type)
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">{selectedFile.size}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelect(null as any)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
