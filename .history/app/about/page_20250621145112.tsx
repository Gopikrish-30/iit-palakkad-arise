"use client"

import { motion } from "framer-motion"
import { useData } from "@/lib/data-context"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Award, Target } from "lucide-react"
import { useState, useEffect } from "react"

export default function AboutPage() {
  const { aboutContent } = useData()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % aboutContent.gallery.length
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [aboutContent.gallery.length])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About Our Research Lab</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our journey of innovation, research excellence, and commitment to advancing 
              the frontiers of science and technology at IIT Palakkad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {aboutContent.history.title}
              </h2>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Calendar className="h-5 w-5 mr-2" />
                Established {aboutContent.history.startYear}
              </Badge>
            </div>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {aboutContent.history.content}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped our research lab over the years
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>
              
              {aboutContent.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2 px-8">
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Badge className="bg-blue-600 text-white">
                            {item.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {item.description}
                        </p>
                        {item.image && (
                          <div className="relative h-32 w-full rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Activities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the diverse range of activities that drive our research excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600">
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A glimpse into our research environment and activities
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={aboutContent.gallery[currentImageIndex].image}
                alt={aboutContent.gallery[currentImageIndex].caption}
                fill
                className="object-cover transition-opacity duration-1000"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-lg font-medium">
                  {aboutContent.gallery[currentImageIndex].caption}
                </p>
              </div>
            </div>
            
            {/* Gallery indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {aboutContent.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Research Scholars</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Award className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Publications</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Target className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Awards</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
