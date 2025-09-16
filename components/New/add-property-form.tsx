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
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Property Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g., Luxury Downtown Apartment"
                className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your property..."
                rows={4}
                className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="type" className="text-sm font-medium text-foreground">
                  Property Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                  <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
                <Label htmlFor="purpose" className="text-sm font-medium text-foreground">
                  Purpose *
                </Label>
                <Select value={formData.purpose} onValueChange={(value) => updateFormData("purpose", value)}>
                  <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
              <Label htmlFor="status" className="text-sm font-medium text-foreground">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => updateFormData("status", value)}>
                <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-foreground">
                Street Address *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="123 Main Street"
                className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city" className="text-sm font-medium text-foreground">
                  City *
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  placeholder="New York"
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-medium text-foreground">
                  State *
                </Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                  placeholder="NY"
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="zipCode" className="text-sm font-medium text-foreground">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  placeholder="10001"
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="latitude" className="text-sm font-medium text-foreground">
                  Latitude (Optional)
                </Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) => updateFormData("latitude", e.target.value)}
                  placeholder="40.7128"
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
              </div>
              <div>
                <Label htmlFor="longitude" className="text-sm font-medium text-foreground">
                  Longitude (Optional)
                </Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) => updateFormData("longitude", e.target.value)}
                  placeholder="-74.0060"
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price" className="text-sm font-medium text-foreground">
                  Price *
                </Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  placeholder={formData.purpose === "rent" ? "2500" : "750000"}
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.purpose === "rent" ? "Monthly rent amount" : "Sale price"}
                </p>
              </div>
              <div>
                <Label htmlFor="area" className="text-sm font-medium text-foreground">
                  Area (sq ft) *
                </Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => updateFormData("area", e.target.value)}
                  placeholder="1200"
                  className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="bedrooms" className="text-sm font-medium text-foreground">
                  Bedrooms
                </Label>
                <Select value={formData.bedrooms} onValueChange={(value) => updateFormData("bedrooms", value)}>
                  <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
                <Label htmlFor="bathrooms" className="text-sm font-medium text-foreground">
                  Bathrooms
                </Label>
                <Select value={formData.bathrooms} onValueChange={(value) => updateFormData("bathrooms", value)}>
                  <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
                <Label htmlFor="parking" className="text-sm font-medium text-foreground">
                  Parking Spaces
                </Label>
                <Select value={formData.parking} onValueChange={(value) => updateFormData("parking", value)}>
                  <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
              <Label htmlFor="furnished" className="text-sm font-medium text-foreground">
                Furnished
              </Label>
            </div>
            {formData.purpose === "rent" && (
              <div>
                <Label htmlFor="rentPeriod" className="text-sm font-medium text-foreground">
                  Rent Period
                </Label>
                <Select value={formData.rentPeriod} onValueChange={(value) => updateFormData("rentPeriod", value)}>
                  <SelectTrigger className="mt-2 hover-lift transition-all duration-300">
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-sm font-medium text-foreground">Select Amenities</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {defaultAmenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm font-medium cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="customAmenity" className="text-sm font-medium text-foreground">
                Add Custom Amenity
              </Label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="customAmenity"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Enter custom amenity"
                  onKeyPress={(e) => e.key === "Enter" && addCustomAmenity()}
                  className="hover-lift transition-all duration-300 focus:shadow-gradient-blue"
                />
                <Button
                  type="button"
                  onClick={addCustomAmenity}
                  size="sm"
                  className="gradient-primary text-white hover-lift"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {formData.customAmenities.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-foreground">Custom Amenities</Label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.customAmenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="gap-2 px-3 py-1 hover-lift">
                      {amenity}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeCustomAmenity(amenity)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label htmlFor="images" className="text-sm font-medium text-foreground">
                Property Images
              </Label>
              <div className="mt-3">
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
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 hover-lift transition-all duration-300 gradient-hero text-white"
                >
                  <Upload className="h-10 w-10 mb-3" />
                  <p className="text-lg font-medium">Click to upload images</p>
                  <p className="text-sm opacity-90">PNG, JPG up to 10MB each</p>
                </label>
              </div>
            </div>
            {formData.images.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Uploaded Images ({formData.images.length})
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative group hover-lift">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-gradient"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
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
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label htmlFor="contactName" className="text-sm font-medium text-foreground">
                Contact Name *
              </Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                placeholder="John Doe"
                className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="text-sm font-medium text-foreground">
                Contact Email *
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="john@example.com"
                className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone" className="text-sm font-medium text-foreground">
                Contact Phone *
              </Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="mt-2 hover-lift transition-all duration-300 focus:shadow-gradient-blue"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-6 animate-fade-in">
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="hover-lift">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold gradient-text-primary text-balance">Add New Property</h1>
            <p className="text-muted-foreground text-lg mt-2">Fill in the details to list your property</p>
          </div>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm shadow-gradient hover-lift animate-fade-in">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "gradient-primary border-transparent text-white shadow-gradient-blue"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-6 rounded-full transition-all duration-500 ${
                        currentStep > step.id ? "gradient-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm shadow-gradient hover-lift animate-fade-in">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl gradient-text-primary">
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">{renderStepContent()}</CardContent>
        </Card>

        <div className="flex justify-between items-center animate-fade-in">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="hover-lift disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-4">
            {currentStep === steps.length ? (
              <>
                <Button variant="outline" onClick={() => handleSubmit(true)} className="hover-lift">
                  Save as Draft
                </Button>
                <Button
                  onClick={() => handleSubmit(false)}
                  className="gradient-success text-white hover-lift shadow-gradient-teal"
                >
                  Publish Property
                </Button>
              </>
            ) : (
              <Button onClick={nextStep} className="gradient-primary text-white hover-lift shadow-gradient-blue">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
