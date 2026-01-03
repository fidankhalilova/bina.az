"use client";

import React, { useState } from "react";
import { PropertyFormData } from "@/app/(main)/properties/new/view";
import { User, Briefcase } from "lucide-react";

interface StepThreeProps {
  onComplete: (data: Partial<PropertyFormData>) => void;
  onBack: () => void;
  initialData: PropertyFormData;
}

export default function StepThree({
  onComplete,
  onBack,
  initialData,
}: StepThreeProps) {
  const [selected, setSelected] = useState<"OWNER" | "AGENT" | null>(
    initialData.ownerType || null
  );

  const handleSelect = (type: "OWNER" | "AGENT") => {
    setSelected(type);
    setTimeout(() => {
      onComplete({ ownerType: type });
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-12">Yeni elan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Property Owner */}
          <button
            onClick={() => handleSelect("OWNER")}
            className={`p-8 rounded-lg border-2 transition-all hover:border-gray-300 ${
              selected === "OWNER"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`p-4 rounded-full ${
                  selected === "OWNER" ? "bg-blue-100" : "bg-white"
                }`}
              >
                <User
                  className={`w-8 h-8 ${
                    selected === "OWNER" ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Elanın sahibi
              </span>
            </div>
          </button>

          {/* Agent */}
          <button
            onClick={() => handleSelect("AGENT")}
            className={`p-8 rounded-lg border-2 transition-all hover:border-gray-300 ${
              selected === "AGENT"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`p-4 rounded-full ${
                  selected === "AGENT" ? "bg-blue-100" : "bg-white"
                }`}
              >
                <Briefcase
                  className={`w-8 h-8 ${
                    selected === "AGENT" ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Mən vasitəçiyəm
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
