"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Search, MapPin, Building, Calendar } from "lucide-react"
import Image from "next/image"
import { useData } from "@/lib/data-context"

const graduationYears = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "Earlier"]

export default function AlumniPage() {
  const { alumni } = useData()
  const [selectedYear, setSelectedYear] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlumni = alumni.filter((alumnus) => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.currentPosition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesYear = selectedYear === "All" || 
                       (selectedYear === "Earlier" && parseInt(alumnus.graduationYear) < 2019) ||
                       alumnus.graduationYear === selectedYear
    
    return matchesSearch && matchesYear
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Alumni</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proud alumni making their mark in academia, industry, and research worldwide
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alumni by name, position, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Year Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {graduationYears.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                size="sm"
                className="transition-all duration-300"
              >
                {year}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumnus, index) => (
            <motion.div
              key={alumnus.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Image
                        src={alumnus.image || "/placeholder-user.jpg"}
                        alt={alumnus.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {alumnus.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        Class of {alumnus.graduationYear}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                      {alumnus.degree}
                    </div>
                    
                    {alumnus.currentPosition && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 text-green-600" />
                        {alumnus.currentPosition}
                      </div>
                    )}
                    
                    {alumnus.company && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 text-purple-600" />
                        {alumnus.company}
                      </div>
                    )}
                    
                    {alumnus.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {alumnus.location}
                      </div>
                    )}
                  </div>

                  {alumnus.achievements && alumnus.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Notable Achievements</h4>
                      <div className="flex flex-wrap gap-1">
                        {alumnus.achievements.slice(0, 2).map((achievement, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                        {alumnus.achievements.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{alumnus.achievements.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Alumni Found</h3>
            <p className="text-gray-500">No alumni match your search criteria.</p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{alumni.length}</div>
              <div className="text-sm text-gray-600">Total Alumni</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {alumni.filter(a => a.currentPosition?.toLowerCase().includes('phd')).length}
              </div>
              <div className="text-sm text-gray-600">Pursuing PhD</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {alumni.filter(a => a.company).length}
              </div>
              <div className="text-sm text-gray-600">In Industry</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(alumni.map(a => a.graduationYear)).size}
              </div>
              <div className="text-sm text-gray-600">Graduation Years</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
