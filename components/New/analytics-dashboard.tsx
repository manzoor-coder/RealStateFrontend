import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Eye, MessageSquare, DollarSign, Calendar } from "lucide-react"

// Sample analytics data
const propertyViewsData = [
  { property: "Downtown Apt", views: 156, inquiries: 12 },
  { property: "Family Villa", views: 89, inquiries: 8 },
  { property: "Studio Apt", views: 234, inquiries: 18 },
  { property: "Beachfront Condo", views: 312, inquiries: 25 },
  { property: "Townhouse", views: 67, inquiries: 4 },
  { property: "City Loft", views: 145, inquiries: 9 },
]

const performanceData = [
  { month: "Jan", rent: 45000, sale: 120000, views: 850, inquiries: 45 },
  { month: "Feb", rent: 52000, sale: 95000, views: 920, inquiries: 52 },
  { month: "Mar", rent: 48000, sale: 180000, views: 1100, inquiries: 68 },
  { month: "Apr", rent: 61000, sale: 150000, views: 980, inquiries: 61 },
  { month: "May", rent: 58000, sale: 200000, views: 1200, inquiries: 78 },
  { month: "Jun", rent: 65000, sale: 175000, views: 1247, inquiries: 89 },
]

const propertyTypePerformance = [
  { type: "Apartments", count: 12, avgViews: 145, avgInquiries: 8, color: "hsl(var(--chart-1))" },
  { type: "Houses", count: 8, avgViews: 189, avgInquiries: 12, color: "hsl(var(--chart-2))" },
  { type: "Condos", count: 4, avgViews: 234, avgInquiries: 15, color: "hsl(var(--chart-3))" },
]

const locationPerformance = [
  { location: "Downtown", properties: 8, avgPrice: 2800, performance: 92 },
  { location: "Suburbs", properties: 12, avgPrice: 2200, performance: 78 },
  { location: "Beachfront", properties: 3, avgPrice: 4500, performance: 95 },
  { location: "Midtown", properties: 6, avgPrice: 3200, performance: 85 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics & Insights</h1>
        <p className="text-muted-foreground">Track your property performance and market trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">$329,000</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+12.5%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Avg. Views per Property</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">167</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+8.2%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Conversion Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">7.8%</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-2.1%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Avg. Days on Market</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">28</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-primary" />
              <span className="text-primary">-5 days</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Revenue Comparison</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly revenue from rent vs sale properties</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
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
                  <Area
                    type="monotone"
                    dataKey="rent"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="sale"
                    stackId="1"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Views vs Inquiries */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Views vs Inquiries by Property</CardTitle>
            <p className="text-sm text-muted-foreground">Performance comparison across properties</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="property"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="inquiries" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Property Type Performance */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Property Type Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Performance by property type</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypePerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {propertyTypePerformance.map((entry, index) => (
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
            <div className="space-y-2 mt-4">
              {propertyTypePerformance.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-card-foreground">{item.type}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.count} properties • {item.avgViews} avg views
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Performance */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Location Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Performance metrics by location</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationPerformance.map((location, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-card-foreground">{location.location}</h4>
                      <p className="text-sm text-muted-foreground">
                        {location.properties} properties • ${location.avgPrice.toLocaleString()} avg
                      </p>
                    </div>
                    <Badge
                      variant={
                        location.performance >= 90 ? "default" : location.performance >= 80 ? "secondary" : "outline"
                      }
                    >
                      {location.performance}% performance
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${location.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Insights */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Market Insights</CardTitle>
          <p className="text-sm text-muted-foreground">Key trends and recommendations</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-card-foreground">Best Performing</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Beachfront properties show 95% performance with highest inquiry rates
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-accent" />
                <h4 className="font-medium text-card-foreground">High Interest</h4>
              </div>
              <p className="text-sm text-muted-foreground">Studio apartments receive 40% more views than average</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-chart-4" />
                <h4 className="font-medium text-card-foreground">Quick Sales</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Properties under $600k sell 60% faster than market average
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
