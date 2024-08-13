import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie, TvShow } from "../pages/home/HomeScreen";
import { AxiosContentInstance } from "../axios";
import { AxiosError, AxiosResponse } from "axios";
import useAuthStore from "../store/authUser";
import Card from "./Card";

const MovieSlider = ({
  category,
  contType = "empty",
  title,
}: {
  category: string;
  contType: string;
  title?: string;
}) => {
  const { contentType, getContent } = useContentStore() as { contentType: string, getContent: (url: string, token: string) => Promise<AxiosResponse | undefined> };
  const [content, setContent] = useState<(Movie | TvShow)[]>([]);
  const [showArrows, setShowArrows] = useState(false);
  const { token, authCheck } = useAuthStore() as { token: string, authCheck: () => Promise<void> };

  const sliderRef = useRef<HTMLDivElement>(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = (contType.includes("empty") || contType.includes("all")) ? contentType === "movie" ? "Movie" : "TV Show" : contType;
  console.log((contType.includes("empty")))
    const reDoFunction = async (func: (url: string, token: string) => Promise<AxiosResponse | undefined>, url: string) => {
      try {
        authCheck();
        const response = await func(url, token);
        if (response instanceof Error) {
          console.error(response);
        } else {
          setContent(response?.data.content);
        }
      } catch (error) {
        console.error(error);
      }
    }; 

  useEffect(() => {
    const getContentfromAxios = async () => {
      try {
        const response = await getContent(`${category}/${contType.includes("empty") || contType.includes("all") ? contentType : contType}`, token);
          setContent(response?.data.content);

      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
				if (error instanceof Error) {
					reDoFunction(getContent, `${category}/${contType.includes("empty") || contType.includes("all") ? contentType : contType}`);
				}
        }
      }
    };

    const getAllContent = async () => {
      try {
        const res = await AxiosContentInstance.get(
          `/trending/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
				console.log(res)
        setContent(res.data.content);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data?.message === "Unathorized - Invalid token") {
            setContent([]);
            return;
          } else {
            console.error(error);
            setContent([]);
          }
        }
      }
    };
    if (contType === "all") {
      getAllContent();
    } else {
      getContentfromAxios();
    }
  }, [contentType, category, token, contType]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20 flex flex-col gap-4 py-8"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 ml-12 text-2xl font-bold">
        {title ? title : `${formattedCategoryName} ${formattedContentType}`}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {Array.isArray(content) && content.length > 0 ? 
				(content.map((item: Movie | TvShow) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
                <Card movieData={item} />
            </div>
            <p className="mt-2 text-center">
              {(item as Movie).title || (item as TvShow).name}
            </p>
          </Link>
				))) : (
					<Link
            to={`/watch/${(content as unknown as Movie | TvShow).id}`}
            className="min-w-[250px] relative group"
            key={(content as unknown as Movie | TvShow).id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + (content as unknown as Movie | TvShow).backdrop_path}
                alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">
              {(content as unknown as Movie).title || (content as unknown as TvShow).name}
            </p>
          </Link>
				)}
      </div>

      {showArrows && (
        <div>
          <button
            type="button"
            title="Scroll left"
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            title="Scroll right"
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};
export default MovieSlider;
