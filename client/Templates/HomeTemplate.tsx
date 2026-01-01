"use client";
import HeroSection from "@/Sections/home/HeroSection";
import PropertyTypesSection from "@/Sections/home/PropertyTypesSection";
import PropertiesSection from "@/Sections/home/PropertiesSection";
import { useEffect, useState } from "react";

export default function HomeTemplate() {
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    type: "",
    rooms: "",
    cityId: "",
    districtId: "",
    minPrice: "",
    maxPrice: "",
  });

  // Listen for filter changes from HeroSection
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      setActiveFilters(event.detail);
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

  // Also listen to URL changes on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlFilters = {
        category: params.get("category") || "SALE",
        type: params.get("type") || "",
        rooms: params.get("rooms") || "",
        cityId: params.get("cityId") || "",
        districtId: params.get("districtId") || "",
        minPrice: params.get("minPrice") || "",
        maxPrice: params.get("maxPrice") || "",
      };

      // Only update if there are actual URL params
      if (window.location.search) {
        setActiveFilters(urlFilters);
        // Dispatch to sync with HeroSection
        window.dispatchEvent(
          new CustomEvent("filtersChanged", {
            detail: urlFilters,
          })
        );
      }
    }
  }, []);
  return (
    <div>
      <main className="min-h-screen bg-gray-50">
        <HeroSection />
        <PropertyTypesSection />
        <PropertiesSection activeFilters={activeFilters} />
      </main>
    </div>
  );
}
