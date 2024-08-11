import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosUsersInstance } from "../axios";
import Cookie from 'js-cookie';
import { Movie, TvShow } from "../pages/home/HomeScreen";

export interface User {
	_id: '',
	username: '',
	profilePicture: '',
	myList: (Movie | TvShow)[],
}

interface AuthStore {
  user: User | null;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  signup: (credentials: unknown) => Promise<void>;
  login: (credentials: unknown) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
  update: (user: User) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials: unknown) => {
    set({ isSigningUp: true });
    try {
      const response = await AxiosUsersInstance.post("/signup", credentials);
      Cookie.set("JWT-Netflix", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
			toast.error((axiosError.response?.data as { message: string }).message || "Signup failed");		
		}
  },
  login: async (credentials: unknown) => {
    set({ isLoggingIn: true });
    try {
      const response = await AxiosUsersInstance.post("/login", credentials);
      Cookie.set("JWT-Netflix", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isLoggingIn: false });
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
			toast.error((axiosError.response as unknown as { message: string }).message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await AxiosUsersInstance.post("/logout");
      Cookie.remove("JWT-Netflix");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
			toast.error((axiosError.response?.data as { message: string }).message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await AxiosUsersInstance.post("/refresh"
      );
      Cookie.set("JWT-Netflix", response.data.token);
      set({ user: response.data, isCheckingAuth: false });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log(error);
      toast.error((axiosError as { message: string }).message || "refresh failed");
      set({ isCheckingAuth: false });
    }
  },
  update: async (user: User) => {
    try {
      const response = await AxiosUsersInstance.post("/update", {
        user
      });
      set({ user: response.data });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log(error);
      toast.error((axiosError.response?.data as { message: string }).message || "update failed");
    }
  },
}));

export default useAuthStore;