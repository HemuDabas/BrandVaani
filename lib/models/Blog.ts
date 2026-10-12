import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  category: string;
  location: string;
  image: string;
  short: string;
  description: string; // Rich text / CKEditor HTML content
  author: string;
  readTime: string;
  keywords: string; // Hidden on UI, included in meta tags for Google SEO
  metaTitle: string;
  metaDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "Digital Marketing",
      trim: true,
    },
    location: {
      type: String,
      default: "Global",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Blog featured image URL is required"],
      trim: true,
    },
    short: {
      type: String,
      required: [true, "Blog summary excerpt is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Blog full content is required"],
      trim: true,
    },
    author: {
      type: String,
      default: "BrandVaani Team",
      trim: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
      trim: true,
    },
    keywords: {
      type: String,
      default: "",
      trim: true,
    },
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
