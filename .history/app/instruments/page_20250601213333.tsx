"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Microscope, Cpu, Camera, Zap, Settings, Info } from "lucide-react"
import Image from "next/image"

const instruments = [
  {
    id: 1,
    name: "High-Performance Computing Cluster",
    category: "Computing",
    image: "/placeholder.svg?height=400&width=600",
    icon: Cpu,
    description: "State-of-the-art HPC cluster for intensive computational research",
    specs: ["256 CPU cores", "2TB RAM", "100TB storage", "InfiniBand networking"],
    applications: ["Machine Learning", "Simulation", "Data Analysis"],
    details:
      "Our HPC cluster provides researchers with the computational power needed for complex simulations, large-scale machine learning experiments, and big data analytics. The system features the latest Intel Xeon processors and NVIDIA GPUs.",
  },
  {
    id: 2,
    name: "Advanced Microscopy System",
    category: "Imaging",
    image: "/placeholder.svg?height=400&width=600",
    icon: Microscope,
    description: "High-resolution microscopy for materials and biological research",
    specs: ["Sub-nanometer resolution", "Multiple imaging modes", "Environmental control", "Real-time analysis"],
    applications: ["Materials Science", "Biology", "Nanotechnology"],
    details:
      "This advanced microscopy system enables researchers to observe and analyze materials at the atomic level, providing crucial insights for materials science and biological research.",
  },
  {
    id: 3,
    name: "Computer Vision Laboratory",
    category: "Vision",
    image: "/placeholder.svg?height=400&width=600",
    icon: Camera,
    description: "Comprehensive setup for computer vision and image processing research",
    specs: ["Multiple camera systems", "Lighting control", "Real-time processing", "3D reconstruction"],
    applications: ["Robotics", "Autonomous Systems", "Medical Imaging"],
    details:
      "Our computer vision lab is equipped with various camera systems, controlled lighting environments, and real-time processing capabilities for developing advanced vision algorithms.",
  },
  {
    id: 4,
    name: "Electronics Prototyping Lab",
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=600",
    icon: Zap,
    description: "Complete facility for electronic circuit design and testing",
    specs: ["PCB fabrication", "Component library", "Testing equipment", "3D printing"],
    applications: ["IoT Devices", "Sensors", "Embedded Systems"],
    details:
      "This lab provides all necessary tools for designing, prototyping, and testing electronic circuits and embedded systems for various research applications.",
  },
]

const categories = ["All", "Computing", "Imaging", "Vision", "Electronics"]

export default function InstrumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredInstruments =
    selectedCategory === "All"
      ? instruments
      : instruments.filter((instrument) => instrument.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Instruments & Facilities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our state-of-the-art research equipment and laboratory facilities
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Instruments Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredInstruments.map((instrument, index) => (
            <motion.div
              key={instrument.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={instrument.image || "/placeholder.svg"}
                      alt={instrument.name}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900">{instrument.category}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <instrument.icon className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-900">{instrument.name}</h3>
                    </div>

                    <p className="text-gray-600 mb-4">{instrument.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Specifications</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {instrument.specs.slice(0, 3).map((spec, idx) => (
                          <li key={idx} className="flex items-center">
                            <Settings className="h-3 w-3 mr-2 text-blue-600" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {instrument.applications.map((app, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Info className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl flex items-center gap-3">
                            <instrument.icon className="h-6 w-6 text-blue-600" />
                            {instrument.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Image
                              src={instrument.image || "/placeholder.svg"}
                              alt={instrument.name}
                              width={600}
                              height={400}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <Badge className="mb-4">{instrument.category}</Badge>
                            <p className="text-gray-600 mb-6">{instrument.details}</p>

                            <h4 className="font-semibold mb-3">Complete Specifications</h4>
                            <ul className="space-y-2 mb-6">
                              {instrument.specs.map((spec, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                  <Settings className="h-4 w-4 mr-2 text-blue-600" />
                                  {spec}
                                </li>
                              ))}
                            </ul>

                            <h4 className="font-semibold mb-3">Research Applications</h4>
                            <div className="flex flex-wrap gap-2">
                              {instrument.applications.map((app, idx) => (
                                <Badge key={idx} variant="outline">
                                  {app}
                                </Badge>
                              ))}
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
      </div>
    </div>
  )
}
