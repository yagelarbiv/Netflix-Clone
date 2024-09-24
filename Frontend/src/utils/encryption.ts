import CryptoJS from "crypto-js";
import Cookie from 'js-cookie';
import { User } from "../store/authUser";
import { AxiosResponse } from "axios";

const secretkey:string = (import.meta.env.VITE_SECRET_KEY_CRYPTO as string);

export const encryptString = (password: string) => {
  if (!secretkey) {
    console.log(secretkey, "key")
    console.error("Encryption error: Secret key is undefined or empty.");
    return null;
  }

  try {
    const encryptedObject = CryptoJS.AES.encrypt(password, secretkey).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const encryptObject = (object: Object) => {
  try {
    const encryptedObject = CryptoJS.AES.encrypt(
      JSON.stringify(object),
      secretkey
    ).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptObject = (ciphertext: string) => {
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

async function encodigResult(response: AxiosResponse<any, any>) {
  const res = response.data
  Cookie.set("Jwt", res.token);
  const newUser: User= {
    _id: res._id,
    email: res.email,
    username: res.username,
    password: "",
    profilePicture: res.profilePicture,
    isAdmin: res.isAdmin,
    myList: res.myList,
    token: res.token
  };
  Cookie.set("user", JSON.stringify(encryptObject(newUser)));
  return res;
}

export { encodigResult };