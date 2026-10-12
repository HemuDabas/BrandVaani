import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Look up user in MongoDB users collection
    const user = await User.findOne({ email: cleanEmail }).select("+password");

    // If user is not registered in MongoDB users collection, return error!
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email. Please sign up first." },
        { status: 401 }
      );
    }

    // Verify password with bcrypt
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password. Access denied." },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: "user",
    });

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: "user",
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
    console.error("User Login Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to log in" },
      { status: 500 }
    );
  }
}
