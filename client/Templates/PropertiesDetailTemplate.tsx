import PropertyDetailSection from "@/Sections/property-detail/MainSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;

  return <PropertyDetailSection params={{ id }} />;
}
