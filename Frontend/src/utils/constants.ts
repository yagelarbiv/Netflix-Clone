export const SMALL_IMG_BASE_URL: string = "https://image.tmdb.org/t/p/w500";
export const ORIGINAL_IMG_BASE_URL: string = "https://image.tmdb.org/t/p/original";

export const MOVIE_CATEGORIES: string[] = ["now_playing", "top_rated", "popular", "upcoming"];
export const TV_CATEGORIES: string[] = ["airing_today", "on_the_air", "popular", "top_rated"];

export type categories = {
  category: string;
  title: string;
  content: string;
}

export const HOME_PAGE_SLIDER_CATEGORIES: categories[] = [
  {
    title: "Now Playing",
    category: "now_playing",
    content: "movie"
  },
  {
    title: "Airing Today",
    category: "airing_today",
    content: "tv"
  },
  {
    title: "Top Rated",
    category: "top_rated",
    content: "movie"
  },
  {
    title: "on the air",
    category: "on_the_air",
    content: "tv"
  },
  {
    title: "popular",
    category: "popular",
    content: "movie"
  },
  {
    title: "popular",
    category: "popular",
    content: "tv"
  },
  {
    title: "upcoming",
    category: "upcoming",
    content: "movie"
  },
  {
    title: "Top Rated",
    category: "top_rated",
    content: "tv"
  }
];