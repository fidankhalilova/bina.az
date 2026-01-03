"use client";

import React from "react";
import { Property } from "@/types/global";

interface PropertyDescriptionSectionProps {
  property: Property;
}

export default function PropertyDescriptionSection({
  property,
}: PropertyDescriptionSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Təsvir</h2>

      {property.description ? (
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {property.description}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 italic">Təsvir yoxdur</p>
      )}

      {/* Property Features */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-md font-medium text-gray-900 mb-3">
          Xüsusiyyətlər
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-700">
              {property.rooms ? `${property.rooms} otaq` : "Məlumat yoxdur"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-700">{property.area} m²</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-700">
              {property.floor ? `${property.floor} mərtəbə` : "Məlumat yoxdur"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
