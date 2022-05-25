import { Commands } from "../src/commands";
import { DocumentServices } from "../src/services/documents";

describe("program", () => {
  it("should prompt a list of choices to choose from", () => {
    Commands.promptMenu();
  });

  it("should get all the documents", async () =>
    await DocumentServices.getAll());

  it("should create a document", async () =>
    await DocumentServices.create({
      title: "Title",
      type: "Type",
      description: "Description",
      jurisdiction: "Jurisdiction",
      jurisdictionalLevel: "Jurisdictional level",
      jurisdictionalVenue: "Jurisdictional venue",
      issuedAt: new Date(),
      deadline: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

  it("should update a document", async () =>
    await DocumentServices.update("Title", { title: "New Title" }));

  it("should delete a document", async () =>
    await DocumentServices.delete("New Title"));
});
