import { prompt } from "inquirer";
import { DocumentServices } from "../services";

enum CommandsEnum {
  Mostrar = "Mostrar todos los vencimientos",
  Agregar = "Agregar un vencimiento",
  Actualizar = "Actualizar un vencimiento",
  Eliminar = "Eliminar un vencimiento",
  Salir = "Salir",
}

class CommandsClass {
  constructor() {}

  private readonly questions = [
    {
      type: "input",
      message: "Carátula del expediente",
      name: "title",
    },
    {
      type: "input",
      message: "Tipo de documento. Ej.: cédula de demanda",
      name: "type",
    },
    {
      type: "input",
      message: "Descripción del expediente",
      name: "description",
    },
    {
      type: "input",
      message: "Jurisdicción/competencia",
      name: "jurisdiction",
    },
    {
      type: "input",
      message: "Instancia",
      name: "jurisdictionalLevel",
    },
    {
      type: "input",
      message: "Fuero",
      name: "jurisdictionalVenue",
    },
    {
      type: "input",
      message: "Feha de notificacion",
      name: "issuedAt",
    },
  ];

  private async getDocumentTitles() {
    const docs = await DocumentServices.getAll();
    const titles = docs.map((doc: any) => doc.title);
    return titles;
  }

  private async promptDocumentTitles() {
    const titles = await prompt({
      type: "list",
      name: "command",
      message: "Elegí un documento",
      choices: await this.getDocumentTitles(),
    });
    return titles;
  }

  private async getAll() {
    console.clear();
    const documents = await DocumentServices.getAll();

    if (documents) {
      console.table(
        documents.map((document: any) => ({
          Caratula: document.title,
          Documento: document.type,
          Descripcion: document.description,
          Jurisdicción: document.jurisdiction,
          Instancia: document.jurisdictionalLevel,
          Fuero: document.jurisdictionalVenue,
          Vencimiento: document.deadline,
        }))
      );
    }

    this.promptMenu();
  }

  private async create() {
    console.clear();

    const answers = await prompt(this.questions);
    await DocumentServices.create(answers);

    console.clear();
    this.promptMenu();
  }

  private async update() {
    console.clear();

    const titles = await this.promptDocumentTitles();
    const answers = await prompt(this.questions);
    await DocumentServices.update(titles.command, answers);

    console.clear();
    this.promptMenu();
  }

  private async delete() {
    console.clear();

    const titles = (await this.promptDocumentTitles()).command;
    await DocumentServices.delete(titles);

    console.clear();
    this.promptMenu();
  }

  async promptMenu() {
    const answers = await prompt({
      type: "list",
      name: "command",
      message: "Elegí una opción",
      choices: Object.values(CommandsEnum),
    });

    switch (answers.command) {
      case CommandsEnum.Mostrar:
        this.getAll();
        break;
      case CommandsEnum.Agregar:
        this.create();
        break;
      case CommandsEnum.Actualizar:
        this.update();
        break;
      case CommandsEnum.Eliminar:
        this.delete();
        break;
      case CommandsEnum.Salir:
        console.clear();
        process.exit(0);
    }
  }
}

export const Commands = new CommandsClass();
