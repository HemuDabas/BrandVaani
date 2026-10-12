import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import { hashPassword, signToken } from "@/lib/auth";
import { sendUserRegistrationEmailToAdmin } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, mode } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required for Google authentication" },
        { status: 400 }
      );
    }

    const userEmail = email.toLowerCase().trim();
    const emailPrefix = userEmail.split("@")[0];
    const cleanName =
      name && name !== "BrandVaani User"
        ? name
        : emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

    let user = await User.findOne({ email: userEmail });

    if (mode === "login") {
      // GOOGLE LOGIN MODE: Requires existing registered account
      if (!user) {
        return NextResponse.json(
          { error: "No account found for this Google email. Please click 'Register Account' first." },
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
        message: "Signed in with Google successfully",
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
    } else {
      // GOOGLE SIGNUP MODE: Registers user account & notifies Admin via Nodemailer
      if (user) {
        return NextResponse.json(
          { error: "An account with this Google email already exists. Please sign in." },
          { status: 400 }
        );
      }

      const randomPassword = await hashPassword(`google_auth_${Date.now()}`);
      user = await User.create({
        name: cleanName,
        email: userEmail,
        password: randomPassword,
        role: "user",
        subscribedToUpdates: true,
      });

      // Send Nodemailer notification email to Admin
      await sendUserRegistrationEmailToAdmin({
        name: user.name,
        email: user.email,
        authMethod: "Google OAuth Sign Up",
      });

      return NextResponse.json({
        success: true,
        message: "Account created with Google! Please click Sign In to log in.",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: "user",
        },
      });
    }
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process Google authentication" },
      { status: 500 }
    );
  }
}
