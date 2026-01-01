// src/sections/property-detail/LocationSection.tsx
"use client";

import React from "react";
import { Property } from "@/types/global";
import { MapPin } from "lucide-react";

interface LocationSectionProps {
  property: Property;
}

export default function LocationSection({ property }: LocationSectionProps) {
  const fullAddress = [
    property.address,
    property.district?.name,
    property.city?.name,
    "Azerbaijan",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Məkan</h2>

      {/* Map Placeholder */}
      <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm text-gray-900 text-sm">
          {property.address ||
            `${property.district?.name}, ${property.city?.name}`}
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-2">
        {property.address && (
          <div className="text-sm">
            <span className="text-gray-500">Ünvan:</span>{" "}
            <span className="font-medium text-gray-900">
              {property.address}
            </span>
          </div>
        )}

        {property.district?.name && (
          <div className="text-sm">
            <span className="text-gray-500">Rayon:</span>{" "}
            <span className="font-medium text-gray-900">
              {property.district.name}
            </span>
          </div>
        )}

        {property.city?.name && (
          <div className="text-sm">
            <span className="text-gray-500">Şəhər:</span>{" "}
            <span className="font-medium text-gray-900">
              {property.city.name}
            </span>
          </div>
        )}
      </div>

      {/* Property ID */}
      <div className="mt-6 pt-4 border-t text-sm text-gray-600">
        Elan ID: {property.id}
      </div>
    </div>
  );
}
