"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { FiX, FiHome, FiMapPin, FiDollarSign, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { propertyApi } from "@/lib/api/property";
import { AddProperty } from "@/types";
import { FaPlus, FaTrash } from "react-icons/fa";
import AutoImageSlider from "../common/AutoImageSlider";
import { Badge } from "../ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { userApi } from "@/lib/api/user";
import { AuthContext } from "@/contexts/AuthContext";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (propertyData: AddProperty) => void;
}

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
  images: string[];
  agents: string[];
}

export default function AddPropertyModal({
  isOpen,
  onClose,
  onAdd,
}: AddPropertyModalProps) {
  const [newAmenity, setNewAmenity] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  // const [test, setTest] = useState<string[]>([]);
  const authContext = useContext(AuthContext);
    const user = authContext?.user;
  
    // console.log("user id is", user?.id);

  console.log("images selected, ", selectedFiles);
  // console.log("Test data images", test);

  // useEffect(() => {
  //   if (selectedFiles.length > 0) {
  //     const newFileNames = selectedFiles.map((file) => file.name);
  //     setTest(newFileNames);
  //   }
  // }, [selectedFiles]);

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
        toast.error(`Error fetching agents: ${error.message}`);
      }
    };
    fetchApprovedAgents();
  }, []);

  // Select files and show preview (no upload yet)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      toast.error("No file selected");
      return;
    }

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // Upload all selected images
  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select images first");
      return;
    }

    const formDataToUpload = new FormData();
    selectedFiles.forEach((file) => formDataToUpload.append("files", file));

    try {
      const response = await propertyApi.uploadImages(formDataToUpload);
      const newImages = response.data.images || [];

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));

      setSelectedFiles([]); // reset after upload
      setPreviewImages([]);
      toast.success("Images uploaded successfully");
    } catch (error: any) {
      toast.error(
        `Failed to upload image: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Remove image before upload
  const handleRemovePreview = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmenitiesChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents((prev) => {
      const newSelected = prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId];
      setFormData((prevForm) => ({
        ...prevForm,
        agents: newSelected, // Directly use newSelected
      }));
      console.log("Selected Agents:", newSelected);
      return newSelected;
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToUpload = new FormData(e.currentTarget); // ✅ capture form inputs automatically

      if (selectedFiles.length === 0) {
        toast.error("Please select image files first");
        return;
      }

      // Append selected files
      selectedFiles.forEach((file) => {
        formDataToUpload.append("files", file);
      });

      // Build propertyData from FormData
      const propertyData: AddProperty = {
        title: formDataToUpload.get("title") as string,
        price: Number(formDataToUpload.get("price")) || 0,
        area: Number(formDataToUpload.get("area")) || 0,
        bedrooms: Number(formDataToUpload.get("bedrooms")) || 0,
        bathrooms: Number(formDataToUpload.get("bathrooms")) || 0,
        parkingSpaces: Number(formDataToUpload.get("parkingSpaces")) || 0,
        floorNumber: Number(formDataToUpload.get("floorNumber")) || 0,
        propertyType: [
          "apartment",
          "house",
          "condo",
          "townhouse",
          "villa",
          "office",
          "retail",
        ].includes(formDataToUpload.get("propertyType") as string)
          ? (formDataToUpload.get("propertyType") as
              | "apartment"
              | "house"
              | "condo"
              | "townhouse"
              | "villa"
              | "office"
              | "retail")
          : "apartment",
        type: ["sale", "rent"].includes(formDataToUpload.get("type") as string)
          ? (formDataToUpload.get("type") as "sale" | "rent")
          : "sale",
        availableFrom: formDataToUpload.get("availableFrom")
          ? new Date(
              formDataToUpload.get("availableFrom") as string
            ).toISOString()
          : undefined,
        ownerId: user?.id || "current-user-id",
        agents: selectedAgents,
        amenities: formDataToUpload.getAll("amenities") as string[],
        ...(formDataToUpload.get("latitude") &&
        formDataToUpload.get("longitude")
          ? {
              location: {
                type: "Point",
                coordinates: [
                  Number(formDataToUpload.get("longitude")),
                  Number(formDataToUpload.get("latitude")),
                ],
              },
            }
          : {}),
      };

      // Append property JSON as string
      formDataToUpload.append("data", JSON.stringify(propertyData));

      // console.log("Form Data to Upload:", [...formDataToUpload.entries()]);

      onAdd(formDataToUpload as unknown as AddProperty);
      // Reset state
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
      setSelectedAgents([]);
      setPreviewImage(null);
      onClose();

      // toast.success("Property added successfully!");
    } catch (error: any) {
      console.error("Failed to add property:", error);
      toast.error(`Failed to add property: ${error.message}`);
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto bg-white border-2 border-blue-200">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <FiHome className="text-blue-600" />
            Add New Property
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-0 top-0 text-gray-500 hover:text-gray-700 hover:bg-red-100"
          >
            <FiX className="h-4 w-4" />
          </Button>
        </DialogHeader>


        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Property Images
          </h3>

          {/* Already uploaded images */}
          {formData.images.length > 0 && (
            <>
              <AutoImageSlider
                images={formData.images.map((img) => ({
                  src: `${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`,
                  alt: formData.title || "Property Image",
                }))}
                height={200}
                className="w-full rounded-lg"
                interval={5000}
              />
              <div className="flex flex-wrap gap-4 mt-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                      alt={`${formData.title || "Property"} Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-400 hover:border-gray-600"
                    />
                    <span
                      className="absolute -top-1 -right-1 text-white rounded-full p-1 bg-red-400 border border-red-600 hover:bg-red-600 cursor-pointer"
                      // onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* File input + preview before upload */}
          <div className="space-y-2">
            <Label htmlFor="imageUpload">Select New Images</Label>
            <div className="flex flex-wrap gap-2">
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" /> Choose Images
              </Button>
            </div>

            {/* Previews before uploading */}
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <FiHome className="text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-blue-700 font-medium">
                  Property Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label
                  htmlFor="description"
                  className="text-blue-700 font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 min-h-[100px]"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-blue-700 font-medium">
                  Listing Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="sale" className="hover:bg-blue-50">
                      For Sale
                    </SelectItem>
                    <SelectItem value="rent" className="hover:bg-blue-50">
                      For Rent
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* 🔥 Fix: Hidden input for FormData */}
                <input type="hidden" name="type" value={formData.type} />
              </div>
              <div>
                <Label
                  htmlFor="propertyType"
                  className="text-blue-700 font-medium"
                >
                  Property Type
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    handleInputChange("propertyType", value)
                  }
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="apartment" className="hover:bg-amber-50">
                      Apartment
                    </SelectItem>
                    <SelectItem value="house" className="hover:bg-amber-50">
                      House
                    </SelectItem>
                    <SelectItem value="condo" className="hover:bg-amber-50">
                      Condo
                    </SelectItem>
                    <SelectItem value="townhouse" className="hover:bg-amber-50">
                      Townhouse
                    </SelectItem>
                    <SelectItem value="villa" className="hover:bg-amber-50">
                      Villa
                    </SelectItem>
                    <SelectItem value="office" className="hover:bg-amber-50">
                      Office
                    </SelectItem>
                    <SelectItem value="retail" className="hover:bg-amber-50">
                      Retail
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* 🔥 Fix: Hidden input for FormData */}
                <input type="hidden" name="propertyType" value={formData.propertyType} />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <FiDollarSign className="text-blue-600" />
              Price & Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price" className="text-blue-700 font-medium">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="area" className="text-blue-700 font-medium">
                  Area (sq ft)
                </Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="currency" className="text-blue-700 font-medium">
                  Currency
                </Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    handleInputChange("currency", value)
                  }
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="USD" className="hover:bg-green-50">
                      USD
                    </SelectItem>
                    <SelectItem value="EUR" className="hover:bg-green-50">
                      EUR
                    </SelectItem>
                    <SelectItem value="GBP" className="hover:bg-green-50">
                      GBP
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* 🔥 Fix: Hidden input for FormData */}
                <input type="hidden" name="currency" value={formData.currency} />
              </div>
              <div>
                <Label htmlFor="bedrooms" className="text-blue-700 font-medium">
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="bathrooms"
                  className="text-blue-700 font-medium"
                >
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="parkingSpaces"
                  className="text-blue-700 font-medium"
                >
                  Parking Spaces
                </Label>
                <Input
                  id="parkingSpaces"
                  name="parkingSpaces"
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={(e) =>
                    handleInputChange("parkingSpaces", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-600" />
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-blue-700 font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-blue-700 font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-blue-700 font-medium">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-blue-700 font-medium">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-600" />
              Location Coordinates (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude" className="text-blue-700 font-medium">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="0.000001"
                  value={formData.latitude}
                  onChange={(e) =>
                    handleInputChange("latitude", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="e.g., 37.7749"
                />
              </div>
              <div>
                <Label
                  htmlFor="longitude"
                  className="text-blue-700 font-medium"
                >
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="0.000001"
                  value={formData.longitude}
                  onChange={(e) =>
                    handleInputChange("longitude", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  placeholder="e.g., -122.4194"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <FiUser className="text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="contactName"
                  className="text-blue-700 font-medium"
                >
                  Contact Name
                </Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    handleInputChange("contactName", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="contactEmail"
                  className="text-blue-700 font-medium"
                >
                  Contact Email
                </Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    handleInputChange("contactEmail", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="contactNumber"
                  className="text-blue-700 font-medium"
                >
                  Contact Number
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              Availability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="availableFrom"
                  className="text-blue-700 font-medium"
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
              {formData.type === "rent" && (
                <div>
                  <Label
                    htmlFor="rentPeriod"
                    className="text-blue-700 font-medium"
                  >
                    Rent Period
                  </Label>
                  <Input
                    id="rentPeriod"
                    name="rentPeriod"
                    value={formData.rentPeriod}
                    onChange={(e) =>
                      handleInputChange("rentPeriod", e.target.value)
                    }
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="e.g., Monthly, Yearly"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Agents
            </h3>
            <div className="space-y-2">
              <div className="relative">
                <Select
                  onValueChange={(value) => handleAgentToggle(value)}
                  value=""
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 w-full">
                    <SelectValue placeholder="Choose agents" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60 overflow-auto">
                    {users.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center px-2 py-1"
                      >
                        <Checkbox
                          checked={selectedAgents.includes(user._id)}
                          onCheckedChange={() => handleAgentToggle(user._id)}
                          className="mr-2"
                        />
                        <SelectItem value={user._id}>
                          {user.firstName} {user.lastName}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="agents" value={formData.agents} />
              </div>
              {selectedAgents.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAgents.map((agentId) => {
                    const agent = users.find((u) => u._id === agentId);
                    return (
                      <Badge
                        key={agentId}
                        variant="outline"
                        className="px-3 py-2 gap-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-800 transition-all"
                      >
                        {agent
                          ? `${agent.firstName} ${agent.lastName}`
                          : agentId}
                        <span
                          className="cursor-pointer text-red-300 hover:text-red-600"
                          onClick={() => handleAgentToggle(agentId)}
                        >
                          <FaTrash className="text-sm" />
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              Amenities
            </h3>
            <div className="space-y-4">
              <Select
                value=""
                onValueChange={(value) => {
                  if (value && !formData.amenities.includes(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      amenities: [...prev.amenities, value],
                    }));
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
                <input type="hidden" name="amenities" value={formData.amenities} />
              </Select>

              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add custom amenity"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && newAmenity.trim()) {
                      e.preventDefault();
                      if (!formData.amenities.includes(newAmenity.trim())) {
                        setFormData((prev) => ({
                          ...prev,
                          amenities: [...prev.amenities, newAmenity.trim()],
                        }));
                      }
                      setNewAmenity("");
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
                      setFormData((prev) => ({
                        ...prev,
                        amenities: [...prev.amenities, newAmenity.trim()],
                      }));
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
                        setFormData((prev) => ({
                          ...prev,
                          amenities: prev.amenities.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                    >
                      <FaTrash className="text-sm" />
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              Add Property
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
