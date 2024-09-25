import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_CONNECTION_STRING);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;