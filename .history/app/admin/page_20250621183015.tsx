"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Users, BookOpen, Microscope, Award, Eye, LogOut, Phone, Image, Calendar, Info } from "lucide-react"
import PeopleSection from "@/components/admin/people-section"
import PublicationsSection from "@/components/admin/publications-section"
import InstrumentsSection from "@/components/admin/instruments-section"
import AchievementsSection from "@/components/admin/achievements-section"
import HomeSection from "@/components/admin/home-section"
import ContactSection from "@/components/admin/contact-section"
import MediaSection from "@/components/admin/media-section"
import EventsSection from "@/components/admin/events-section"
import AboutSection from "@/components/admin/about-section"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("home")
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always redirect to login, even if logout API fails
      router.push('/admin/login')
    }
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



        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              <TabsTrigger value="people" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="publications" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Research</span>
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
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Media</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home">
              <HomeSection />
            </TabsContent>

            <TabsContent value="about">
              <AboutSection />
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

            <TabsContent value="events">
              <EventsSection />
            </TabsContent>

            <TabsContent value="contact">
              <ContactSection />
            </TabsContent>

            <TabsContent value="media">
              <MediaSection />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Toaster />
    </div>
  )
}
