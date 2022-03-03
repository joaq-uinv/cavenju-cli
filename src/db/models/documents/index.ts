import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface DocumentAttributes extends MongooseDocument {
  title: string;
  type: string;
  description: string;
  jurisdiction: string;
  jurisdictionalLevel: string;
  jurisdictionalVenue: string;
  issuedAt: Date;
  deadline: Date;
}

const DocumentSchema = new Schema(
  {
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    jurisdiction: {
      type: String,
    },
    jurisdictionalLevel: {
      type: String,
    },
    jurisdictionalVenue: {
      type: String,
    },
    issuedAt: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Document = model<DocumentAttributes>("documents", DocumentSchema);
