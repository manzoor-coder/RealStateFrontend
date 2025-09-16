"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Plus, Search, Filter, MapPin } from "lucide-react"

const clients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    status: "Active",
    type: "Buyer",
    budget: "$800K - $1.2M",
    location: "Beverly Hills",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 234-5678",
    status: "Lead",
    type: "Seller",
    budget: "$1.5M - $2M",
    location: "West Hollywood",
    lastContact: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "(555) 345-6789",
    status: "Active",
    type: "Buyer",
    budget: "$600K - $900K",
    location: "Santa Monica",
    lastContact: "Yesterday",
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "(555) 456-7890",
    status: "Closed",
    type: "Buyer",
    budget: "$1.2M - $1.8M",
    location: "Malibu",
    lastContact: "1 month ago",
  },
]

function ClientsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
            <p className="text-slate-600 mt-1">Manage your client relationships</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2">
              <Plus className="h-4 w-4" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card
              key={client.id}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white rounded-2xl"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {client.name}
                      </h3>
                      <Badge
                        variant={
                          client.status === "Active" ? "default" : client.status === "Lead" ? "secondary" : "outline"
                        }
                        className={
                          client.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border-0"
                            : client.status === "Lead"
                              ? "bg-amber-100 text-amber-800 border-0"
                              : "bg-slate-100 text-slate-800 border-0"
                        }
                      >
                        {client.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>{client.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Type:</span>
                    <span className="font-medium text-slate-900">{client.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Budget:</span>
                    <span className="font-medium text-slate-900">{client.budget}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Last Contact:</span>
                    <span className="font-medium text-slate-900">{client.lastContact}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ClientsPage
