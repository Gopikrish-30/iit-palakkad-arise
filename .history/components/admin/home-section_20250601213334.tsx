"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, X, Target, Eye } from "lucide-react"

const initialHomeContent = {
  hero: {
    title: "IIT Palakkad Research Lab",
    subtitle: "Advancing the frontiers of science and technology through innovative research",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
  },
  mission:
    "To conduct world-class research that addresses real-world challenges and contributes to the advancement of science and technology for the betterment of society.",
  vision:
    "To be a globally recognized research laboratory that fosters innovation, nurtures talent, and creates impactful solutions for tomorrow's challenges.",
  stats: [
    { label: "Research Students", value: 25 },
    { label: "Publications", value: 75 },
    { label: "Awards", value: 15 },
    { label: "Years of Excellence", value: 10 },
  ],
}

const initialNews = [
  {
    id: 1,
    title: "Dr. Smith receives NSF Grant for AI Research",
    date: "2024-01-15",
    type: "Grant",
  },
  {
    id: 2,
    title: "Paper accepted at ICML 2024",
    date: "2024-01-10",
    type: "Publication",
  },
]

export default function HomeSection() {
  const [homeContent, setHomeContent] = useState(initialHomeContent)
  const [news, setNews] = useState(initialNews)
  const [isEditingHero, setIsEditingHero] = useState(false)
  const [isEditingMission, setIsEditingMission] = useState(false)
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<any>(null)
  const [heroForm, setHeroForm] = useState(homeContent.hero)
  const [missionForm, setMissionForm] = useState({
    mission: homeContent.mission,
    vision: homeContent.vision,
  })
  const [newsForm, setNewsForm] = useState({
    title: "",
    date: "",
    type: "",
  })

  const handleUpdateHero = () => {
    setHomeContent({ ...homeContent, hero: heroForm })
    setIsEditingHero(false)
  }

  const handleUpdateMission = () => {
    setHomeContent({
      ...homeContent,
      mission: missionForm.mission,
      vision: missionForm.vision,
    })
    setIsEditingMission(false)
  }

  const handleAddNews = () => {
    const newNews = {
      id: Date.now(),
      ...newsForm,
    }
    setNews([...news, newNews])
    setNewsForm({ title: "", date: "", type: "" })
    setIsAddNewsOpen(false)
  }

  const handleEditNews = (newsItem: any) => {
    setEditingNews(newsItem)
    setNewsForm(newsItem)
  }

  const handleUpdateNews = () => {
    const updatedNews = news.map((n) => (n.id === editingNews.id ? { ...newsForm, id: editingNews.id } : n))
    setNews(updatedNews)
    setEditingNews(null)
    setNewsForm({ title: "", date: "", type: "" })
  }

  const handleDeleteNews = (id: number) => {
    setNews(news.filter((n) => n.id !== id))
  }

  const updateStat = (index: number, field: string, value: any) => {
    const newStats = [...homeContent.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setHomeContent({ ...homeContent, stats: newStats })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Home Page Management</h2>
        <p className="text-gray-600">Manage homepage content, hero section, and announcements</p>
      </div>

      {/* Hero Section Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Hero Section</span>
            <Button variant="outline" onClick={() => setIsEditingHero(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Hero
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Title</Label>
              <p className="text-gray-900">{homeContent.hero.title}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Subtitle</Label>
              <p className="text-gray-600">{homeContent.hero.subtitle}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Background Image</Label>
              <p className="text-gray-600 text-sm">{homeContent.hero.backgroundImage}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission & Vision Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Mission & Vision</span>
            <Button variant="outline" onClick={() => setIsEditingMission(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Mission & Vision
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Mission
              </Label>
              <p className="text-gray-600">{homeContent.mission}</p>
            </div>
            <div>
              <Label className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Vision
              </Label>
              <p className="text-gray-600">{homeContent.vision}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Management */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homeContent.stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <Label className="text-sm font-medium">{stat.label}</Label>
                <Input
                  type="number"
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", Number.parseInt(e.target.value))}
                  className="text-center font-bold text-lg"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent News Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent News & Recognitions</span>
            <Button onClick={() => setIsAddNewsOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add News
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((newsItem) => (
                <TableRow key={newsItem.id}>
                  <TableCell className="font-medium">{newsItem.title}</TableCell>
                  <TableCell>{new Date(newsItem.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{newsItem.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditNews(newsItem)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteNews(newsItem.id)}
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

      {/* Hero Edit Dialog */}
      <Dialog open={isEditingHero} onOpenChange={setIsEditingHero}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Hero Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-image">Background Image URL</Label>
              <Input
                id="hero-image"
                value={heroForm.backgroundImage}
                onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleUpdateHero} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Update Hero
            </Button>
            <Button variant="outline" onClick={() => setIsEditingHero(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mission & Vision Edit Dialog */}
      <Dialog open={isEditingMission} onOpenChange={setIsEditingMission}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Mission & Vision</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mission">Mission</Label>
              <Textarea
                id="mission"
                value={missionForm.mission}
                onChange={(e) => setMissionForm({ ...missionForm, mission: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Textarea
                id="vision"
                value={missionForm.vision}
                onChange={(e) => setMissionForm({ ...missionForm, vision: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleUpdateMission} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Update Mission & Vision
            </Button>
            <Button variant="outline" onClick={() => setIsEditingMission(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add News Dialog */}
      <Dialog open={isAddNewsOpen} onOpenChange={setIsAddNewsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add News Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="news-title">Title</Label>
              <Input
                id="news-title"
                value={newsForm.title}
                onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                placeholder="Enter news title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-date">Date</Label>
              <Input
                id="news-date"
                type="date"
                value={newsForm.date}
                onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-type">Type</Label>
              <Input
                id="news-type"
                value={newsForm.type}
                onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value })}
                placeholder="e.g., Grant, Publication, Award"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleAddNews} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Add News
            </Button>
            <Button variant="outline" onClick={() => setIsAddNewsOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit News Dialog */}
      {editingNews && (
        <Dialog open={!!editingNews} onOpenChange={() => setEditingNews(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit News Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-news-title">Title</Label>
                <Input
                  id="edit-news-title"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-news-date">Date</Label>
                <Input
                  id="edit-news-date"
                  type="date"
                  value={newsForm.date}
                  onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-news-type">Type</Label>
                <Input
                  id="edit-news-type"
                  value={newsForm.type}
                  onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdateNews} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update News
              </Button>
              <Button variant="outline" onClick={() => setEditingNews(null)}>
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
