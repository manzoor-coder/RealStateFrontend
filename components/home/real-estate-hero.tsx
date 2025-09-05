"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Search, SlidersHorizontal } from "lucide-react";

// Mock data for cities and their locations
const cityData = {
  Lahore: [
    "Abdalians Housing Society",
    "Air Avenue DHA Phase 8",
    "Airline Housing",
    "Al Ameen Society",
    "Al Faisal Town",
    "Alfalah Town",
    "Bahria Town Lahore",
    "DHA Phase 1",
    "DHA Phase 2",
    "DHA Phase 3",
    "Gulberg",
    "Johar Town",
    "Model Town",
    "Wapda Town",
  ],
  Islamabad: [
    "Bahria Town Islamabad",
    "DHA Islamabad",
    "F-6 Markaz",
    "F-7 Markaz",
    "F-8 Markaz",
    "G-9 Markaz",
    "Blue Area",
    "Centaurus Mall Area",
  ],
  Karachi: [
    "Clifton",
    "Defence (DHA)",
    "Gulshan-e-Iqbal",
    "North Nazimabad",
    "Pechs",
    "Saddar",
    "Bahadurabad",
    "Malir",
  ],
  Rawalpindi: [
    "Bahria Town Rawalpindi",
    "DHA Rawalpindi",
    "Satellite Town",
    "PWD Housing Scheme",
    "Westridge",
    "Chaklala Scheme",
  ],
  Abbottabad: ["Mandian", "Supply Bazaar", "Jinnahabad", "PMA Kakul Road"],
  Attock: ["Attock City", "Hazro", "Jand", "Pindigheb"],
};

const propertyTypes = [
  "Homes",
  "Houses",
  "Flats",
  "Plots",
  "Commercial",
  "Rooms",
  "Villa",
  "Apartment",
  "Condo",
  "Townhouse",
  "Office",
];

const bedroomOptions = ["1+", "2+", "3+", "4+", "5+", "6+"];

const landTypeOptions = [
  "Marla",
  "Kanal",
  "Square Feet",
  "Square Yards",
  "Square Meters",
  "Acres",
];

const priceRanges = [
  "Any Price",
  "Under 50 Lakh",
  "50 Lakh - 1 Crore",
  "1 Crore - 2 Crore",
  "2 Crore - 5 Crore",
  "5 Crore - 10 Crore",
  "Above 10 Crore",
];



const areaRangesByType: Record<string, string[]> = {
  Marla: [
    "Any Area",
    "Under 5 Marla",
    "5 - 10 Marla",
    "10 - 20 Marla",
    "Above 20 Marla",
  ],
  Kanal: [
    "Any Area",
    "Under 1 Kanal",
    "1 - 2 Kanal",
    "2 - 5 Kanal",
    "Above 5 Kanal",
  ],
  "Square Feet": [
    "Any Area",
    "Under 500 Sq. Ft.",
    "500 - 1000 Sq. Ft.",
    "1000 - 2000 Sq. Ft.",
    "Above 2000 Sq. Ft.",
  ],
  "Square Yards": [
    "Any Area",
    "Under 100 Sq. Yards",
    "100 - 200 Sq. Yards",
    "200 - 500 Sq. Yards",
    "Above 500 Sq. Yards",
  ],
  "Square Meters": [
    "Any Area",
    "Under 100 Sq. Meters",
    "100 - 200 Sq. Meters",
    "200 - 500 Sq. Meters",
    "Above 500 Sq. Meters",
  ],
  Acres: [
    "Any Area",
    "Under 1 Acre",
    "1 - 5 Acres",
    "5 - 10 Acres",
    "Above 10 Acres",
  ],
};

export default function RealEstateHero() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [locationInput, setLocationInput] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("Homes");
  const [selectedBedrooms, setSelectedBedrooms] = useState("Bedrooms");
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showBedroomDropdown, setShowBedroomDropdown] = useState(false);
  const [selectedLandType, setSelectedLandType] = useState("Marla");
  const [showLandTypeDropdown, setShowLandTypeDropdown] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any Price");
  const [selectedAreaRange, setSelectedAreaRange] = useState("Any Area");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const filteredAreaRanges = areaRangesByType[selectedLandType];

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const propertyDropdownRef = useRef<HTMLDivElement>(null);
  const bedroomDropdownRef = useRef<HTMLDivElement>(null);
  const landTypeDropdownRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const areaDropdownRef = useRef<HTMLDivElement>(null);

  const cities = Object.keys(cityData);
  const filteredLocations =
    cityData[selectedCity as keyof typeof cityData] || [];
  const locationSuggestions = filteredLocations.filter((location) =>
    location.toLowerCase().includes(locationInput.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCityDropdown(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
      if (
        propertyDropdownRef.current &&
        !propertyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPropertyDropdown(false);
      }
      if (
        bedroomDropdownRef.current &&
        !bedroomDropdownRef.current.contains(event.target as Node)
      ) {
        setShowBedroomDropdown(false);
      }
      if (
        landTypeDropdownRef.current &&
        !landTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLandTypeDropdown(false);
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPriceDropdown(false);
      }
      if (
        areaDropdownRef.current &&
        !areaDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAreaDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setLocationInput("");
    setShowCityDropdown(false);
  };

  const handleLocationSelect = (location: string) => {
    setLocationInput(location);
    setShowLocationDropdown(false);
  };

  const clearCity = () => {
    setSelectedCity("");
    setLocationInput("");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/beautiful-modern-houses-neighborhood-aerial-view (1).png')`,
      }}
    >
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 text-balance">
          Properties For Sale & Rent In Pakistan
        </h1>

        {/* Search Container */}
        <div className="w-full max-w-6xl bg-white  shadow-2xl p-6 relative">
          {/* Buy/Rent Tabs */}
          <div className="flex">
            <Button
              onClick={() => setActiveTab("Buy")}
              className={`px-8 py-3 rounded-l-none rounded-r-none font-medium ${
                activeTab === "Buy"
                  ? "gradient-hero text-white hover:bg-emerald-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Buy
            </Button>
            <Button
              onClick={() => setActiveTab("Rent")}
              className={`px-8 py-3 rounded-r-none rounded-l-none font-medium ${
                activeTab === "Rent"
                  ? "gradient-hero text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Rent
            </Button>
          </div>

          {/* Main Search Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* City Selector */}
            <div className="relative flex-1" ref={cityDropdownRef}>
              <div
                className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer bg-white hover:border-gray-400"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
              >
                <span
                  className={selectedCity ? "text-gray-900" : "text-gray-500"}
                >
                  {selectedCity || "Select City"}
                </span>
                {selectedCity ? (
                  <X
                    className="w-4 h-4 text-gray-400 hover:text-gray-600 mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearCity();
                    }}
                  />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>

              {showCityDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-51 max-h-60 overflow-y-auto">
                  {cities.map((city) => (
                    <div
                      key={city}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Input */}
            <div className="relative flex-1" ref={locationDropdownRef}>
              <Input
                type="text"
                placeholder="Locations"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationDropdown(true);
                }}
                onFocus={() => setShowLocationDropdown(true)}
                className="p-3 border-gray-300 h-[100%] focus:border-purple-500 rounded-none focus:ring-purple-500"
                disabled={!selectedCity}
              />

              {showLocationDropdown &&
                selectedCity &&
                locationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300  shadow-lg z-51 max-h-60 overflow-y-auto">
                    {locationSuggestions.map((location) => (
                      <div
                        key={location}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Search Button */}
            <Button className="px-8 py-4 rounded-none h-full gradient-hero text-white font-medium">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            {/* More Filters Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 h-full rounded-none border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              More Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {/* Expanded Filters with Fade-Down Animation */}
          {showFilters && (
            <div
              ref={filtersRef}
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-50 p-6 space-y-6 animate-fade-down"
              style={{
                animation: showFilters ? "fadeDown 0.3s ease-out" : "none",
                transform: showFilters ? "translateY(0)" : "translateY(-10px)",
                opacity: showFilters ? 1 : 0,
              }}
            >
              {/* Property Type and Bedrooms Row */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Property Type Dropdown */}
                <div className="relative flex-1" ref={propertyDropdownRef}>
                  <div
                    className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer bg-white hover:border-gray-400"
                    onClick={() =>
                      setShowPropertyDropdown(!showPropertyDropdown)
                    }
                  >
                    <span className="text-gray-900">
                      {selectedPropertyType}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showPropertyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="gradient-hero text-white p-3 font-medium">
                        Property Type
                      </div>
                      {propertyTypes.map((type) => (
                        <div
                          key={type}
                          className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            type === selectedPropertyType
                              ? "bg-emerald-50 text-emerald-700"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedPropertyType(type);
                            setShowPropertyDropdown(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bedrooms Dropdown */}
                <div className="relative flex-1" ref={bedroomDropdownRef}>
                  <div
                    className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer bg-white hover:border-gray-400"
                    onClick={() => setShowBedroomDropdown(!showBedroomDropdown)}
                  >
                    <span
                      className={
                        selectedBedrooms === "Bedrooms"
                          ? "text-gray-500"
                          : "text-gray-900"
                      }
                    >
                      {selectedBedrooms}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showBedroomDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-50">
                      <div className="gradient-hero text-white p-3 font-medium">
                        Bedrooms
                      </div>
                      {bedroomOptions.map((option) => (
                        <div
                          key={option}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSelectedBedrooms(option);
                            setShowBedroomDropdown(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1" ref={priceDropdownRef}>
                  <div
                    className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer bg-white hover:border-gray-400"
                    onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                  >
                    <span
                      className={
                        selectedPriceRange === "Any Price"
                          ? "text-gray-500"
                          : "text-gray-900"
                      }
                    >
                      {selectedPriceRange}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showPriceDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-50">
                      <div className="gradient-hero text-white p-3 font-medium">
                        Price Range
                      </div>
                      {priceRanges.map((range) => (
                        <div
                          key={range}
                          className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            range === selectedPriceRange
                              ? "bg-emerald-50 text-emerald-700"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedPriceRange(range);
                            setShowPriceDropdown(false);
                          }}
                        >
                          {range}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1" ref={areaDropdownRef}>
                  <div
                    className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer bg-white hover:border-gray-400"
                    onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                  >
                    <span
                      className={
                        selectedAreaRange === "Any Area"
                          ? "text-gray-500"
                          : "text-gray-900"
                      }
                    >
                      {selectedAreaRange}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showAreaDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-50">
                      <div className="gradient-hero text-white p-3 font-medium">
                        Area Range
                      </div>
                      {filteredAreaRanges.map((range) => (
                        <div
                          key={range}
                          className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            range === selectedAreaRange
                              ? "bg-emerald-50 text-emerald-700"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedAreaRange(range);
                            setShowAreaDropdown(false);
                          }}
                        >
                          {range}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1" ref={landTypeDropdownRef}>
                  <div
                    className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer bg-white hover:border-gray-400"
                    onClick={() =>
                      setShowLandTypeDropdown(!showLandTypeDropdown)
                    }
                  >
                    <span className="text-gray-900">{selectedLandType}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showLandTypeDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="gradient-hero text-white p-3 font-medium">
                        Land Type
                      </div>
                      {landTypeOptions.map((type) => (
                        <div
                          key={type}
                          className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            type === selectedLandType
                              ? "bg-emerald-50 text-emerald-700"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedLandType(type);
                            setShowLandTypeDropdown(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-down {
          animation: fadeDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
