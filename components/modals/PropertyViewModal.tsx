"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FaHome,
  FaBuilding,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaTimes,
} from "react-icons/fa";
import AutoImageSlider from "@/components/common/AutoImageSlider";
import { Property } from "@/types";
import { userApi } from "@/lib/api/user";
import { useEffect, useState } from "react";
import Image from "next/image";
import ViewImagesModal from "./ViewImagesModal";

interface PropertyViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

// interface Property {
//   agents?: {
//     agentId: string;
//     commissionRate: number;
//     terms: string;
//     status: "pending" | "rejected" | "accepted";
// }[]
// }

export default function PropertyViewModal({
  property,
  isOpen,
  onClose,
}: PropertyViewModalProps) {
  const [agent, setAgent] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  // console.log("agent founded", agent);
  // Get agentId from property
  // const agentId = property?.agents;
  console.log("agent founded in property", property?.agents);

  useEffect(() => {
    if (property?.agents?.length) {
      const ids = Array.isArray(property.agents)
        ? property.agents.flatMap((a) => a.split(","))
        : [];
      fetchAgents(ids);
    }
  }, [property]);

  // Fetch all users and filter agents by multiple IDs
  const fetchAgents = async (ids: string[]) => {
    try {
      const response = await userApi.usersList();
      const users = response?.data?.users || [];
      console.log("founded agents", users);

      const foundAgents = users.filter((user: any) => ids.includes(user._id));

      if (foundAgents.length > 0) {
        setAgent(foundAgents);
      } else {
        console.log("No agents found with ids:", ids);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  if (!property) return null;

  // console.log("properties agents are ", property?.agents?.[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (propertyType: string) => {
    switch (propertyType) {
      case "villa":
      case "house":
        return <FaHome className="text-blue-500" />;
      case "apartment":
        return <FaBuilding className="text-green-500" />;
      case "office":
        return <FaBuilding className="text-purple-500" />;
      default:
        return <FaHome className="text-gray-500" />;
    }
  };

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const openImageViewer = (property: Property) => {
    setSelectedProperty(property);
    setViewModalOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[95%] max-w-7xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-white">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-slate-200 pb-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Property Details
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-slate-100 rounded-full"
          >
            <FaTimes className="w-5 h-5 text-slate-500" />
          </Button>
        </DialogHeader>

        <div className="space-y-8 pt-6">
          {/* Image Slider */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl">            
            <AutoImageSlider
              images={
                property.images?.map((img: string) => ({
                  src: `${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`,
                  alt: property.title,
                })) || []
              }
              height={450}
              className="w-full"
              interval={5000}
              
            />
            <div className="absolute top-6 left-6 flex gap-3">
              <Badge
                className={`${getStatusColor(
                  property.status
                )} shadow-lg backdrop-blur-sm`}
              >
                {property.status}
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/95 backdrop-blur-sm capitalize shadow-lg border-white/50"
              >
                {property.type}
              </Badge>
            </div>
          </div>
          <div className="flex">
            {property.images?.slice(0, 3).map((img: string, index: number) => (
              <div
                key={index}
                className="relative py-6 px-2 w-[200px] h-[200px] flex"
              >
                {/* agar ye last 3rd image hai aur total images zyada hain */}
                {index === 2 && property.images?.length > 3 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-lg"
                      width={100}
                      height={100}
                      onClick={() => {
                        // Open the image viewer modal with the full images array
                        openImageViewer(property);
                      }}
                    />
                    {/* overlay with count */}
                    <div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold rounded-lg"
                      onClick={() => {
                        // Open the image viewer modal with the full images array
                        openImageViewer(property);
                      }}
                    >
                      +{property.images?.length - 3}
                    </div>
                  </div>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`}
                    alt={property.title}
                    className="w-full h-full object-cover rounded-lg"
                    width={100}
                    height={100}
                    onClick={() => {
                      // Open the image viewer modal with the full images array
                      openImageViewer(property);
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Content - 3 columns */}
            <div
              className={`${
                agent?.length < 3 ? "xl:col-span-4" : "xl:col-span-3"
              } space-y-8`}
            >
              {/* Basic Info */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                      {property.title}
                    </h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {formatPrice(property.price, property.type)}
                    </div>
                  </div>
                  <div className="text-slate-400 text-3xl">
                    {getTypeIcon(property.propertyType || "")}
                  </div>
                </div>

                {property.description && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 text-lg">
                      Description
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Property Features */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 text-lg mb-6">
                  Property Features
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <FaBed className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">
                          Bedrooms
                        </p>
                        <p className="font-bold text-slate-900">
                          {property.bedrooms}
                        </p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                      <div className="p-2 bg-emerald-500 rounded-lg">
                        <FaBath className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-600 font-medium">
                          Bathrooms
                        </p>
                        <p className="font-bold text-slate-900">
                          {property.bathrooms}
                        </p>
                      </div>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <FaRulerCombined className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 font-medium">
                          Area
                        </p>
                        <p className="font-bold text-slate-900">
                          {property.area} sq ft
                        </p>
                      </div>
                    </div>
                  )}
                  {property.parkingSpaces && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <FaCar className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-orange-600 font-medium">
                          Parking
                        </p>
                        <p className="font-bold text-slate-900">
                          {property.parkingSpaces} spaces
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Location */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-900 text-lg flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    Location
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium">Address</p>
                      <p className="text-slate-900 font-semibold">
                        {property.address || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">City, State</p>
                      <p className="text-slate-900 font-semibold">
                        {property.city}, {property.state}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-900 text-lg mb-4">
                    Additional Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium">
                        Property Type:
                      </span>
                      <span className="font-semibold text-slate-900 capitalize">
                        {property.propertyType || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium">
                        Purpose:
                      </span>
                      <span className="font-semibold text-slate-900 capitalize">
                        {property.purpose || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-500 font-medium">
                        Furnished:
                      </span>
                      <span className="font-semibold text-slate-900">
                        {property.isFurnished ? "Yes" : "No"}
                      </span>
                    </div>
                    {property.floorNumber && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500 font-medium">
                          Floor:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {property.floorNumber}
                        </span>
                      </div>
                    )}
                    {property.heatingSystem && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500 font-medium">
                          Heating:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {property.heatingSystem}
                        </span>
                      </div>
                    )}
                    {property.coolingSystem && (
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500 font-medium">
                          Cooling:
                        </span>
                        <span className="font-semibold text-slate-900">
                          {property.coolingSystem}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 text-lg mb-4">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="p-2 bg-slate-500 rounded-lg">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">
                        Contact Person
                      </p>
                      <p className="font-semibold text-slate-900">
                        {property.contactName || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="p-2 bg-slate-500 rounded-lg">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">
                        Email
                      </p>
                      <p className="font-semibold text-slate-900">
                        {property.contactEmail || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="p-2 bg-slate-500 rounded-lg">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">
                        Phone
                      </p>
                      <p className="font-semibold text-slate-900">
                        {property.contactNumber || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-900 text-lg mb-4">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200 px-3 py-1 font-medium"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Agent Card */}
            {agent && agent.lenght < 3 && (
              <div className="xl:col-span-1">
                <div className="sticky top-6 space-y-6">
                  {agent?.map((agent: any, index: string) => (
                    <div
                      key={agent._id || index}
                      className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Agent Image */}
                      <div className="text-center mb-6">
                        <Image
                          src={
                            agent?.profilePhotos
                              ? `${process.env.NEXT_PUBLIC_PICTURES_URL}${agent?.profilePhotos}`
                              : "https://randomuser.me/api/portraits/men/32.jpg"
                          }
                          alt="Agent"
                          className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover mx-auto mb-4 shadow-lg"
                          width={96}
                          height={96}
                        />
                        <h2 className="text-xl font-bold text-slate-900">
                          {agent?.firstName} {agent?.lastName}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium">
                          {agent?.status || "Senior Real Estate Agent"}
                        </p>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                          <FaPhone className="text-blue-500" />
                          <span>{agent?.phone || "+92 300 1234567"}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                          <FaEnvelope className="text-blue-500" />
                          <span>{agent?.email || "johndoe@email.com"}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <span>
                            {agent?.address
                              ? `${agent.address.street} ${agent.address.city}, ${agent.address.state} ${agent.address.zip}`
                              : "123 Main St, Karachi, PK"}
                          </span>
                        </div>
                      </div>

                      {/* Contact Button */}
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                        Contact Agent
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ViewImagesModal
            property={selectedProperty}
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
