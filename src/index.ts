#!/usr/bin/env node
import { connectToDB } from "./db";
import { Commands } from "./commands";

const init = async () => {
  const connection = await connectToDB();

  if (connection) {
    console.log("Database connection established");
    Commands.promptMenu();
  }
};

init();
