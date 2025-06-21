"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Users, Mail, Phone, MapPin, HelpCircle } from "lucide-react"
import { useData } from "@/lib/data-context"
import { useToast } from "@/components/ui/use-toast"

export default function JoinUsSection() {
  const { joinUsContent, updateJoinUsContent } = useData()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<any>(null)
  const [editingFaq, setEditingFaq] = useState<any>(null)
  const [isAddOpportunityOpen, setIsAddOpportunityOpen] = useState(false)
  const [isAddFaqOpen, setIsAddFaqOpen] = useState(false)

  const [formData, setFormData] = useState({
    opportunities: [...joinUsContent.opportunities],
    contact: { ...joinUsContent.contact },
    faqs: [...joinUsContent.faqs]
  })

  const [opportunityForm, setOpportunityForm] = useState({
    title: "",
    description: "",
    requirements: [] as string[],
    applicationProcess: "",
    deadline: ""
  })

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: ""
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

  const handleAddOpportunity = () => {
    const newOpportunity = {
      ...opportunityForm,
      requirements: opportunityForm.requirements.filter(req => req.trim() !== "")
    }
    setFormData(prev => ({
      ...prev,
      opportunities: [...prev.opportunities, newOpportunity]
    }))
    setOpportunityForm({
      title: "",
      description: "",
      requirements: [],
      applicationProcess: "",
      deadline: ""
    })
    setIsAddOpportunityOpen(false)
  }

  const handleEditOpportunity = (index: number) => {
    const opportunity = formData.opportunities[index]
    setOpportunityForm({
      ...opportunity,
      requirements: [...opportunity.requirements],
      deadline: opportunity.deadline || ""
    })
    setEditingOpportunity(index)
  }

  const handleUpdateOpportunity = () => {
    const updatedOpportunities = [...formData.opportunities]
    updatedOpportunities[editingOpportunity] = {
      ...opportunityForm,
      requirements: opportunityForm.requirements.filter(req => req.trim() !== "")
    }
    setFormData(prev => ({
      ...prev,
      opportunities: updatedOpportunities
    }))
    setEditingOpportunity(null)
    setOpportunityForm({
      title: "",
      description: "",
      requirements: [],
      applicationProcess: "",
      deadline: ""
    })
  }

  const handleDeleteOpportunity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      opportunities: prev.opportunities.filter((_, i) => i !== index)
    }))
  }

  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, faqForm]
    }))
    setFaqForm({ question: "", answer: "" })
    setIsAddFaqOpen(false)
  }

  const handleEditFaq = (index: number) => {
    setFaqForm(formData.faqs[index])
    setEditingFaq(index)
  }

  const handleUpdateFaq = () => {
    const updatedFaqs = [...formData.faqs]
    updatedFaqs[editingFaq] = faqForm
    setFormData(prev => ({
      ...prev,
      faqs: updatedFaqs
    }))
    setEditingFaq(null)
    setFaqForm({ question: "", answer: "" })
  }

  const handleDeleteFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }))
  }

  const addRequirement = () => {
    setOpportunityForm(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...opportunityForm.requirements]
    newRequirements[index] = value
    setOpportunityForm(prev => ({
      ...prev,
      requirements: newRequirements
    }))
  }

  const removeRequirement = (index: number) => {
    setOpportunityForm(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
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

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  value={formData.contact.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  value={formData.contact.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-address">Address</Label>
                <Input
                  id="contact-address"
                  value={formData.contact.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, address: e.target.value }
                  }))}
                />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{joinUsContent.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{joinUsContent.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{joinUsContent.contact.address}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Opportunities
            </div>
            {isEditing && (
              <Dialog open={isAddOpportunityOpen} onOpenChange={setIsAddOpportunityOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Opportunity
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Opportunity</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="opp-title">Title</Label>
                      <Input
                        id="opp-title"
                        value={opportunityForm.title}
                        onChange={(e) => setOpportunityForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opp-description">Description</Label>
                      <Textarea
                        id="opp-description"
                        value={opportunityForm.description}
                        onChange={(e) => setOpportunityForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Requirements</Label>
                      {opportunityForm.requirements.map((req, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={req}
                            onChange={(e) => updateRequirement(index, e.target.value)}
                            placeholder="Enter requirement"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRequirement}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Requirement
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opp-process">Application Process</Label>
                      <Textarea
                        id="opp-process"
                        value={opportunityForm.applicationProcess}
                        onChange={(e) => setOpportunityForm(prev => ({ ...prev, applicationProcess: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opp-deadline">Deadline (Optional)</Label>
                      <Input
                        id="opp-deadline"
                        value={opportunityForm.deadline}
                        onChange={(e) => setOpportunityForm(prev => ({ ...prev, deadline: e.target.value }))}
                        placeholder="e.g., December 31, 2024"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddOpportunityOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddOpportunity}>
                        Add Opportunity
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(isEditing ? formData.opportunities : joinUsContent.opportunities).map((opportunity, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{opportunity.title}</h4>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditOpportunity(index)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteOpportunity(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{opportunity.description}</p>
                {opportunity.requirements.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium mb-2">Requirements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {opportunity.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mb-3">
                  <p className="font-medium mb-2">Application Process:</p>
                  <p className="text-gray-600">{opportunity.applicationProcess}</p>
                </div>
                {opportunity.deadline && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Deadline: {opportunity.deadline}</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </div>
            {isEditing && (
              <Dialog open={isAddFaqOpen} onOpenChange={setIsAddFaqOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New FAQ</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="faq-question">Question</Label>
                      <Input
                        id="faq-question"
                        value={faqForm.question}
                        onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faq-answer">Answer</Label>
                      <Textarea
                        id="faq-answer"
                        value={faqForm.answer}
                        onChange={(e) => setFaqForm(prev => ({ ...prev, answer: e.target.value }))}
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddFaqOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddFaq}>
                        Add FAQ
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(isEditing ? formData.faqs : joinUsContent.faqs).map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{faq.question}</h4>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditFaq(index)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteFaq(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Opportunity Dialog */}
      {editingOpportunity !== null && (
        <Dialog open={true} onOpenChange={() => setEditingOpportunity(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Opportunity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-opp-title">Title</Label>
                <Input
                  id="edit-opp-title"
                  value={opportunityForm.title}
                  onChange={(e) => setOpportunityForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-opp-description">Description</Label>
                <Textarea
                  id="edit-opp-description"
                  value={opportunityForm.description}
                  onChange={(e) => setOpportunityForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Requirements</Label>
                {opportunityForm.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Enter requirement"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-opp-process">Application Process</Label>
                <Textarea
                  id="edit-opp-process"
                  value={opportunityForm.applicationProcess}
                  onChange={(e) => setOpportunityForm(prev => ({ ...prev, applicationProcess: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-opp-deadline">Deadline (Optional)</Label>
                <Input
                  id="edit-opp-deadline"
                  value={opportunityForm.deadline}
                  onChange={(e) => setOpportunityForm(prev => ({ ...prev, deadline: e.target.value }))}
                  placeholder="e.g., December 31, 2024"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingOpportunity(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateOpportunity}>
                  Update Opportunity
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit FAQ Dialog */}
      {editingFaq !== null && (
        <Dialog open={true} onOpenChange={() => setEditingFaq(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit FAQ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-faq-question">Question</Label>
                <Input
                  id="edit-faq-question"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-faq-answer">Answer</Label>
                <Textarea
                  id="edit-faq-answer"
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm(prev => ({ ...prev, answer: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingFaq(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateFaq}>
                  Update FAQ
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
