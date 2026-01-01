// src/sections/home/PropertyTypesSection/PropertyTypesSection.tsx

"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Home,
  Warehouse,
  TreePine,
  Car,
  MapPin,
  Building,
} from "lucide-react";

const propertyTypes = [
  {
    icon: Building2,
    label: "Yeni tikili",
    href: "/properties?propertyType=NEW_BUILDING",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Building,
    label: "Köhnə tikili",
    href: "/properties?propertyType=OLD_BUILDING",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Home,
    label: "Həyət evi/Bağ evi",
    href: "/properties?propertyType=HOUSE_VILLA",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Warehouse,
    label: "Ofis",
    href: "/properties?propertyType=OFFICE",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Car,
    label: "Qaraj",
    href: "/properties?propertyType=GARAGE",
    color: "bg-gray-50 text-gray-600",
  },
  {
    icon: MapPin,
    label: "Torpaq",
    href: "/properties?propertyType=LAND",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Building2,
    label: "Obyekt",
    href: "/properties?propertyType=COMMERCIAL",
    color: "bg-red-50 text-red-600",
  },
];

export default function PropertyTypesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {propertyTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <Link
              key={index}
              href={type.href}
              className="shrink-0 flex items-center gap-3 px-6 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className={`p-2 rounded-lg ${type.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                {type.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
