import { create } from "zustand";
import { AxiosContentInstance } from "../axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

interface ContentStore {
  contentType: string;
  isLoading: boolean;
  setContentType: (type: string) => void;
  getContent: (url: string, token: string) => Promise<AxiosResponse | undefined>;
};

export const useContentStore = create<ContentStore>((set) => ({
	contentType: "movie",
	isLoading: false,
	setContentType: (type: string) => set({ contentType: type }),
	getContent: async (url:string, token: string) => {
		set({ isLoading: true });
		try {
			if (url) {
				const res = await AxiosContentInstance.get(url, {
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				})
				set({ isLoading: false });
				return res;
			} else {
				return Promise.reject(new Error('URL is required'));
			}
		} catch (error: unknown) {
			set({ isLoading: false });
			const axiosError = error as AxiosError;
			toast.error((axiosError.response as unknown as { message: string }).message || "ContentRequest failed from: " + url);
			const errorAsError = error as Error;
			if (errorAsError.message === "Unathorized - Invalid token"){
				throw new Error("Unathorized - Invalid token");
			}
		}
	},
}));