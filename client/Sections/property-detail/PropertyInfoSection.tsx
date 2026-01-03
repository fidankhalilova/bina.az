"use client";

import React from "react";
import { Property } from "@/types/global";

interface PropertyInfoSectionProps {
  property: Property;
}

const propertyTypeLabels: Record<string, string> = {
  NEW_BUILDING: "Yeni tikili",
  OLD_BUILDING: "Köhnə tikili",
  HOUSE: "Həyət evi/Bağ evi",
  OFFICE: "Ofis",
  GARAGE: "Qaraj",
  LAND: "Torpaq",
  COMMERCIAL: "Obyekt",
};

export default function PropertyInfoSection({
  property,
}: PropertyInfoSectionProps) {
  const specs = [
    {
      label: "Kateqoriya",
      value: property.category === "SALE" ? "Satış" : "Kirayə",
    },
    { label: "Sahə", value: `${property.area} m²` },
    {
      label: "Otaq sayı",
      value: property.rooms ? `${property.rooms} otaq` : "Məlumat yoxdur",
    },
    {
      label: "Mərtəbə",
      value:
        property.floor && property.totalFloors
          ? `${property.floor} / ${property.totalFloors}`
          : "Məlumat yoxdur",
    },
    {
      label: "Qiymət",
      value: `${property.price} AZN`,
    },
    {
      label: "m² qiyməti",
      value: property.pricePerSqm
        ? `${new Intl.NumberFormat("az-AZ").format(
            property.pricePerSqm
          )} AZN/m²`
        : "Məlumat yoxdur",
    },
    {
      label: "Elan növü",
      value: propertyTypeLabels[property.type] || property.type,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="border-b pb-3">
            <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
            <div className="text-base font-medium text-gray-900">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
