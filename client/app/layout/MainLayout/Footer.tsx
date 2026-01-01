// src/components/shared/Footer/Footer.tsx

"use client";

import React from "react";
import Link from "next/link";

// components/Footer.tsx
export default function Footer() {
  const bakiRayonlari = [
    "Abşeron",
    "Binəqədi",
    "Xətai",
    "Xızı",
    "Qaradağ",
    "Nərimanov",
    "Nəsimi",
    "Nizami",
    "Pirallahı",
    "Sabunçu",
    "Səbail",
    "Suraxanı",
    "Yasamal",
  ];

  const butunAzerbaycan = [
    "Ağcabədi",
    "Bərdə",
    "Göyçay",
    "Kəlbəcər",
    "Kürdəmir",
    "Biləsuvar",
    "Yardımlı",
    "Ağdam",
    "Beyləqan",
    "Göytəpə",
    "İsmayıllı",
    "Laçın",
    "Naxçıvan",
    "Şabran",
    "Yevlax",
    "Ağdaş",
    "Cəbrayıl",
    "Hacıqabul",
    "Qazax",
    "Quba",
    "Naxçıvan MR",
    "Şəki",
    "Zaqatala",
    "Ağstafa",
    "Cəlilabad",
    "Xankəndi",
    "Qobustan",
    "Qubadlı",
    "Neftçala",
    "Şamaxı",
    "Zəngilan",
    "Ağsu",
    "Daşkəsən",
    "Xaçmaz",
    "Qəbələ",
    "Lənkəran",
    "Oğuz",
    "Şəmkir",
    "Zərdab",
    "Astara",
    "Füzuli",
    "Xocalı",
    "Qax",
    "Lerik",
    "Saatlı",
    "Şuşa",
    "",
    "Balakən",
    "Gədəbəy",
    "Xocavənd",
    "Qusar",
    "Masallı",
    "Sabirabad",
    "Tərtər",
    "",
    "Beyləqan",
    "Goranboy",
    "Xudat",
    "İmişli",
    "Mingəçevir",
    "Salyan",
    "Tovuz",
    "",
  ];

  return (
    <footer className="bg-gray-100 text-gray-800 font-sans text-sm">
      {/* Contact Section */}
      <div className="border-t border-b border-gray-300 py-4 px-6">
        <div className="container mx-auto flex flex-col flex-wrap gap-2">
          <div className="flex  gap-20.5 font-medium text-gray-400">
            <span className="font-semibold">Telefon</span>
            <span className="font-semibold">E-mail</span>
          </div>
          <div className="flex gap-5">
            <span>(012) 526-94-94</span>
            <span>bina@bina.az</span>
          </div>
        </div>
      </div>

      {/* Regions Sections */}
      <div className="py-6 px-4">
        <div className="container mx-auto">
          {/* Bakı Rayonları */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-3 text-gray-900">
              Bakının rayonları
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {bakiRayonlari.map((rayon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                >
                  {rayon}
                </a>
              ))}
            </div>
          </div>

          {/* Bütün Azərbaycan */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900">
              Bütün Azərbaycan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {butunAzerbaycan.map((rayon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-700 hover:text-blue-600 hover:underline transition-colors ${
                    rayon === "" ? "invisible" : ""
                  }`}
                >
                  {rayon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="bg-gray-200 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              Layihə haqqında
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              İstifadəçi razılaşması
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              Saytın xəritəsi
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              Mobil versiyası
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              Reklam yerləşdirin
            </a>
          </div>

          <div className="text-center text-gray-600 text-xs mb-2">
            Saytın Adminləri/İstifadəçiləri tərəfindən yerləşdirilmiş olan
            reklam bannerləri və yazıların məzmununa görə məsuliyyət daşımır.
          </div>

          <div className="text-center text-gray-500 text-xs border-t border-gray-300 pt-2">
            © 2008-2025 Digital Classifieds MMC, VÖEN: 1405851661
          </div>
        </div>
      </div>
    </footer>
  );
}
