"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Eye,
} from "lucide-react"

const stats = [
  {
    title: "Active Listings",
    value: "24",
    change: "+2 this week",
    icon: Building2,
    trend: "up",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    title: "Total Clients",
    value: "156",
    change: "+12 this month",
    icon: Users,
    trend: "up",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
  },
  {
    title: "Revenue (YTD)",
    value: "$2.4M",
    change: "+18% vs last year",
    icon: DollarSign,
    trend: "up",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
  },
  {
    title: "Avg. Sale Price",
    value: "$485K",
    change: "+5% this quarter",
    icon: TrendingUp,
    trend: "up",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
]

const recentProperties = [
  {
    id: 1,
    address: "123 Oak Street, Beverly Hills",
    price: "$1,250,000",
    status: "Active",
    type: "Single Family",
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: 2,
    address: "456 Maple Ave, West Hollywood",
    price: "$850,000",
    status: "Pending",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: 3,
    address: "789 Pine Road, Santa Monica",
    price: "$2,100,000",
    status: "Active",
    type: "Single Family",
    bedrooms: 5,
    bathrooms: 4,
  },
]

const upcomingAppointments = [
  {
    id: 1,
    client: "Sarah Johnson",
    property: "123 Oak Street",
    time: "10:00 AM",
    type: "Showing",
  },
  {
    id: 2,
    client: "Mike Chen",
    property: "456 Maple Ave",
    time: "2:30 PM",
    type: "Consultation",
  },
  {
    id: 3,
    client: "Emily Davis",
    property: "789 Pine Road",
    time: "4:00 PM",
    type: "Showing",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 backdrop-blur-sm rounded-3xl ring-1 ring-slate-200/50"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.03]`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6">
              <CardTitle className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
                {stat.title}
              </CardTitle>
              <div
                className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-all duration-300 shadow-sm ring-1 ring-white/50`}
              >
                <stat.icon className={`h-6 w-6 text-slate-700`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-full">
                  <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-xs">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Properties */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden ring-1 ring-slate-200/50">
          <CardHeader className="bg-gradient-to-r from-blue-50 via-slate-50 to-cyan-50 border-b border-slate-200/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                Recent Properties
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 border-0 font-semibold px-3 py-1 rounded-full shadow-sm"
              >
                {recentProperties.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {recentProperties.map((property) => (
              <div
                key={property.id}
                className="group relative p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200/50 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:scale-[1.01] ring-1 ring-slate-100/50"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-xl mt-1">
                        <MapPin className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-lg">
                          {property.address}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                          <span className="px-3 py-1 bg-slate-200 rounded-full text-xs font-semibold">
                            {property.type}
                          </span>
                          <span className="font-medium">{property.bedrooms} bed</span>
                          <span className="font-medium">{property.bathrooms} bath</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-3 flex-shrink-0 ml-6">
                    <p className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {property.price}
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={property.status === "Active" ? "default" : "secondary"}
                        className={
                          property.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border-0 font-semibold px-3 py-1 rounded-full"
                            : "bg-amber-100 text-amber-800 border-0 font-semibold px-3 py-1 rounded-full"
                        }
                      >
                        {property.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-10 w-10 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 rounded-xl"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-8 border-slate-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 rounded-2xl py-4 bg-white font-semibold shadow-sm"
            >
              <Building2 className="h-5 w-5 mr-2" />
              View All Properties
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden ring-1 ring-slate-200/50">
          <CardHeader className="bg-gradient-to-r from-purple-50 via-slate-50 to-pink-50 border-b border-slate-200/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                Today's Appointments
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 border-0 font-semibold px-3 py-1 rounded-full shadow-sm"
              >
                {upcomingAppointments.length} Today
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group relative p-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200/50 hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:scale-[1.01] ring-1 ring-slate-100/50"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="h-3 w-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 flex-shrink-0 shadow-sm"></div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors text-lg">
                          {appointment.client}
                        </p>
                        <p className="text-slate-600 mt-1 font-medium">{appointment.property}</p>
                        <Badge
                          variant="outline"
                          className="mt-3 border-purple-200 text-purple-800 bg-purple-50 font-semibold px-3 py-1 rounded-full"
                        >
                          {appointment.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-4 flex-shrink-0 ml-6">
                    <p className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {appointment.time}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-11 w-11 p-0 hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300 rounded-xl shadow-sm"
                      >
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-11 w-11 p-0 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 rounded-xl shadow-sm"
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-8 border-slate-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300 rounded-2xl py-4 bg-white font-semibold shadow-sm"
            >
              <Calendar className="h-5 w-5 mr-2" />
              View All Appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
