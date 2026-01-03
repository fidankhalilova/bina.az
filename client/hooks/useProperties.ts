import { useQuery } from "@tanstack/react-query";
import { Property, PropertyFilters, PaginatedResponse } from "@/types/global";

async function fetchProperties(
  filters: PropertyFilters
): Promise<PaginatedResponse<Property>> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await fetch(`/api/properties?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
  });
}

export async function fetchProperty(id: string): Promise<Property> {
  const response = await fetch(`/api/properties/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
  });
}
