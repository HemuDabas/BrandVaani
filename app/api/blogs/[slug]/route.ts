import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { getAuthUser } from "@/lib/auth";
import mongoose from "mongoose";
import { DEFAULT_BLOGS } from "@/lib/default-blogs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();

    let blog = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug });
    }
    if (!blog) {
      const decodedSlug = decodeURIComponent(slug);
      blog = await Blog.findOne({
        $or: [
          { slug: decodedSlug },
          { slug: decodedSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
        ],
      });
    }

    if (!blog) {
      // Fallback check in DEFAULT_BLOGS
      const fallback = DEFAULT_BLOGS.find(
        (b) =>
          b.slug.toLowerCase() === slug.toLowerCase() ||
          b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
      );
      if (fallback) {
        return NextResponse.json({ success: true, blog: fallback });
      }

      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    console.error("GET Blog by Slug Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { slug } = await params;
    await connectToDatabase();
    const body = await req.json();

    if (body.title && !body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    let updatedBlog = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      updatedBlog = await Blog.findByIdAndUpdate(slug, body, {
        new: true,
        runValidators: true,
      });
    } else {
      updatedBlog = await Blog.findOneAndUpdate({ slug }, body, {
        new: true,
        runValidators: true,
      });
    }

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      blog: updatedBlog,
    });
  } catch (error: any) {
    console.error("PUT Blog Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { slug } = await params;
    await connectToDatabase();

    let deleted = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      deleted = await Blog.findByIdAndDelete(slug);
    } else {
      deleted = await Blog.findOneAndDelete({ slug });
    }

    if (!deleted) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE Blog Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
