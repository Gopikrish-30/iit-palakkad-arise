"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, X, Users, Phone, Mail, MapPin, HelpCircle } from "lucide-react"
import { useData } from "@/lib/data-context"
import { useToast } from "@/components/ui/use-toast"

export default function JoinUsSection() {
  const { joinUsContent, updateJoinUsContent } = useData()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    opportunities: [...joinUsContent.opportunities],
    contact: { ...joinUsContent.contact },
    faqs: [...joinUsContent.faqs]
  })

  const handleSave = () => {
    updateJoinUsContent(formData)
    setIsEditing(false)
    toast({
      title: "Success",
      description: "Join Us content updated successfully",
    })
  }

  const handleCancel = () => {
    setFormData({
      opportunities: [...joinUsContent.opportunities],
      contact: { ...joinUsContent.contact },
      faqs: [...joinUsContent.faqs]
    })
    setIsEditing(false)
  }

  const addOpportunity = () => {
    const newOpportunity = {
      title: "New Position",
      description: "Description of the position",
      requirements: ["Requirement 1", "Requirement 2"],
      applicationProcess: "Application process description",
      deadline: ""
    }
    setFormData(prev => ({
      ...prev,
      opportunities: [...prev.opportunities, newOpportunity]
    }))
  }

  const addFAQ = () => {
    const newFAQ = {
      question: "New question?",
      answer: "Answer to the question"
    }
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ]
    }))
  }

  const removeOpportunity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.filter((_, i) => i !== index)
    }))
  }

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }))
  }

  const updateOpportunity = (index: number, updates: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    }))
  }

  const updateFAQ = (index: number, updates: any) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    }))
  }

  const updateRequirement = (oppIndex: number, reqIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.map((opp, i) => 
        i === oppIndex ? {
          ...opp,
          requirements: opp.requirements.map((req, j) => 
            j === reqIndex ? value : req
          )
        } : opp
      )
    }))
  }

  const addRequirement = (oppIndex: number) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.map((opp, i) => 
        i === oppIndex ? {
          ...opp,
          requirements: [...opp.requirements, "New requirement"]
        } : opp
      )
    }))
  }

  const removeRequirement = (oppIndex: number, reqIndex: number) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.map((opp, i) => 
        i === oppIndex ? {
          ...opp,
          requirements: opp.requirements.filter((_, j) => j !== reqIndex)
        } : opp
      )
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Join Us Page Management</h2>
          <p className="text-gray-600 mt-2">Manage opportunities, contact information, and FAQs</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Research Opportunities ({formData.opportunities.length})
                </div>
                {isEditing && (
                  <Button onClick={addOpportunity} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Opportunity
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formData.opportunities.map((opportunity, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                      {isEditing && (
                        <Button
                          onClick={() => removeOpportunity(index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={opportunity.title}
                          onChange={(e) => updateOpportunity(index, { title: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Deadline (optional)</Label>
                        <Input
                          value={opportunity.deadline || ''}
                          onChange={(e) => updateOpportunity(index, { deadline: e.target.value })}
                          disabled={!isEditing}
                          placeholder="e.g., December 15, 2024"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={opportunity.description}
                          onChange={(e) => updateOpportunity(index, { description: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Application Process</Label>
                        <Textarea
                          value={opportunity.applicationProcess}
                          onChange={(e) => updateOpportunity(index, { applicationProcess: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <Label>Requirements</Label>
                          {isEditing && (
                            <Button
                              onClick={() => addRequirement(index)}
                              size="sm"
                              variant="outline"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          {opportunity.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex gap-2">
                              <Input
                                value={req}
                                onChange={(e) => updateRequirement(index, reqIndex, e.target.value)}
                                disabled={!isEditing}
                                className="flex-1"
                              />
                              {isEditing && (
                                <Button
                                  onClick={() => removeRequirement(index, reqIndex)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="contact-email"
                  value={formData.contact.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="contact-phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="contact-phone"
                  value={formData.contact.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="contact-address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Textarea
                  id="contact-address"
                  value={formData.contact.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, address: e.target.value }
                  }))}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions ({formData.faqs.length})
                </div>
                {isEditing && (
                  <Button onClick={addFAQ} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">FAQ {index + 1}</Badge>
                      {isEditing && (
                        <Button
                          onClick={() => removeFAQ(index)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Question</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => updateFAQ(index, { question: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Answer</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => updateFAQ(index, { answer: e.target.value })}
                          disabled={!isEditing}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
