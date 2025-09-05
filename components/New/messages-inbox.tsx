"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Reply, Phone, Mail, MapPin, Calendar, CheckCircle, Clock } from "lucide-react"

// Sample messages data
const sampleMessages = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    property: "Luxury Downtown Apartment",
    propertyId: 1,
    message:
      "Hi! I'm very interested in this apartment. Could we schedule a viewing for this weekend? I'm looking to move in by next month and this seems perfect for my needs.",
    date: "2024-09-03T10:30:00Z",
    status: "unread",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@company.com",
    phone: "+1 (555) 987-6543",
    property: "Modern Family Villa",
    propertyId: 2,
    message:
      "Hello, I saw your listing for the family villa. My family and I are relocating to the area and this property caught our attention. What's the earliest we could arrange a tour?",
    date: "2024-09-02T14:15:00Z",
    status: "read",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r.home@gmail.com",
    phone: "+1 (555) 456-7890",
    property: "Cozy Studio Apartment",
    propertyId: 3,
    message:
      "Is this studio still available? I'm a graduate student looking for a place close to downtown. The photos look great and the price fits my budget perfectly.",
    date: "2024-09-02T09:45:00Z",
    status: "replied",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@business.com",
    phone: "+1 (555) 321-0987",
    property: "Beachfront Condo",
    propertyId: 4,
    message:
      "I'm interested in purchasing this beachfront condo as an investment property. Could you provide more details about the HOA fees and rental restrictions?",
    date: "2024-09-01T16:20:00Z",
    status: "unread",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa.park.realtor@email.com",
    phone: "+1 (555) 654-3210",
    property: "Suburban Townhouse",
    propertyId: 5,
    message:
      "Hi, I have a client who might be interested in this townhouse. They're looking for a 3-bedroom place in a family-friendly neighborhood. Would you be open to showing it this week?",
    date: "2024-08-31T11:30:00Z",
    status: "read",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function MessagesInbox() {
  const [messages, setMessages] = useState(sampleMessages)
  const [selectedMessage, setSelectedMessage] = useState<(typeof sampleMessages)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [replyText, setReplyText] = useState("")

  // Filter messages
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || message.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-primary text-primary-foreground"
      case "read":
        return "bg-muted text-muted-foreground"
      case "replied":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Clock className="h-3 w-3" />
      case "read":
        return <CheckCircle className="h-3 w-3" />
      case "replied":
        return <Reply className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const markAsRead = (messageId: number) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status: "read" } : msg)))
  }

  const sendReply = () => {
    if (selectedMessage && replyText.trim()) {
      setMessages((prev) => prev.map((msg) => (msg.id === selectedMessage.id ? { ...msg, status: "replied" } : msg)))
      setReplyText("")
      alert("Reply sent successfully!")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const unreadCount = messages.filter((msg) => msg.status === "unread").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages & Inquiries</h1>
          <p className="text-muted-foreground">
            Manage inquiries from potential buyers and renters
            {unreadCount > 0 && <Badge className="ml-2 bg-primary text-primary-foreground">{unreadCount} unread</Badge>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`bg-card cursor-pointer transition-colors hover:bg-muted/50 ${
              message.status === "unread" ? "border-primary" : ""
            }`}
            onClick={() => {
              setSelectedMessage(message)
              if (message.status === "unread") {
                markAsRead(message.id)
              }
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.name} />
                  <AvatarFallback>
                    {message.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-card-foreground">{message.name}</h3>
                      <Badge className={getStatusColor(message.status)}>
                        {getStatusIcon(message.status)}
                        <span className="ml-1 capitalize">{message.status}</span>
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatDate(message.date)}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {message.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {message.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium text-primary">{message.property}</span>
                  </div>

                  <p className="text-sm text-card-foreground line-clamp-2">{message.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedMessage.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedMessage.phone}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedMessage.property}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(selectedMessage.date).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <Label className="text-sm font-medium">Message</Label>
                <div className="mt-2 p-4 bg-background border rounded-lg">
                  <p className="text-sm">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="space-y-2">
                <Label htmlFor="reply">Reply</Label>
                <Textarea
                  id="reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button onClick={sendReply} disabled={!replyText.trim()}>
                    <Reply className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <Card className="bg-card">
          <CardContent className="p-12 text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No messages found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "You'll see inquiries from potential buyers and renters here"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
