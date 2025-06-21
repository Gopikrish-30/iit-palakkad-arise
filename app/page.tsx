"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  Award,
  Microscope,
  GraduationCap,
  Mail,
  ArrowRight,
  Target,
  Eye,
  TrendingUp,
  Briefcase,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <div ref={ref}>{count}</div>
}

const quickLinks = [
  { title: "Team", icon: Users, href: "/team", description: "Meet our research team" },
  { title: "Research", icon: BookOpen, href: "/research", description: "Our research publications" },
  { title: "Facilities", icon: Microscope, href: "/facilities", description: "Lab equipment & facilities" },
  { title: "Achievements", icon: Award, href: "/achievements", description: "Awards & recognitions" },
  { title: "Teaching", icon: GraduationCap, href: "/teaching", description: "Courses & curriculum" },
  { title: "Contact", icon: Mail, href: "/contact", description: "Get in touch with us" },
]

interface Activity {
  title: string
  description: string
  image: string
}

const activities: Activity[] = [
  {
    title: "Research Excellence",
    description: "Conducting world-class research in AI, ML, and robotics",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Student Mentorship",
    description: "Guiding the next generation of researchers and innovators",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Industry Collaboration",
    description: "Partnering with industry leaders for real-world applications",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Global Outreach",
    description: "Participating in international conferences and collaborations",
    image: "/placeholder.svg?height=300&width=400"
  }
]



export default function HomePage() {
  const { homeContent, news, achievements } = useData()
  const { scrollY } = useScroll()
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const activitiesRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const announcementsRef = useRef<HTMLDivElement>(null)
  const recognitionsRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const openingsRef = useRef<HTMLDivElement>(null)

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" })
  const isActivitiesInView = useInView(activitiesRef, { once: true, margin: "-100px" })
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const isAnnouncementsInView = useInView(announcementsRef, { once: true, margin: "-100px" })
  const isRecognitionsInView = useInView(recognitionsRef, { once: true, margin: "-100px" })
  const isLinksInView = useInView(linksRef, { once: true, margin: "-100px" })
  const isOpeningsInView = useInView(openingsRef, { once: true, margin: "-100px" })

  // Auto-rotate activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % activities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroY = useTransform(scrollY, [0, 300], [0, 100])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-blue-600 overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div className="absolute inset-0" style={{ y: useTransform(scrollY, [0, 300], [0, 150]) }}>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="IIT Palakkad Campus"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
          style={{ y: heroY, scale: heroScale }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            IIT Palakkad Research Lab
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Advancing the frontiers of science and technology through innovative research
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Explore Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The AgroClima research team at IIT Palakkad studies the complex interactions between climate and water systems, focusing on extreme weather events like floods, droughts, and heatwaves caused by climate change and human activities. Their research supports disaster prediction, water resource management, and sustainability.

Using advanced tools such as GIS, AI/ML, hydrologic models, and the WRF weather model, the team analyzes high-resolution environmental data and real-time satellite imagery. Their work informs policymakers, improves climate risk assessment, and promotes sustainable solutions for water and food security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section ref={missionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving innovation and excellence in research to create meaningful impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 h-full border-0 shadow-lg bg-blue-50">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Target className="h-10 w-10 text-blue-600 mr-4" />
                    <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {homeContent.mission}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>Conduct world-class research</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>Address real-world challenges</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>Advance science and technology</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 h-full border-0 shadow-lg bg-purple-50">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Eye className="h-10 w-10 text-purple-600 mr-4" />
                    <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {homeContent.vision}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>Global recognition</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>Foster innovation</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>Nurture talent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section ref={activitiesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActivitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Activities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the diverse range of activities that drive our research excellence and innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Moving Image Display */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isActivitiesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={activities[currentActivityIndex].image}
                  alt={activities[currentActivityIndex].title}
                  fill
                  className="object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {activities[currentActivityIndex].title}
                  </h3>
                  <p className="text-gray-200">
                    {activities[currentActivityIndex].description}
                  </p>
                </div>
              </div>

              {/* Activity indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {activities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentActivityIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentActivityIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Activities List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isActivitiesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActivitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className={`p-6 rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${
                    index === currentActivityIndex
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-25'
                  }`}
                  onClick={() => setCurrentActivityIndex(index)}
                  whileHover={{ x: 5 }}
                >
                  <h4 className={`text-xl font-bold mb-2 ${
                    index === currentActivityIndex ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {activity.title}
                  </h4>
                  <p className={`${
                    index === currentActivityIndex ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {activity.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section ref={statsRef} className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-blue-200">Numbers that reflect our commitment to excellence</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 25, label: "Research Students", icon: Users },
              { number: 75, label: "Publications", icon: BookOpen },
              { number: 15, label: "Awards", icon: Award },
              { number: 10, label: "Years of Excellence", icon: TrendingUp },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="text-center"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-300" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter end={stat.number} />+
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section ref={announcementsRef} className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAnnouncementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">Latest Announcements</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stay updated with our latest news, events, and opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {news.length > 0 ? news.slice(0, 3).map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isAnnouncementsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                      {newsItem.type}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-3">{newsItem.title}</h3>
                    <p className="text-blue-100 text-sm">
                      {new Date(newsItem.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-blue-100">No announcements available. Add some in the admin panel!</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAnnouncementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/events">
                View All Events
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Recent Recognitions */}
      <section ref={recognitionsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isRecognitionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Recent Recognitions</h2>
            <p className="text-xl text-gray-600">Congratulations 👏</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.length > 0 ? achievements.slice(0, 3).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isRecognitionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-0">
                    <Badge variant="secondary" className="mb-3">
                      {achievement.type}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-sm">{achievement.year}</p>
                      <p className="text-blue-600 text-sm font-medium">{achievement.recipient}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">No recognitions available. Add some achievements in the admin panel!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section ref={linksRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLinksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Explore Our Work</h2>
            <p className="text-xl text-gray-600">Discover different aspects of our research laboratory</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isLinksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={link.href}>
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-0 text-center">
                      <motion.div className="flex justify-center mb-4" whileHover={{ rotate: 5, scale: 1.1 }}>
                        <link.icon className="h-12 w-12 text-blue-600 group-hover:text-blue-700 transition-colors" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Openings */}
      <section ref={openingsRef} className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isOpeningsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-4xl font-bold mb-6">Join Our Research Community</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Are you passionate about research and innovation? Join our team of dedicated researchers
              and contribute to cutting-edge projects that make a real impact on society.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/join-us">
                    Explore Opportunities
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                >
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
