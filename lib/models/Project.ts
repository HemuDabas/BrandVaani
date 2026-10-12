import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  description: string;
  image: string;
  size: "large" | "small";
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Project image URL is required"],
    },
    size: {
      type: String,
      enum: ["large", "small"],
      default: "small",
    },
    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
