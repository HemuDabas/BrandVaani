import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { getAuthUser } from "@/lib/auth";

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
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE Category Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
