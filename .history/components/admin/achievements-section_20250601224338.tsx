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
import { Plus, Edit, Trash2, Save, X, Trophy, Award, Star, Gift, Presentation, FileText } from "lucide-react"
import { useData } from "@/lib/data-context"

const iconMap = {
  Award: Award,
  Trophy: Trophy,
  Star: Star,
  Gift: Gift,
  Presentation: Presentation,
  FileText: FileText,
}

export default function AchievementsSection() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<any>(null)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    type: "",
    title: "",
    description: "",
    recipient: "",
    icon: "",
    color: "",
  })

  const resetForm = () => {
    setFormData({
      year: new Date().getFullYear(),
      type: "",
      title: "",
      description: "",
      recipient: "",
      icon: "",
      color: "",
    })
  }

  const handleAdd = () => {
    addAchievement(formData)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (achievement: any) => {
    setEditingAchievement(achievement)
    setFormData(achievement)
  }

  const handleUpdate = () => {
    updateAchievement(editingAchievement.id, formData)
    setEditingAchievement(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    deleteAchievement(id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Achievements Management</h2>
          <p className="text-gray-600">Manage awards, recognitions, and milestones</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Achievement</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="Award">Award</SelectItem>
                    <SelectItem value="Grant">Grant</SelectItem>
                    <SelectItem value="Recognition">Recognition</SelectItem>
                    <SelectItem value="Publication">Publication</SelectItem>
                    <SelectItem value="Talk">Talk</SelectItem>
                    <SelectItem value="Patent">Patent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter achievement title"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  placeholder="Enter recipient name(s)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trophy">Trophy</SelectItem>
                    <SelectItem value="Award">Award</SelectItem>
                    <SelectItem value="Star">Star</SelectItem>
                    <SelectItem value="Gift">Gift</SelectItem>
                    <SelectItem value="Presentation">Presentation</SelectItem>
                    <SelectItem value="FileText">FileText</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                    <SelectItem value="bg-green-500">Green</SelectItem>
                    <SelectItem value="bg-blue-500">Blue</SelectItem>
                    <SelectItem value="bg-purple-500">Purple</SelectItem>
                    <SelectItem value="bg-red-500">Red</SelectItem>
                    <SelectItem value="bg-indigo-500">Indigo</SelectItem>
                    <SelectItem value="bg-pink-500">Pink</SelectItem>
                    <SelectItem value="bg-teal-500">Teal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Achievements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Achievements ({achievements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((achievement) => {
                const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award
                return (
                  <TableRow key={achievement.id}>
                    <TableCell>{achievement.year}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{achievement.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate" title={achievement.title}>
                        {achievement.title}
                      </div>
                    </TableCell>
                    <TableCell>{achievement.recipient}</TableCell>
                    <TableCell>
                      <div className={`inline-flex p-2 rounded-full ${achievement.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(achievement)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(achievement.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingAchievement && (
        <Dialog open={!!editingAchievement} onOpenChange={() => setEditingAchievement(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Achievement</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="Award">Award</SelectItem>
                    <SelectItem value="Grant">Grant</SelectItem>
                    <SelectItem value="Recognition">Recognition</SelectItem>
                    <SelectItem value="Publication">Publication</SelectItem>
                    <SelectItem value="Talk">Talk</SelectItem>
                    <SelectItem value="Patent">Patent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-recipient">Recipient</Label>
                <Input
                  id="edit-recipient"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trophy">Trophy</SelectItem>
                    <SelectItem value="Award">Award</SelectItem>
                    <SelectItem value="Star">Star</SelectItem>
                    <SelectItem value="Gift">Gift</SelectItem>
                    <SelectItem value="Presentation">Presentation</SelectItem>
                    <SelectItem value="FileText">FileText</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-color">Color</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                    <SelectItem value="bg-green-500">Green</SelectItem>
                    <SelectItem value="bg-blue-500">Blue</SelectItem>
                    <SelectItem value="bg-purple-500">Purple</SelectItem>
                    <SelectItem value="bg-red-500">Red</SelectItem>
                    <SelectItem value="bg-indigo-500">Indigo</SelectItem>
                    <SelectItem value="bg-pink-500">Pink</SelectItem>
                    <SelectItem value="bg-teal-500">Teal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdate} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update Achievement
              </Button>
              <Button variant="outline" onClick={() => setEditingAchievement(null)}>
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
