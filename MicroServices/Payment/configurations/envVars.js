import dotenv from 'dotenv';
dotenv.config();

export const ENV_VARS = {
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_PW: process.env.JWT_PW,
  PORT: process.env.PORT || 3004,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  EmailUserName: process.env.EMAIL_USER_NAME,
  EmailPassword: process.env.EMAIL_PASSWORD,
  secretKey: process.env.SECRET_KEY || "secretKey",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_API_URL: process.env.PAYPAL_API_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};