import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import Category from "@/lib/models/Category";
import { getAuthUser } from "@/lib/auth";
import { DEFAULT_BLOGS } from "@/lib/default-blogs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const category = searchParams.get("category");

    let query: any = {};
    if (location && location !== "All") {
      query.location = { $regex: new RegExp(location, "i") };
    }
    if (category && category !== "All") {
      query.category = { $regex: new RegExp(category, "i") };
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    if (blogs.length === 0 && !location && !category) {
      // Seed default blogs into DB if empty
      await Blog.insertMany(DEFAULT_BLOGS);
      const seededBlogs = await Blog.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, blogs: seededBlogs });
    }

    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    console.error("GET Blogs Error:", error);
    return NextResponse.json(
      { success: true, blogs: DEFAULT_BLOGS },
      { status: 200 }
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
    const {
      title,
      slug: customSlug,
      category,
      location,
      image,
      short,
      description,
      author,
      readTime,
      keywords,
      metaTitle,
      metaDescription,
    } = body;

    if (!title || !short || !description) {
      return NextResponse.json(
        { error: "Title, summary and full content are required" },
        { status: 400 }
      );
    }

    // Auto grab slug from title if customSlug not provided
    const slug = (customSlug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newBlog = await Blog.create({
      slug,
      title,
      category: category || "Digital Marketing",
      location: location || "Global",
      image:
        image ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      short,
      description,
      author: author || "BrandVaani Team",
      readTime: readTime || "5 min read",
      keywords: keywords || "",
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || short,
    });

    const catName = category || "Digital Marketing";
    const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    try {
      await Category.updateOne(
        { name: catName, type: "blog" },
        { $setOnInsert: { name: catName, type: "blog", slug: catSlug } },
        { upsert: true }
      );
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: "Blog post published successfully",
      blog: newBlog,
    });
  } catch (error: any) {
    console.error("POST Blog Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
