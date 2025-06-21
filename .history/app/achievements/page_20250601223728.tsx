"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Trophy, Star, Gift, Presentation, FileText, Calendar } from "lucide-react"
import { useData } from "@/lib/data-context"

// Icon mapping for achievements
const iconMap: Record<string, any> = {
  Award: Trophy,
  DollarSign: Gift,
  Star: Star,
  FileText: FileText,
  Presentation: Presentation,
  Trophy: Trophy,
}

const types = ["All", "Award", "Grant", "Recognition", "Publication", "Talk", "Patent"]

export default function AchievementsPage() {
  const { achievements } = useData()
  const [selectedType, setSelectedType] = useState("All")

  const filteredAchievements =
    selectedType === "All" ? achievements : achievements.filter((achievement) => achievement.type === selectedType)

  const groupedByYear = filteredAchievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.year]) {
        acc[achievement.year] = []
      }
      acc[achievement.year].push(achievement)
      return acc
    },
    {} as Record<number, typeof achievements>,
  )

  const years = Object.keys(groupedByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Achievements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our milestones, awards, and recognition in research excellence
          </p>
        </motion.div>

        {/* Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {types.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="transition-all duration-300"
            >
              {type}
            </Button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" />

          {years.map((year, yearIndex) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: yearIndex * 0.1 }}
              className="mb-12"
            >
              {/* Year Header */}
              <div className="flex items-center mb-8">
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-lg relative z-10">
                  {year}
                </div>
                <div className="md:hidden">
                  <Badge className="text-lg px-4 py-2 bg-blue-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {year}
                  </Badge>
                </div>
                <div className="hidden md:block flex-1 h-0.5 bg-gray-300 ml-4" />
              </div>

              {/* Achievements for this year */}
              <div className="md:ml-24 space-y-6">
                {groupedByYear[Number.parseInt(year)].map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: yearIndex * 0.1 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${achievement.color} text-white flex-shrink-0`}>
                            {React.createElement(iconMap[achievement.icon] || Trophy, { className: "h-6 w-6" })}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="secondary">{achievement.type}</Badge>
                              <span className="text-sm text-gray-500">{achievement.year}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                            <p className="text-gray-600 mb-3">{achievement.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Award className="h-4 w-4 mr-2" />
                              <span>{achievement.recipient}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No achievements found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
