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
import { Plus, Edit, Trash2, Save, X, BookOpen, Users } from "lucide-react"

const initialCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    code: "CS 6301",
    semester: "Fall 2024",
    instructor: "Dr. Rajesh Kumar",
    credits: 3,
    students: 45,
    description: "Comprehensive introduction to machine learning algorithms, theory, and applications.",
    syllabus: ["Linear Regression", "Decision Trees", "Neural Networks"],
    prerequisites: ["Linear Algebra", "Programming"],
    textbook: "Pattern Recognition and Machine Learning by Christopher Bishop",
    schedule: "Mon, Wed, Fri 10:00-11:00 AM",
  },
]

export default function TeachingSection() {
  const [courses, setCourses] = useState(initialCourses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    semester: "",
    instructor: "",
    credits: 3,
    students: 0,
    description: "",
    syllabus: "",
    prerequisites: "",
    textbook: "",
    schedule: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      code: "",
      semester: "",
      instructor: "",
      credits: 3,
      students: 0,
      description: "",
      syllabus: "",
      prerequisites: "",
      textbook: "",
      schedule: "",
    })
  }

  const handleAdd = () => {
    const newCourse = {
      id: Date.now(),
      ...formData,
      syllabus: formData.syllabus.split(",").map((s) => s.trim()),
      prerequisites: formData.prerequisites.split(",").map((p) => p.trim()),
    }
    setCourses([...courses, newCourse])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (course: any) => {
    setEditingCourse(course)
    setFormData({
      ...course,
      syllabus: course.syllabus.join(", "),
      prerequisites: course.prerequisites.join(", "),
    })
  }

  const handleUpdate = () => {
    const updatedCourses = courses.map((c) =>
      c.id === editingCourse.id
        ? {
            ...formData,
            id: editingCourse.id,
            syllabus: formData.syllabus.split(",").map((s) => s.trim()),
            prerequisites: formData.prerequisites.split(",").map((p) => p.trim()),
          }
        : c,
    )
    setCourses(updatedCourses)
    setEditingCourse(null)
    resetForm()
  }

  const handleDelete = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Teaching Management</h2>
          <p className="text-gray-600">Manage courses and curriculum</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., CS 6301"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                    <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                    <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="students">Number of Students</Label>
                <Input
                  id="students"
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter course description"
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="syllabus">Syllabus Topics (comma-separated)</Label>
                <Textarea
                  id="syllabus"
                  value={formData.syllabus}
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  placeholder="e.g., Linear Regression, Decision Trees, Neural Networks"
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="prerequisites">Prerequisites (comma-separated)</Label>
                <Input
                  id="prerequisites"
                  value={formData.prerequisites}
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                  placeholder="e.g., Linear Algebra, Programming, Statistics"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="textbook">Textbook</Label>
                <Input
                  id="textbook"
                  value={formData.textbook}
                  onChange={(e) => setFormData({ ...formData, textbook: e.target.value })}
                  placeholder="Enter textbook information"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="e.g., Mon, Wed, Fri 10:00-11:00 AM"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Add Course
              </Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Courses ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={course.title}>
                      {course.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.code}</Badge>
                  </TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.credits}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(course)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(course.id)}
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
      {editingCourse && (
        <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code">Course Code</Label>
                <Input
                  id="edit-code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-semester">Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                    <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                    <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-instructor">Instructor</Label>
                <Input
                  id="edit-instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-credits">Credits</Label>
                <Input
                  id="edit-credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-students">Number of Students</Label>
                <Input
                  id="edit-students"
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: Number.parseInt(e.target.value) })}
                />
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
                <Label htmlFor="edit-syllabus">Syllabus Topics</Label>
                <Textarea
                  id="edit-syllabus"
                  value={formData.syllabus}
                  onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-prerequisites">Prerequisites</Label>
                <Input
                  id="edit-prerequisites"
                  value={formData.prerequisites}
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-textbook">Textbook</Label>
                <Input
                  id="edit-textbook"
                  value={formData.textbook}
                  onChange={(e) => setFormData({ ...formData, textbook: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-schedule">Schedule</Label>
                <Input
                  id="edit-schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleUpdate} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Update Course
              </Button>
              <Button variant="outline" onClick={() => setEditingCourse(null)}>
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
