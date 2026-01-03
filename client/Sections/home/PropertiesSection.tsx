"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProperties } from "@/hooks/useProperties";
import HouseCard from "@/Components/HouseCard";
import { ChevronRight } from "lucide-react";

interface Props {
  activeFilters?: any;
}

export default function PropertiesSection({
  activeFilters: initialFilters,
}: Props) {
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (initialFilters) {
      setActiveFilters(initialFilters);
    }
  }, [initialFilters]);

  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      setActiveFilters(event.detail);
    };

    window.addEventListener(
      "filtersChanged",
      handleFilterChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "filtersChanged",
        handleFilterChange as EventListener
      );
    };
  }, []);

  const apiFilters = {
    ...activeFilters,
    limit: "4",
    page: "1",
  };

  const cleanFilters: Record<string, string> = {};
  Object.entries(apiFilters).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      cleanFilters[key] = String(value);
    }
  });

  const urlFilters: Record<string, string> = {};
  Object.entries(activeFilters).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== undefined &&
      value !== null &&
      key !== "limit" &&
      key !== "page"
    ) {
      urlFilters[key] = String(value);
    }
  });

  const { data, isLoading } = useProperties(cleanFilters);

  const properties = data?.data?.slice(0, 4) || [];

  useEffect(() => {
    if (data?.total !== undefined) {
      setTotalResults(data.total);
    } else if (data?.data?.length) {
      setTotalResults(data.data.length);
    } else {
      setTotalResults(0);
    }
  }, [data]);

  const hasActiveFilters = Object.keys(activeFilters).some(
    (key) => key !== "category" && activeFilters[key] !== ""
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {hasActiveFilters ? "Filtrli Mənzillər" : "Son Mənzillər"}
        </h2>
        {properties.length > 0 && (
          <Link
            href={`/properties?${new URLSearchParams(urlFilters).toString()}`}
            className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
          >
            Hamısını gör
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
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
          {hasActiveFilters
            ? "Filtrlərə uyğun mənzil tapılmadı"
            : "Mövcud mənzil yoxdur"}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <HouseCard key={property.id} property={property} />
            ))}
          </div>

          {totalResults > 4 && (
            <div className="mt-8 text-center">
              <Link
                href={`/properties?${new URLSearchParams(
                  urlFilters
                ).toString()}`}
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
