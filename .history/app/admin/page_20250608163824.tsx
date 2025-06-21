"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Users, BookOpen, Microscope, Award, GraduationCap, Eye, LogOut, Phone, Settings, Image, Calendar, UserCheck } from "lucide-react"
import PeopleSection from "@/components/admin/people-section"
import PublicationsSection from "@/components/admin/publications-section"
import InstrumentsSection from "@/components/admin/instruments-section"
import AchievementsSection from "@/components/admin/achievements-section"
import TeachingSection from "@/components/admin/teaching-section"
import HomeSection from "@/components/admin/home-section"
import ContactSection from "@/components/admin/contact-section"
import SiteSettingsSection from "@/components/admin/site-settings-section"
import MediaSection from "@/components/admin/media-section"
import SecurityStatus from "@/components/admin/security-status"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("home")
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = () => {
    // Clear the auth cookie
    document.cookie = 'admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    // Redirect to login
    router.push('/admin/login')
  }

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { label: "Total People", value: 8, icon: Users, color: "bg-blue-500" },
    { label: "Publications", value: 4, icon: BookOpen, color: "bg-green-500" },
    { label: "Facilities", value: 4, icon: Microscope, color: "bg-purple-500" },
    { label: "Achievements", value: 8, icon: Award, color: "bg-yellow-500" },
    { label: "Courses", value: 4, icon: GraduationCap, color: "bg-red-500" },
    { label: "Events", value: 6, icon: Calendar, color: "bg-orange-500" },
    { label: "Alumni", value: 12, icon: UserCheck, color: "bg-teal-500" },
    { label: "Media Files", value: 24, icon: Image, color: "bg-indigo-500" },
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
            <Button variant="outline" asChild>
              <a href="/" target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview Site
              </a>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
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

        {/* Security Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <SecurityStatus />
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 gap-1">
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
                <span className="hidden sm:inline">Facilities</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="teaching" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Teaching</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="alumni" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Alumni</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Media</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
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

            <TabsContent value="contact">
              <ContactSection />
            </TabsContent>

            <TabsContent value="media">
              <MediaSection />
            </TabsContent>

            <TabsContent value="settings">
              <SiteSettingsSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Toaster />
    </div>
  )
}
