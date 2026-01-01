// src/app/properties/[id]/page.tsx

import PropertyDetailSection from "@/Sections/property-detail/MainSection";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;

  // Just pass params directly
  return <PropertyDetailSection params={{ id }} />;
}
