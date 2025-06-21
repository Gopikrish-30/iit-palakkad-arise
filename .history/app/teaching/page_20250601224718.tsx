"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, BookOpen, Download, Calendar, Clock, Users } from "lucide-react"

export default function TeachingPage() {
  const { courses } = useData()
  const [openCourse, setOpenCourse] = useState<number | null>(null)

  const toggleCourse = (courseId: number) => {
    setOpenCourse(openCourse === courseId ? null : courseId)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Teaching</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive curriculum and courses offered by our faculty
          </p>
        </motion.div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <Collapsible open={openCourse === course.id} onOpenChange={() => toggleCourse(course.id)}>
                  <CollapsibleTrigger asChild>
                    <CardContent className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                            <Badge variant="outline">{course.code}</Badge>
                          </div>

                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              {course.semester}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-2" />
                              {course.students} students
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {course.credits} credits
                            </div>
                            <div className="text-sm text-gray-600">Instructor: {course.instructor}</div>
                          </div>

                          <p className="text-gray-600">{course.description}</p>
                        </div>

                        <div className="ml-4">
                          {openCourse === course.id ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-6 pb-6 border-t bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-8 pt-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Course Syllabus</h4>
                          <ul className="space-y-2">
                            {course.syllabus.map((topic, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-600">
                                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
                            <div className="flex flex-wrap gap-2">
                              {course.prerequisites.map((prereq, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Schedule</h4>
                            <p className="text-sm text-gray-600">{course.schedule}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Textbook</h4>
                            <p className="text-sm text-gray-600">{course.textbook}</p>
                          </div>

                          <div className="flex gap-3">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Syllabus PDF
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Course Materials
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
