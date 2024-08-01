import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../Models/UserModel';
import { generateToken } from '../Utils';

export const signin = async (req: Request, res: Response) => {
  const { email, password: passwordFromWebsite } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if(bcrypt.compareSync(passwordFromWebsite, user.password)){
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    password:bcrypt.hashSync(password)
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
};