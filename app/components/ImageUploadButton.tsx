"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadButtonProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  className?: string;
  compact?: boolean;
}

export default function ImageUploadButton({
  onUploadSuccess,
  label = "Upload from Device",
  className = "",
  compact = false,
}: ImageUploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WebP, GIF, SVG)");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      onUploadSuccess(data.url);
      toast.success("Image uploaded successfully from device!");
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`inline-block ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-[#0B1120] hover:bg-gray-100 disabled:opacity-50 cursor-pointer ${
          compact ? "px-2.5 py-1.5 text-[11px]" : ""
        }`}
        title="Choose image file from your computer or phone"
      >
        {uploading ? (
          <>
            <Loader2 size={14} className="animate-spin text-blue-600" />
            <span>Uploading Image...</span>
          </>
        ) : (
          <>
            <Upload size={14} className="text-gray-600" />
            <span>{label}</span>
          </>
        )}
      </button>
    </div>
  );
}
