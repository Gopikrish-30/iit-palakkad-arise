"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Video,
  Download,
  Trash2,
  Eye,
  Copy,
  Search,
  Filter,
  FolderOpen,
  Loader2,
  CheckCircle
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import StorageInfo from "./storage-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function MediaSection() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [isViewingFile, setIsViewingFile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    file: null as File | null,
    name: "",
    description: "",
  })
  const { toast } = useToast()

  // Load media files on component mount
  useEffect(() => {
    loadMediaFiles()
  }, [])

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || file.type === filterType
    return matchesSearch && matchesType
  })

  const loadMediaFiles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/media', {
        credentials: 'include', // Include authentication cookies
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (4MB limit for Vercel compatibility)
      const maxSize = 4 * 1024 * 1024 // 4MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `File size is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Maximum allowed is 4MB. Please compress your file.`,
          variant: "destructive"
        })
        // Clear the input
        event.target.value = ''
        return
      }

      setUploadForm({
        ...uploadForm,
        file,
        name: file.name,
      })
    }
  }

  const handleUpload = async () => {
    if (!uploadForm.file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', uploadForm.file)
      if (uploadForm.description) {
        formData.append('description', uploadForm.description)
      }

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include authentication cookies
      })

      const data = await response.json()

      if (data.success) {
        setMediaFiles([data.data, ...mediaFiles])
        setUploadForm({ file: null, name: "", description: "" })
        setIsUploadOpen(false)
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to upload file",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteFile = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Include authentication cookies
      })

      const data = await response.json()

      if (data.success) {
        setMediaFiles(mediaFiles.filter(file => file.id !== id))
        toast({
          title: "Success",
          description: "File deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete file",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive"
      })
    }
  }

  const handleViewFile = (file: MediaFile) => {
    setSelectedFile(file)
    setIsViewingFile(true)
  }

  const copyFileUrl = async (url: string) => {
    try {
      const fullUrl = `${window.location.origin}${url}`
      await navigator.clipboard.writeText(fullUrl)
      toast({
        title: "Success",
        description: "File URL copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive"
      })
    }
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

  const getTotalSize = () => {
    return mediaFiles.reduce((total, file) => {
      const size = parseFloat(file.size.replace(' MB', ''))
      return total + size
    }, 0).toFixed(1)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading media files...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Management</h2>
          <p className="text-gray-600">Upload and manage images, videos, and documents</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button disabled={isUploading}>
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? 'Uploading...' : 'Upload Media'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Media File</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">File Name</Label>
                <Input
                  id="name"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="Enter file name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Enter file description"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleUpload}
                className="flex-1"
                disabled={!uploadForm.file || isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {isUploading ? 'Uploading...' : 'Upload File'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsUploadOpen(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="files">Media Files</TabsTrigger>
          <TabsTrigger value="storage">Storage Info</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6">
          {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <FolderOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mediaFiles.length}</p>
                <p className="text-sm text-gray-600">Total Files</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mediaFiles.filter(f => f.type === 'image').length}
                </p>
                <p className="text-sm text-gray-600">Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {mediaFiles.filter(f => f.type === 'video').length}
                </p>
                <p className="text-sm text-gray-600">Videos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500 text-white">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{getTotalSize()} MB</p>
                <p className="text-sm text-gray-600">Total Size</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
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
        </CardContent>
      </Card>

      {/* Media Files Table */}
      <Card>
        <CardHeader>
          <CardTitle>Media Files ({filteredFiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Used In</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {file.type === 'image' ? (
                        <Image
                          src={file.url}
                          alt={file.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {file.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.dimensions}</TableCell>
                  <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {file.usedIn.slice(0, 2).map((usage, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {usage}
                        </Badge>
                      ))}
                      {file.usedIn.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{file.usedIn.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewFile(file)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyFileUrl(file.url)}
                        title="Copy URL"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={file.url} download={file.name} title="Download">
                          <Download className="h-3 w-3" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="storage">
          <StorageInfo />
        </TabsContent>
      </Tabs>

      {/* View File Dialog */}
      <Dialog open={isViewingFile} onOpenChange={setIsViewingFile}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {selectedFile.type === 'image' ? (
                    <Image
                      src={selectedFile.url}
                      alt={selectedFile.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getFileIcon(selectedFile.type)}
                      <span className="ml-2 text-gray-600">{selectedFile.name}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>File Name</Label>
                    <p className="font-medium">{selectedFile.name}</p>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Badge variant="secondary" className="capitalize">
                      {selectedFile.type}
                    </Badge>
                  </div>
                  <div>
                    <Label>Size</Label>
                    <p>{selectedFile.size}</p>
                  </div>
                  <div>
                    <Label>Dimensions</Label>
                    <p>{selectedFile.dimensions}</p>
                  </div>
                  <div>
                    <Label>Upload Date</Label>
                    <p>{new Date(selectedFile.uploadDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Used In</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedFile.usedIn.map((usage: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {usage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
