export interface Document {
  title: string;
  type: string;
  description: string;
  jurisdiction: string;
  jurisdictionalLevel: string;
  jurisdictionalVenue: string;
  issuedAt: Date;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const Documents: Document[] = [];
