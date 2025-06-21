"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  CheckCircle,
  Clock,
  FileText,
  Award
} from "lucide-react"
import { useData } from "@/lib/data-context"

export default function JoinUsPage() {
  const { joinUsContent } = useData()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Join Our Research Community</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Become part of our dynamic research environment and contribute to cutting-edge 
              discoveries that shape the future of science and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore various pathways to join our research lab and advance your academic career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {joinUsContent.opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{opportunity.title}</h3>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {opportunity.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {opportunity.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        Application Process
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {opportunity.applicationProcess}
                      </p>
                    </div>

                    {opportunity.deadline && (
                      <div className="mb-6">
                        <Badge variant="outline" className="flex items-center w-fit">
                          <Clock className="h-4 w-4 mr-2" />
                          Deadline: {opportunity.deadline}
                        </Badge>
                      </div>
                    )}

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these steps to join our research community
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose Program",
                  description: "Select the research program that aligns with your interests and qualifications"
                },
                {
                  step: "2", 
                  title: "Prepare Documents",
                  description: "Gather required documents including transcripts, CV, and recommendation letters"
                },
                {
                  step: "3",
                  title: "Submit Application",
                  description: "Complete the online application form and upload all required documents"
                },
                {
                  step: "4",
                  title: "Interview & Selection",
                  description: "Participate in the interview process and await selection results"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? Contact our admissions team for more information
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a 
                        href={`mailto:${joinUsContent.contact.email}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {joinUsContent.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <a 
                        href={`tel:${joinUsContent.contact.phone}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {joinUsContent.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">{joinUsContent.contact.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about joining our research lab
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {joinUsContent.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
            <Award className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Research Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the first step towards an exciting research career with us. 
              Apply today and become part of our innovative research community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <a href={`mailto:${joinUsContent.contact.email}`}>
                  Start Application
                  <Mail className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <a href={`tel:${joinUsContent.contact.phone}`}>
                  Call Us
                  <Phone className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
