"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, Award, ArrowRight, FileText, Presentation, Book, Globe } from "lucide-react"
import Link from "next/link"
import { useData } from "@/lib/data-context"

export default function ResearchPage() {
  const { publications } = useData()
  
  const journalPapers = publications.filter(p => p.type === "journal")
  const conferencePapers = publications.filter(p => p.type === "conference")
  const bookChapters = publications.filter(p => p.type === "book-chapter")
  const eventPapers = publications.filter(p => p.type === "event")

  const researchCategories = [
    {
      title: "Journals",
      description: "Peer-reviewed journal publications showcasing our fundamental research contributions and scientific discoveries.",
      icon: FileText,
      count: journalPapers.length,
      href: "/research/journals",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      featured: journalPapers.filter(p => p.featured).length
    },
    {
      title: "Conference",
      description: "Conference papers presenting our latest research findings and innovations at prestigious international venues.",
      icon: Presentation,
      count: conferencePapers.length,
      href: "/research/conference",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      featured: conferencePapers.filter(p => p.featured).length
    },
    {
      title: "Book Chapter",
      description: "Comprehensive book chapters contributing to the broader scientific literature and knowledge dissemination.",
      icon: Book,
      count: bookChapters.length,
      href: "/research/book-chapter",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      featured: bookChapters.filter(p => p.featured).length
    },
    {
      title: "Events",
      description: "Research presentations, workshops, and symposiums where we share our work with the scientific community.",
      icon: Globe,
      count: eventPapers.length,
      href: "/research/events",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      featured: eventPapers.filter(p => p.featured).length
    }
  ]

  const recentPublications = publications
    .sort((a, b) => b.year - a.year)
    .slice(0, 3)

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
            <h1 className="text-5xl font-bold mb-6">Research Publications</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive research portfolio spanning journals, conferences, 
              book chapters, and events. Discover the cutting-edge work that drives innovation 
              and advances scientific knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our research publications organized by type and venue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${category.color} p-3 rounded-lg mr-3`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600 text-sm">{category.count} publications</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="text-xs">
                        {category.featured} featured
                      </Badge>
                    </div>

                    <Button 
                      asChild 
                      className={`w-full ${category.color} ${category.hoverColor} text-white`}
                    >
                      <Link href={category.href}>
                        View {category.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Publications</h2>
            <p className="text-xl text-gray-600">Our latest research contributions</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentPublications.map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <FileText className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {publication.type}
                        </Badge>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {publication.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {publication.authors.slice(0, 3).join(", ")}
                      {publication.authors.length > 3 && " et al."}
                    </p>
                    
                    <p className="text-gray-800 font-medium text-sm mb-3">
                      {publication.journal}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {publication.year}
                      </Badge>
                      {publication.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/research/journals">
                View All Publications
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Research Stats */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Impact</h2>
            <p className="text-xl text-gray-600">Our contribution to the scientific community</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{publications.length}</div>
              <div className="text-gray-600">Total Publications</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {publications.filter(p => p.featured).length}
              </div>
              <div className="text-gray-600">Featured Papers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {new Set(publications.flatMap(p => p.authors)).size}
              </div>
              <div className="text-gray-600">Collaborators</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {new Date().getFullYear() - Math.min(...publications.map(p => p.year)) + 1}
              </div>
              <div className="text-gray-600">Years Active</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Collaborate With Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Interested in research collaboration or want to learn more about our work? 
              Get in touch with our research team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
