import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Property ID is required",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        city: true,
        district: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: "Property not found",
        },
        { status: 404 }
      );
    }

    const formattedProperty = {
      ...property,
      images:
        typeof property.images === "string"
          ? JSON.parse(property.images)
          : Array.isArray(property.images)
          ? property.images
          : [],
    };

    return NextResponse.json({
      success: true,
      data: formattedProperty,
    });
  } catch (error: any) {
    console.error("❌ Error fetching property:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch property",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
