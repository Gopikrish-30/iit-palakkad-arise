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
import { Plus, Edit, Trash2, Save, X, Search, Filter, Download, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useData } from "@/lib/data-context"
import MediaBrowser from "./media-browser"

export default function PeopleSection() {
  const { people, addPerson, updatePerson, deletePerson } = useData()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isMediaBrowserOpen, setIsMediaBrowserOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "",
    email: "",
    interests: "",
    bio: "",
    image: "",
    yearOfJoining: "",
    expectedCompletion: "",
    iitProfileLink: "",
    phone: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      category: "",
      email: "",
      interests: "",
      bio: "",
      image: "",
      yearOfJoining: "",
      expectedCompletion: "",
      iitProfileLink: "",
      phone: "",
    })
  }

  const handleAdd = () => {
    const newPerson = {
      ...formData,
      interests: formData.interests.split(",").map((i) => i.trim()),
    }
    addPerson(newPerson)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (person: any) => {
    setEditingPerson(person)
    setFormData({
      ...person,
      interests: person.interests.join(", "),
    })
  }

  const handleUpdate = () => {
    const updates = {
      ...formData,
      interests: formData.interests.split(",").map((i) => i.trim())
    }
    updatePerson(editingPerson.id, updates)
    setEditingPerson(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    deletePerson(id)
  }

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || person.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const exportData = () => {
    const data = JSON.stringify(people, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'people-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">People Management</h2>
          <p className="text-gray-600">Manage faculty, students, and interns</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Person
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Person</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Research Scholars">Research Scholars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Professor, PhD Student"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="interests">Research Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  placeholder="e.g., Machine Learning, Computer Vision, AI"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Enter bio/description"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL or browse media"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsMediaBrowserOpen(true)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Add Person
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Media Browser */}
      <MediaBrowser
        isOpen={isMediaBrowserOpen}
        onClose={() => setIsMediaBrowserOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image: url })}
        fileType="image"
        title="Select Profile Image"
      />

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search people..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Faculty">Faculty</SelectItem>
                <SelectItem value="PhD">PhD Students</SelectItem>
                <SelectItem value="MS">MS Students</SelectItem>
                <SelectItem value="Interns">Interns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* People Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current People ({filteredPeople.length} of {people.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPeople.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{person.category}</Badge>
                  </TableCell>
                  <TableCell>{person.role}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {person.interests.slice(0, 2).map((interest, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {person.interests.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{person.interests.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(person)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(person.id)}
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
      {editingPerson && (
        <Dialog open={!!editingPerson} onOpenChange={() => setEditingPerson(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Person</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="PhD">PhD Student</SelectItem>
                    <SelectItem value="MS">MS Student</SelectItem>
                    <SelectItem value="Interns">Research Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-interests">Research Interests</Label>
                <Input
                  id="edit-interests"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Textarea
                  id="edit-bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL or browse media"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsMediaBrowserOpen(true)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdate} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update Person
              </Button>
              <Button variant="outline" onClick={() => setEditingPerson(null)}>
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
