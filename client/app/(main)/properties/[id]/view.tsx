import PropertiesDetailTemplate from "@/Templates/PropertiesDetailTemplate";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  return <PropertiesDetailTemplate params={params} />;
}
