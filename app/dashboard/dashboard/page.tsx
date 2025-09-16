"use client";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaUsers,
  FaHome,
  FaDollarSign,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { userApi } from "@/lib/api/user";
import { propertyApi } from "@/lib/api/property";
import { AuthContext } from "@/contexts/AuthContext";
import { Badge, Building2, Calendar, Eye, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);
  const { user } = useContext(AuthContext)!;

  const hasAdminRole = user?.roles?.some((role) => role === 1);
  const hasUserRole = user?.roles?.some((role) => role === 2);
  const hasAgentRole = user?.roles?.some((role) => role === 5);

  useEffect(() => {
    fetchUsers();
    fetchProperties();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userApi.usersList();
      console.log("User count:", response.data.users.length);
      setUserCount(response.data.users.length);
      console.log(
        "user name",
        response.data.users[0].firstName + " " + response.data.users[0].lastName
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await propertyApi.search();
      console.log("Property Stats:", response.data.properties.length);
      // const sorted = response.data.properties.sort(
      //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      // );
      // console.log("Recent Property:", sorted[0].title);
      setPropertyCount(response.data.properties.length);
    } catch (error) {
      console.error("Error fetching property stats:", error);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: `${userCount}`,
      change: "+12%",
      trend: "up",
      icon: FaUsers,
      gradient: "gradient-primary",
    },
    {
      title: "Properties",
      value: `${propertyCount}`,
      change: "+8%",
      trend: "up",
      icon: FaHome,
      gradient: "gradient-secondary",
    },
    {
      title: "Revenue",
      value: "$2.4M",
      change: "+15%",
      trend: "up",
      icon: FaDollarSign,
      gradient: "gradient-success",
    },
    {
      title: "Growth",
      value: "+12%",
      change: "-2%",
      trend: "down",
      icon: FaChartLine,
      gradient: "gradient-warning",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "John Doe",
      time: "2 minutes ago",
      type: "user",
    },
    {
      id: 2,
      action: "Property listed",
      user: "Sarah Johnson",
      time: "5 minutes ago",
      type: "property",
    },
    {
      id: 3,
      action: "Payment received",
      user: "Mike Wilson",
      time: "10 minutes ago",
      type: "payment",
    },
    {
      id: 4,
      action: "Agent approved",
      user: "Emma Davis",
      time: "15 minutes ago",
      type: "agent",
    },
  ];

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

const viewsData = [
  { month: "Jan", views: 850 },
  { month: "Feb", views: 920 },
  { month: "Mar", views: 1100 },
  { month: "Apr", views: 980 },
  { month: "May", views: 1200 },
  { month: "Jun", views: 1247 },
]

const inquiriesData = [
  { month: "Jan", inquiries: 45 },
  { month: "Feb", inquiries: 52 },
  { month: "Mar", inquiries: 68 },
  { month: "Apr", inquiries: 61 },
  { month: "May", inquiries: 78 },
  { month: "Jun", inquiries: 89 },
]

const propertyTypeData = [
  { name: "Apartments", value: 12, color: "var(--chart-1)" },
  { name: "Houses", value: 8, color: "var(--chart-2)" },
  { name: "Condos", value: 4, color: "var(--chart-3)" },
]

const recentActivitiess = [
  {
    action: "Added new property",
    property: "Luxury Apartment in Downtown",
    date: "Sep 3, 2024",
    type: "success",
  },
  {
    action: "Received inquiry for",
    property: "Modern Villa in Suburbs",
    date: "Sep 2, 2024",
    type: "info",
  },
  {
    action: "Updated pricing for",
    property: "Cozy Studio Apartment",
    date: "Sep 1, 2024",
    type: "warning",
  },
  {
    action: "Property viewed 25 times",
    property: "Beachfront Condo",
    date: "Aug 31, 2024",
    type: "info",
  },
  {
    action: "Marked as sold",
    property: "Family Home in Suburbs",
    date: "Aug 30, 2024",
    type: "success",
  },
]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`hover-lift ${stat.gradient} text-white overflow-hidden relative`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <FaArrowUp className="text-white/80 mr-1" />
                    ) : (
                      <FaArrowDown className="text-white/80 mr-1" />
                    )}
                    <span className="text-white/80 text-sm">{stat.change}</span>
                  </div>
                </div>
                <stat.icon className="text-4xl text-white/60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className={`grid grid-cols-1 ${hasAdminRole ? "lg:grid-cols-2" : "lg:grid-cols-1" }  gap-8`}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="gradient-text">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "user"
                        ? "bg-green-500"
                        : activity.type === "property"
                        ? "bg-blue-500"
                        : activity.type === "payment"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {hasAdminRole && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="gradient-text-blue">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 rounded-lg gradient-primary text-white hover:opacity-90 transition-all duration-300 text-center">
                  <FaUsers className="mx-auto mb-2 text-2xl" />
                  <span className="text-sm">Add User</span>
                </button>
                <button className="p-4 rounded-lg gradient-secondary text-white hover:opacity-90 transition-all duration-300 text-center">
                  <FaHome className="mx-auto mb-2 text-2xl" />
                  <span className="text-sm">Add Property</span>
                </button>
                <button className="p-4 rounded-lg gradient-success text-white hover:opacity-90 transition-all duration-300 text-center">
                  <FaChartLine className="mx-auto mb-2 text-2xl" />
                  <span className="text-sm">View Reports</span>
                </button>
                <button className="p-4 rounded-lg gradient-warning text-white hover:opacity-90 transition-all duration-300 text-center">
                  <FaDollarSign className="mx-auto mb-2 text-2xl" />
                  <span className="text-sm">Payments</span>
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

        {hasAgentRole && (
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
        )}


        {/* Charts Section */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Property Views Trend */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Property Views Trend</CardTitle>
                    <p className="text-sm text-muted-foreground">Monthly views over the last 6 months</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={viewsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "6px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="views"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            dot={{ fill: "var(--primary)", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
        
                {/* Inquiries Trend */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">Inquiries Trend</CardTitle>
                    <p className="text-sm text-muted-foreground">Monthly inquiries over the last 6 months</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={inquiriesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "6px",
                            }}
                          />
                          <Bar dataKey="inquiries" fill="var(--accent-foreground)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
        
              {/* Property Distribution and Recent Activities */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Property Type Distribution */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="color-foreground">Property Distribution</CardTitle>
                    <p className="text-sm color-muted-foreground">Breakdown by property type</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={propertyTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {propertyTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "6px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      {propertyTypeData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-card-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
        
              
              </div>
      
    </div>
  );
}
