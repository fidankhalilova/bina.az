// src/Sections/home/PropertyTypesSection.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function PropertyTypesSection() {
  const router = useRouter();

  const propertyTypes = [
    { id: "NEW_BUILDING", label: "Yeni Tikili", icon: "🏢" },
    { id: "OLD_BUILDING", label: "Köhnə Tikili", icon: "🏘️" },
    { id: "HOUSE", label: "Həyət Evləri", icon: "🏡" },
    { id: "LAND", label: "Torpaq", icon: "🌱" },
    { id: "OFFICE", label: "Ofis", icon: "🏢" },
    { id: "GARAGE", label: "Qaraj", icon: "🚗" },
    { id: "COMMERCIAL", label: "Kommersiya", icon: "🏬" },
  ];

  const handlePropertyTypeClick = (typeId: string) => {
    // Create filters object
    const filters = {
      category: "SALE",
      type: typeId,
    };

    // Update URL
    const params = new URLSearchParams();
    params.append("category", "SALE");
    params.append("type", typeId);
    router.push(`/?${params.toString()}`, { scroll: false });

    // Dispatch filter change
    window.dispatchEvent(
      new CustomEvent("filtersChanged", {
        detail: filters,
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Elan Kateqoriyaları
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {propertyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handlePropertyTypeClick(type.id)}
            className="flex flex-col items-center p-4 bg-white rounded-lg border hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <span className="text-2xl mb-2">{type.icon}</span>
            <span className="text-sm font-medium text-gray-700 text-center">
              {type.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
