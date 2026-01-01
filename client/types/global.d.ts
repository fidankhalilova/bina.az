// types/global.d.ts

export enum PropertyCategory {
  SALE = "SALE",
  RENT = "RENT",
}

export enum PropertyType {
  NEW_BUILDING = "NEW_BUILDING",
  OLD_BUILDING = "OLD_BUILDING",
  HOUSE = "HOUSE",
  LAND = "LAND",
  OFFICE = "OFFICE",
  GARAGE = "GARAGE",
  COMMERCIAL = "COMMERCIAL",
}

export interface City {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  cityId: string;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description?: string | null;
  category: PropertyCategory;
  type: PropertyType;
  price: number | string; // Decimal can be string or number
  area: number | string;
  rooms?: number | null;
  floor?: number | null;
  totalFloors?: number | null;
  cityId: string;
  city: City;
  districtId: string;
  district: District;
  address?: string | null;
  images: string[]; // Array of image URLs
  contactName: string;
  contactPhone: string;
  contactEmail?: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  order: number;
}

export interface PropertyFilters {
  category?: PropertyCategory;
  type?: PropertyType;
  cityId?: string;
  districtId?: string;
  rooms?: number;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
