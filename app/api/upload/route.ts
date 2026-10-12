import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize extension and create unique filename
    const ext = path.extname(file.name) || ".jpg";
    const sanitizeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "") || ".jpg";
    const filename = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${sanitizeExt}`;

    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) {
        await fs.promises.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      await fs.promises.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        message: "Image uploaded successfully",
      });
    } catch (fsErr) {
      console.warn("Disk save fallback to base64 data URL:", fsErr);
      const mimeType = file.type || "image/jpeg";
      const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
      return NextResponse.json({
        success: true,
        url: base64Url,
        message: "Image uploaded as Data URL",
      });
    }
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
