"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, UserCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useData } from "@/lib/data-context"

export default function TeamPage() {
  const { people } = useData()
  
  const facultyCount = people.filter(p => p.category === "Faculty").length
  const researchScholarsCount = people.filter(p => p.category === "Research Scholars").length
  const phdCount = people.filter(p => p.role === "PhD Student").length
  const msCount = people.filter(p => p.role === "MS Student").length
  const internCount = people.filter(p => p.role === "Research Intern").length

  const teamSections = [
    {
      title: "Faculty",
      description: "Meet our distinguished faculty members who lead cutting-edge research and mentor the next generation of researchers.",
      icon: Users,
      count: facultyCount,
      href: "/team/faculty",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      title: "Research Scholars",
      description: "Our talented research scholars pursuing PhD, MS degrees, and research internships across various domains.",
      icon: GraduationCap,
      count: researchScholarsCount,
      href: "/team/research-scholars",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      subcategories: [
        { name: "PhD Students", count: phdCount },
        { name: "MS Students", count: msCount },
        { name: "Research Interns", count: internCount }
      ]
    }
  ]

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
            <h1 className="text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Meet the brilliant minds driving innovation and research excellence at IIT Palakkad. 
              Our diverse team of faculty and research scholars work together to push the boundaries 
              of science and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Team Structure</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our team organized by roles and expertise areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`${section.color} p-3 rounded-lg mr-4`}>
                        <section.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                        <p className="text-gray-600">{section.count} members</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {section.description}
                    </p>

                    {section.subcategories && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Categories:</h4>
                        <div className="space-y-2">
                          {section.subcategories.map((sub, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-gray-600">{sub.name}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                                {sub.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      asChild 
                      className={`w-full ${section.color} ${section.hoverColor} text-white`}
                    >
                      <Link href={section.href}>
                        View {section.title}
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

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Team Statistics</h2>
            <p className="text-xl text-gray-600">Our growing research community</p>
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
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{facultyCount}</div>
              <div className="text-gray-600">Faculty Members</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{phdCount}</div>
              <div className="text-gray-600">PhD Students</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{msCount}</div>
              <div className="text-gray-600">MS Students</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{internCount}</div>
              <div className="text-gray-600">Research Interns</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Interested in becoming part of our research community? 
              Explore opportunities to join our team as a student, researcher, or collaborator.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/join-us">
                Explore Opportunities
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
