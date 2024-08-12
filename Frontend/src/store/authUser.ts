import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { AxiosUsersInstance } from "../axios";
import Cookie from 'js-cookie';
import { Movie, TvShow } from "../pages/home/HomeScreen";

export interface User {
	_id: '',
	username: '',
  email: '',
	profilePicture: '',
  isAdmin: false,
	myList: (Movie | TvShow)[],
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
      console.log(response);
      Cookie.set("Jwt", JSON.stringify(response.data.token));
      console.log(Cookie.get("Jwt"));
      const user: User = {
        _id: response.data._id,
        email: response.data.email,
        username: response.data.username,
        profilePicture: response.data.profilePicture,
        isAdmin: response.data.isAdmin,
        myList: response.data.myList,
      };
      Cookie.set("user", JSON.stringify(user));
      set({ user: response.data, isSigningUp: false, token: response.data.token });
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
      console.log(response);
      Cookie.set("Jwt", response.data.token);
      const user = {
        _id: response.data._id,
        email: response.data.email,
        username: response.data.username,
        profilePicture: response.data.profilePicture,
        isAdmin: response.data.isAdmin,
        myList: response.data.myList,
      };
      Cookie.set("user", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data, isLoggingIn: false, token: response.data.token });
    } catch (error: unknown) {
			const axiosError = error as AxiosError;
			toast.error((axiosError.response as unknown as { message: string }).message || "Login failed");
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
			toast.error((axiosError.response?.data as { message: string }).message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const UserCookie = JSON.parse(Cookie.get("user")?.toString() || "{}");
      const response = await AxiosUsersInstance.post("/refresh", {
        id: UserCookie._id,
      });
      Cookie.set("Jwt", response.data.token);
      const user = {
        _id: response.data._id,
        email: response.data.email,
        username: response.data.username,
        profilePicture: response.data.profilePicture,
        isAdmin: response.data.isAdmin,
        myList: response.data.myList,
      };
      Cookie.set("user", JSON.stringify(user));
      set({ user: response.data, isCheckingAuth: false, token: response.data.token });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log(error);
      toast.error((axiosError as { message: string }).message || "refresh failed");
      set({ isCheckingAuth: false });
    }
  },
  update: async (user: User) => {
    try {
      Cookie.set("user", JSON.stringify(user));
      const response = await AxiosUsersInstance.post("/update", {
        user
      });
      console.log(response.data);
      set({ user: response.data });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log("Error updating user:", axiosError);
      console.log("Response data:", axiosError.response?.data);
      toast.error((axiosError.response?.data as { message: string }).message || "update failed");
    }
  },
}));

export default useAuthStore;