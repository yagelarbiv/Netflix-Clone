import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { AxiosError, AxiosResponse } from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import toast from "react-hot-toast";
import { Movie, Season, TvShow } from "./home/HomeScreen";
import useAuthStore, { User } from "../store/authUser";

export interface Trailer {
  key: string;
}

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<Movie | TvShow>();
  const [season, setSeason] = useState<number>(0);
  const [seasonDetails, setSeasonDetails] = useState<Season>();
  const [similarContent, setSimilarContent] = useState([]);
  const [hover, setHover] = useState(false);
  const { contentType, getContent } = useContentStore() as { contentType: string, getContent: (url: string, token: string) => Promise<AxiosResponse | undefined>; };
  const { user, update, token, authCheck } = useAuthStore() as {
    user: User;
    update: (user: User) => Promise<void>;
    token: string;
    authCheck: () => Promise<void>;
  };
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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
    const getTrailers = async () => {
      try {
        const res = await getContent(`${id}/trailers/${contentType}`, token);

        setTrailers(res?.data.content);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            toast.error(
              "Nothing found, make sure you are searching under the right category"
            );
          } else {
            toast.error("An error occurred, please try again later");
          }
        } else {
          console.error(error);
          if (error instanceof Error) {
            reDoFunction(getContent, `${id}/trailers/${contentType}`);
          }
        }
      }
    };

    getTrailers();
  }, [contentType, id, token]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await getContent(`${id}/similar/${contentType}`, token);

        setSimilarContent(res?.data.content);
      } catch (error) {
        if (error instanceof Error) {
          reDoFunction(getContent, `${id}/similar/${contentType}`);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id, token]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await getContent(`${id}/details/${contentType}`, token);
        setContent(res?.data?.content);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          reDoFunction(getContent, `${id}/details/${contentType}`);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id, token]);

  useEffect(() => {
    const getSeasonDetails = async () => {
      if (content && Object.keys(content).includes("number_of_seasons")) {
        try {
          const res = await getContent(`${contentType}/${id}/season/${season}`, token);
          setSeasonDetails(res?.data.content);
        }
        catch (error){
          console.error(error);
          if (error instanceof Error) {
            reDoFunction(getContent, `${contentType}/${id}/trailers`);
          }
        }
      }
    };
    getSeasonDetails();
  }, [content, id, season, token]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const addToWatchList = async () => {
    if (!user || !content) {
      return;
    }
    try {
      if (user.myList.includes(content)) {
        toast.error("Already added to watch list");
      } else {
        user.myList.push(content);
        update(user);
        toast.success("Added to watch list");
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        console.log(error);
      }
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading || !token)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers?.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              title="Previous trailer"
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
                }}
							`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              title="Next trailer"
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed "
                  : ""
                }}
							`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {trailers?.length > 0 && (
            <ReactPlayer
              controls={true}
              playing={hover}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {(content as Movie)?.title || (content as TvShow)?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-10 
				max-w-6xl mx-auto"
        >
          <div className="mb-2 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {(content as Movie)?.title || (content as TvShow)?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                (content as Movie)?.release_date ||
                (content as TvShow)?.first_air_date
              )}{" "}
              |{" "}
              {(content as Movie)?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{(content as Movie)?.overview}</p>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded mt-4"
              onClick={addToWatchList}
            >
              {user?.myList.includes(content)
                ? "Remove from My List"
                : "Add to My List"}
            </button>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + (content as Movie)?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        <div>
          {Object.keys(content).includes("number_of_seasons") ? (
            <select
              title="Select Season"
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded mt-4"
            >
              {Array.from(
                { length: (content as TvShow).number_of_seasons },
                (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    season {i + 1}
                  </option>
                )
              )}
            </select>
          ) : null}

          {Object.keys(content).includes("number_of_episodes") ? (
            <div>
              {seasonDetails?.episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="mt-4 text-lg border-gray-500/70 hover:bg-gray-500 p-2"
                >

                  <div className="flex items-center"> {/* align items at the start to reduce vertical space */}

                    <div className="flex-shrink-0 text-3xl mr-4 ml-24"> {/* Adjust margin-right */}
                      {episode.episode_number}
                    </div>


                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                        alt="episode img"
                        className="w-96 h-64"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />

                      {isHovered && trailers.length > 0 && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                          <div className="px-4">
                            <ReactPlayer
                              controls={true}
                              width="90%"
                              height="20vh"
                              className="mx-auto overflow-hidden rounded-lg"
                              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                            />
                          </div>
                        </div>
                      )}
                    </div>


                    <div className="ml-4 flex-1">
                      <p className="font-bold">
                        {episode.episode_number}. {episode.name}
                      </p>
                      <p className="mt-1">{episode.overview}</p> {/* Adjust margin-top */}
                      <p className="mt-1">Air Date: {episode.air_date}</p> {/* Adjust margin-top */}
                      <p className="mt-1">Crew: {episode?.crew?.map((c) => c.name).join(", ")}</p> {/* Adjust margin-top */}
                      <p className="mt-1">
                        Guest Stars: {episode?.guest_stars?.map((c) => c.name).join(", ")}
                      </p> {/* Adjust margin-top */}
                    </div>
                  </div>
                  <hr className="mt-2" /> {/* Adjust margin-top */}
                </div>

              ))}
            </div>
          ) : null}
        </div>

        {similarContent?.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if ((content as Movie).poster_path === null) return null;
                return (
                  <Link
                    key={(content as Movie).id}
                    to={`/watch/${(content as Movie).id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + (content as Movie).poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {(content as Movie).title || (content as TvShow).name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										  bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WatchPage;
