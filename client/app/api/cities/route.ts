// app/api/cities/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    console.log("📡 API: Fetching cities...");

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "100");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Get cities with their district counts
    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        include: {
          _count: {
            select: {
              districts: true,
              properties: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
        skip,
        take: limit,
      }),
      prisma.city.count(),
    ]);

    console.log(`Found ${cities.length} cities, total: ${total}`);

    return NextResponse.json({
      success: true,
      data: cities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching cities:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch cities",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to create a new city
export async function POST(request: NextRequest) {
  try {
    console.log("📡 API: Creating new city...");

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and slug are required",
        },
        { status: 400 }
      );
    }

    // Check if city with same slug already exists
    const existingCity = await prisma.city.findUnique({
      where: { slug: body.slug },
    });

    if (existingCity) {
      return NextResponse.json(
        {
          success: false,
          error: "City with this slug already exists",
        },
        { status: 409 }
      );
    }

    // Create city
    const city = await prisma.city.create({
      data: {
        name: body.name,
        slug: body.slug.toLowerCase().replace(/\s+/g, "-"),
      },
      include: {
        _count: {
          select: {
            districts: true,
            properties: true,
          },
        },
      },
    });

    console.log(`✅ City created: ${city.id} - ${city.name}`);

    return NextResponse.json(
      {
        success: true,
        data: city,
        message: "City created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating city:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create city",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
