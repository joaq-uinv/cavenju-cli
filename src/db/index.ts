import mongoose, { ConnectOptions } from "mongoose";
import config from "../config";

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (e) {
    console.error(e);
  }
};
