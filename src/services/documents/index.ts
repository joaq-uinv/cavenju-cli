import { Document } from "../../db/models";
import { DocumentRepository } from "../../repositories";

class DocumentServiceClass {
  constructor() {}

  private getDeadline(issuedAt: string) {
    const issuedAtParts: any = issuedAt.split("/");
    // month is 0-based, that's why issuedAtParts[1] - 1 is used
    const issuedAtObject = new Date(+issuedAtParts[2], issuedAtParts[1] - 1, +issuedAtParts[0]);
    const date = new Date(issuedAtObject);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const deadline: any = new Date(
      year,
      month,
      date.getTime() !== 0 ? day + 7 : date.getTime() === 0 && day + 4,
      12,
      0,
      0
    );

    return deadline;
  }

  //remove blank attributes from the payload i.e attributes that dont need to be updated
  private sanitizeObject(object: any) {
    for (const key in object) {
      if (object[key] === "") {
        delete object[key];
      }
    }
    return object;
  }

  async getAll() {
    const documents = await DocumentRepository.getAll();
    return documents;
  }

  async create(payload: Document) {
    const deadline = this.getDeadline(payload.issuedAt.toString());
    payload = {
      ...payload,
      deadline,
    };
    const document = await DocumentRepository.create(payload);
    //todo: set deadlines according rest of document type, jurisdiction, etc
    return document;
  }

  async update(title: any, payload: any) {
    const sanitizedPayload = this.sanitizeObject(payload);
    await DocumentRepository.update(title, sanitizedPayload);
  }

  async delete(title: string) {
    await DocumentRepository.delete(title);
  }
}

export const DocumentServices = new DocumentServiceClass();
