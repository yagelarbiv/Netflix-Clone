import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie, TvShow } from "../pages/home/HomeScreen";
import { AxiosContentInstance } from "../axios";
import { AxiosError } from "axios";
import useAuthStore from "../store/authUser";


const MovieSlider = ({ category, contType = "empty" }: { category: string, contType: string }) => {
	const { contentType } = useContentStore() as { contentType: string };
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);
	const { token } = useAuthStore() as { token: string };

	const sliderRef = useRef<HTMLDivElement>(null);

	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = (contType === "empty") ? ((contentType === "movie") ? ("Movie") : ("TV Show")) : contType;

	useEffect(() => {
		const getContent = async () => {
			try {
				const res = await AxiosContentInstance.get(`/${category}/${contType || contentType}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
			setContent(res.data.content);
		}
		catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.data?.message === 'Unathorized - Invalid token') {
					setContent([]);
					return;
				}
				else{
					console.error(error);
					setContent([]);
				}
			}
		}
		};

		getContent();
	}, [contentType, category, token]);

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current?.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	return (
		<div
			className='bg-black text-white relative px-5 md:px-20'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{formattedCategoryName} {formattedContentType}
			</h2>

			<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
				{content.map((item:Movie|TvShow) => (
					<Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
						<div className='rounded-lg overflow-hidden'>
							<img
								src={SMALL_IMG_BASE_URL + item.backdrop_path}
								alt='Movie image'
								className='transition-transform duration-300 ease-in-out group-hover:scale-125'
							/>
						</div>
						<p className='mt-2 text-center'>{(item as Movie).title || (item as TvShow).name}</p>
					</Link>
				))}
			</div>

			{showArrows && (
				<>
					<button
            type="button"
            title="Scroll left"
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
            type="button"
            title="Scroll right"
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};
export default MovieSlider;