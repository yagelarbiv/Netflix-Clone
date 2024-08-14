import jwt from "jsonwebtoken";
import { ENV_VARS } from "./config/envVars.js";

const generateToken = (_id, res) => {
  const token = jwt.sign(
    {
      _id: _id,
    },
    ENV_VARS.JWT_PW,
    {
      expiresIn: 60,
    }
  );
  res.cookie("Jwt", token, {
    httpOnly: true,
    maxAge: 60 * 1000,
    sameSite: "strict",
    secure:  ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};

export { generateToken };
