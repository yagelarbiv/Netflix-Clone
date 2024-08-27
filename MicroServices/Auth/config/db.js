import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_CONNECTION_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;