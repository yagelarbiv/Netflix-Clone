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
    const token = generateToken(user._id, res);
    res.status(201).send({ ...user._doc, password: "",token: token });
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

const refreshToken = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (user) {
    generateToken(user._id, res);
    res.send({ ...user._doc, password: "" });
    return;
  }
  res.status(401).send({ message: "Invalid credentials" });
};

const updateUser = async (req, res) => {
  const { _id, username, email, isAdmin, profilePicture, myList } = req.body.user;
  console.log('Request data:', req.body.user);
    const user = await User.findByIdAndUpdate(
      _id,
      {
        username,
        email: email,
        password: bcrypt.hashSync(password),
        isAdmin: isAdmin,
        profilePicture: profilePicture,
        myList: myList,
      },
      { new: true }
    );
    res.send({ ...user._doc, password: "" });
}

export { signin, logout, signup, refreshToken, updateUser };
