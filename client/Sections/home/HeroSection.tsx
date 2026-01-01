// src/Sections/home/HeroSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, FilterX } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: "", // Changed from "SALE" to empty for "All"
    type: "",
    rooms: "",
    cityId: "",
    districtId: "",
    minPrice: "",
    maxPrice: "",
  });
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Initialize filters from URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlFilters = {
        category: params.get("category") || "", // Changed to empty default
        type: params.get("type") || "",
        rooms: params.get("rooms") || "",
        cityId: params.get("cityId") || "",
        districtId: params.get("districtId") || "",
        minPrice: params.get("minPrice") || "",
        maxPrice: params.get("maxPrice") || "",
      };
      setFilters(urlFilters);
    }
  }, []);

  // Listen for filter changes from other components
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      setFilters(event.detail);
    };

    window.addEventListener(
      "filtersChanged",
      handleFilterChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "filtersChanged",
        handleFilterChange as EventListener
      );
    };
  }, []);

  // Fetch cities
  useEffect(() => {
    fetch("/api/cities")
      .then((r) => r.json())
      .then((response) => {
        if (response.success && Array.isArray(response.data)) {
          setCities(response.data);
        } else if (Array.isArray(response)) {
          setCities(response);
        }
      })
      .catch((err) => console.error("Failed to load cities:", err));
  }, []);

  // Fetch districts when city changes
  useEffect(() => {
    if (filters.cityId) {
      fetch(`/api/districts?cityId=${filters.cityId}`)
        .then((r) => r.json())
        .then((response) => {
          if (response.success && Array.isArray(response.data)) {
            setDistricts(response.data);
          } else if (Array.isArray(response)) {
            setDistricts(response);
          }
        })
        .catch((err) => console.error("Failed to load districts:", err));
    } else {
      setDistricts([]);
    }
  }, [filters.cityId]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    // Reset district when city changes
    if (key === "cityId") {
      newFilters.districtId = "";
    }
    setFilters(newFilters);

    // Dispatch event immediately for real-time updates
    window.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: newFilters,
      })
    );
  };

  const handleSearch = () => {
    // Build query params
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.append(key, value);
      }
    });

    // Update URL without page reload
    router.push(`/?${params.toString()}`, { scroll: false });

    // Dispatch custom event for the properties list to update
    window.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: filters,
      })
    );
  };

  const handlePriceRangeChange = (range: string) => {
    let newFilters = { ...filters };

    if (range === "0-50000") {
      newFilters = { ...newFilters, minPrice: "0", maxPrice: "50000" };
    } else if (range === "50000-100000") {
      newFilters = { ...newFilters, minPrice: "50000", maxPrice: "100000" };
    } else if (range === "100000-200000") {
      newFilters = { ...newFilters, minPrice: "100000", maxPrice: "200000" };
    } else if (range === "200000+") {
      newFilters = { ...newFilters, minPrice: "200000", maxPrice: "" };
    } else {
      newFilters = { ...newFilters, minPrice: "", maxPrice: "" };
    }

    setFilters(newFilters);
    // Dispatch event immediately
    window.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: newFilters,
      })
    );
  };

  const getPriceRangeValue = () => {
    if (filters.minPrice === "0" && filters.maxPrice === "50000")
      return "0-50000";
    if (filters.minPrice === "50000" && filters.maxPrice === "100000")
      return "50000-100000";
    if (filters.minPrice === "100000" && filters.maxPrice === "200000")
      return "100000-200000";
    if (filters.minPrice === "200000" && filters.maxPrice === "")
      return "200000+";
    return "";
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: "", // Changed to empty for "All"
      type: "",
      rooms: "",
      cityId: "",
      districtId: "",
      minPrice: "",
      maxPrice: "",
    };

    setFilters(defaultFilters);
    router.push("/", { scroll: false });
    window.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: defaultFilters,
      })
    );
  };

  // Check if we have active filters (now including category since it can be empty)
  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof typeof filters] !== ""
  );

  return (
    <div className="bg-white border-b text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Filters */}
        <div className="space-y-4">
          {/* Top Row - Basic Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category - Updated with "Hamısı" option */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-30"
            >
              <option value="">Hamısı</option>
              <option value="SALE">Alış</option>
              <option value="RENT">Kirayə</option>
            </select>

            {/* Property Type */}
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-35"
            >
              <option value="">Hamısı</option>
              <option value="NEW_BUILDING">Yeni tikili</option>
              <option value="OLD_BUILDING">Köhnə tikili</option>
              <option value="HOUSE">Həyət evi</option>
              <option value="LAND">Torpaq</option>
              <option value="OFFICE">Ofis</option>
              <option value="GARAGE">Qaraj</option>
              <option value="COMMERCIAL">Kommersiya</option>
            </select>

            {/* Rooms */}
            <select
              value={filters.rooms}
              onChange={(e) => handleFilterChange("rooms", e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-30"
            >
              <option value="">Otaq sayı</option>
              <option value="1">1 otaq</option>
              <option value="2">2 otaq</option>
              <option value="3">3 otaq</option>
              <option value="4">4 otaq</option>
              <option value="5">5+ otaq</option>
            </select>

            {/* Price Range */}
            <select
              value={getPriceRangeValue()}
              onChange={(e) => handlePriceRangeChange(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-30"
            >
              <option value="">Qiymət, ₼</option>
              <option value="0-50000">0 - 50,000</option>
              <option value="50000-100000">50,000 - 100,000</option>
              <option value="100000-200000">100,000 - 200,000</option>
              <option value="200000+">200,000+</option>
            </select>
          </div>

          {/* Location Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* City Selector */}
            <select
              value={filters.cityId}
              onChange={(e) => handleFilterChange("cityId", e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-35"
            >
              <option value="">Şəhər seçin</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            {/* District Selector */}
            <select
              value={filters.districtId}
              onChange={(e) => handleFilterChange("districtId", e.target.value)}
              disabled={!filters.cityId}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 min-w-35 disabled:bg-gray-100"
            >
              <option value="">Rayon seçin</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="flex-1 min-w-50 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Küçə, məhəllə, metro"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FilterX className="w-4 h-4" />
                Təmizlə
              </button>
            )}

            {/* Filters Toggle Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Əlavə filtrlər
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Axtar
            </button>
          </div>

          {/* Active Filters Display - Updated to show category */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-800 font-medium">
                Aktiv filtrlər:
              </span>
              {filters.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {filters.category === "SALE" ? "Alış" : "Kirayə"}
                </span>
              )}
              {filters.type && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {filters.type === "NEW_BUILDING"
                    ? "Yeni tikili"
                    : filters.type === "OLD_BUILDING"
                    ? "Köhnə tikili"
                    : filters.type === "HOUSE"
                    ? "Həyət evi"
                    : filters.type === "LAND"
                    ? "Torpaq"
                    : filters.type === "OFFICE"
                    ? "Ofis"
                    : filters.type === "GARAGE"
                    ? "Qaraj"
                    : "Kommersiya"}
                </span>
              )}
              {filters.rooms && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {filters.rooms} otaq{filters.rooms === "1" ? "" : "lı"}
                </span>
              )}
              {filters.cityId &&
                cities.find((c) => c.id === filters.cityId) && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {cities.find((c) => c.id === filters.cityId)?.name}
                  </span>
                )}
              {filters.districtId &&
                districts.find((d) => d.id === filters.districtId) && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {districts.find((d) => d.id === filters.districtId)?.name}
                  </span>
                )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {filters.minPrice ? `${filters.minPrice}₼` : "0₼"} -{" "}
                  {filters.maxPrice ? `${filters.maxPrice}₼` : "∞"}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
