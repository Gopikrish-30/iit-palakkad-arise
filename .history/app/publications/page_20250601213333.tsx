"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, FileText, Quote, Calendar, Users, Download, LinkIcon } from "lucide-react"

const publications = [
  {
    id: 1,
    title: "Deep Learning Approaches for Autonomous Vehicle Navigation",
    authors: ["Dr. Rajesh Kumar", "Priya Sharma", "Arjun Patel"],
    journal: "IEEE Transactions on Intelligent Transportation Systems",
    year: 2024,
    type: "Journal",
    doi: "10.1109/TITS.2024.1234567",
    featured: true,
    abstract:
      "This paper presents novel deep learning approaches for autonomous vehicle navigation in complex urban environments.",
    paperUrl: "https://example.com/paper1.pdf",
    codeUrl: "https://github.com/example/autonomous-navigation",
  },
  {
    id: 2,
    title: "Multilingual Natural Language Processing with Transformer Models",
    authors: ["Priya Sharma", "Dr. Rajesh Kumar"],
    journal: "ACL 2024",
    year: 2024,
    type: "Conference",
    doi: "10.18653/v1/2024.acl-long.123",
    featured: false,
    abstract: "We propose a new architecture for multilingual NLP tasks using advanced transformer models.",
    paperUrl: "https://example.com/paper2.pdf",
    codeUrl: "https://github.com/example/multilingual-nlp",
  },
  {
    id: 3,
    title: "Computer Vision for Medical Image Analysis",
    authors: ["Dr. Rajesh Kumar", "Sarah Johnson"],
    journal: "Medical Image Analysis",
    year: 2023,
    type: "Journal",
    doi: "10.1016/j.media.2023.102789",
    featured: true,
    abstract: "A comprehensive study on applying computer vision techniques to medical image analysis.",
    paperUrl: "https://example.com/paper3.pdf",
  },
  {
    id: 4,
    title: "Robotics and Human-Robot Interaction",
    authors: ["Arjun Patel", "Dr. Rajesh Kumar"],
    journal: "ICRA 2023",
    year: 2023,
    type: "Conference",
    doi: "10.1109/ICRA.2023.1234567",
    featured: false,
    abstract: "Exploring new paradigms in human-robot interaction for collaborative tasks.",
    paperUrl: "https://example.com/paper4.pdf",
    codeUrl: "https://github.com/example/human-robot-interaction",
  },
]

const years = ["All", "2024", "2023", "2022", "2021"]
const types = ["All", "Journal", "Conference", "Workshop"]

export default function PublicationsPage() {
  const [selectedYear, setSelectedYear] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPaper, setSelectedPaper] = useState<any>(null)

  const pageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(pageRef, { once: true, margin: "-100px" })

  const filteredPublications = publications.filter((pub) => {
    const matchesYear = selectedYear === "All" || pub.year.toString() === selectedYear
    const matchesType = selectedType === "All" || pub.type === selectedType
    const matchesSearch =
      searchTerm === "" ||
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesYear && matchesType && matchesSearch
  })

  const handleCiteClick = (publication: any) => {
    setSelectedPaper(publication)
  }

  const generateCitation = (pub: any) => {
    return `${pub.authors.join(", ")}. (${pub.year}). ${pub.title}. ${pub.journal}. DOI: ${pub.doi}`
  }

  const downloadCitation = (pub: any, format: string) => {
    const citation = generateCitation(pub)
    const element = document.createElement("a")

    let content = ""
    let filename = ""

    if (format === "bibtex") {
      content = `@article{${pub.authors[0].split(" ")[1].toLowerCase()}${pub.year},
  title={${pub.title}},
  author={${pub.authors.join(" and ")}},
  journal={${pub.journal}},
  year={${pub.year}},
  doi={${pub.doi}}
}`
      filename = `citation-${pub.id}.bib`
    } else {
      content = citation
      filename = `citation-${pub.id}.txt`
    }

    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Publications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our research contributions and scientific publications
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <Input
            placeholder="Search publications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className={`hover:shadow-lg transition-all duration-300 ${publication.featured ? "ring-2 ring-blue-200" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{publication.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant={publication.featured ? "default" : "secondary"}>{publication.type}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {publication.year}
                            </Badge>
                            {publication.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Authors:</span>
                        </div>
                        <p className="text-gray-600">{publication.authors.join(", ")}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-800 font-medium mb-1">{publication.journal}</p>
                        <p className="text-gray-600 text-sm">{publication.abstract}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      {publication.paperUrl && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={publication.paperUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Paper
                          </a>
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleCiteClick(publication)}
                      >
                        <Quote className="h-4 w-4 mr-2" />
                        Cite
                      </Button>

                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          DOI
                        </a>
                      </Button>

                      {publication.codeUrl && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={publication.codeUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </motion.div>
        )}

        {/* Citation Dialog */}
        {selectedPaper && (
          <Dialog open={!!selectedPaper} onOpenChange={() => setSelectedPaper(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Citation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-sm font-mono">{generateCitation(selectedPaper)}</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => downloadCitation(selectedPaper, "text")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download as Text
                  </Button>
                  <Button variant="outline" onClick={() => downloadCitation(selectedPaper, "bibtex")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download as BibTeX
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
