import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDatabase();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error("GET Services Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const { title, category, short, description, iconName, points } = body;

    if (!title || !short || !description) {
      return NextResponse.json(
        { error: "Title, short description and full description are required" },
        { status: 400 }
      );
    }

    const serviceId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const newService = await Service.create({
      serviceId,
      title,
      category: category || "Digital Marketing",
      short,
      description,
      iconName: iconName || "Search",
      points: points || [],
    });

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      service: newService,
    });
  } catch (error: any) {
    console.error("POST Service Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
