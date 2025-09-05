import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Eye, MessageSquare, DollarSign, Home, TrendingUp } from "lucide-react"
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

const stats = [
  {
    title: "Total Properties",
    value: "24",
    icon: Building2,
    change: "+2 this month",
    changeType: "positive",
  },
  {
    title: "Active Listings",
    value: "18",
    icon: Home,
    change: "+3 this week",
    changeType: "positive",
  },
  {
    title: "Properties on Rent",
    value: "12",
    icon: DollarSign,
    change: "+1 this month",
    changeType: "positive",
  },
  {
    title: "Properties for Sale",
    value: "6",
    icon: TrendingUp,
    change: "No change",
    changeType: "neutral",
  },
  {
    title: "Total Views",
    value: "1,247",
    icon: Eye,
    change: "+156 this week",
    changeType: "positive",
  },
  {
    title: "Total Inquiries",
    value: "89",
    icon: MessageSquare,
    change: "+12 this week",
    changeType: "positive",
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
  { name: "Apartments", value: 12, color: "hsl(var(--chart-1))" },
  { name: "Houses", value: 8, color: "hsl(var(--chart-2))" },
  { name: "Condos", value: 4, color: "hsl(var(--chart-3))" },
]

const recentActivities = [
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

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p
                className={cn(
                  "text-xs",
                  stat.changeType === "positive" && "text-primary",
                  stat.changeType === "neutral" && "text-muted-foreground",
                  stat.changeType === "negative" && "text-destructive",
                )}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="inquiries" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
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
            <CardTitle className="text-card-foreground">Property Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Breakdown by property type</p>
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
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
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

        {/* Recent Activities */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Activities</CardTitle>
            <p className="text-sm text-muted-foreground">Latest updates on your properties</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full mt-2 flex-shrink-0",
                      activity.type === "success" && "bg-primary",
                      activity.type === "info" && "bg-accent",
                      activity.type === "warning" && "bg-chart-4",
                    )}
                  />
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm text-card-foreground">
                      {activity.action} <span className="font-medium">{activity.property}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
