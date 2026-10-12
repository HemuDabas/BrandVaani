import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import { hashPassword } from "@/lib/auth";
import { sendUserRegistrationEmailToAdmin } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required for sign up" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 400 }
      );
    }

    // Hash password and save in MongoDB users collection
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "user",
      subscribedToUpdates: true,
    });

    // Send Nodemailer notification email to Admin notifying that user registered!
    await sendUserRegistrationEmailToAdmin({
      name: newUser.name,
      email: newUser.email,
      authMethod: "Email / Password Signup",
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful! Please sign in with your email & password.",
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: "user",
      },
    });
  } catch (error: any) {
    console.error("User Signup Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}
