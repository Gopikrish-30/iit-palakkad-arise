"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, X, Calendar, Image as ImageIcon, History } from "lucide-react"
import { useData } from "@/lib/data-context"
import { useToast } from "@/components/ui/use-toast"

export default function AboutSection() {
  const { aboutContent, updateAboutContent } = useData()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [editingType, setEditingType] = useState<'timeline' | 'activity' | 'gallery' | null>(null)

  const [formData, setFormData] = useState({
    history: aboutContent.history,
    timeline: [...aboutContent.timeline],
    activities: [...aboutContent.activities],
    gallery: [...aboutContent.gallery]
  })

  const handleSave = () => {
    updateAboutContent(formData)
    setIsEditing(false)
    toast({
      title: "Success",
      description: "About content updated successfully",
    })
  }

  const handleCancel = () => {
    setFormData({
      history: aboutContent.history,
      timeline: [...aboutContent.timeline],
      activities: [...aboutContent.activities],
      gallery: [...aboutContent.gallery]
    })
    setIsEditing(false)
  }

  const addTimelineItem = () => {
    const newItem = {
      year: new Date().getFullYear().toString(),
      title: "New Milestone",
      description: "Description of the milestone",
      image: "/placeholder.svg?height=200&width=300"
    }
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, newItem]
    }))
  }

  const addActivity = () => {
    const newActivity = {
      title: "New Activity",
      description: "Description of the activity",
      image: "/placeholder.svg?height=300&width=400"
    }
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }))
  }

  const addGalleryItem = () => {
    const newItem = {
      image: "/placeholder.svg?height=400&width=600",
      caption: "New gallery image"
    }
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, newItem]
    }))
  }

  const removeItem = (type: 'timeline' | 'activities' | 'gallery', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const updateItem = (type: 'timeline' | 'activities' | 'gallery', index: number, updates: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => i === index ? { ...item, ...updates } : item)
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">About Page Management</h2>
          <p className="text-gray-600 mt-2">Manage the about page content, history, photo gallery, and activities</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="timeline">Photo Gallery</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Lab History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="history-title">Title</Label>
                <Input
                  id="history-title"
                  value={formData.history.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    history: { ...prev.history, title: e.target.value }
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="start-year">Start Year</Label>
                <Input
                  id="start-year"
                  value={formData.history.startYear}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    history: { ...prev.history, startYear: e.target.value }
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="history-content">Content</Label>
                <Textarea
                  id="history-content"
                  value={formData.history.content}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    history: { ...prev.history, content: e.target.value }
                  }))}
                  disabled={!isEditing}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline ({formData.timeline.length} items)
                </div>
                {isEditing && (
                  <Button onClick={addTimelineItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.timeline.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{item.year}</Badge>
                      {isEditing && (
                        <Button
                          onClick={() => removeItem('timeline', index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={item.year}
                          onChange={(e) => updateItem('timeline', index, { year: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateItem('timeline', index, { title: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateItem('timeline', index, { description: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Image URL</Label>
                        <Input
                          value={item.image || ''}
                          onChange={(e) => updateItem('timeline', index, { image: e.target.value })}
                          disabled={!isEditing}
                          placeholder="/placeholder.svg?height=200&width=300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Activities ({formData.activities.length} items)
                </div>
                {isEditing && (
                  <Button onClick={addActivity} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.activities.map((activity, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{activity.title}</h4>
                      {isEditing && (
                        <Button
                          onClick={() => removeItem('activities', index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={activity.title}
                          onChange={(e) => updateItem('activities', index, { title: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={activity.description}
                          onChange={(e) => updateItem('activities', index, { description: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={activity.image}
                          onChange={(e) => updateItem('activities', index, { image: e.target.value })}
                          disabled={!isEditing}
                          placeholder="/placeholder.svg?height=300&width=400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Gallery ({formData.gallery.length} images)
                </div>
                {isEditing && (
                  <Button onClick={addGalleryItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.gallery.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm">Image {index + 1}</h4>
                      {isEditing && (
                        <Button
                          onClick={() => removeItem('gallery', index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={item.image}
                          onChange={(e) => updateItem('gallery', index, { image: e.target.value })}
                          disabled={!isEditing}
                          placeholder="/placeholder.svg?height=400&width=600"
                        />
                      </div>
                      <div>
                        <Label>Caption</Label>
                        <Input
                          value={item.caption}
                          onChange={(e) => updateItem('gallery', index, { caption: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
