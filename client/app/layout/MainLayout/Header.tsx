"use client";

import React from "react";
import Link from "next/link";
import { Menu, Heart, Plus, Settings2 } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            <div className="flex gap-2 items-center">
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6 text-[#946952]" />
              </button>

              <Link href="/" className="text-2xl font-bold text-[#946952]">
                BİNA.AZ
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="/properties?category=SALE"
                className="text-md text-gray-700 hover:text-gray-900"
              >
                Alqı-satqı
              </Link>
              <Link
                href="/properties?category=RENT"
                className="text-md text-gray-700 hover:text-gray-900"
              >
                Kirayə
              </Link>
              <Link
                href="/daily"
                className="text-md text-gray-700 hover:text-gray-900"
              >
                Günlük
              </Link>
              <Link
                href="/agents"
                className="text-md text-gray-700 hover:text-gray-900"
              >
                Agentliklər
              </Link>
              <Link
                href="/residential-complexes"
                className="text-md text-gray-700 hover:text-gray-900"
              >
                Yaşayış kompleksləri
              </Link>
              <Link
                href="/pasha"
                className="flex items-center gap-1 text-md text-gray-700 hover:text-gray-900"
              >
                <span className="text-lg">
                  <Settings2 />
                </span>
                PASHA Real Estate
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="text-md text-gray-700 hover:text-gray-900">
              RU
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>

            <Link
              href="/properties/new"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Yeni elan
            </Link>

            <button className="text-md text-gray-700 hover:text-gray-900 font-medium">
              Giriş
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
