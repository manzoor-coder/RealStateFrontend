"use client"
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
import { useContext, useEffect, useState } from "react"
import { propertyApi } from "@/lib/api/property"
import { AuthContext } from "@/contexts/AuthContext"
import { Property } from "@/types"

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

const locationPerformance = [
  { location: "Downtown", properties: 8, avgPrice: 2800, performance: 92 },
  { location: "Suburbs", properties: 12, avgPrice: 2200, performance: 78 },
  { location: "Beachfront", properties: 3, avgPrice: 4500, performance: 95 },
  { location: "Midtown", properties: 6, avgPrice: 3200, performance: 85 },
]

export default function AnalyticsDashboard() {
  const [propertyType, setPropertyType] = useState<Property[]>([]);
  const { user } = useContext(AuthContext)!;

  // Generate propertyTypePerformance dynamically
  const propertyTypePerformance = propertyType.reduce((acc: { name: string; value: number; color: string }[], item, index) => {
    const key = item.propertyType ?? "Unknown";
    const existing = acc.find((entry) => entry.name === key);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: key,
        value: 1,
        color: `var(--chart-${(index % 5) + 1})`, // Cycle through chart colors
      });
    }
    return acc;
  }, []);

  const hasAdminRole = user?.roles?.some((role) => role === 1);
  const hasUserRole = user?.roles?.some((role) => role === 2);
  const hasAgentRole = user?.roles?.some((role) => role === 5);

  const fetchProperties = async () => {
    try {
      const response = await propertyApi.search();
      const allProperties = response.data.properties;

      let filteredProperties = allProperties;
      if (hasUserRole) {
        filteredProperties = allProperties.filter(
          (property) => property.ownerId === user?.id
        );
      }

      console.log("User Property Stats:", filteredProperties.length);

      setPropertyType(filteredProperties);
    } catch (error) {
      console.error("Error fetching property stats:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text-primary text-shadow-lg">Analytics & Insights Dashboard</h1>
          <p className="text-lg">
            Track your property performance and market trends with professional insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient-blue border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
              <div className="p-2 gradient-primary rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text-primary">$329,000</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient-teal border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Avg. Views per Property</CardTitle>
              <div className="p-2 gradient-secondary rounded-lg">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text-blue">167</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">+8.2%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Conversion Rate</CardTitle>
              <div className="p-2 gradient-success rounded-lg">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text">7.8%</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <TrendingDown className="h-3 w-3 text-red-500" />
                <span className="text-red-500 font-medium">-2.1%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient-pink border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Avg. Days on Market</CardTitle>
              <div className="p-2 gradient-warning rounded-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold gradient-text-primary">28</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <TrendingDown className="h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">-5 days</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Revenue Trend */}
          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient border-0">
            <CardHeader>
              <CardTitle className="text-card-foreground gradient-text-primary text-xl">Revenue Comparison</CardTitle>
              <p className="text-sm text-muted-foreground">Monthly revenue from rent vs sale properties</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rent"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="url(#gradientRent)"
                      fillOpacity={0.8}
                    />
                    <Area
                      type="monotone"
                      dataKey="sale"
                      stackId="1"
                      stroke="#06b6d4"
                      fill="url(#gradientSale)"
                      fillOpacity={0.8}
                    />
                    <defs>
                      <linearGradient id="gradientRent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="gradientSale" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Property Views vs Inquiries */}
          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient border-0">
            <CardHeader>
              <CardTitle className="text-card-foreground gradient-text-blue text-xl">
                Views vs Inquiries by Property
              </CardTitle>
              <p className="text-sm text-muted-foreground">Performance comparison across properties</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={propertyViewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="property"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="views" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inquiries" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Property Type Performance */}
          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient border-0">
            <CardHeader>
              <CardTitle className="text-card-foreground gradient-text text-xl">Property Type Distribution</CardTitle>
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
                      dataKey="value"
                    >
                      {propertyTypePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-6">
                {propertyTypePerformance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-card-foreground">{item.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.value} properties
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Performance */}
          <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient border-0">
            <CardHeader>
              <CardTitle className="text-card-foreground gradient-text-primary text-xl">Location Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Performance metrics by location</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {locationPerformance.map((location, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-card-foreground text-lg">{location.location}</h4>
                        <p className="text-sm text-muted-foreground">
                          {location.properties} properties • ${location.avgPrice.toLocaleString()} avg
                        </p>
                      </div>
                      <Badge
                        className={`${
                          location.performance >= 90
                            ? "gradient-success text-white"
                            : location.performance >= 80
                              ? "gradient-primary text-white"
                              : "gradient-warning text-white"
                        } px-3 py-1`}
                      >
                        {location.performance}% performance
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="gradient-success h-3 rounded-full transition-all duration-500 ease-out"
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
        <Card className="bg-card/95 backdrop-blur-sm hover-lift shadow-gradient border-0">
          <CardHeader>
            <CardTitle className="text-card-foreground gradient-text text-2xl">Market Insights</CardTitle>
            <p className="text-sm text-muted-foreground">Key trends and recommendations for strategic decisions</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 border border-border rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 gradient-success rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">Best Performing</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Beachfront properties show 95% performance with highest inquiry rates and premium pricing
                </p>
              </div>
              <div className="p-6 border border-border rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 gradient-secondary rounded-lg">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">High Interest</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Studio apartments receive 40% more views than average, indicating strong market demand
                </p>
              </div>
              <div className="p-6 border border-border rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 gradient-warning rounded-lg">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">Quick Sales</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Properties under $600k sell 60% faster than market average with higher conversion rates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}