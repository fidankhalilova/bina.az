// src/sections/property-create/StepOne.tsx

"use client";

import React, { useState } from "react";
import { PropertyFormData } from "@/app/(main)/properties/new/view";
import { Tag, Calendar } from "lucide-react";

interface StepOneProps {
  onComplete: (data: Partial<PropertyFormData>) => void;
  initialData: PropertyFormData;
}

export default function StepOne({ onComplete, initialData }: StepOneProps) {
  const [selected, setSelected] = useState<"SALE" | "RENT" | null>(
    initialData.listingType || null
  );

  const handleSelect = (type: "SALE" | "RENT") => {
    setSelected(type);
    // Auto-advance after selection
    setTimeout(() => {
      onComplete({ listingType: type });
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-12">Yeni elan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sale Option */}
          <button
            onClick={() => handleSelect("SALE")}
            className={`p-8 rounded-lg border-2 transition-all hover:border-gray-300 ${
              selected === "SALE"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`p-4 rounded-full ${
                  selected === "SALE" ? "bg-blue-100" : "bg-white"
                }`}
              >
                <Tag
                  className={`w-8 h-8 ${
                    selected === "SALE" ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <span className="text-lg font-medium text-gray-900">Satıram</span>
            </div>
          </button>

          {/* Rent Option */}
          <button
            onClick={() => handleSelect("RENT")}
            className={`p-8 rounded-lg border-2 transition-all hover:border-gray-300 ${
              selected === "RENT"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`p-4 rounded-full ${
                  selected === "RENT" ? "bg-blue-100" : "bg-white"
                }`}
              >
                <Calendar
                  className={`w-8 h-8 ${
                    selected === "RENT" ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Kirayə verirəm
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
