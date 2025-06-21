"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Save, X, MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"
import { useData } from "@/lib/data-context"
import { useEffect } from "react"

const initialInquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Research Collaboration",
    message: "Interested in collaborating on AI research projects.",
    date: "2024-01-15",
    status: "New",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "PhD Application",
    message: "Inquiry about PhD admission requirements.",
    date: "2024-01-14",
    status: "Replied",
  },
]

export default function ContactSection() {
  const { contactInfo, updateContactInfo } = useData()
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [isViewingInquiry, setIsViewingInquiry] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null)
  const [contactForm, setContactForm] = useState(contactInfo)

  useEffect(() => {
    setContactForm(contactInfo)
  }, [contactInfo])

  const handleUpdateContact = () => {
    updateContactInfo(contactForm)
    setIsEditingContact(false)
  }

  const handleViewInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry)
    setIsViewingInquiry(true)
  }

  const handleUpdateInquiryStatus = (id: number, status: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status } : inquiry
    ))
  }

  const handleDeleteInquiry = (id: number) => {
    setInquiries(inquiries.filter(inquiry => inquiry.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Management</h2>
          <p className="text-gray-600">Manage contact information and inquiries</p>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contact Information</span>
            <Button onClick={() => setIsEditingContact(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Contact Info
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <div className="text-gray-600">
                    <p>{contactInfo.address.line1}</p>
                    <p>{contactInfo.address.line2}</p>
                    <p>{contactInfo.address.line3}</p>
                    <p>{contactInfo.address.line4}</p>
                    <p>{contactInfo.address.line5}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
                  <div className="text-gray-600">
                    <p>{contactInfo.officeHours.weekdays}</p>
                    <p>{contactInfo.officeHours.saturday}</p>
                    <p>{contactInfo.officeHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contact Inquiries ({inquiries.length})</span>
            <div className="flex gap-2">
              <Badge variant="secondary">
                New: {inquiries.filter(i => i.status === "New").length}
              </Badge>
              <Badge variant="outline">
                Replied: {inquiries.filter(i => i.status === "Replied").length}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.status === "New" ? "default" : "secondary"}>
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewInquiry(inquiry)}>
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditingContact} onOpenChange={setIsEditingContact}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="space-y-2">
                <Input
                  value={contactForm.address.line1}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, line1: e.target.value }
                  })}
                  placeholder="Address Line 1"
                />
                <Input
                  value={contactForm.address.line2}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, line2: e.target.value }
                  })}
                  placeholder="Address Line 2"
                />
                <Input
                  value={contactForm.address.line3}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, line3: e.target.value }
                  })}
                  placeholder="Address Line 3"
                />
                <Input
                  value={contactForm.address.line4}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, line4: e.target.value }
                  })}
                  placeholder="Address Line 4"
                />
                <Input
                  value={contactForm.address.line5}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    address: { ...contactForm.address, line5: e.target.value }
                  })}
                  placeholder="Address Line 5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Office Hours</Label>
              <div className="space-y-2">
                <Input
                  value={contactForm.officeHours.weekdays}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    officeHours: { ...contactForm.officeHours, weekdays: e.target.value }
                  })}
                  placeholder="Weekdays hours"
                />
                <Input
                  value={contactForm.officeHours.saturday}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    officeHours: { ...contactForm.officeHours, saturday: e.target.value }
                  })}
                  placeholder="Saturday hours"
                />
                <Input
                  value={contactForm.officeHours.sunday}
                  onChange={(e) => setContactForm({
                    ...contactForm,
                    officeHours: { ...contactForm.officeHours, sunday: e.target.value }
                  })}
                  placeholder="Sunday hours"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleUpdateContact} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditingContact(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Inquiry Dialog */}
      <Dialog open={isViewingInquiry} onOpenChange={setIsViewingInquiry}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-gray-900 font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-gray-900">{selectedInquiry.email}</p>
                </div>
              </div>
              <div>
                <Label>Subject</Label>
                <p className="text-gray-900 font-medium">{selectedInquiry.subject}</p>
              </div>
              <div>
                <Label>Message</Label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedInquiry.message}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, "Replied")}
                  className="flex-1"
                >
                  Mark as Replied
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, "New")}
                >
                  Mark as New
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
