// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await prisma.property.deleteMany();
    await prisma.district.deleteMany();
    await prisma.city.deleteMany();

    // Create cities
    console.log("Creating cities...");
    const city1 = await prisma.city.create({
      data: {
        name: "Baku",
        slug: "baku",
        districts: {
          create: [
            { name: "Nasimi", slug: "nasimi" },
            { name: "Nizami", slug: "nizami" },
            { name: "Sabail", slug: "sabail" },
          ],
        },
      },
    });

    const city2 = await prisma.city.create({
      data: {
        name: "Ganja",
        slug: "ganja",
        districts: {
          create: [
            { name: "Kəpəz", slug: "kepez" },
            { name: "Nizami", slug: "nizami-ganja" },
          ],
        },
      },
    });

    // Get districts
    const districts = await prisma.district.findMany();
    console.log(`Found ${districts.length} districts`);

    // Create sample properties
    console.log("Creating properties...");

    // Property 1
    await prisma.property.create({
      data: {
        title: "Luxury Apartment in City Center",
        description: "Beautiful luxury apartment with sea view",
        category: "SALE", // Use string enum values
        type: "NEW_BUILDING", // Use string enum values
        price: 350000.0,
        area: 150.0,
        rooms: 3,
        floor: 5,
        totalFloors: 12,
        cityId: city1.id,
        districtId: districts[0].id,
        address: "123 Main Street",
        images: JSON.stringify([
          // Convert to JSON string for SQLite
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        ]),
        contactName: "John Smith",
        contactPhone: "+994501234567",
        contactEmail: "john@example.com",
      },
    });

    // Property 2
    await prisma.property.create({
      data: {
        title: "Modern Office Space for Rent",
        description: "Fully equipped modern office in business district",
        category: "RENT",
        type: "OFFICE",
        price: 2500.0,
        area: 120.0,
        rooms: 4,
        cityId: city1.id,
        districtId: districts[1].id,
        address: "456 Business Avenue",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
          "https://images.unsplash.com/photo-1497366216548-37526070297c",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        ]),
        contactName: "Business Realty",
        contactPhone: "+994502345678",
        contactEmail: "office@example.com",
      },
    });

    // Property 3
    await prisma.property.create({
      data: {
        title: "Country House with Garden",
        description: "Spacious house with large garden, perfect for families",
        category: "SALE",
        type: "HOUSE",
        price: 450000.0,
        area: 300.0,
        rooms: 5,
        cityId: city2.id,
        districtId: districts[3]?.id || districts[0].id,
        address: "789 Country Road",
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        ]),
        contactName: "Alice Johnson",
        contactPhone: "+994503456789",
        contactEmail: "alice@example.com",
      },
    });

    console.log("✅ Seed data created successfully!");

    // Verify data
    const propertyCount = await prisma.property.count();
    const cityCount = await prisma.city.count();
    const districtCount = await prisma.district.count();

    console.log(
      `📊 Stats: ${propertyCount} properties, ${cityCount} cities, ${districtCount} districts`
    );
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
