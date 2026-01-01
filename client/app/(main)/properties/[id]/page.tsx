import PropertiesView from "./view";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  return <PropertiesView params={params} />;
}
