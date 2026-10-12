import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const faqs = await FAQ.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, faqs });
  } catch (error: any) {
    console.error("GET FAQs Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const body = await req.json();
    const { question, answer, category } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const newFAQ = await FAQ.create({
      question,
      answer,
      category: category || "General",
    });

    return NextResponse.json({
      success: true,
      message: "FAQ added successfully",
      faq: newFAQ,
    });
  } catch (error: any) {
    console.error("POST FAQ Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add FAQ" },
      { status: 500 }
    );
  }
}
