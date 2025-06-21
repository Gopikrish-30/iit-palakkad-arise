"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Users, BookOpen, Microscope, Award, GraduationCap, Eye, LogOut, Phone, Settings, Image, BarChart3 } from "lucide-react"
import PeopleSection from "@/components/admin/people-section"
import PublicationsSection from "@/components/admin/publications-section"
import InstrumentsSection from "@/components/admin/instruments-section"
import AchievementsSection from "@/components/admin/achievements-section"
import TeachingSection from "@/components/admin/teaching-section"
import HomeSection from "@/components/admin/home-section"
import ContactSection from "@/components/admin/contact-section"
import SiteSettingsSection from "@/components/admin/site-settings-section"
import MediaSection from "@/components/admin/media-section"
import AnalyticsSection from "@/components/admin/analytics-section"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("home")

  const stats = [
    { label: "Total People", value: 8, icon: Users, color: "bg-blue-500" },
    { label: "Publications", value: 4, icon: BookOpen, color: "bg-green-500" },
    { label: "Instruments", value: 4, icon: Microscope, color: "bg-purple-500" },
    { label: "Achievements", value: 8, icon: Award, color: "bg-yellow-500" },
    { label: "Courses", value: 4, icon: GraduationCap, color: "bg-red-500" },
    { label: "Media Files", value: 24, icon: Image, color: "bg-indigo-500" },
    { label: "Site Views", value: 1250, icon: BarChart3, color: "bg-teal-500" },
    { label: "Contact Inquiries", value: 12, icon: Phone, color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all website content and settings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview Site
            </Button>
            <Button variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger value="people" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">People</span>
              </TabsTrigger>
              <TabsTrigger value="publications" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Publications</span>
              </TabsTrigger>
              <TabsTrigger value="instruments" className="flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                <span className="hidden sm:inline">Instruments</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="teaching" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Teaching</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <HomeSection />
            </TabsContent>

            <TabsContent value="people">
              <PeopleSection />
            </TabsContent>

            <TabsContent value="publications">
              <PublicationsSection />
            </TabsContent>

            <TabsContent value="instruments">
              <InstrumentsSection />
            </TabsContent>

            <TabsContent value="achievements">
              <AchievementsSection />
            </TabsContent>

            <TabsContent value="teaching">
              <TeachingSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
