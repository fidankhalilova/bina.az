import HeroSection from "@/Sections/home/HeroSection";
import PropertyTypesSection from "@/Sections/home/PropertyTypesSection";
import PropertiesSection from "@/Sections/home/PropertiesSection";

export default async function HomeTemplate() {
  return (
    <div>
      <main className="min-h-screen bg-gray-50">
        <HeroSection />
        <PropertyTypesSection />
        <PropertiesSection />
      </main>
    </div>
  );
}
