import { DocumentAttributes, Document } from "../../db/models";

class DocumentRepositoryClass {
  constructor() {}

  async getAll() {
    const documents = await Document.find().lean();
    return documents;
  }

  async create(payload: DocumentAttributes) {
    const document = await Document.create(payload);
    return document;
  }

  async update(title: string, payload: any) {
    const document = await Document.updateOne({ title }, payload);
    return document;
  }

  async delete(title: string) {
    const document = await Document.deleteOne({ title });
    return document;
  }
}

export const DocumentRepository = new DocumentRepositoryClass();
