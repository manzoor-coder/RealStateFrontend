"use client";
import React, { useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  Share,
  EyeOff,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  DollarSign,
  Calendar,
  Sofa,
  Thermometer,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AutoImageSlider from "@/components/common/AutoImageSlider";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
// import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

// MapContainer aur leaflet components dynamically import
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);

// Define Property interface
interface Property {
  _id: string;
  images: string[];
  title: string;
  status: string;
  createdAt: string;
  price: number;
  bed?: number;
  bedrooms?: number;
  bathrooms: number;
  area: number;
  type: string;
  city: string;
  state: string;
  country: string;
  description?: string;
  parkingSpaces?: number;
  heatingSystem?: string;
  coolingSystem?: string;
  isFurnished?: boolean;
  availableFrom?: string;
  amenities?: string[];
  seller?: {
    name?: string;
    email?: string;
  };
  contactEmail?: string;
  contactNumber?: string;
  location: {
    coordinates: [number, number];
  };
  purpose?: string;
  rentPeriod?: string;
  currency?: string;
}

interface PropertyDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  properties: Property[];
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  open,
  onOpenChange,
  properties,
  id,
}) => {
  const property = useMemo(() => {
    const match = properties.find((p) => p._id === id);
    if (!match) return null;
    return {
      id: match._id,
      images:
        match.images.length > 0
          ? match.images
          : ["https://via.placeholder.com/300"],
      title: match.title,
      status: match.status,
      posted: new Date(match.createdAt).toLocaleDateString(),
      price: match.price,
      bedrooms: match.bed || match.bedrooms || 0,
      bathrooms: match.bathrooms || 0,
      area: match.area || 0,
      type: match.type,
      city: match.city,
      state: match.state,
      country: match.country,
      description: match.description || "No description available.",
      parkingSpaces: match.parkingSpaces || 0,
      address: `${match.city}, ${match.state}, ${match.country}`,
      heatingSystem: match.heatingSystem || "None",
      coolingSystem: match.coolingSystem || "None",
      isFurnished: match.isFurnished || false,
      availableFrom: match.availableFrom
        ? new Date(match.availableFrom).toLocaleDateString()
        : "N/A",
      amenities: match.amenities || [],
      seller: match.seller || { name: "Unknown", email: "N/A" },
      contactEmail: match.contactEmail || "N/A",
      contactNumber: match.contactNumber || "N/A",
      location: match.location || { coordinates: [0, 0] },
      purpose: match.purpose || "sale",
      rentPeriod: match.rentPeriod || "",
      currency: match.currency || "$",
    };
  }, [properties, id]);

  const propertyIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  if (!property) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button>Open Property Details</Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] max-w-7xl mx-auto p-0 max-h-[90vh] overflow-y-auto">
          <div className="p-4 bg-white">
            <p className="text-gray-600">Property not found.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[90%] max-w-7xl mx-auto p-0 max-h-[90vh] overflow-y-auto">
        <DialogTitle></DialogTitle>
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Property Details
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => onOpenChange(false)}
              >
                <EyeOff className="w-4 h-4" />
                Hide
              </Button>
            </div>
          </div>
          <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-200">
            <CardHeader className="relative">
              <div className="w-full h-64 sm:h-80 md:h-96">
                <AutoImageSlider
                  images={property.images.map((filename) => ({
                    src: `${filename}`,
                    alt: property.title,
                  }))}
                  interval={3000}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              <Badge className="absolute top-4 left-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                {property.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </CardTitle>
                <p className="text-gray-600 flex items-center mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  {property.address}
                </p>
                <p className="text-gray-700 mb-4">{property.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Property Details
                  </h3>
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-indigo-600" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-teal-600" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 mr-2 text-orange-600" />
                    <span>{property.area.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="w-5 h-5 mr-2 text-red-600" />
                    <span>{property.parkingSpaces} Parking Spaces</span>
                  </div>
                  <div className="flex items-center">
                    <Sofa className="w-5 h-5 mr-2 text-purple-600" />
                    <span>
                      {property.isFurnished ? "Furnished" : "Unfurnished"}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Additional Information
                  </h3>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
                    <span>
                      Price ${property.price.toLocaleString()}
                      {property.purpose === "rent" &&
                        ` / ${property.rentPeriod}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    <span>Available: {property.availableFrom}</span>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-red-500" />
                    <span>Heating: {property.heatingSystem}</span>
                  </div>
                  <div className="flex items-center">
                    <Snowflake className="w-5 h-5 mr-2 text-blue-500" />
                    <span>Cooling: {property.coolingSystem}</span>
                  </div>
                  <div>
                    <Label className="text-gray-700">Amenities</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {property.amenities.length > 0 ? (
                        property.amenities.map((amenity, index) => (
                          <Badge
                            key={index}
                            className="bg-indigo-100 text-indigo-800"
                          >
                            {amenity}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-600">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Seller</Label>
                    <p className="text-gray-900 font-medium">
                      {property.seller.name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-700">Email</Label>
                    <p className="text-gray-900 font-medium">
                      {property.seller.email || property.contactEmail}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-700">Contact Number</Label>
                    <p className="text-gray-900 font-medium">
                      {property.contactNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Location Map
                </h3>
                <div className="h-[500px] rounded-lg">
                  {/* {property?.location?.coordinates && (
                    <MapboxMap
                      zoom={14}
                      center={[
                        property.location.coordinates[0],
                        property.location.coordinates[1],
                      ]}
                      markers={[
                        {
                            lng: property.location.coordinates[0],
                            lat: property.location.coordinates[1],
                            popupHtml: property.title
                        }
                      ]}
                    />
                  )} */}

                  <MapContainer
                    center={
                      property.location.coordinates.length === 2
                        ? [
                            property.location.coordinates[1],
                            property.location.coordinates[0],
                          ]
                        : [0, 0]
                    }
                    zoom={13}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Markers & Polygons */}

                    <Marker
                      position={[
                        property.location.coordinates[1],
                        property.location.coordinates[0],
                      ]}
                      icon={propertyIcon}
                      eventHandlers={{
                        mouseover: (e) => e.target.openPopup(),
                        mouseout: (e) => e.target.closePopup(),
                        click: () => {
                          // setSelectedProperty(property);
                          // onSelectProperty(property);
                        },
                      }}
                    >
                      <Popup closeButton={false}>
                        <div className="text-center">
                          {/* <Image
                            src={property.images[0]}
                            alt={property.title}
                            className="object-cover mb-2 rounded"
                            width={200}
                            height={200}
                          /> */}

                          <AutoImageSlider
                            images={
                              Array.isArray(property.images) &&
                              property.images.length > 0
                                ? property.images.map((img: string) => ({
                                    src: img,
                                    alt: property.title,
                                  }))
                                : [
                                    {
                                      src: "https://via.placeholder.com/400x300?text=No+Image",
                                      alt: "No Image Available",
                                    },
                                  ]
                            }
                            height={200}
                            interval={3000}
                          />
                          <h3 className="font-bold">{property.title}</h3>
                          <p>
                            {property.currency} {property.price} 
                          </p>
                          <small>{property.description}</small>
                        </div>
                      </Popup>
                    </Marker>

                    <Polygon
                      positions={property.area}
                      pathOptions={{
                        color: property?._id === property.id ? "blue" : "green",
                        fillOpacity: property?._id === property.id ? 0.3 : 0.1,
                      }}
                    />
                  </MapContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetail;
