"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface ImageGallerySectionProps {
  images: string[];
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
];

export default function ImageGallerySection({
  images,
}: ImageGallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

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

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  }, [displayImages.length]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const slides = displayImages.map((src, index) => ({
    src,
    alt: `Property image ${index + 1}`,
  }));

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
              onClick={() => openLightbox(selectedIndex)}
            >
              <Image
                src={currentImage}
                alt={`Property image ${selectedIndex + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority={selectedIndex === 0}
                unoptimized
                onError={() => {
                  console.error("Failed to load image:", currentImage);
                  setImageError((prev) => ({ ...prev, [currentImage]: true }));
                }}
              />
              {/* Gallery Icon Overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔍</span>
                    <span className="text-sm font-medium text-gray-700">
                      Şəkillərə bax
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => openLightbox(selectedIndex)}
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
                onClick={() => {
                  setSelectedIndex(index);
                  openLightbox(index);
                }}
              >
                {!imageError[image] ? (
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-200"
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
                className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer bg-linear-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all flex items-center justify-center text-white font-semibold text-xs group"
                onClick={() => openLightbox(6)}
              >
                <div className="text-center group-hover:scale-110 transition-transform">
                  <div className="text-lg mb-1">+</div>
                  <div>{remainingCount}</div>
                  <div className="text-[10px] opacity-80">şəkil</div>
                </div>
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

      {/* Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        close={closeLightbox}
        slides={slides}
        index={selectedIndex}
        plugins={[Thumbnails, Zoom, Fullscreen, Slideshow, Download]}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 60,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          imageFit: "cover",
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          scrollToZoom: true,
        }}
        carousel={{
          finite: false,
          preload: 2,
          padding: 16,
          spacing: "16px",
          imageFit: "contain",
        }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.92)" },
          thumbnail: { borderColor: "#10b981" },
        }}
        on={{
          view: ({ index }) => setSelectedIndex(index),
        }}
        render={{
          buttonPrev: () => (
            <button
              className="yarl__button yarl__navigation_button yarl__navigation_button_prev"
              aria-label="Əvvəlki şəkil"
            >
              ←
            </button>
          ),
          buttonNext: () => (
            <button
              className="yarl__button yarl__navigation_button yarl__navigation_button_next"
              aria-label="Növbəti şəkil"
            >
              →
            </button>
          ),
          iconClose: () => (
            <span className="text-xl" aria-label="Bağla">
              ✕
            </span>
          ),
          iconZoomIn: () => (
            <span className="text-lg" aria-label="Yaxınlaşdır">
              🔍+
            </span>
          ),
          iconZoomOut: () => (
            <span className="text-lg" aria-label="Uzaqlaşdır">
              🔍-
            </span>
          ),
        }}
      />
    </>
  );
}
