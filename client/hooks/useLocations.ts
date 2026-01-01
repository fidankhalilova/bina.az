// hooks/useLocations.ts
import { useQuery } from "@tanstack/react-query";

// Fetch all cities
async function fetchCities() {
  const response = await fetch("/api/cities");
  if (!response.ok) throw new Error("Failed to fetch cities");
  return response.json();
}

// Fetch districts by city
async function fetchDistrictsByCity(cityId: string) {
  if (!cityId) return { data: [] };
  const response = await fetch(`/api/districts?cityId=${cityId}`);
  if (!response.ok) throw new Error("Failed to fetch districts");
  return response.json();
}

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useDistrictsByCity(cityId: string) {
  return useQuery({
    queryKey: ["districts", cityId],
    queryFn: () => fetchDistrictsByCity(cityId),
    enabled: !!cityId,
    staleTime: 5 * 60 * 1000,
  });
}
