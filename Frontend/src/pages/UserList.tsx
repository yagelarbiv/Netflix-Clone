import { useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import useAuthStore, { User } from "../store/authUser";
import { Movie, TvShow } from "./home/HomeScreen";

function formatDate(dateString: string) {
	// Create a Date object from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the Date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Return the formatted date string
	return `${month} ${day}, ${year}`;
}

const UserList = () => {
  const [myList, setMyList] = useState<(Movie | TvShow)[]>([]);
  const { user, update } = useAuthStore() as { user: User, update: (user: User) => Promise<void> };


	const handleDelete = (content: Movie | TvShow) => {
			setMyList(user?.myList.filter((entry: Movie | TvShow) => entry.id !== content.id));
      update({ ...user, myList: user.myList.filter((entry: Movie | TvShow) => entry.id !== content.id) });
	};

	if (myList?.length === 0) {
		return (
			<div className='bg-black min-h-screen text-white'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>User List</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl'>No User List found</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-black text-white min-h-screen'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8'>Search History</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4'>
					{myList?.map((entry: Movie | TvShow) => (
						<div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start'>
							<img
								src={SMALL_IMG_BASE_URL + (entry as Movie).poster_path}
								alt='History image'
								className='size-16 rounded-full object-cover mr-4'
							/>
							<div className='flex flex-col'>
								<span className='text-white text-lg'>{(entry as Movie).title}</span>
								<span className='text-gray-400 text-sm'>{formatDate((entry as Movie).release_date)}</span>
							</div>

							<span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									Object.keys(entry).includes("title")
										? "bg-red-600"
										: Object.keys(entry).includes("name")
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							>
								{Object.keys(entry).includes("title") ? "Movie" : Object.keys(entry).includes("name") ? "TV Show" : "Series"}
							</span>
							<Trash
								className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
								onClick={() => handleDelete(entry)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default UserList;