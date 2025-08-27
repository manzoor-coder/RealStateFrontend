"use client"

import DashboardLayout from "@/components/dashboard-layout"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Plus, Search, Filter } from "lucide-react"

const appointments = [
  {
    id: 1,
    client: "Sarah Johnson",
    property: "123 Oak Street, Beverly Hills",
    date: "Today",
    time: "10:00 AM",
    type: "Property Showing",
    status: "Confirmed",
    duration: "1 hour",
  },
  {
    id: 2,
    client: "Mike Chen",
    property: "456 Maple Ave, West Hollywood",
    date: "Today",
    time: "2:30 PM",
    type: "Consultation",
    status: "Confirmed",
    duration: "45 minutes",
  },
  {
    id: 3,
    client: "Emily Davis",
    property: "789 Pine Road, Santa Monica",
    date: "Tomorrow",
    time: "4:00 PM",
    type: "Property Showing",
    status: "Pending",
    duration: "1 hour",
  },
  {
    id: 4,
    client: "Robert Wilson",
    property: "Office Meeting",
    date: "Dec 20",
    time: "11:00 AM",
    type: "Contract Review",
    status: "Confirmed",
    duration: "2 hours",
  },
  {
    id: 5,
    client: "Lisa Anderson",
    property: "321 Cedar Lane, Malibu",
    date: "Dec 21",
    time: "3:00 PM",
    type: "Property Showing",
    status: "Tentative",
    duration: "1.5 hours",
  },
]

function AppointmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
            <p className="text-slate-600 mt-1">Manage your schedule and meetings</p>
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
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-white rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 flex-shrink-0 shadow-sm"></div>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                            {appointment.client}
                          </h3>
                          <p className="text-slate-600 mt-1 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {appointment.property}
                          </p>
                        </div>

                        <Badge
                          variant={
                            appointment.status === "Confirmed"
                              ? "default"
                              : appointment.status === "Pending"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            appointment.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800 border-0"
                              : appointment.status === "Pending"
                                ? "bg-amber-100 text-amber-800 border-0"
                                : "bg-slate-100 text-slate-800 border-0"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{appointment.type}</span>
                        </div>
                        <span className="text-slate-500">({appointment.duration})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AppointmentsPage
