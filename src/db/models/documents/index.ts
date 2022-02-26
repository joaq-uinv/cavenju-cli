import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface DocumentAttributes extends MongooseDocument {
  name: string;
  description: string;
  price: number;
}

const DocumentSchema = new Schema(
  {
    title: String,
    description: String,
    jurisdiction: String,
    jurisdictionalLevel: String,
    jurisdictionalVenue: String,
    deadline: Date,
  },
  {
    timestamps: true,
  }
);

export const Document = model<DocumentAttributes>("documents", DocumentSchema);
