import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_PW: process.env.JWT_PW,
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  EmailUserName: process.env.EMAIL_USER_NAME,
  EmailPassword: process.env.EMAIL_PASSWORD
};