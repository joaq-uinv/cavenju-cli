import mongoose, { ConnectOptions } from "mongoose";
import config from "../config";

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    return connection;
  } catch (e) {
    console.error(e);
  }
};
