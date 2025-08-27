"use client"

import DashboardLayout from "@/components/dashboard-layout"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Eye, Plus, Search, Filter } from "lucide-react"

const properties = [
  {
    id: 1,
    address: "123 Oak Street, Beverly Hills",
    price: "$1,250,000",
    status: "Active",
    type: "Single Family",
    bedrooms: 4,
    bathrooms: 3,
    sqft: "2,400",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    address: "456 Maple Ave, West Hollywood",
    price: "$850,000",
    status: "Pending",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    sqft: "1,200",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    address: "789 Pine Road, Santa Monica",
    price: "$2,100,000",
    status: "Active",
    type: "Single Family",
    bedrooms: 5,
    bathrooms: 4,
    sqft: "3,200",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    address: "321 Cedar Lane, Malibu",
    price: "$3,500,000",
    status: "Active",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    sqft: "4,800",
    image: "/placeholder.svg?height=200&width=300",
  },
]

function PropertiesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Properties</h1>
            <p className="text-slate-600 mt-1">Manage your property listings</p>
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
              Add Property
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white rounded-2xl"
            >
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.address}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={property.status === "Active" ? "default" : "secondary"}
                    className={
                      property.status === "Active"
                        ? "bg-emerald-500 text-white border-0"
                        : "bg-amber-500 text-white border-0"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {property.address}
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 mt-2">{property.price}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {property.type}
                    </span>
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.sqft} sqft</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
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

export default PropertiesPage
