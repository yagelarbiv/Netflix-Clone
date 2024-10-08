import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decode = jwt.verify(token, ENV_VARS.JWT_PW);
      if (!decode) {
        res.status(401).send({ message: "Unathorized - Invalid token" });
      } else {
        const user = await User.findById(decode._id);
        if (!user) {
          res.status(401).send({ message: "Unathorized - user not found" });
        }
        req.user = user;
        next();
      }
    } else {
      res.status(401).send({ message: "Unathorized - No token Provided" });
    }
  } catch (error) {
    console.log(`Error while protectRoute middleware: ${error.message}`);
    res.status(500).send({ message: "Internal server error" });
  }
};
