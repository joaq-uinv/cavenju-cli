import { connectToDB } from "./db";

const init = async () => {
  await connectToDB();
  console.log("Database connection established");
};

init();
