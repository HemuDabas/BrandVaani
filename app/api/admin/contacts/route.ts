import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (error: any) {
    console.error("GET Admin Contacts Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch contact inquiries" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Contact.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Contact inquiry deleted",
    });
  } catch (error: any) {
    console.error("DELETE Admin Contact Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete contact" },
      { status: 500 }
    );
  }
}
