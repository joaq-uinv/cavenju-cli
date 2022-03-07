import { DocumentAttributes } from "../../db/models";
import { DocumentRepository } from "../../repositories";

class DocumentServiceClass {
  constructor() {}

  private getDeadline(issuedAt: string) {
    const issuedAtParts: any = issuedAt.split("/");
    // month is 0-based, that's why issuedAtParts[1] - 1 is used
    const issuedAtObject = new Date(
      +issuedAtParts[2],
      issuedAtParts[1] - 1,
      +issuedAtParts[0]
    );
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

  async getAll() {
    const documents = await DocumentRepository.getAll();
    return documents;
  }

  async create(payload: DocumentAttributes) {
    const document = await DocumentRepository.create(payload);
    const deadline = this.getDeadline(payload.issuedAt.toString());
    //todo: set deadlines according rest of document type, jurisdiction, etc
    document.deadline = deadline;
    document.save();
    return document;
  }

  async update(titles: any, payload: any) {
    const payloadKeys = Object.keys(payload);
    const payloadValues = Object.values(payload);
    const filteredValues = payloadValues.filter((elem: any) => elem !== "");

    //todo: create obj with only non empty key-values as payload

    await DocumentRepository.update(titles, payload);
  }

  async delete(title: string) {
    await DocumentRepository.delete(title);
  }
}

export const DocumentServices = new DocumentServiceClass();
