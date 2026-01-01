// src/sections/property-detail/SimilarPropertiesSection.tsx
"use client";

import React, { useState } from "react";
import { useProperties } from "@/hooks/useProperties";
import HouseCard from "@/Components/HouseCard";
import { useQuery } from "@tanstack/react-query";

interface SimilarPropertiesSectionProps {
  propertyId: string;
  districtId?: string;
  cityId?: string;
  type?: string;
}

export default function SimilarPropertiesSection({
  propertyId,
  districtId,
  cityId,
  type,
}: SimilarPropertiesSectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Fetch similar properties based on filters
  const { data, isLoading } = useQuery({
    queryKey: ["similar-properties", districtId, cityId, type],
    queryFn: () => {
      const params = new URLSearchParams();
      if (districtId) params.append("districtId", districtId);
      if (cityId) params.append("cityId", cityId);
      if (type) params.append("type", type);
      params.append("limit", "8");

      return fetch(`/api/properties?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => data.data || []);
    },
    enabled: !!districtId || !!cityId || !!type,
  });

  const filteredProperties = (data || [])
    .filter((p: any) => p.id !== propertyId)
    .slice(0, 8);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Oxşar Elanlar</h2>
        <a href="/properties" className="text-sm text-blue-600 hover:underline">
          Bütün elanlara baxmaq
        </a>
      </div>

      {/* Properties Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProperties.map((property: any) => (
            <HouseCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Oxşar elan tapılmadı
        </div>
      )}
    </div>
  );
}
