import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Admin email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Find admin in dedicated 'admins' collection in MongoDB BrandVaani
    const adminUser = await Admin.findOne({ email: cleanEmail }).select("+password");

    // 2. Strict Check: If admin does not exist in 'admins' collection, block login!
    if (!adminUser) {
      return NextResponse.json(
        { error: "No admin account found with this email. Please register as Admin first." },
        { status: 401 }
      );
    }

    // 3. Strict Check: Verify password with bcrypt
    const isMatch = await comparePassword(password, adminUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password. Access denied." },
        { status: 401 }
      );
    }

    // 4. Generate Auth Token and Set Session Cookie
    const token = signToken({
      userId: adminUser._id.toString(),
      email: adminUser.email,
      name: adminUser.name,
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
      user: {
        id: adminUser._id.toString(),
        name: adminUser.name,
        email: adminUser.email,
        role: "admin",
      },
    });

    response.cookies.set("brandvaani_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin Login Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to authenticate as admin" },
      { status: 500 }
    );
  }
}
