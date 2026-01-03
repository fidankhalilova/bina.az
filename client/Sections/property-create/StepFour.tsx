"use client";

import React, { useState, useEffect } from "react";
import { PropertyFormData } from "@/app/(main)/properties/new/view";
import { Plus, X } from "lucide-react";

interface City {
  id: string;
  name: string;
  slug: string;
}

interface District {
  id: string;
  name: string;
  slug: string;
  cityId: string;
}

interface StepFourProps {
  onSubmit: (data: PropertyFormData) => void;
  onBack: () => void;
  initialData: PropertyFormData;
  isSubmitting: boolean;
}

const extractDataFromResponse = (response: any): any[] => {
  if (response?.success && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  if (Array.isArray(response?.data)) {
    return response.data;
  }
  console.error("Could not extract data from response:", response);
  return [];
};

export default function StepFour({
  onSubmit,
  onBack,
  initialData,
  isSubmitting,
}: StepFourProps) {
  const [formData, setFormData] = useState<PropertyFormData>(initialData);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [errorCities, setErrorCities] = useState<string | null>(null);
  const [errorDistricts, setErrorDistricts] = useState<string | null>(null);

  // Fetch cities on mount
  useEffect(() => {
    setIsLoadingCities(true);
    setErrorCities(null);

    fetch("/api/cities")
      .then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      })
      .then((response) => {
        console.log("Cities API response:", response);
        const citiesData = extractDataFromResponse(response);
        setCities(citiesData);
        setIsLoadingCities(false);
      })
      .catch((err) => {
        console.error("Failed to load cities:", err);
        setErrorCities(err.message);
        setIsLoadingCities(false);
        setCities([]);
      });
  }, []);

  useEffect(() => {
    if (selectedCityId) {
      setIsLoadingDistricts(true);
      setErrorDistricts(null);

      fetch(`/api/districts?cityId=${selectedCityId}`)
        .then((r) => {
          if (!r.ok) throw new Error(`API error: ${r.status}`);
          return r.json();
        })
        .then((response) => {
          console.log(
            "Districts API response for city",
            selectedCityId,
            ":",
            response
          );
          const districtsData = extractDataFromResponse(response);
          setDistricts(districtsData);
          setIsLoadingDistricts(false);
        })
        .catch((err) => {
          console.error("Failed to load districts:", err);
          setErrorDistricts(err.message);
          setIsLoadingDistricts(false);
          setDistricts([]);
        });
    } else {
      setDistricts([]);
      setErrorDistricts(null);
    }
  }, [selectedCityId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    setFormData((prev) => ({ ...prev, cityId, districtId: "" }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setFormData((prev) => ({ ...prev, districtId }));
  };

  const addImageUrl = () => {
    if (currentImageUrl.trim()) {
      setImageUrls((prev) => [...prev, currentImageUrl.trim()]);
      setCurrentImageUrl("");
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, imageUrls: imageUrls });
  };

  return (
    <div className="max-w-4xl mx-auto text-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Geri
          </button>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-black">
            Yeni elan
          </h1>

          {/* Property Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Əmlakın növü <span className="text-red-500">*</span>
            </label>
            <select
              name="propertyType"
              value={formData.propertyType || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seçin</option>
              <option value="NEW_BUILDING">Yeni tikili</option>
              <option value="OLD_BUILDING">Köhnə tikili</option>
              <option value="HOUSE">Həyət evi/Bağ evi</option>
              <option value="LAND">Torpaq</option>
              <option value="OFFICE">Ofis</option>
              <option value="GARAGE">Qaraj</option>
              <option value="COMMERCIAL">Obyekt</option>
            </select>
          </div>

          {/* City */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şəhər <span className="text-red-500">*</span>
            </label>
            <select
              name="cityId"
              value={selectedCityId}
              onChange={handleCityChange}
              disabled={isLoadingCities}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            >
              <option value="">
                {isLoadingCities ? "Yüklənir..." : "Şəhər seçin"}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errorCities && (
              <p className="mt-1 text-sm text-red-600">{errorCities}</p>
            )}
            {!isLoadingCities && cities.length === 0 && !errorCities && (
              <p className="mt-1 text-sm text-gray-500">Şəhər tapılmadı</p>
            )}
          </div>

          {/* District */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rayon <span className="text-red-500">*</span>
            </label>
            <select
              name="districtId"
              value={formData.districtId || ""}
              onChange={handleDistrictChange}
              disabled={!selectedCityId || isLoadingDistricts}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            >
              <option value="">
                {!selectedCityId
                  ? "Əvvəlcə şəhər seçin"
                  : isLoadingDistricts
                  ? "Yüklənir..."
                  : "Rayon seçin"}
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errorDistricts && (
              <p className="mt-1 text-sm text-red-600">{errorDistricts}</p>
            )}
            {selectedCityId &&
              !isLoadingDistricts &&
              districts.length === 0 &&
              !errorDistricts && (
                <p className="mt-1 text-sm text-gray-500">
                  Bu şəhərdə rayon tapılmadı
                </p>
              )}
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ünvan
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              placeholder="Məsələn: M.Məmmədyarov küçəsi, 15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Property Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Əmlak haqqında</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sahə (m²) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="area"
                value={formData.area || ""}
                onChange={handleInputChange}
                placeholder="Sahə"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Otaq sayı
              </label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms || ""}
                onChange={handleInputChange}
                placeholder="Otaq sayı"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Floor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mərtəbə
              </label>
              <input
                type="number"
                name="floor"
                value={formData.floor || ""}
                onChange={handleInputChange}
                placeholder="Mərtəbə"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Total Floors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mərtəbələrin sayı
              </label>
              <input
                type="number"
                name="totalFloors"
                value={formData.totalFloors || ""}
                onChange={handleInputChange}
                placeholder="Mərtəbələrin sayı"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Əlavə məlumat</h2>

          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            placeholder="Əmlak haqqında ətraflı məlumat"
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Price Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">
            Qiymət <span className="text-red-500">*</span>
          </h2>

          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleInputChange}
            placeholder="Qiymət (AZN)"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image URLs Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Şəkil Linkləri</h2>

          <p className="text-sm text-gray-600 mb-4">
            Minimum 3 şəkil URL-i daxil edin. 3-dən az olsa, avtomatik default
            şəkillər əlavə olunacaq.
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={currentImageUrl}
              onChange={(e) => setCurrentImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addImageUrl();
                }
              }}
            />
            <button
              type="button"
              onClick={addImageUrl}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Əlavə et
            </button>
          </div>

          {imageUrls.length > 0 && (
            <div className="space-y-2">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/150?text=Invalid";
                    }}
                  />
                  <span className="flex-1 text-sm text-gray-600 truncate">
                    {url}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              {imageUrls.length < 3 ? (
                <>
                  📸 Hal-hazırda {imageUrls.length} şəkil.{" "}
                  {3 - imageUrls.length} default şəkil əlavə olunacaq.
                </>
              ) : (
                <>
                  ✅ {imageUrls.length} şəkil əlavə edilib (minimum tələb
                  ödənilir)
                </>
              )}
            </p>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Əlaqə məlumatları</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName || ""}
                onChange={handleInputChange}
                placeholder="Adınız"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone || ""}
                onChange={handleInputChange}
                placeholder="050 123 45 67"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail || ""}
                onChange={handleInputChange}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Göndərilir..." : "Elanı yerləşdir"}
          </button>
        </div>
      </form>
    </div>
  );
}
