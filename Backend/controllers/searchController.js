import User from "../models/User.js";
import { fetchFromTMDB } from "../services/tmdb.js";

export async function searchPerson(req, res) {
	const { query } = req.params;
	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);
		console.log('search' + response.data.results);

		if (response.data.results.length === 0) {
			return res.status(404).send(null);
		}

		res.status(200).json({ success: true, content: response.data.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchContent(req, res) {
	const { type, query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`
		);
		console.log('search' + response.data.results);

		if (response.data.results.length === 0) {
			return res.status(404).send(null);
		}
		res.status(200).json({ success: true, content: response.data.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export const getContentByGenre = async (req, res) => {
  const { type, genre } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/discover/${type}?language=en-US&page=1&with_genres=${genre}`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  } 
}