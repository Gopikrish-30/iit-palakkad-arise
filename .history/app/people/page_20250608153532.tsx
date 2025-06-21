"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail } from "lucide-react"
import Image from "next/image"
import { useData } from "@/lib/data-context"



const categories = [
  { name: "Faculty", title: "Faculty Members" },
  { name: "PhD", title: "PhD Scho" },
  { name: "MS", title: "MS Students" },
  { name: "Interns", title: "Research Interns" },
]

export default function PeoplePage() {
  const { people } = useData()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the brilliant minds driving innovation and research at our laboratory
          </p>
        </motion.div>

        {/* People Sections */}
        {categories.map((category, categoryIndex) => {
          const categoryPeople = people.filter((person) => person.category === category.name)

          if (categoryPeople.length === 0) return null

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category.title}</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryPeople.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <Image
                            src={person.image || "/placeholder.svg"}
                            alt={person.name}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6">
                          <Badge variant="secondary" className="mb-2">
                            {person.role}
                          </Badge>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{person.name}</h3>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {person.interests.slice(0, 2).map((interest, idx) => (
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
                              <Button variant="outline" className="w-full">
                                View More
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{person.name}</DialogTitle>
                              </DialogHeader>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <Image
                                    src={person.image || "/placeholder.svg"}
                                    alt={person.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />
                                </div>
                                <div>
                                  <Badge className="mb-4">{person.role}</Badge>
                                  <h4 className="font-semibold mb-2">Research Interests</h4>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {person.interests.map((interest, idx) => (
                                      <Badge key={idx} variant="outline">
                                        {interest}
                                      </Badge>
                                    ))}
                                  </div>
                                  <h4 className="font-semibold mb-2">Bio</h4>
                                  <p className="text-gray-600 mb-4">{person.bio}</p>

                                  <div className="flex gap-3">
                                    <Button size="sm" variant="outline">
                                      <Mail className="h-4 w-4 mr-2" />
                                      Email
                                    </Button>
                                  </div>
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
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
