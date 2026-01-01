// src/sections/property-detail/ImageGallerySection/ImageGallerySection.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGallerySectionProps {
  images: string[]; // Array of image URLs
}

// Default images if property has fewer than 3
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
];

export default function ImageGallerySection({
  images,
}: ImageGallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  // Ensure minimum 3 images
  const displayImages =
    images && images.length >= 3
      ? images
      : [...(images || []), ...DEFAULT_IMAGES].slice(0, 3);

  console.log(
    "📸 ImageGallery:",
    images?.length || 0,
    "provided,",
    displayImages.length,
    "displayed"
  );

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const visibleThumbnails = displayImages.slice(0, 7);
  const remainingCount = Math.max(0, displayImages.length - 7);
  const currentImage = displayImages[selectedIndex];

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        {/* Main Image */}
        <div className="relative w-full h-125 bg-gray-100">
          {currentImage && !imageError[currentImage] ? (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Image
                src={currentImage}
                alt={`Property image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                priority={selectedIndex === 0}
                unoptimized
                onError={() => {
                  console.error("Failed to load image:", currentImage);
                  setImageError((prev) => ({ ...prev, [currentImage]: true }));
                }}
              />
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">🏠</div>
                <p className="text-gray-500 text-sm">Şəkil yüklənmədi</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="p-4 bg-white border-t mx-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {visibleThumbnails.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedIndex === index
                    ? "border-green-500 ring-2 ring-green-200"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                {!imageError[image] ? (
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={() => {
                      setImageError((prev) => ({ ...prev, [image]: true }));
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">❌</span>
                  </div>
                )}
              </div>
            ))}

            {remainingCount > 0 && (
              <div
                className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-white font-semibold text-xs"
                onClick={() => setIsModalOpen(true)}
              >
                +{remainingCount} şəkil
              </div>
            )}
          </div>

          <div className="mt-3 text-sm text-gray-600 text-center">
            {displayImages.length === 3 && (!images || images.length < 3) ? (
              <span className="text-gray-400">Default şəkillər göstərilir</span>
            ) : (
              <>
                Baxışların sayı: 1386 • Yeniləndi:{" "}
                {new Date().toLocaleDateString("az-AZ")}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center h-full">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
            {currentImage && !imageError[currentImage] ? (
              <Image
                src={currentImage}
                alt={`Property image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                unoptimized
                onError={() => {
                  setImageError((prev) => ({ ...prev, [currentImage]: true }));
                }}
              />
            ) : (
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🖼️</div>
                <p>Şəkil yüklənmədi</p>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </>
  );
}
