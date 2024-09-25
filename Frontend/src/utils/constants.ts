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
    title: "On The Air",
    category: "on_the_air",
    content: "tv"
  },
  {
    title: "Popular",
    category: "popular",
    content: "movie"
  },
  {
    title: "Popular",
    category: "popular",
    content: "tv"
  },
  {
    title: "Upcoming",
    category: "upcoming",
    content: "movie"
  },
  {
    title: "Top Rated",
    category: "top_rated",
    content: "tv"
  }
];

export const NEW_AND_POPULAR_CATEGORIES: categories[] = [
  {
    title:"Trending Movies And Tv Shows",
    category: "trending_all",
    content: "all"
  },
  {
    title: "Tv Shows On The Air",
    category: "on_the_air",
    content: "tv"
  },
  {
    title: "Now Playing Movies",
    category: "now_playing",
    content: "movie"
  },
  {
    title: "Tv Shows Airing Today",
    category: "airing_today",
    content: "tv"
  },
  {
    title: "Upcoming Movies",
    category: "upcoming",
    content: "movie"
  },
]

export type Genre = {
  id: number;
  name: string;
}

export const MOVIE_GENRES: Genre[] = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
]

export const TV_GENRES: Genre[] = [
  {
    id: 10759,
    name: "Action & Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 10762,
    name: "Kids"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10763,
    name: "News"
  },
  {
    id: 10764,
    name: "Reality"
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy"
  },
  {
    id: 10766,
    name: "Soap"
  },
  {
    id: 10767,
    name: "Talk"
  },
  {
    id: 10768,
    name: "War & Politics"
  },
  {
    id: 37,
    name: "Western"
  }
]