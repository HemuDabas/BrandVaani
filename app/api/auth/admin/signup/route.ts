import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required to register as admin" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if admin already exists in dedicated 'admins' collection
    const existingAdmin = await Admin.findOne({ email: cleanEmail });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "An admin account with this email already exists. Please sign in." },
        { status: 400 }
      );
    }

    // Hash password and save in 'admins' collection in MongoDB BrandVaani
    const hashedPassword = await hashPassword(password);
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin account registered successfully! Please sign in with your credentials.",
      admin: {
        id: newAdmin._id.toString(),
        name: newAdmin.name,
        email: newAdmin.email,
        role: "admin",
      },
    });
  } catch (error: any) {
    console.error("Admin Signup Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register admin account" },
      { status: 500 }
    );
  }
}
