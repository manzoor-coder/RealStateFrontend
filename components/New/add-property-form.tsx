"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Upload, X, Plus, MapPin, DollarSign, Home, Camera, User } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Basic Info", icon: Home },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Pricing & Features", icon: DollarSign },
  { id: 4, title: "Amenities", icon: Plus },
  { id: 5, title: "Images", icon: Camera },
  { id: 6, title: "Contact", icon: User },
]

const defaultAmenities = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Garden",
  "Balcony",
  "Air Conditioning",
  "Heating",
  "Internet",
  "Cable TV",
  "Dishwasher",
  "Washing Machine",
  "Elevator",
]

export function AddPropertyForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    description: "",
    type: "",
    purpose: "",
    status: "active",

    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: "",
    longitude: "",

    // Pricing & Features
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    furnished: false,
    rentPeriod: "",

    // Amenities
    amenities: [] as string[],
    customAmenities: [] as string[],

    // Images
    images: [] as File[],

    // Contact
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  })

  const [newAmenity, setNewAmenity] = useState("")

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    const current = formData.amenities
    if (current.includes(amenity)) {
      updateFormData(
        "amenities",
        current.filter((a) => a !== amenity),
      )
    } else {
      updateFormData("amenities", [...current, amenity])
    }
  }

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !formData.customAmenities.includes(newAmenity.trim())) {
      updateFormData("customAmenities", [...formData.customAmenities, newAmenity.trim()])
      updateFormData("amenities", [...formData.amenities, newAmenity.trim()])
      setNewAmenity("")
    }
  }

  const removeCustomAmenity = (amenity: string) => {
    updateFormData(
      "customAmenities",
      formData.customAmenities.filter((a) => a !== amenity),
    )
    updateFormData(
      "amenities",
      formData.amenities.filter((a) => a !== amenity),
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    updateFormData("images", [...formData.images, ...files])
  }

  const removeImage = (index: number) => {
    updateFormData(
      "images",
      formData.images.filter((_, i) => i !== index),
    )
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (isDraft = false) => {
    console.log("Form submitted:", { ...formData, isDraft })
    // Here you would typically send the data to your backend
    alert(isDraft ? "Property saved as draft!" : "Property published successfully!")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g., Luxury Downtown Apartment"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your property..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Property Type *</Label>
                <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="purpose">Purpose *</Label>
                <Select value={formData.purpose} onValueChange={(value) => updateFormData("purpose", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => updateFormData("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                  placeholder="NY"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude (Optional)</Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) => updateFormData("latitude", e.target.value)}
                  placeholder="40.7128"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude (Optional)</Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) => updateFormData("longitude", e.target.value)}
                  placeholder="-74.0060"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  placeholder={formData.purpose === "rent" ? "2500" : "750000"}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.purpose === "rent" ? "Monthly rent amount" : "Sale price"}
                </p>
              </div>
              <div>
                <Label htmlFor="area">Area (sq ft) *</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => updateFormData("area", e.target.value)}
                  placeholder="1200"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select value={formData.bedrooms} onValueChange={(value) => updateFormData("bedrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select value={formData.bathrooms} onValueChange={(value) => updateFormData("bathrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="parking">Parking Spaces</Label>
                <Select value={formData.parking} onValueChange={(value) => updateFormData("parking", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished"
                checked={formData.furnished}
                onCheckedChange={(checked) => updateFormData("furnished", checked)}
              />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
            {formData.purpose === "rent" && (
              <div>
                <Label htmlFor="rentPeriod">Rent Period</Label>
                <Select value={formData.rentPeriod} onValueChange={(value) => updateFormData("rentPeriod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label>Select Amenities</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {defaultAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="customAmenity">Add Custom Amenity</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="customAmenity"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Enter custom amenity"
                  onKeyPress={(e) => e.key === "Enter" && addCustomAmenity()}
                />
                <Button type="button" onClick={addCustomAmenity} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {formData.customAmenities.length > 0 && (
              <div>
                <Label>Custom Amenities</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.customAmenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="gap-1">
                      {amenity}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeCustomAmenity(amenity)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="images">Property Images</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                </label>
              </div>
            </div>
            {formData.images.length > 0 && (
              <div>
                <Label>Uploaded Images ({formData.images.length})</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/properties">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Properties
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Property</h1>
          <p className="text-muted-foreground">Fill in the details to list your property</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="ml-2 hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep === steps.length ? (
            <>
              <Button variant="outline" onClick={() => handleSubmit(true)}>
                Save as Draft
              </Button>
              <Button onClick={() => handleSubmit(false)}>Publish Property</Button>
            </>
          ) : (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
