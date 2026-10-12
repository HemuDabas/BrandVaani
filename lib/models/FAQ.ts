import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "faqs", // Targeted collection in MongoDB BrandVaani
  }
);

const FAQ: Model<IFAQ> =
  mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);

export default FAQ;
