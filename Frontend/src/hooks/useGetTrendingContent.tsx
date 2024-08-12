import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Movie, TvShow } from "../pages/home/HomeScreen";
import { AxiosContentInstance } from "../axios";
import useAuthStore from "../store/authUser";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState<Movie | TvShow>();
	const { contentType } = useContentStore() as { contentType: string };
	const { token } = useAuthStore() as { token: string }; 

	useEffect(() => {
		const getTrendingContent = async () => {
			console.log(token)
			const res = await AxiosContentInstance.get(`trending/${contentType}`,{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			setTrendingContent(res.data.content);
		};

		getTrendingContent();
	}, [contentType, token]);

	return { trendingContent };
};
export default useGetTrendingContent;