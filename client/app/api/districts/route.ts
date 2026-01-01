// app/api/districts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    console.log("📡 API: Fetching districts...");

    const url = new URL(request.url);

    // Query parameters
    const cityId = url.searchParams.get("cityId");
    const limit = parseInt(url.searchParams.get("limit") || "100");
    const page = parseInt(url.searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (cityId) where.cityId = cityId;

    // Get districts with city info and property counts
    const [districts, total] = await Promise.all([
      prisma.district.findMany({
        where,
        include: {
          city: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
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
      prisma.district.count({ where }),
    ]);

    console.log(`Found ${districts.length} districts, total: ${total}`);

    return NextResponse.json({
      success: true,
      data: districts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching districts:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch districts",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new district
export async function POST(request: NextRequest) {
  try {
    console.log("📡 API: Creating new district...");

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.slug || !body.cityId) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, slug, and cityId are required",
        },
        { status: 400 }
      );
    }

    // Check if city exists
    const city = await prisma.city.findUnique({
      where: { id: body.cityId },
    });

    if (!city) {
      return NextResponse.json(
        {
          success: false,
          error: "City not found",
        },
        { status: 404 }
      );
    }

    // Check if district with same slug already exists in this city
    const existingDistrict = await prisma.district.findFirst({
      where: {
        cityId: body.cityId,
        slug: body.slug,
      },
    });

    if (existingDistrict) {
      return NextResponse.json(
        {
          success: false,
          error: "District with this slug already exists in this city",
        },
        { status: 409 }
      );
    }

    // Create district
    const district = await prisma.district.create({
      data: {
        name: body.name,
        slug: body.slug.toLowerCase().replace(/\s+/g, "-"),
        cityId: body.cityId,
      },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            properties: true,
          },
        },
      },
    });

    console.log(`✅ District created: ${district.id} - ${district.name}`);

    return NextResponse.json(
      {
        success: true,
        data: district,
        message: "District created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating district:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create district",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
