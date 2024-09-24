import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import Cookie from 'js-cookie';
import { Movie, TvShow } from "../pages/home/HomeScreen";
import { AxiosUsersInstance } from "../axios";
import { decryptObject, encodigResult, encryptObject, encryptString } from "../utils/encryption";

export interface User {
	_id: string,
	username: string,
  email: string,
  password: string,
	profilePicture: string,
  isAdmin: false,
	myList: (Movie | TvShow)[],
  token: string,
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  signup: (credentials: unknown) => Promise<void>;
  login: (credentials: unknown) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
  update: (user: User) => Promise<void>;
  forgotPassword: (email: string|undefined, phoneNumber: string|undefined, code: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: (Cookie.get("user") as unknown as User) ?? null,
  token: Cookie.get("Jwt") ?? null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials: unknown) => {
    set({ isSigningUp: true });
    try {
      const response = await AxiosUsersInstance.post("/signup", credentials);
      const res = await encodigResult(response);
      set({ user: res, isSigningUp: false, token: res.token });
      toast.success("Account created successfully");
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
			console.log((axiosError.response?.data as { message: string }).message || "Signup failed");
      set({ isSigningUp: false });
		}
  },
  login: async (credentials: unknown) => {
    set({ isLoggingIn: true });
    try {
      const response = await AxiosUsersInstance.post("/login", credentials);
      const res = await encodigResult(response);
      set({ user: res, isLoggingIn: false, token: res.token });
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
			console.log((axiosError.response as unknown as { message: string })?.message || "Login failed");
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await AxiosUsersInstance.post("/logout",
        {},
      );
      Cookie.remove("Jwt");
      Cookie.remove("user");
      set({ user: null, isLoggingOut: false, token: null });
      toast.success("Logged out successfully");
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
      console.log(error);
			console.log((axiosError.response?.data as { message: string }).message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const userCookie = Cookie.get("user") ?? "";
      const UserCookie = JSON.parse(await decryptObject(userCookie.toString()) || "{}");
      const response = await AxiosUsersInstance.post("/refresh", {
        id: UserCookie._id,
      });
      const res = await encodigResult(response);
      set({ user: res, isCheckingAuth: false, token: res.token });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log(error);
      console.log((axiosError as { message: string }).message || "refresh failed");
      set({ isCheckingAuth: false });
    }
  },
  update: async (user: User) => {
    try {
      const decodedUser = await decryptObject(JSON.stringify(user));
      const userObject = JSON.parse(decodedUser) as User;
      const response = await AxiosUsersInstance.post("/update", {
        userObject
      });
      await encodigResult(response);
      set({ user: response.data });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log("Error updating user:", axiosError);
      console.log("Response data:", axiosError.response?.data);
    }
  },
  forgotPassword: async (email: string|undefined, phoneNumber: string|undefined, code: string) => {
    if(!email && !phoneNumber) return;
    if(email !== undefined){  
      try {
        const response = await AxiosUsersInstance.post("/forgot-password",{
          email: email,
          code: code
        });
        toast.success(response.data.message || "generate password successful");
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.log("Error generating password:", axiosError);
        console.log("Response data:", axiosError.response?.data);
      }
    }
    if(phoneNumber !== undefined){
      try {
        const response = await AxiosUsersInstance.post("/forgot-password",{
          phoneNumber: phoneNumber,
          code: code
        });
        toast.success(response.data.message || "generate password successful");
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.log("Error generating password:", axiosError);
        console.log("Response data:", axiosError.response?.data);
      }
    }
  }
}));

export default useAuthStore;
