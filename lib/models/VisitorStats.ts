import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisitorStats extends Document {
  key: string; // "TOTAL" or "YYYY-MM-DD"
  count: number;
  lastVisitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VisitorStatsSchema = new Schema<IVisitorStats>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "visitor_stats",
  }
);

const VisitorStats: Model<IVisitorStats> =
  mongoose.models.VisitorStats ||
  mongoose.model<IVisitorStats>("VisitorStats", VisitorStatsSchema);

export default VisitorStats;
