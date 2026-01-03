"use client";
import { useProperties } from "@/hooks/useProperties";
import ImageGallerySection from "@/Sections/property-detail/ImageGallerySection";
import PropertyInfoSection from "@/Sections/property-detail/PropertyInfoSection";
import PropertyDescriptionSection from "@/Sections/property-detail/PropertyDescriptionSection";
import LocationSection from "@/Sections/property-detail/LocationSection";
import ContactSection from "@/Sections/property-detail/ContactSection";
import SimilarPropertiesSection from "@/Sections/property-detail/SimilarPropertiesSection";
import { useQuery } from "@tanstack/react-query";

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["property", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Property not found");
        }
        throw new Error("Failed to fetch property");
      }
      return response.json();
    },
    enabled: !!params.id,
  });

  // Extract property data from the API response
  const property = apiResponse?.success ? apiResponse.data : null;

  // Calculate price per sqm
  const pricePerSqm = property
    ? Math.round(Number(property.price) / Number(property.area))
    : 0;

  // Format the property data with pricePerSqm
  const formattedProperty = property
    ? {
        ...property,
        price: Number(property.price),
        area: Number(property.area),
        pricePerSqm,
      }
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !formattedProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Elan tapılmadı
          </h2>
          <p className="text-gray-600">
            Axtardığınız elan mövcud deyil və ya silinib.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Error: {error?.message || "No data received"}
          </p>
        </div>
      </div>
    );
  }

  // Debug: Log the property data
  console.log("Property data:", formattedProperty);
  console.log("Title:", formattedProperty.title);
  console.log("Images:", formattedProperty.images);

  // Check if images exist
  const images = formattedProperty.images || [];
  if (images.length === 0) {
    console.warn("No images found for property");
  }

  const formattedPrice = new Intl.NumberFormat("az-AZ").format(
    formattedProperty.price
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug info - remove in production */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>ID: {formattedProperty.id}</div>
          <div>Title: {formattedProperty.title || "No title"}</div>
          <div>Images: {images.length}</div>
        </div>
      )} */}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              {formattedProperty.category === "SALE" ? "Satış" : "Kirayə"}
            </a>
            <span>›</span>
            <span className="text-gray-900">{formattedProperty.title}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {formattedProperty.title}
            </h1>
            {/* ... rest of header ... */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pass images to ImageGallerySection */}
            <ImageGallerySection images={images} />

            {/* Pass the formatted property */}
            <PropertyInfoSection
              property={{
                ...formattedProperty,
                pricePerSqm,
              }}
            />
            <PropertyDescriptionSection property={formattedProperty} />
            <LocationSection property={formattedProperty} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactSection
                property={{
                  ...formattedProperty,
                  pricePerSqm,
                }}
              />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <SimilarPropertiesSection
            propertyId={formattedProperty.id}
            districtId={formattedProperty.districtId}
            cityId={formattedProperty.cityId}
            type={formattedProperty.type}
          />
        </div>
      </div>
    </div>
  );
}
