import jwt from "jsonwebtoken";
import { ENV_VARS } from "./config/envVars.js";
import nodemailer from 'nodemailer';

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

export const sendMail = async (options) => {
  console.log(options);
  if (ENV_VARS.EmailUserName && ENV_VARS.EmailPassword) {
      const user = ENV_VARS.EmailUserName.toString();
      const pass = ENV_VARS.EmailPassword.toString();
      const transport = nodemailer.createTransport({
          service: 'gmail',
          port:465,
          secure: true,
          auth: {
              user: user,
              pass: pass
          },
          tls: {
              rejectUnauthorized: false
          }
      });
      
      const mail = {
          from: "Netflix Yagel & Avi",
          to: options.email,
          subject: options.subject,
          text: options.message
      }

      await new Promise((resolve, reject) => {
          transport.sendMail(mail, (error, info) => {
              if (error) {
                  console.log(error.message)
                  reject(error)
              } else {
                  console.log("success")
              }
              resolve(info)
          })
  })
  }
}
export const sendSMS = async (options) => {
  console.log(options);
  if (ENV_VARS.EmailUserName && ENV_VARS.EmailPassword) {
      const user = ENV_VARS.EmailUserName.toString();
      const pass = ENV_VARS.EmailPassword.toString();
      const transport = nodemailer.createTransport({
          service: 'gmail',
          port:465,
          secure: true,
          auth: {
              user: user,
              pass: pass
          },
          tls: {
              rejectUnauthorized: false
          }
      });
      
      const mail = {
          from: "Netflix Yagel & Avi",
          to: options.phone,
          subject: options.subject,
          text: options.message
      }

      await new Promise((resolve, reject) => {
          transport.sendMail(mail, (error, info) => {
              if (error) {
                  console.log(error.message)
                  reject(error)
              } else {
                  console.log("success")
              }
              resolve(info)
          })
  })
  }
}

export { generateToken };
