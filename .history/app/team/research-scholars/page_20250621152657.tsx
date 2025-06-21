"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, ExternalLink, ArrowLeft, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useData, Person } from "@/lib/data-context"

export default function ResearchScholarsPage() {
  const { people } = useData()
  const researchScholars = people.filter(person => person.category === "Research Scholars")
  
  const phdStudents = researchScholars.filter(person => person.role === "PhD Student")
  const msStudents = researchScholars.filter(person => person.role === "MS Student")
  const researchInterns = researchScholars.filter(person => person.role === "Research Intern")

  const ScholarCard = ({ person, index }: { person: Person, index: number }) => (
    <motion.div
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
              width={300}
              height={250}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-4">
            <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-800">
              {person.role}
            </Badge>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{person.name}</h3>
            
            {/* Academic Info */}
            <div className="space-y-1 mb-3 text-sm text-gray-600">
              {person.yearOfJoining && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined: {person.yearOfJoining}
                </div>
              )}
              {person.expectedCompletion && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Expected: {person.expectedCompletion}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {person.interests.slice(0, 2).map((interest: string, idx: number) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {person.interests.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{person.interests.length - 2} more
                </Badge>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  View Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{person.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-3">
                      <Badge className="bg-purple-600 text-white">
                        {person.role}
                      </Badge>
                      
                      {/* Academic Timeline */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Academic Timeline</h4>
                        <div className="space-y-2 text-sm">
                          {person.yearOfJoining && (
                            <div className="flex justify-between">
                              <span>Year of Joining:</span>
                              <span className="font-medium">{person.yearOfJoining}</span>
                            </div>
                          )}
                          {person.expectedCompletion && (
                            <div className="flex justify-between">
                              <span>Expected Completion:</span>
                              <span className="font-medium">{person.expectedCompletion}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" asChild className="w-full">
                          <a href={`mailto:${person.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            {person.email}
                          </a>
                        </Button>
                        {person.phone && (
                          <Button size="sm" variant="outline" asChild className="w-full">
                            <a href={`tel:${person.phone}`}>
                              <Phone className="h-4 w-4 mr-2" />
                              {person.phone}
                            </a>
                          </Button>
                        )}
                        {person.iitProfileLink && (
                          <Button size="sm" variant="outline" asChild className="w-full">
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {person.interests.map((interest: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    
                    <h4 className="font-bold text-lg mb-3">About</h4>
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
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/team" className="inline-flex items-center text-purple-100 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Link>
            <h1 className="text-5xl font-bold mb-4">Research Scholars</h1>
            <p className="text-xl max-w-3xl leading-relaxed">
              Meet our talented research scholars pursuing PhD, MS degrees, and research internships 
              across various domains at IIT Palakkad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Scholars Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Research Community</h2>
            <p className="text-xl text-gray-600">
              {researchScholars.length} dedicated researchers advancing the frontiers of knowledge
            </p>
          </motion.div>

          <Tabs defaultValue="phd" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="phd">PhD Students ({phdStudents.length})</TabsTrigger>
              <TabsTrigger value="ms">MS Students ({msStudents.length})</TabsTrigger>
              <TabsTrigger value="interns">Interns ({researchInterns.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="phd">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">PhD Students</h3>
                <p className="text-gray-600">
                  Doctoral candidates conducting advanced research in their specialized fields
                </p>
              </div>
              {phdStudents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No PhD students found.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {phdStudents.map((person, index) => (
                    <ScholarCard key={person.id} person={person} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="ms">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">MS Students</h3>
                <p className="text-gray-600">
                  Master's students engaged in research-oriented programs
                </p>
              </div>
              {msStudents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No MS students found.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {msStudents.map((person, index) => (
                    <ScholarCard key={person.id} person={person} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="interns">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Research Interns</h3>
                <p className="text-gray-600">
                  Undergraduate and graduate interns gaining hands-on research experience
                </p>
              </div>
              {researchInterns.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No research interns found.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {researchInterns.map((person, index) => (
                    <ScholarCard key={person.id} person={person} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Interested in pursuing research with us? Explore opportunities for PhD, MS, and internship programs.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Link href="/join-us">Apply Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
