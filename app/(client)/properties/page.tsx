"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AutoImageSlider from "@/components/common/AutoImageSlider";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRuler,
  FaEye,
  FaShare,
} from "react-icons/fa";
import { propertyApi } from "@/lib/api/property";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Property } from "@/types";
import PropertyViewModal from "@/components/modals/PropertyViewModal";
import PropertyDetail from "@/components/modals/PropertyDetail";
import RealEstateHero from "@/components/home/real-estate-hero";

export default function Page() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertiesFilter, setPropertiesFilter] = useState<Property[]>([]);

  console.log("filtered properties Data", properties);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyApi.search();
      setProperties(response.data.properties); // ✅ array
    } catch (error) {
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProperty = (property: Property) => {
        setSelectedProperty(property)
        setViewModalOpen(true)
    }

//     const handleViewProperty = (id: string) => {
//     setOpenModal(true);
//     setHouseId(id);
//   };

  return (
    <>
    <RealEstateHero 
    setPropertiesFilter={setProperties}
    />
      {loading && <p className="text-center">Loading properties...</p>}

      <div className="w-[90%] my-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <Card
              key={property._id}
              className="group hover-lift py-0 overflow-hidden gap-0 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="relative">
                <AutoImageSlider
                  images={property?.images?.map((img) => ({
                    src: `${process.env.NEXT_PUBLIC_PICTURES_URL}${img}`,
                    alt: property.title,
                  }))}
                  className="w-full h-64"
                  interval={5000}
                />

                {/* Overlay badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge
                    className={`${
                      property.type === "sale"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "gradient-primary"
                    } text-white shadow-lg`}
                  >
                    {property.type === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/90 hover:bg-white text-blue-600 hover:text-blue-700 transition-all duration-300 shadow-lg"
                  >
                    <FaShare />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600 transition-all duration-300 shadow-lg"
                  >
                    <FaHeart />
                  </Button>
                </div>

                {/* Price overlay */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                    <span className="text-2xl font-bold gradient-text-primary">
                      {property.price} {property.currency}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <span className="text-sm">
                    {property.city}, {property.country}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                    <FaBed className="text-blue-600 mr-1" />
                    <span className="font-medium">
                      {property.bedrooms} beds
                    </span>
                  </div>
                  <div className="flex items-center bg-emerald-50 px-3 py-1 rounded-lg">
                    <FaBath className="text-emerald-600 mr-1" />
                    <span className="font-medium">
                      {property.bathrooms} baths
                    </span>
                  </div>
                  <div className="flex items-center bg-amber-50 px-3 py-1 rounded-lg">
                    <FaRuler className="text-amber-600 mr-1" />
                    <span className="font-medium text-xs">
                      {property.area} sqft
                    </span>
                  </div>
                </div>

                <Button className="w-full gradient-primary text-white hover:opacity-90 transition-all duration-300 shadow-lg"
                onClick={() => handleViewProperty(property)}>
                  <FaEye className="mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <PropertyViewModal property={selectedProperty} isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} />
        {/* <PropertyDetail open={openModal} onOpenChange={setOpenModal} id={houseId} properties={properties} /> */}
      </div>
    </>
  );
}
