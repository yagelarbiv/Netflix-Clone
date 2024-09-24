import jwt from "jsonwebtoken";
import { ENV_VARS } from "./config/envVars.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import CryptoJS from "crypto-js";

export const encryptString = (password) => {
  if (!ENV_VARS.secretKey || ENV_VARS.secretKey === "") {
    console.error("Encryption error: Secret key is undefined or empty.");
    return null;
  }

  try {
    const encryptedObject = CryptoJS.AES.encrypt(password, ENV_VARS.secretKey).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const encryptObject = (object) => {
  try {
    const encryptedObject = CryptoJS.AES.encrypt(
      JSON.stringify(object),
      ENV_VARS.secretKey
    ).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptObject = (ciphertext) => {
  if (!ciphertext) {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretkey);
    console.log('Decrypted bytes:', bytes);
    const utf8String = bytes.toString(CryptoJS.enc.Utf8);
    console.log('UTF-8 string:', utf8String);
    if (!utf8String || typeof utf8String !== 'string') {
      console.error('Failed to convert decrypted bytes to UTF-8 string');
      return null;
    }

    const decryptedObject = JSON.parse(utf8String);

    if (decryptedObject.user) {
      const { user, ...rest } = decryptedObject;
      return {
        ...rest,
        ...user,
        profileId: user?.profileId || null, 
      };
    }

    console.log(decryptedObject);
    return decryptedObject;
  } catch (error) {
    console.error("Decryption error:", error);
    console.log("Ciphertext:", ciphertext);
    console.log("Secret key:", secretkey);
    return null;
  }
};

const generateToken = (_id, res) => {
  const token = jwt.sign(
    {
      _id: _id,
    },
    ENV_VARS.JWT_PW,
    {
      expiresIn: 60 * 1000 * 60 * 24 * 7,
    }
  );
  res.cookie("Jwt", token, {
    httpOnly: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
    sameSite: "strict",
    secure:  ENV_VARS.NODE_ENV !== "development",
    secure:  ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};

const sendMail = async (options) => {
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
};

const sendSMS = async (options) => {
  if (ENV_VARS.accountid && ENV_VARS.authToken) {
    const client = twilio(ENV_VARS.accountid, ENV_VARS.authToken);
    const SMS = await client.messages.create({
      from: "+13344876873",
      to: options.phone,
      body: options.message,
    });
    console.log("SMS", SMS);
  }
}


export { generateToken, sendMail, sendSMS };
