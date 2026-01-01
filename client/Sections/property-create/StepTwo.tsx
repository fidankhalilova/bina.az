// src/sections/property-create/StepTwo.tsx

"use client";

import React, { useState } from "react";
import { PropertyFormData } from "@/app/(main)/properties/new/view";
import {
  Building2,
  Building,
  Home,
  Briefcase,
  Car,
  MapPin,
  Store,
} from "lucide-react";

interface StepTwoProps {
  onComplete: (data: Partial<PropertyFormData>) => void;
  onBack: () => void;
  initialData: PropertyFormData;
}

const propertyTypes = [
  { id: "NEW_BUILDING", label: "Yeni tikili", icon: Building2 },
  { id: "OLD_BUILDING", label: "Köhnə tikili", icon: Building },
  { id: "HOUSE_VILLA", label: "Həyət evi/Bağ evi", icon: Home },
  { id: "OFFICE", label: "Ofis", icon: Briefcase },
  { id: "GARAGE", label: "Qaraj", icon: Car },
  { id: "LAND", label: "Torpaq", icon: MapPin },
  { id: "COMMERCIAL", label: "Obyekt", icon: Store },
];

export default function StepTwo({
  onComplete,
  onBack,
  initialData,
}: StepTwoProps) {
  const [selected, setSelected] = useState<string | null>(
    initialData.propertyType || null
  );

  const handleSelect = (typeId: string) => {
    setSelected(typeId);
    setTimeout(() => {
      onComplete({ propertyType: typeId });
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Yeni elan</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={onBack}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50"
            >
              Satıram
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
              Kirayə verirəm
            </button>
          </div>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`p-6 rounded-lg border-2 transition-all hover:border-gray-300 ${
                  selected === type.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      selected === type.id ? "bg-blue-100" : "bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        selected === type.id ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center">
                    {type.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
