import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { Info, Play } from "lucide-react";
import { useContentStore } from "../../store/content";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import MovieSlider from "../../components/MovieSlider";
// ORIGINAL_IMG_BASE_URL
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvShow {
  adult: boolean;
  backdrop_path: string;
  created_by: { [key: string]: unknown }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: { [key: string]: unknown }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    [key: string]: unknown;
  };
  name: string;
  networks: { [key: string]: unknown }[];
  next_episode_to_air: null | {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    [key: string]: unknown;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { [key: string]: unknown }[];
  production_countries: { [key: string]: unknown }[];
  seasons: { [key: string]: unknown }[];
  spoken_languages: { [key: string]: unknown }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Crew {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Crew[];
  guest_stars: GuestStar[];
}

export interface Season {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent() as {
    trendingContent: Movie | TvShow;
  };
  const { contentType } = useContentStore() as { contentType: string };
  const [imgLoading, setImgLoading] = useState(true);


  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );

  return (
    <>
      <div className="relative h-screen text-white" >
        <Navbar />
        {/* COOL OPTIMIZATION HACK FOR IMAGES */}
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
        )}
            <img
            src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
            alt='Hero img'
            className='absolute top-0 left-0 w-full h-full object-cover -z-50'
            onLoad={() => {
              setImgLoading(false);
            }}
          />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div
            className="bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10"
          />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {(trendingContent as Movie)?.title ||
                (trendingContent as TvShow)?.name}
            </h1>
            <p className="mt-2 text-lg">
              {(trendingContent as Movie)?.release_date?.split("-")[0] ||
                (trendingContent as TvShow)?.first_air_date.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>

            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>

            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider
                key={category}
                category={category}
                contType={"empty"}
              />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider
                key={category}
                category={category}
                contType={"empty"}
              />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
