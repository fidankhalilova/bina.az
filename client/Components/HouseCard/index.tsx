// src/components/HouseCard/HouseCard.tsx

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/global";
import { Heart } from "lucide-react";

interface HouseCardProps {
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

export default function HouseCard({ property }: HouseCardProps) {
  const mainImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  const formattedPrice = new Intl.NumberFormat("az-AZ").format(
    Number(property.price)
  );
  const priceLabel = property.category === "RENT" ? "AZN/ay" : "AZN";

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/properties/${property.id}`}>
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />

          {/* Favorite Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to favorites logic here
            }}
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <div className="text-xl font-bold text-gray-900">
              {formattedPrice} {priceLabel}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-10">
            {property.title}
          </h3>

          {/* Details */}
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <span>{propertyTypeLabels[property.type]}</span>
              {property.rooms && (
                <>
                  <span>•</span>
                  <span>{property.rooms} otaqlı</span>
                </>
              )}
              {property.area && (
                <>
                  <span>•</span>
                  <span>{Number(property.area)} m²</span>
                </>
              )}
            </div>
            {property.floor && property.totalFloors && (
              <div>
                {property.floor}/{property.totalFloors} mərtəbə
              </div>
            )}
          </div>

          {/* Location */}
          <div className="mt-2 text-xs text-gray-500">
            {property.district?.name},{" "}
            {new Date(property.createdAt).toLocaleDateString("az-AZ", {
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}
