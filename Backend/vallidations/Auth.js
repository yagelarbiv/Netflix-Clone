import User from "../models/User.js";

export const validateSignUpRequest = async (user) => {
  const { username, email, password } = user;
  const errors = {};
  if (!username) {
    errors.username = "Username is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log(existingUser);
    errors.email = "Email already exists";
  }
  const existingUsername = await User.findOne({ username: username });
  if (existingUsername) {
    console.log(existingUsername);
    errors.username = "Username already exists";
  }
  return errors;
};

export const validateSignInRequest = async (user) => {
  const { email, password } = user;
  const errors = {};
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return errors;
};

export const validateUpdateUserDataRequest = async (user) => {
  const { username, email, password, isAdmin, profilePicture } = user;
  const errors = {};
  if (!username) {
    errors.username = "Username is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }
  if (!password) {
    errors.password = "Password is required"; 
  } else if (password.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }
  if(isAdmin === undefined){
    errors.isAdmin = "isAdmin is required";
  }
  if(!profilePicture){
    errors.profilePicture = "profilePicture is required";
  }
  return errors;
}