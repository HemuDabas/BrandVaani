import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { getAuthUser } from "@/lib/auth";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    let service = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      service = await Service.findById(id);
    }
    if (!service) {
      service = await Service.findOne({ serviceId: id });
    }
    if (!service) {
      const decodedId = decodeURIComponent(id);
      service = await Service.findOne({
        $or: [
          { serviceId: decodedId },
          { serviceId: decodedId.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
        ],
      });
    }

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error("GET Service by ID Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await params;
    await connectToDatabase();
    const body = await req.json();

    let updatedService = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedService = await Service.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
    }
    if (!updatedService) {
      updatedService = await Service.findOneAndUpdate({ serviceId: id }, body, {
        new: true,
        runValidators: true,
      });
    }

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error: any) {
    console.error("PUT Service Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await params;
    await connectToDatabase();
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE Service Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
