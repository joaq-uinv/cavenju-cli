import { initJSONDatabase } from "../../db";
import { Document, Documents } from "../../db/models";

class DocumentRepositoryClass {
  private documents: Document[];

  constructor(documents: Document[]) {
    this.documents = documents;
  }

  private findIndex(documents: Document[], title: string): number {
    return documents.findIndex((document: Document) => document.title === title);
  }

  async getAll() {
    const db = initJSONDatabase(this.documents);
    const docs = await db.read();
    return docs;
  }

  async create(payload: Document) {
    const db = initJSONDatabase(this.documents);
    const docs = await db.read();
    docs.push(payload);
    await db.write(docs);
    return docs;
  }

  async update(title: string, payload: any) {
    const db = initJSONDatabase(this.documents);
    const documents = await db.read();

    const document = documents.find((doc: Document) => doc.title === title);
    const newDocument: Document = {
      ...document,
      ...payload,
    };
    documents.push(newDocument);
    const documentIndex = this.findIndex(documents, document.title);
    documents.splice(documentIndex, 1);

    await db.write(documents);
    return documents;
  }

  async delete(title: string) {
    const db = initJSONDatabase(this.documents);
    const documents = await db.read();
    const index = this.findIndex(documents, title);
    documents.splice(index, 1);
    await db.write(documents);
    return documents;
  }
}

export const DocumentRepository = new DocumentRepositoryClass(Documents);
