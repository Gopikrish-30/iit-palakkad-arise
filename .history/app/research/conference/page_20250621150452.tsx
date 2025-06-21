"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, FileText, Quote, Calendar, Users, Download, LinkIcon, ArrowLeft, Presentation } from "lucide-react"
import Link from "next/link"
import { useData } from "@/lib/data-context"

export default function ConferencePage() {
  const { publications } = useData()
  const [selectedYear, setSelectedYear] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPaper, setSelectedPaper] = useState<any>(null)

  const pageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(pageRef, { once: true, margin: "-100px" })

  const conferencePublications = publications.filter(pub => pub.type === "conference")
  const years = ["All", ...Array.from(new Set(conferencePublications.map(pub => pub.year.toString()))).sort().reverse()]

  const filteredPublications = conferencePublications.filter((pub) => {
    const matchesYear = selectedYear === "All" || pub.year.toString() === selectedYear
    const matchesSearch =
      searchTerm === "" ||
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.venue && pub.venue.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesYear && matchesSearch
  })

  const handleCiteClick = (publication: any) => {
    setSelectedPaper(publication)
  }

  const generateCitation = (pub: any) => {
    const authorsStr = pub.authors.join(", ")
    const venue = pub.venue || pub.journal
    const pages = pub.pages ? `, pp. ${pub.pages}` : ""
    return `${authorsStr}. (${pub.year}). ${pub.title}. In ${venue}${pages}. DOI: ${pub.doi}`
  }

  const downloadCitation = (pub: any, format: string) => {
    const citation = generateCitation(pub)
    const element = document.createElement("a")

    let content = ""
    let filename = ""

    if (format === "bibtex") {
      const firstAuthorLastName = pub.authors[0].split(" ").pop()?.toLowerCase() || "author"
      content = `@inproceedings{${firstAuthorLastName}${pub.year},
  title={${pub.title}},
  author={${pub.authors.join(" and ")}},
  booktitle={${pub.venue || pub.journal}},
  year={${pub.year}},${pub.pages ? `\n  pages={${pub.pages}},` : ""}
  doi={${pub.doi}}
}`
      filename = `${firstAuthorLastName}${pub.year}.bib`
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
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/research" className="inline-flex items-center text-green-100 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Research
            </Link>
            <div className="flex items-center mb-4">
              <Presentation className="h-12 w-12 mr-4" />
              <div>
                <h1 className="text-5xl font-bold">Conference Papers</h1>
                <p className="text-xl mt-2">
                  {conferencePublications.length} conference presentations and proceedings
                </p>
              </div>
            </div>
            <p className="text-lg max-w-3xl leading-relaxed">
              Discover our conference papers presenting latest research findings and innovations 
              at prestigious international venues and symposiums.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <Input
            placeholder="Search by title, author, venue, or conference..."
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
                className={`hover:shadow-lg transition-all duration-300 ${
                  publication.featured ? "ring-2 ring-green-200 bg-green-50" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <Presentation className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {publication.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className="bg-green-600 text-white">Conference Paper</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {publication.year}
                            </Badge>
                            {publication.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                            )}
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
                        <p className="text-gray-800 font-medium mb-1">
                          {publication.venue || publication.journal}
                          {publication.pages && (
                            <span className="text-gray-600 font-normal">, pp. {publication.pages}</span>
                          )}
                        </p>
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
            <Presentation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No conference papers found</h3>
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
