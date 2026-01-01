// src/sections/home/AgentsSection/AgentsSection.tsx - SIMPLER VERSION
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProperties } from "@/hooks/useProperties";
import HouseCard from "@/Components/HouseCard";
import { ChevronRight } from "lucide-react";

interface Props {
  // Receive filters from parent component (Home page)
  activeFilters?: any;
  totalResults?: number;
}

export default function AgentsSection({ activeFilters, totalResults }: Props) {
  // Use the filters passed from parent or default
  const filters = {
    ...(activeFilters || {}),
    limit: "4",
    page: "1",
  };

  const { data, isLoading } = useProperties(filters);

  const properties = data?.data?.slice(0, 4) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {activeFilters ? "Filtrli Mənzillər" : "Son Mənzillər"}
        </h2>
        <Link
          href={`/properties?${new URLSearchParams(filters).toString()}`}
          className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
        >
          Hamısını gör
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Filtrlərə uyğun mənzil tapılmadı
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <HouseCard key={property.id} property={property} />
            ))}
          </div>

          {totalResults && totalResults > 4 && (
            <div className="mt-8 text-center">
              <Link
                href={`/properties?${new URLSearchParams(filters).toString()}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Bütün {totalResults} mənzili gör
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
