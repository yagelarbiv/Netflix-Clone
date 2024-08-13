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
        const token = generateToken(user._id, res);
        res.send({ ...user._doc, password: "",token: token });
      }
    }
    res.status(401).send({ message: "Invalid credentials" });
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = await validateSignUpRequest({
    username,
    email,
    password,
  });
  if (Object.keys(errors).length > 0) {
    res.status(400).send(errors);
  } else {
    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password),
    });
    const user = await newUser.save();
    const token = generateToken(user._id, res);
    res.status(201).send({ ...user._doc, password: "",token: token });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("Jwt");
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).send({ success: false, message: "Failed to log out" });
  }
};

const refreshToken = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    const token = generateToken(user._id, res);
    res.send({ ...user._doc, password: "", token: token });
    return;
  }
  res.status(401).send({ message: "Invalid credentials" });
};

const updateUser = async (req, res) => {
  const { _id, username, email, isAdmin, profilePicture, myList } = req.body.user;
    const user = await User.findByIdAndUpdate(
      _id,
      {
        username,
        email: email,
        isAdmin: isAdmin,
        profilePicture: profilePicture,
        myList: myList,
      },
      { new: true }
    );
    await user.save();
    res.send({ ...user._doc, password: "" });
}

export { signin, logout, signup, refreshToken, updateUser };
