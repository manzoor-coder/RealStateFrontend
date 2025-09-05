"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Grid, List, Building2 } from "lucide-react"
import Link from "next/link"

// Sample property data
const sampleProperties = [
  {
    id: 1,
    title: "Luxury Downtown Apartment",
    type: "Rent",
    status: "Active",
    price: "$2,500/month",
    location: "Downtown, NYC",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    image: "/modern-apartment.png",
    views: 156,
    inquiries: 12,
    dateAdded: "2024-08-15",
  },
  {
    id: 2,
    title: "Modern Family Villa",
    type: "Sale",
    status: "Active",
    price: "$750,000",
    location: "Suburbs, CA",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,800 sq ft",
    image: "/modern-family-house-exterior.jpg",
    views: 89,
    inquiries: 8,
    dateAdded: "2024-08-10",
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    type: "Rent",
    status: "Pending",
    price: "$1,800/month",
    location: "Midtown, NYC",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq ft",
    image: "/cozy-studio-apartment.png",
    views: 234,
    inquiries: 18,
    dateAdded: "2024-07-28",
  },
  {
    id: 4,
    title: "Beachfront Condo",
    type: "Sale",
    status: "Active",
    price: "$950,000",
    location: "Miami Beach, FL",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    image: "/beachfront-condo-balcony-view.jpg",
    views: 312,
    inquiries: 25,
    dateAdded: "2024-07-20",
  },
  {
    id: 5,
    title: "Suburban Townhouse",
    type: "Rent",
    status: "Rejected",
    price: "$3,200/month",
    location: "Westchester, NY",
    bedrooms: 3,
    bathrooms: 2.5,
    area: "2,100 sq ft",
    image: "/suburban-townhouse-exterior.jpg",
    views: 67,
    inquiries: 4,
    dateAdded: "2024-07-15",
  },
  {
    id: 6,
    title: "City Loft",
    type: "Sale",
    status: "Active",
    price: "$580,000",
    location: "Brooklyn, NY",
    bedrooms: 2,
    bathrooms: 1,
    area: "1,100 sq ft",
    image: "/industrial-city-loft-interior.jpg",
    views: 145,
    inquiries: 9,
    dateAdded: "2024-06-30",
  },
]

export function PropertiesManagement() {
  const [properties, setProperties] = useState(sampleProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [sortBy, setSortBy] = useState("dateAdded")

  // Filter and search logic
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || property.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || property.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  // Sort logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "price":
        const priceA = Number.parseInt(a.price.replace(/[^0-9]/g, ""))
        const priceB = Number.parseInt(b.price.replace(/[^0-9]/g, ""))
        return priceB - priceA
      case "views":
        return b.views - a.views
      case "dateAdded":
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "pending":
        return "bg-chart-4 text-white"
      case "rejected":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    return type.toLowerCase() === "rent" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Properties</h1>
          <p className="text-muted-foreground">Manage and track your property listings</p>
        </div>
        <Link href="/properties/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedProperties.length} of {properties.length} properties
      </div>

      {/* Properties Display */}
      {viewMode === "table" ? (
        <Card className="bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Inquiries</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="h-12 w-16 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-card-foreground">{property.title}</div>
                        <div className="text-sm text-muted-foreground">{property.location}</div>
                        <div className="text-xs text-muted-foreground">
                          {property.bedrooms} bed • {property.bathrooms} bath • {property.area}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(property.type)}>{property.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{property.price}</TableCell>
                  <TableCell>{property.views}</TableCell>
                  <TableCell>{property.inquiries}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedProperties.map((property) => (
            <Card key={property.id} className="bg-card overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge className={getTypeColor(property.type)}>{property.type}</Badge>
                  <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-card-foreground mb-1">{property.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  {property.bedrooms} bed • {property.bathrooms} bath • {property.area}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-card-foreground">{property.price}</span>
                  <div className="text-xs text-muted-foreground">
                    {property.views} views • {property.inquiries} inquiries
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {sortedProperties.length === 0 && (
        <Card className="bg-card">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first property"}
            </p>
            <Link href="/properties/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
