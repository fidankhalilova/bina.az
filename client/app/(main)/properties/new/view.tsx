// src/app/properties/new/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepOne from "@/Sections/property-create/StepOne";
import StepTwo from "@/Sections/property-create/StepTwo";
import StepThree from "@/Sections/property-create/StepThree";
import StepFour from "@/Sections/property-create/StepFour";

export type PropertyFormData = {
  // Step 1
  listingType?: "SALE" | "RENT";

  // Step 2
  propertyType?: string;

  // Step 3
  ownerType?: "OWNER" | "AGENT";

  // Step 4 - Complete form
  cityId?: string; // Changed to ID
  districtId?: string; // Changed to ID
  address?: string;
  area?: string;
  rooms?: string;
  floor?: string;
  totalFloors?: string;
  price?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  imageUrls?: string[];
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepOneComplete = (data: Partial<PropertyFormData>) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStepTwoComplete = (data: Partial<PropertyFormData>) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handleStepThreeComplete = (data: Partial<PropertyFormData>) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // In src/app/properties/new/page.tsx - Update the handleFinalSubmit function:

  const handleFinalSubmit = async (finalData: PropertyFormData) => {
    setIsSubmitting(true);

    try {
      const completeData = { ...formData, ...finalData };

      console.log("Submitting property data:", completeData);

      // Map your form field names to match your Prisma schema
      const propertyData = {
        title: `Əmlak ${Date.now()}`, // You need a title field - add this to your form or generate one
        description: completeData.description || null,
        category: completeData.listingType || "SALE", // Use listingType from step 1
        type: completeData.propertyType || "NEW_BUILDING", // Use propertyType from step 2
        price: completeData.price || "0",
        area: completeData.area || "0",
        rooms: completeData.rooms ? parseInt(completeData.rooms) : null,
        floor: completeData.floor ? parseInt(completeData.floor) : null,
        totalFloors: completeData.totalFloors
          ? parseInt(completeData.totalFloors)
          : null,
        cityId: completeData.cityId || "",
        districtId: completeData.districtId || "",
        address: completeData.address || null,
        images: completeData.imageUrls || [], // This will be converted to JSON in the API
        contactName: completeData.contactName || "Anonymous",
        contactPhone: completeData.contactPhone || "",
        contactEmail: completeData.contactEmail || null,
      };

      console.log("Sending to API:", propertyData);

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to create property");
      }

      const result = await response.json();
      console.log("Property created successfully:", result);

      // Show success message
      alert("✅ Elan uğurla yaradıldı! Yönləndirilir...");

      // Redirect to the newly created property detail page
      if (result.data && result.data.id) {
        router.push(`/properties/${result.data.id}`);
      } else {
        router.push(`/properties`);
      }
      router.refresh();
    } catch (error) {
      console.error("Error creating property:", error);
      alert(
        "❌ Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.\n" +
          (error instanceof Error ? error.message : "")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {currentStep === 1 && (
          <StepOne onComplete={handleStepOneComplete} initialData={formData} />
        )}

        {currentStep === 2 && (
          <StepTwo
            onComplete={handleStepTwoComplete}
            onBack={handleBack}
            initialData={formData}
          />
        )}

        {currentStep === 3 && (
          <StepThree
            onComplete={handleStepThreeComplete}
            onBack={handleBack}
            initialData={formData}
          />
        )}

        {currentStep === 4 && (
          <StepFour
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            initialData={formData}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
