// app/api/properties/route.ts - UPDATED
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - For listing properties (your existing code)
export async function GET(request: NextRequest) {
  try {
    console.log("📡 API: Fetching properties...");

    const url = new URL(request.url);

    // Get query parameters with defaults
    const category = url.searchParams.get("category");
    const type = url.searchParams.get("type");
    const cityId = url.searchParams.get("cityId");
    const districtId = url.searchParams.get("districtId");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    console.log("Query params:", {
      category,
      type,
      cityId,
      districtId,
      minPrice,
      maxPrice,
      page,
      limit,
    });

    // Build where clause
    const where: any = {};

    if (category) where.category = category;
    if (type) where.type = type;
    if (cityId) where.cityId = cityId;
    if (districtId) where.districtId = districtId;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    console.log("Where clause:", where);

    // Get properties with pagination
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          city: true,
          district: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    console.log(`Found ${properties.length} properties, total: ${total}`);

    // Parse JSON images back to array
    const formattedProperties = properties.map((property) => ({
      ...property,
      images:
        typeof property.images === "string"
          ? JSON.parse(property.images)
          : Array.isArray(property.images)
          ? property.images
          : [],
    }));

    return NextResponse.json({
      success: true,
      data: formattedProperties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("❌ Error fetching properties:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch properties",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST - For creating new properties
export async function POST(request: NextRequest) {
  try {
    console.log("📡 API: Creating new property...");

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "category",
      "type",
      "price",
      "area",
      "cityId",
      "districtId",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Ensure images is an array and has at least 3 images
    const images = Array.isArray(body.images) ? body.images : [];
    if (images.length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: "At least 3 images are required",
        },
        { status: 400 }
      );
    }

    // Create property
    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description || null,
        category: body.category,
        type: body.type,
        price: parseFloat(body.price),
        area: parseFloat(body.area),
        rooms: body.rooms ? parseInt(body.rooms) : null,
        floor: body.floor ? parseInt(body.floor) : null,
        totalFloors: body.totalFloors ? parseInt(body.totalFloors) : null,
        cityId: body.cityId,
        districtId: body.districtId,
        address: body.address || null,
        images: images, // Store as JSON array
        contactName: body.contactName || "Anonymous",
        contactPhone: body.contactPhone,
        contactEmail: body.contactEmail || null,
      },
      include: {
        city: true,
        district: true,
      },
    });

    console.log(`✅ Property created: ${property.id}`);

    // Parse JSON images back to array (consistent format)
    const formattedProperty = {
      ...property,
      images:
        typeof property.images === "string"
          ? JSON.parse(property.images)
          : Array.isArray(property.images)
          ? property.images
          : [],
    };

    return NextResponse.json(
      {
        success: true,
        data: formattedProperty,
        message: "Property created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating property:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create property",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
