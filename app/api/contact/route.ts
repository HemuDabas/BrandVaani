import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";
import { sendContactEmails } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Save inquiry to MongoDB BrandVaani database
    const newContact = await Contact.create({
      name,
      email: email.toLowerCase().trim(),
      phone: phone || "",
      service: service || "General Inquiry",
      message,
      status: "unread",
    });

    // Send emails via Nodemailer (both to admin & to user)
    const emailSent = await sendContactEmails({
      name,
      email,
      phone,
      service,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully! Check your email for confirmation.",
      contactId: newContact._id.toString(),
      emailStatus: emailSent ? "sent" : "queued",
    });
  } catch (error: any) {
    console.error("Contact Form Submission Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
