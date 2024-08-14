import { useState } from "react";
import { Movie, TvShow } from "../pages/home/HomeScreen";
import toast from "react-hot-toast";
import useAuthStore, { User } from "../store/authUser";
import { Link, useNavigate } from "react-router-dom";
import { MOVIE_GENRES, TV_GENRES } from "../utils/constants";


function Card({ movieData, isLiked = false }: { movieData: Movie | TvShow, isLiked?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user, update } = useAuthStore() as {
    user: User;
    update: (user: User) => Promise<void>;
    token: string;
  };
  const navigate = useNavigate();

  const addToWatchList = async () => {
    if (!user || !movieData) {
      return;
    }
    try {
      if (user.myList.includes(movieData)) {
        toast.error("Already added to watch list");
      } else {
        user.myList.push(movieData);
        update(user);
        toast.success("Added to watch list");
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        console.log(error);
      }
    }
  };

  const isMovie = (): boolean => {
    return (movieData as Movie).title !== undefined;
  };

  const getMovieGenreName = (genreId: number) => {
    const genre = MOVIE_GENRES.find((genre) => genre.id === genreId);
    return genre;
  };

  const getTvGenreName = (genreId: string) => {
    const genre = TV_GENRES.find((genre) => genre.id === Number(genreId));
    return genre;
  };

  const removeFromList = async () => {
    if (!user || !movieData) {
      return;
    }
    try {
      if (user.myList.includes(movieData)) {
        const index = user.myList.indexOf(movieData);
        user.myList.splice(index, 1);
        update(user);
        toast.success("Removed from watch list");
      } else {
        toast.error("Already removed from watch list");
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className='max-w-500 w-500 h-full cursor-pointer relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${(movieData as Movie).backdrop_path || (movieData as TvShow).poster_path}`}
        alt="card"
        className="rounded-[0.2rem] w-full h-full z-10"
        onClick={() => navigate(`/watchlist/${(movieData as Movie).id || (movieData as TvShow).id}`)}
      />

      {isHovered && (
        //Description size
        <div className="z-10 h-max w-80 absolute -top-[18vh] left-0 rounded-[0.3rem] bg-[#181818] transition-all duration-300 ease-in-out">
          <div className="relative h-[140px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${(movieData as Movie).backdrop_path || (movieData as TvShow).poster_path}`}
              alt="card"
              className="w-full h-[140px] object-cover rounded-[0.3rem] top-0 z-[4] absolute"
            />
          </div>
          <div className="relative p-4 gap-2 flex flex-col z-10">
            <Link to={`/watchlist/${(movieData as Movie).id || (movieData as TvShow).id}`}>
              <h3 className="text-white">
                {(movieData as Movie).title || (movieData as TvShow).name}
              </h3>
            </Link>
            <div className="flex justify-between">
              <div className="flex gap-4">
                {isLiked ? (
                  <button
                    title="Remove from List"
                    className="text-3xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#b8b8b8]"
                    onClick={removeFromList}
                  >Remove from List</button>
                ) : (
                  <button title="Add to my list" className="text-3xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#b8b8b8]" onClick={addToWatchList} >Add to my list</button>
                )}
              </div>
              <div className="text-2xl cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out">
                <Link to={`/watchlist/${(movieData as Movie).id || (movieData as TvShow).id}`}>
                  <button className="text-3xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#b8b8b8]" title="More Info">More Info</button>
                </Link>
              </div>
            </div>
            <div>
              <ul className="flex gap-4">
              {(movieData as Movie).genre_ids || (movieData as TvShow).genres.map((genre, index: number) => (
                isMovie() ? (
                  <li key={index} className={`pr-3 ${index === 0 ? 'list-none' : 'list-disc'}`}>{getMovieGenreName((genre as { id: number }).id)?.name}</li>
                ) : (
                  <li key={index} className={`pr-3 ${index === 0 ? 'list-none' : 'list-disc'}`}>{getTvGenreName((genre as { id: string }).id)?.name}</li>
                )
              ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card
