"use client";

import React from "react";
import { Property } from "@/types/global";
import { Phone, Clock, MapPin } from "lucide-react";

interface ContactSectionProps {
  property: Property & {
    pricePerSqm?: number;
  };
}

export default function ContactSection({ property }: ContactSectionProps) {
  const toNumber = (value: string | number | null | undefined): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return value;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const calculatePricePerSqm = (): number => {
    if (property.pricePerSqm !== undefined) {
      return toNumber(property.pricePerSqm);
    }

    const price = toNumber(property.price);
    const area = toNumber(property.area);

    if (price > 0 && area > 0) {
      return Math.round(price / area);
    }
    return 0;
  };

  const pricePerSqm = calculatePricePerSqm();
  const price = toNumber(property.price);

  const formattedPrice = new Intl.NumberFormat("az-AZ").format(price);
  const formattedPricePerSqm = new Intl.NumberFormat("az-AZ").format(
    pricePerSqm
  );

  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return "Nömrə yoxdur";
    if (phone.length <= 4) return phone;
    const visible = phone.slice(0, 6);
    const hidden = phone.slice(6).replace(/./g, "•");
    return `${visible}-${hidden}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Price */}
      <div className="px-6 py-5 border-b">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formattedPrice} AZN
        </div>
        <div className="text-sm text-gray-600">
          {formattedPricePerSqm} AZN/m²
        </div>
      </div>

      {/* Agent Info */}
      <div className="px-6 py-4">
        <div className="text-sm text-gray-600 mb-3">
          {property.contactName || "Məlumat yoxdur"}
        </div>
        <div className="text-xs text-gray-500 mb-4">Əlaqəli şəxs</div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Nömrəni göstər
          <span className="text-white/80">
            {formatPhoneNumber(property.contactPhone)}
          </span>
        </button>
      </div>

      {/* Contact Info */}
      <div className="px-6 py-4 border-t">
        <div className="space-y-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Ad</div>
            <div className="text-sm font-medium text-gray-900">
              {property.contactName || "Məlumat yoxdur"}
            </div>
          </div>

          {property.contactEmail && (
            <div>
              <div className="text-xs text-gray-500 mb-1">Email</div>
              <div className="text-sm font-medium text-gray-900">
                {property.contactEmail}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-gray-500 mb-1">Telefon</div>
            <div className="text-sm font-medium text-gray-900">
              {property.contactPhone || "Məlumat yoxdur"}
            </div>
          </div>
        </div>
      </div>

      {/* Location Info */}
      {property.address && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{property.address}</span>
          </div>
        </div>
      )}

      {/* Report Button */}
      <div className="px-6 py-4 border-t">
        <button className="w-full border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 rounded-lg transition-colors">
          Şikayət et
        </button>
      </div>
    </div>
  );
}
