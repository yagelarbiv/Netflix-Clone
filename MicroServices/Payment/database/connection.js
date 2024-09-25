import { connect } from "mongoose";
import { ENV_VARS } from "../configurations/envVars.js";

async function DBConnect() {
  const mongoUri = ENV_VARS.MONGO_CONNECTION_STRING;
  
  if (!mongoUri)
    throw new Error("MONGO_CONNECTION_STRING environment variable is not defined");

  try {
    await connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");
  }
}
export { DBConnect };