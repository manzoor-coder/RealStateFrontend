"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  MapPin,
  DollarSign,
  Home,
  Camera,
  CheckCircle,
  X,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast"
import { FaPlus, FaTrash } from "react-icons/fa";
import type { AddProperty } from "@/types";
import { userApi } from "@/lib/api/user";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import { propertyApi } from "@/lib/api/property";

interface FormData {
  title: string;
  description: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  floorNumber: string;
  parkingSpaces: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  price: string;
  currency: string;
  amenities: string[];
  status: string;
  type: string;
  purpose: string;
  propertyType: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  availableFrom: string;
  rentPeriod: string;
  heatingSystem: string;
  coolingSystem: string;
  latitude: string;
  longitude: string;
  isFurnished: boolean;
  images: File[];
  agents: string[];
}

export function PropertyListingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  // const { toast } = useToast()
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  console.log("user id is", user?.id);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    floorNumber: "",
    parkingSpaces: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    price: "",
    currency: "USD",
    amenities: [],
    status: "pending",
    type: "sale",
    purpose: "residential",
    propertyType: "apartment",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    availableFrom: "",
    rentPeriod: "",
    heatingSystem: "",
    coolingSystem: "",
    latitude: "",
    longitude: "",
    isFurnished: false,
    images: [],
    agents: [],
  });

  const commonAmenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Garden",
    "Balcony",
    "Air Conditioning",
    "Heating",
    "Security",
    "Elevator",
    "Furnished",
    "Pet Friendly",
    "Internet",
  ];

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  useEffect(() => {
    const fetchApprovedAgents = async () => {
      try {
        const response = await userApi.usersList();
        const filteredUsers =
          response?.data?.users?.filter((user: any) =>
            user.roles?.includes(5)
          ) || [];
        setUsers(filteredUsers);
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Error fetching agents: ${error.message}`,
          variant: "destructive",
        });
      }
    };
    fetchApprovedAgents();
  }, [toast]);

  // Cleanup URL objects when component unmounts or images change
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleAgentToggle = (agentId: string) => {
    const currentAgents = formData.agents;
    const updatedAgents = currentAgents.includes(agentId)
      ? currentAgents.filter((id) => id !== agentId)
      : [...currentAgents, agentId];

    handleInputChange("agents", updatedAgents);
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[] | File[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim())
          newErrors.title = "Property title is required";
        if (!formData.description.trim())
          newErrors.description = "Property description is required";
        if (!formData.propertyType)
          newErrors.propertyType = "Property type is required";
        if (!formData.type) newErrors.type = "Listing type is required";
        break;
      case 2:
        if (!formData.address.trim())
          newErrors.address = "Street address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.zipCode.trim())
          newErrors.zipCode = "ZIP code is required";
        break;
      case 3:
        if (!formData.price.trim()) newErrors.price = "Price is required";
        if (!formData.area.trim()) newErrors.area = "Square feet is required";
        if (!formData.bedrooms.trim())
          newErrors.bedrooms = "Number of bedrooms is required";
        if (!formData.bathrooms.trim())
          newErrors.bathrooms = "Number of bathrooms is required";
        break;
      case 4:
        if (!formData.contactName.trim())
          newErrors.contactName = "Your name is required";
        if (!formData.contactEmail.trim())
          newErrors.contactEmail = "Email address is required";
        if (!formData.contactNumber.trim())
          newErrors.contactNumber = "Phone number is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemovePreview = (index: number) => {
    setPreviewImages((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //  const stringUser = localStorage.getItem("user")
  // if(stringUser) {
  //   const user = JSON.parse(stringUser);
  //   const userId = user.id
  //   console.log("user from local storage", userId);
  // }
      const formDataToUpload = new FormData();

      if (selectedFiles.length === 0) {
        toast({
          title: "Error",
          description: "Please select at least one image file",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Append selected files
      selectedFiles.forEach((file) => {
        formDataToUpload.append("files", file);
      });

      const propertyData: AddProperty = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price) || 0,
        area: Number(formData.area) || 0,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        parkingSpaces: Number(formData.parkingSpaces) || 0,
        floorNumber: Number(formData.floorNumber) || 0,
        propertyType: [
          "apartment",
          "house",
          "condo",
          "townhouse",
          "villa",
          "office",
          "retail",
        ].includes(formData.propertyType)
          ? (formData.propertyType as
              | "apartment"
              | "house"
              | "condo"
              | "townhouse"
              | "villa"
              | "office"
              | "retail")
          : "apartment",
        type: ["sale", "rent"].includes(formData.type)
          ? (formData.type as "sale" | "rent")
          : "sale",
        availableFrom: formData.availableFrom
          ? new Date(formData.availableFrom).toISOString()
          : undefined,
        ownerId: user?.id || "current-user-id",
        agents: formData.agents,
        amenities: formData.amenities,
        ...(formData.latitude && formData.longitude
          ? {
              location: {
                type: "Point",
                coordinates: [
                  Number(formData.longitude),
                  Number(formData.latitude),
                ],
              },
            }
          : {}),
      };

      formDataToUpload.append("data", JSON.stringify(propertyData));

      // 🔎 Debug block
      console.log("==== FormData Debug Start ====");
      for (const [key, value] of formDataToUpload.entries()) {
        console.log(key, value);
      }
      console.log("==== FormData Debug End ====");

      // Uncomment when API is ready
      await propertyApi.create(formDataToUpload);

      setSelectedFiles([]);
      setPreviewImages([]);
      setFormData({
        title: "",
        description: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        floorNumber: "",
        parkingSpaces: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        price: "",
        currency: "USD",
        amenities: [],
        status: "pending",
        type: "sale",
        purpose: "residential",
        propertyType: "apartment",
        contactName: "",
        contactEmail: "",
        contactNumber: "",
        availableFrom: "",
        rentPeriod: "",
        heatingSystem: "",
        coolingSystem: "",
        latitude: "",
        longitude: "",
        isFurnished: false,
        images: [],
        agents: [],
      });

      toast({
        title: "Success",
        description: "Property added successfully!",
      });
    } catch (error: any) {
      console.error("Failed to add property:", error);
      toast({
        title: "Error",
        description: `Failed to add property: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            List Your Property
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Complete our simple form to get your property listed and start
            receiving offers from qualified buyers
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    i + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : i + 1 === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1 < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      i + 1 < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Property Details
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Step {currentStep} of {totalSteps}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Property Information
                      </h3>
                      <p className="text-sm text-gray-500">
                        Tell us about your property
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Property Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="e.g., Luxurious Downtown Apartment with City Views"
                      className={`h-12 ${errors.title ? "border-red-500" : ""}`}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Property Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Describe your property's best features, recent updates, and unique selling points..."
                      rows={6}
                      className={`resize-none ${
                        errors.description ? "border-red-500" : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                   <div className="">
                    <Label
                      htmlFor="availableFrom"
                      className="text-sm font-medium text-gray-700 mb-3"
                    >
                      Available From
                    </Label>
                    <Input
                      id="availableFrom"
                      name="availableFrom"
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) =>
                        handleInputChange("availableFrom", e.target.value)
                      }
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Property Type *
                      </Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          handleInputChange("propertyType", value)
                        }
                      >
                        <SelectTrigger
                          className={`h-12 ${
                            errors.propertyType ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.propertyType && (
                        <p className="text-sm text-red-500">
                          {errors.propertyType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Listing Type *
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          handleInputChange("type", value)
                        }
                      >
                        <SelectTrigger
                          className={`h-12 ${
                            errors.type ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select listing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-500">{errors.type}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      {formData.type === "rent" && (
                        <>
                          <Label className="text-sm font-medium text-gray-700">
                            Rent Period
                          </Label>
                          <Select
                            value={formData.rentPeriod}
                            onValueChange={(value) =>
                              handleInputChange("rentPeriod", value)
                            }
                          >
                            <SelectTrigger
                              className={`h-12 ${
                                errors.type ? "border-red-500" : ""
                              }`}
                            >
                              <SelectValue placeholder="Select listing type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearl">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.type && (
                            <p className="text-sm text-red-500">
                              {errors.type}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                 
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Location Details
                      </h3>
                      <p className="text-sm text-gray-500">
                        Where is your property located?
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Street Address *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="123 Main Street"
                      className={`h-12 ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-sm font-medium text-gray-700"
                      >
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="City"
                        className={`h-12 ${
                          errors.city ? "border-red-500" : ""
                        }`}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="state"
                        className="text-sm font-medium text-gray-700"
                      >
                        State *
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        placeholder="State"
                        className={`h-12 ${
                          errors.state ? "border-red-500" : ""
                        }`}
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">{errors.state}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="zipCode"
                        className="text-sm font-medium text-gray-700"
                      >
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        placeholder="12345"
                        className={`h-12 ${
                          errors.zipCode ? "border-red-500" : ""
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-red-500">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="longitude"
                        className="text-sm font-medium text-gray-700"
                      >
                        Longitude (Optional)
                      </Label>
                      <Input
                        id="longitude"
                        value={formData.longitude}
                        onChange={(e) =>
                          handleInputChange("longitude", e.target.value)
                        }
                        placeholder="-74.0060"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="latitude"
                        className="text-sm font-medium text-gray-700"
                      >
                        Latitude (Optional)
                      </Label>
                      <Input
                        id="latitude"
                        value={formData.latitude}
                        onChange={(e) =>
                          handleInputChange("latitude", e.target.value)
                        }
                        placeholder="40.7128"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pricing & Features
                      </h3>
                      <p className="text-sm text-gray-500">
                        Set your price and property details
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-700"
                      >
                        {formData.type === "rent"
                          ? "Monthly Rent"
                          : "Asking Price"}{" "}
                        *
                      </Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange("price", e.target.value)
                        }
                        placeholder="500000"
                        type="number"
                        className={`h-12 ${
                          errors.price ? "border-red-500" : ""
                        }`}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-500">{errors.price}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="area"
                        className="text-sm font-medium text-gray-700"
                      >
                        Square Feet *
                      </Label>
                      <Input
                        id="area"
                        value={formData.area}
                        onChange={(e) =>
                          handleInputChange("area", e.target.value)
                        }
                        placeholder="2500"
                        type="number"
                        className={`h-12 ${
                          errors.area ? "border-red-500" : ""
                        }`}
                      />
                      {errors.area && (
                        <p className="text-sm text-red-500">{errors.area}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Currency
                      </Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) =>
                          handleInputChange("currency", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="bedrooms"
                        className="text-sm font-medium text-gray-700"
                      >
                        Bedrooms *
                      </Label>
                      <Input
                        id="bedrooms"
                        value={formData.bedrooms}
                        onChange={(e) =>
                          handleInputChange("bedrooms", e.target.value)
                        }
                        type="number"
                        placeholder="3"
                        min="0"
                        className={`h-12 ${
                          errors.bedrooms ? "border-red-500" : ""
                        }`}
                      />
                      {errors.bedrooms && (
                        <p className="text-sm text-red-500">
                          {errors.bedrooms}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="bathrooms"
                        className="text-sm font-medium text-gray-700"
                      >
                        Bathrooms *
                      </Label>
                      <Input
                        id="bathrooms"
                        value={formData.bathrooms}
                        onChange={(e) =>
                          handleInputChange("bathrooms", e.target.value)
                        }
                        type="number"
                        placeholder="2"
                        min="0"
                        step="0.5"
                        className={`h-12 ${
                          errors.bathrooms ? "border-red-500" : ""
                        }`}
                      />
                      {errors.bathrooms && (
                        <p className="text-sm text-red-500">
                          {errors.bathrooms}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="parkingSpaces"
                        className="text-sm font-medium text-gray-700"
                      >
                        Parking Spaces
                      </Label>
                      <Input
                        id="parkingSpaces"
                        value={formData.parkingSpaces}
                        onChange={(e) =>
                          handleInputChange("parkingSpaces", e.target.value)
                        }
                        type="number"
                        placeholder="2"
                        min="0"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Select Agents
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                        {users.map((user) => (
                          <div
                            key={user._id}
                            className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <Checkbox
                              id={`agent-${user._id}`}
                              checked={formData.agents.includes(user._id)}
                              onCheckedChange={() =>
                                handleAgentToggle(user._id)
                              }
                            />
                            <Label
                              htmlFor={`agent-${user._id}`}
                              className="text-sm font-medium cursor-pointer flex-1"
                            >
                              {user.firstName} {user.lastName}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {formData.agents.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.agents.map((agentId) => {
                            const agent = users.find((u) => u._id === agentId);
                            return (
                              <div
                                key={agentId}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm"
                              >
                                {agent
                                  ? `${agent.firstName} ${agent.lastName}`
                                  : agentId}
                                <button
                                  type="button"
                                  onClick={() => handleAgentToggle(agentId)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="space-y-4">
                      <Select
                        value=""
                        onValueChange={(value) => {
                          if (value && !formData.amenities.includes(value)) {
                            handleInputChange("amenities", [
                              ...formData.amenities,
                              value,
                            ]);
                          }
                        }}
                      >
                        <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 w-full">
                          <SelectValue placeholder="Select or search amenities..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-60 overflow-auto">
                          {commonAmenities
                            .filter((amenity) =>
                              amenity
                                .toLowerCase()
                                .includes(
                                  (
                                    document.activeElement as HTMLInputElement
                                  )?.value?.toLowerCase() || ""
                                )
                            )
                            .map((amenity) => (
                              <SelectItem
                                key={amenity}
                                value={amenity}
                                className="hover:bg-amber-50"
                              >
                                {amenity}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <div className="flex gap-2">
                        <Input
                          value={newAmenity}
                          onChange={(e) => setNewAmenity(e.target.value)}
                          placeholder="Add custom amenity"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && newAmenity.trim()) {
                              e.preventDefault();
                              if (
                                !formData.amenities.includes(newAmenity.trim())
                              ) {
                                handleInputChange("amenities", [
                                  ...formData.amenities,
                                  newAmenity.trim(),
                                ]);
                                setNewAmenity("");
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            if (
                              newAmenity.trim() &&
                              !formData.amenities.includes(newAmenity.trim())
                            ) {
                              handleInputChange("amenities", [
                                ...formData.amenities,
                                newAmenity.trim(),
                              ]);
                              setNewAmenity("");
                            }
                          }}
                          variant="outline"
                        >
                          <FaPlus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="px-3 py-2 gap-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-800 transition-all"
                          >
                            {amenity}
                            <span
                              className="cursor-pointer text-red-300 hover:text-red-600"
                              onClick={() =>
                                handleInputChange(
                                  "amenities",
                                  formData.amenities.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                            >
                              <FaTrash className="text-sm" />
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Camera className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Photos & Contact
                      </h3>
                      <p className="text-sm text-gray-500">
                        Add photos and your contact information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Property Photos
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag and drop photos here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Upload up to 10 photos (JPG, PNG, max 5MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="h-10"
                      >
                        Choose Files
                      </Button>
                    </div>
                    {previewImages.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {previewImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-400"
                            />
                            <span
                              className="absolute -top-1 -right-1 text-white rounded-full p-1 bg-red-400 border border-red-600 hover:bg-red-600 cursor-pointer"
                              onClick={() => handleRemovePreview(index)}
                            >
                              <FaTrash className="w-3 h-3" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Name *
                      </Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) =>
                          handleInputChange("contactName", e.target.value)
                        }
                        placeholder="John Doe"
                        className={`h-12 ${
                          errors.contactName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.contactName && (
                        <p className="text-sm text-red-500">
                          {errors.contactName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) =>
                          handleInputChange("contactNumber", e.target.value)
                        }
                        placeholder="(555) 123-4567"
                        className={`h-12 ${
                          errors.contactNumber ? "border-red-500" : ""
                        }`}
                      />
                      {errors.contactNumber && (
                        <p className="text-sm text-red-500">
                          {errors.contactNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contactEmail"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      type="email"
                      placeholder="john@example.com"
                      className={`h-12 ${
                        errors.contactEmail ? "border-red-500" : ""
                      }`}
                    />
                    {errors.contactEmail && (
                      <p className="text-sm text-red-500">
                        {errors.contactEmail}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-8 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="h-12 px-6 bg-transparent"
                >
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-12 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Listing"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
