import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Movie, TvShow } from "../pages/home/HomeScreen";
import { AxiosContentInstance } from "../axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState<Movie | TvShow>();
	const { contentType } = useContentStore() as { contentType: string };

	useEffect(() => {
		const getTrendingContent = async () => {
			const res = await AxiosContentInstance.get(`trending/${contentType}`,
			);
			setTrendingContent(res.data.content);
		};

		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};
export default useGetTrendingContent;