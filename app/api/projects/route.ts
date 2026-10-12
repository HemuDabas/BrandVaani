import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("GET Projects Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch portfolio projects" },
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
    const { title, category, description, image, size, link } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Title, category, and description are required" },
        { status: 400 }
      );
    }

    const newProject = await Project.create({
      title,
      category,
      description,
      image: image || "/portfolio/project-1.jpg",
      size: size || "small",
      link: link || "",
    });

    return NextResponse.json({
      success: true,
      message: "Portfolio project created successfully",
      project: newProject,
    });
  } catch (error: any) {
    console.error("POST Project Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
