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
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import Image from "next/image"
import { useData } from "@/lib/data-context"

export default function InstrumentsSection() {
  const { instruments, addInstrument, updateInstrument, deleteInstrument } = useData()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingInstrument, setEditingInstrument] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
    specs: "",
    applications: "",
    details: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      image: "",
      description: "",
      specs: "",
      applications: "",
      details: "",
    })
  }

  const handleAdd = () => {
    const newInstrument = {
      ...formData,
      specs: formData.specs.split(",").map((s) => s.trim()),
      applications: formData.applications.split(",").map((a) => a.trim()),
    }
    addInstrument(newInstrument)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (instrument: any) => {
    setEditingInstrument(instrument)
    setFormData({
      ...instrument,
      specs: instrument.specs.join(", "),
      applications: instrument.applications.join(", "),
    })
  }

  const handleUpdate = () => {
    const updates = {
      ...formData,
      specs: formData.specs.split(",").map((s) => s.trim()),
      applications: formData.applications.split(",").map((a) => a.trim()),
    }
    updateInstrument(editingInstrument.id, updates)
    setEditingInstrument(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    deleteInstrument(id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facilities Management</h2>
          <p className="text-gray-600">Manage laboratory equipment and facilities</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Facility</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter instrument name"
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
                    <SelectItem value="Computing">Computing</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="Vision">Vision</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Measurement">Measurement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter brief description"
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="specs">Specifications (comma-separated)</Label>
                <Textarea
                  id="specs"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  placeholder="e.g., 256 CPU cores, 2TB RAM, 100TB storage"
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="applications">Applications (comma-separated)</Label>
                <Input
                  id="applications"
                  value={formData.applications}
                  onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                  placeholder="e.g., Machine Learning, Simulation, Data Analysis"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="details">Detailed Description</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Enter detailed description"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Add Instrument
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Instruments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Instruments ({instruments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instruments.map((instrument) => (
                <TableRow key={instrument.id}>
                  <TableCell>
                    <Image
                      src={instrument.image || "/placeholder.svg"}
                      alt={instrument.name}
                      width={60}
                      height={40}
                      className="rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{instrument.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{instrument.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={instrument.description}>
                      {instrument.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {instrument.applications.slice(0, 2).map((app, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                      {instrument.applications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{instrument.applications.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(instrument)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(instrument.id)}
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
      {editingInstrument && (
        <Dialog open={!!editingInstrument} onOpenChange={() => setEditingInstrument(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Instrument</DialogTitle>
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
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computing">Computing</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="Vision">Vision</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Measurement">Measurement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-specs">Specifications</Label>
                <Textarea
                  id="edit-specs"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-applications">Applications</Label>
                <Input
                  id="edit-applications"
                  value={formData.applications}
                  onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-details">Detailed Description</Label>
                <Textarea
                  id="edit-details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdate} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update Instrument
              </Button>
              <Button variant="outline" onClick={() => setEditingInstrument(null)}>
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
