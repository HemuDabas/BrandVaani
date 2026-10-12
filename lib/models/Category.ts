import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  type: "service" | "portfolio" | "blog";
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["service", "portfolio", "blog"],
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ name: 1, type: 1 }, { unique: true });

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
