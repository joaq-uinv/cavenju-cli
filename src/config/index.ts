import { config } from "dotenv";
const envFound = config();

if (!envFound) {
  throw new Error("The .env file could not be found.");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  databaseURL: process.env.DATABASE_URL,
};
