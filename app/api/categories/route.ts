import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category, { ICategory } from "@/lib/models/Category";
import Blog from "@/lib/models/Blog";
import { getAuthUser } from "@/lib/auth";
import { DEFAULT_BLOGS } from "@/lib/default-blogs";

const DEFAULT_BLOG_CATEGORIES = [
  "Digital Marketing",
  "Local SEO & GMB",
  "Web Development",
  "E-Commerce",
  "Branding",
];

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Check if blog categories exist in DB; if none, auto-seed them
    const blogCatCount = await Category.countDocuments({ type: "blog" });
    if (blogCatCount === 0) {
      let extraCats: string[] = [];
      try {
        extraCats = await Blog.distinct("category");
      } catch (e) {}

      const allBlogCatNames = Array.from(
        new Set([
          ...DEFAULT_BLOG_CATEGORIES,
          ...DEFAULT_BLOGS.map((b) => b.category),
          ...extraCats,
        ])
      ).filter(Boolean);

      for (const catName of allBlogCatNames) {
        const baseSlug = catName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        try {
          await Category.updateOne(
            { name: catName, type: "blog" },
            { $setOnInsert: { name: catName, type: "blog", slug: baseSlug } },
            { upsert: true }
          );
        } catch (slugErr) {
          try {
            await Category.updateOne(
              { name: catName, type: "blog" },
              { $setOnInsert: { name: catName, type: "blog", slug: `${baseSlug}-blog` } },
              { upsert: true }
            );
          } catch (e2) {}
        }
      }
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const query: { type?: ICategory["type"] } =
      type && type !== "all" ? { type: type as ICategory["type"] } : {};
    const categories = await Category.find(query).sort({ name: 1 });
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("GET Categories Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
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
    const { name, type } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: "Category name and type (service | portfolio | blog) are required" },
        { status: 400 }
      );
    }

    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    let newCategory;
    try {
      newCategory = await Category.create({
        name,
        type,
        slug: baseSlug,
      });
    } catch (err: any) {
      if (err.code === 11000 && err.keyPattern?.slug) {
        newCategory = await Category.create({
          name,
          type,
          slug: `${baseSlug}-${type}`,
        });
      } else {
        throw err;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error: any) {
    console.error("POST Category Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
