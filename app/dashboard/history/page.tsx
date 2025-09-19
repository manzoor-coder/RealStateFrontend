"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Home, DollarSign, TrendingUp, Filter, Download, Search } from "lucide-react"

// Mock data for property transactions
const mockTransactions = [
  {
    id: 1,
    propertyName: "Sunset Villa",
    address: "123 Ocean Drive, Miami, FL",
    type: "sold",
    date: "2024-01-15",
    price: 850000,
    buyer: "John & Sarah Mitchell",
    agent: "Maria Rodriguez",
    description: "Luxury beachfront villa with panoramic ocean views",
    image: "/luxury-villa-sunset-ocean-view.jpg",
  },
  {
    id: 2,
    propertyName: "Downtown Loft",
    address: "456 Main Street, New York, NY",
    type: "rented",
    date: "2024-02-20",
    price: 3500,
    tenant: "Tech Startup Inc.",
    agent: "David Chen",
    description: "Modern loft space perfect for creative professionals",
    image: "/modern-downtown-loft.png",
  },
  {
    id: 3,
    propertyName: "Garden Townhouse",
    address: "789 Elm Avenue, Austin, TX",
    type: "sold",
    date: "2024-03-10",
    price: 425000,
    buyer: "The Johnson Family",
    agent: "Lisa Thompson",
    description: "Charming townhouse with private garden and garage",
    image: "/townhouse-garden-suburban-home.jpg",
  },
  {
    id: 4,
    propertyName: "Penthouse Suite",
    address: "321 Sky Tower, Los Angeles, CA",
    type: "rented",
    date: "2024-04-05",
    price: 8500,
    tenant: "Celebrity Client",
    agent: "Michael Park",
    description: "Exclusive penthouse with city skyline views",
    image: "/img2.jpg",
  },
  {
    id: 5,
    propertyName: "Suburban Family Home",
    address: "654 Maple Street, Denver, CO",
    type: "sold",
    date: "2024-05-12",
    price: 675000,
    buyer: "Robert & Emma Wilson",
    agent: "Jennifer Adams",
    description: "Spacious family home in quiet neighborhood",
    image: "/img1.jpg",
  },
]

export default function PropertyHistoryPage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesType = filterType === "all" || transaction.type === filterType
      const matchesSearch =
        transaction.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.address.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesType && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "price") return b.price - a.price
      return a.propertyName.localeCompare(b.propertyName)
    })

  // Calculate statistics
  const totalSold = transactions.filter((t) => t.type === "sold").length
  const totalRented = transactions.filter((t) => t.type === "rented").length
  const totalRevenue = transactions.reduce((sum, t) => sum + t.price, 0)
  const avgPrice = totalRevenue / transactions.length

  const formatPrice = (price: number, type: string) => {
    return (
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(price) + (type === "rented" ? "/month" : "")
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen gradient-purple">
      {/* Header Section */}
      <div className="gradient-primary text-white py-16 relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-shadow-xl text-white">
              Property Transaction History
            </h1>
            <p className="text-xl md:text-2xl text-white/95 text-pretty leading-relaxed text-shadow-lg">
              Your transparent journey in property ownership - track all your sold and rented properties with complete
              transparency
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        

        {/* Filters and Search */}
        <Card className="mb-12 shadow-gradient border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="gradient-primary p-2 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              Filter & Search Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search properties by name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base border-2 focus:border-primary/50 bg-white/80"
                  />
                </div>
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-52 h-12 border-2 bg-white/80">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sold">Sold Only</SelectItem>
                  <SelectItem value="rented">Rented Only</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-52 h-12 border-2 bg-white/80">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="price">Price (Highest)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              {/* <Button className="gradient-primary hover:shadow-lg transition-all duration-300 h-12 px-6">
                <Download className="h-4 w-4 mr-2" />
                Export History
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold gradient-text-primary">Transaction History</h2>
            <p className="text-muted-foreground text-lg">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </div>

          <div className="grid gap-8">
            {filteredTransactions.map((transaction, index) => (
              <Card
                key={transaction.id}
                className="overflow-hidden hover-lift shadow-gradient p-0 border-0 bg-white/95 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="md:flex">
                  <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={transaction.image || "/placeholder.svg"}
                      alt={transaction.propertyName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="flex-1 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 gradient-text-primary">{transaction.propertyName}</h3>
                        <p className="text-muted-foreground mb-3 text-lg">{transaction.address}</p>
                        <p className="text-muted-foreground leading-relaxed">{transaction.description}</p>
                      </div>

                      <Badge
                        className={`ml-6 px-4 py-2 text-sm font-semibold ${
                          transaction.type === "sold"
                            ? "gradient-success text-white border-0"
                            : "gradient-secondary text-white border-0"
                        }`}
                      >
                        {transaction.type === "sold" ? "SOLD" : "RENTED"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-gray-50/80 p-4 rounded-xl">
                        <p className="text-muted-foreground text-sm font-medium mb-1">Transaction Date</p>
                        <p className="font-semibold text-lg">{formatDate(transaction.date)}</p>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl">
                        <p className="text-muted-foreground text-sm font-medium mb-1">Price</p>
                        <p className="font-bold text-2xl gradient-text-primary">
                          {formatPrice(transaction.price, transaction.type)}
                        </p>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl">
                        <p className="text-muted-foreground text-sm font-medium mb-1">Agent</p>
                        <p className="font-semibold text-lg">{transaction.agent}</p>
                      </div>
                    </div>

                    <div className="border-t-2 border-gray-100 pt-6">
                      <p className="text-muted-foreground text-sm font-medium mb-2">
                        {transaction.type === "sold" ? "Buyer" : "Tenant"}
                      </p>
                      <p className="font-semibold text-lg">
                        {transaction.type === "sold" ? transaction.buyer : transaction.tenant}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <Card className="p-16 text-center shadow-gradient border-0 bg-white/95 backdrop-blur-sm">
              <div className="gradient-primary p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Home className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text-primary">No transactions found</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                Try adjusting your search criteria or filters to find more results. Your property history will appear
                here once transactions are recorded.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
