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

  async update(_id: string, payload: any) {
    const document = await Document.updateOne({ _id }, payload);
    return document;
  }

  async delete(_id: string) {
    const document = await Document.remove({ _id });
    return document;
  }
}

export const DocumentRepository = new DocumentRepositoryClass();
