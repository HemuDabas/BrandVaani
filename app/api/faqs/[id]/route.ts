import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";
import { getAuthUser } from "@/lib/auth";

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

    const updatedFAQ = await FAQ.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ updated successfully",
      faq: updatedFAQ,
    });
  } catch (error: any) {
    console.error("PUT FAQ Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update FAQ" },
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
    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE FAQ Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
