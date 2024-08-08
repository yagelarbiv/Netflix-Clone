import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils.js";
import {
  validateSignInRequest,
  validateSignUpRequest,
} from "../vallidations/Auth.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  const errors = await validateSignInRequest({ email, password });
  if (Object.keys(errors).length > 0) {
    res.status(400).send(errors);
  } else {
    const user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        generateToken(user._id, res);
        res.send({ ...user._doc, password: "" });
        return;
      }
    }
    res.status(401).send({ message: "Invalid credentials" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = await validateSignUpRequest({
    username: name,
    email,
    password,
  });
  if (Object.keys(errors).length > 0) {
    res.status(400).send(errors);
  } else {
    const newUser = new User({
      username: name,
      email: email,
      password: bcrypt.hashSync(password),
    });
    const user = await newUser.save();
    generateToken(user._id, res);
    res.status(201).send({ ...user._doc, password: "" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("JWT-Netflix");
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to log out" });
  }
};

export { signin, logout, signup };
