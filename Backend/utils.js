import jwt from "jsonwebtoken";
import { ENV_VARS } from "./config/envVars.js";

const generateToken = (_id, res) => {
  const token = jwt.sign(
    {
      _id: _id,
    },
    ENV_VARS.JWT_PW,
    {
      expiresIn: "7d",
    }
  );
  res.cookie("JWT-Netflix", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure:  ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};

const isAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, ENV_VARS.JWT_PW, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};

export { generateToken, isAuth };
