"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Phone, ExternalLink, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useData } from "@/lib/data-context"

export default function FacultyPage() {
  const { people } = useData()
  const faculty = people.filter(person => person.category === "Faculty")

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/team" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Link>
            <h1 className="text-5xl font-bold mb-4">Faculty Members</h1>
            <p className="text-xl max-w-3xl leading-relaxed">
              Meet our distinguished faculty members who lead cutting-edge research and mentor 
              the next generation of researchers at IIT Palakkad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Faculty</h2>
            <p className="text-xl text-gray-600">
              {faculty.length} distinguished faculty members leading research excellence
            </p>
          </motion.div>

          {faculty.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No faculty members found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faculty.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={person.image || "/placeholder.svg"}
                          alt={person.name}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-6">
                        <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
                          {person.role}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{person.name}</h3>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {person.interests.slice(0, 3).map((interest, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {person.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{person.interests.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {person.bio}
                        </p>

                        <div className="flex gap-2 mb-4">
                          <Button size="sm" variant="outline" asChild>
                            <a href={`mailto:${person.email}`}>
                              <Mail className="h-4 w-4 mr-1" />
                              Email
                            </a>
                          </Button>
                          {person.phone && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={`tel:${person.phone}`}>
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </a>
                            </Button>
                          )}
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-3xl">{person.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                <Image
                                  src={person.image || "/placeholder.svg"}
                                  alt={person.name}
                                  width={400}
                                  height={400}
                                  className="w-full h-80 object-cover rounded-lg"
                                />
                                <div className="mt-4 space-y-3">
                                  <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
                                    {person.role}
                                  </Badge>
                                  <div className="flex flex-col gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={`mailto:${person.email}`}>
                                        <Mail className="h-4 w-4 mr-2" />
                                        {person.email}
                                      </a>
                                    </Button>
                                    {person.phone && (
                                      <Button size="sm" variant="outline" asChild>
                                        <a href={`tel:${person.phone}`}>
                                          <Phone className="h-4 w-4 mr-2" />
                                          {person.phone}
                                        </a>
                                      </Button>
                                    )}
                                    {person.iitProfileLink && (
                                      <Button size="sm" variant="outline" asChild>
                                        <a href={person.iitProfileLink} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-4 w-4 mr-2" />
                                          IIT Profile
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-bold text-lg mb-3">Research Interests</h4>
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {person.interests.map((interest, idx) => (
                                    <Badge key={idx} variant="outline" className="text-sm">
                                      {interest}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <h4 className="font-bold text-lg mb-3">Biography</h4>
                                <p className="text-gray-700 leading-relaxed">
                                  {person.bio}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
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
            <h2 className="text-3xl font-bold mb-4">Interested in Collaboration?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our faculty members are always open to research collaborations and partnerships. 
              Reach out to explore opportunities.
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
                <Link href="/research">View Research</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
