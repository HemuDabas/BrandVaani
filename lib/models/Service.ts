import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  serviceId: string;
  title: string;
  category: string;
  short: string;
  description: string;
  iconName: string;
  points: string[];
  image?: string;
  location?: string;
  keywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "Digital Marketing",
      trim: true,
    },
    short: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Full description is required"],
      trim: true,
    },
    iconName: {
      type: String,
      default: "Search",
    },
    points: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    location: {
      type: String,
      default: "Global",
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

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
