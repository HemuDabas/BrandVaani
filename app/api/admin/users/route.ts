import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
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
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("GET Admin Users Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch registered users" },
      { status: 500 }
    );
  }
}
