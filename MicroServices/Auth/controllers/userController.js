import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken, sendMail, sendSMS } from "../utils.js";
import {
  validateSignInRequest,
  validateSignUpRequest,
} from "../vallidations/Auth.js";
import crypto from 'crypto'

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
};

const forgotPassword = async (req, res) => {
  const { phoneNumber, email, code } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const message = `your password reset code is ${code}`
    if(email !== undefined){
    try {
        await sendMail({
            email: user.email,
            subject: "password change request received",
            message: message
        })
        res.status(200).send({
            status: 'success',
            message: "code sent successfully"
        });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Email not sent" });
    }
  }
  else {
    try {
      await sendSMS({
          phone: phoneNumber,
          subject: "password change request received",
          message: message
      })
      res.status(200).send({
          status: 'success',
          message: "code sent successfully"
      });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Email not sent" });
    }
  }
  } else {
    res.status(401).send({ message: "user not found" });
  }
};

export const resetPassword = async (req, res) => {
  const token = crypto.createHash("sha256").update(req.params.token).digest('hex');
  const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } });
  if (user) {
      user.password = bcrypt.hashSync(req.body.password);
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      user.passwordChangeAt = Date.now();
      user.save();
      res.status(200).send({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user),
      });
  } else {
      res.status(400).send({ message: "token is invalid or has expired" });
  }
}  

export { signin, logout, signup, refreshToken, updateUser, forgotPassword };
