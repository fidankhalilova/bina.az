import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🧪 Testing Prisma connection...");

    // Test 1: Simple query
    const propertyCount = await prisma.property.count();
    console.log(`Property count: ${propertyCount}`);

    // Test 2: Try to get one property
    const firstProperty = await prisma.property.findFirst({
      include: {
        city: true,
        district: true,
      },
    });

    console.log("First property:", firstProperty);

    // Test 3: Check cities
    const cityCount = await prisma.city.count();
    console.log(`City count: ${cityCount}`);

    return NextResponse.json({
      success: true,
      data: {
        propertyCount,
        cityCount,
        firstProperty: firstProperty
          ? {
              id: firstProperty.id,
              title: firstProperty.title,
              images:
                typeof firstProperty.images === "string"
                  ? JSON.parse(firstProperty.images)
                  : firstProperty.images,
            }
          : null,
      },
    });
  } catch (error: any) {
    console.error("❌ Prisma test failed:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Prisma connection failed",
        message: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
