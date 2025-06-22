"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, Save, X, Star, FileText, LinkIcon } from "lucide-react"
import { useData } from "@/lib/data-context"

export default function PublicationsSection() {
  const { publications, addPublication, updatePublication, deletePublication } = useData()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPublication, setEditingPublication] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: new Date().getFullYear(),
    type: "",
    doi: "",
    featured: false,
    abstract: "",
    paperUrl: "",
    codeUrl: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      journal: "",
      year: new Date().getFullYear(),
      type: "",
      doi: "",
      featured: false,
      abstract: "",
      paperUrl: "",
      codeUrl: "",
    })
  }

  const handleAdd = () => {
    // Basic validation
    if (!formData.title.trim() || !formData.authors.trim() || !formData.journal.trim() || !formData.type) {
      alert("Please fill in all required fields (Title, Authors, Journal/Conference, and Type)")
      return
    }

    const newPublication = {
      ...formData,
      authors: formData.authors.split(",").map((a) => a.trim()),
    }
    addPublication(newPublication)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (publication: any) => {
    setEditingPublication(publication)
    setFormData({
      ...publication,
      authors: publication.authors.join(", "),
    })
  }

  const handleUpdate = () => {
    const updates = {
      ...formData,
      authors: formData.authors.split(",").map((a) => a.trim())
    }
    updatePublication(editingPublication.id, updates)
    setEditingPublication(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    deletePublication(id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Publications Management</h2>
          <p className="text-gray-600">Manage research papers and publications</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Publication</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter publication title"
                  required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="authors">Authors (comma-separated) <span className="text-red-500">*</span></Label>
                <Input
                  id="authors"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="e.g., Dr. John Doe, Jane Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="journal">Journal/Conference <span className="text-red-500">*</span></Label>
                <Input
                  id="journal"
                  value={formData.journal}
                  onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                  placeholder="Enter journal or conference name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="event">Workshop/Event</SelectItem>
                    <SelectItem value="book-chapter">Book Chapter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doi">DOI</Label>
                <Input
                  id="doi"
                  value={formData.doi}
                  onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                  placeholder="Enter DOI"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="paperUrl">Paper URL</Label>
                <Input
                  id="paperUrl"
                  value={formData.paperUrl}
                  onChange={(e) => setFormData({ ...formData, paperUrl: e.target.value })}
                  placeholder="Enter URL to the paper PDF"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="codeUrl">Code URL (optional)</Label>
                <Input
                  id="codeUrl"
                  value={formData.codeUrl}
                  onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
                  placeholder="Enter URL to code repository"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Enter abstract"
                  rows={4}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                />
                <Label htmlFor="featured">Featured Publication</Label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Add Publication
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Publications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Publications ({publications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((publication) => (
                <TableRow key={publication.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={publication.title}>
                      {publication.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {publication.authors.slice(0, 2).join(", ")}
                      {publication.authors.length > 2 && ` +${publication.authors.length - 2} more`}
                    </div>
                  </TableCell>
                  <TableCell>{publication.journal}</TableCell>
                  <TableCell>{publication.year}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{publication.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {publication.paperUrl && <FileText className="h-4 w-4 text-blue-500" />}
                      {publication.codeUrl && <LinkIcon className="h-4 w-4 text-green-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    {publication.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(publication)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(publication.id)}
                        className="text-red-600 hover:text-red-700"
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

      {/* Edit Dialog */}
      {editingPublication && (
        <Dialog open={!!editingPublication} onOpenChange={() => setEditingPublication(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Publication</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-authors">Authors</Label>
                <Input
                  id="edit-authors"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-journal">Journal/Conference</Label>
                <Input
                  id="edit-journal"
                  value={formData.journal}
                  onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="event">Workshop/Event</SelectItem>
                    <SelectItem value="book-chapter">Book Chapter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-doi">DOI</Label>
                <Input
                  id="edit-doi"
                  value={formData.doi}
                  onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-paperUrl">Paper URL</Label>
                <Input
                  id="edit-paperUrl"
                  value={formData.paperUrl}
                  onChange={(e) => setFormData({ ...formData, paperUrl: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-codeUrl">Code URL (optional)</Label>
                <Input
                  id="edit-codeUrl"
                  value={formData.codeUrl}
                  onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-abstract">Abstract</Label>
                <Textarea
                  id="edit-abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Checkbox
                  id="edit-featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                />
                <Label htmlFor="edit-featured">Featured Publication</Label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdate} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update Publication
              </Button>
              <Button variant="outline" onClick={() => setEditingPublication(null)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
