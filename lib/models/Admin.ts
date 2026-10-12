import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Admin email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Admin password is required"],
      select: false,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    collection: "admins", // Explicitly create and target 'admins' collection in MongoDB BrandVaani
  }
);

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
