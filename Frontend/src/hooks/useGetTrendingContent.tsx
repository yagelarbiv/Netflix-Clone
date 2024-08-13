import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Movie, TvShow } from "../pages/home/HomeScreen";
import useAuthStore from "../store/authUser";
import { AxiosResponse } from "axios";


const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState<Movie | TvShow>();
	const { contentType, getContent } = useContentStore() as { contentType: string, getContent: (url: string, token: string) => Promise<AxiosResponse | Error | undefined> };
	const { token, authCheck } = useAuthStore() as { token: string, authCheck: () => Promise<void> }; 
	const reDoFunction = async (func: (url: string, token: string) => Promise<AxiosResponse | Error | undefined>, url: string) => {
		try {
			authCheck();
			const response = await func(url, token);
			if (response instanceof Error) {
				console.error(response);
			} else {
				setTrendingContent(response?.data.content);
			}
		} catch (error) {
			console.error(error);
		}
	}; 
	
	useEffect(() => {
		const getTrendingContent = async () => {
			console.log(token)
			try {
				const response = await getContent(`trending/${contentType}`, token);
				if (response instanceof Error) {
					console.error(response);
				} else {
					setTrendingContent(response?.data.content);
				}
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					reDoFunction(getContent, `trending/${contentType}`);
				}
			}
		}

		getTrendingContent();
	}, [contentType, token]);

	return { trendingContent };
};
export default useGetTrendingContent;