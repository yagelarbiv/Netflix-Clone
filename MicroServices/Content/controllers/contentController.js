import { ENV_VARS } from "../config/envVars.js";
import { fetchFromTMDB } from "../services/tmdb.js";

const APIKey = ENV_VARS.TMDB_API_KEY;
export const getTrendingContent = async (req, res) => {
  const { type } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${APIKey}&language=en-US`);
    const randomContent = data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).send({content: randomContent});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentTrailers = async (req, res) => {
  const { type, id } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${APIKey}&language=en-US`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentDetails = async (req, res) => {
  const { id, type } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}?api_key=${APIKey}&language=en-US`);
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSimilarContent = async (req, res) => {
  const { type, id } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${APIKey}&language=en-US&page=1`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentByCategory = async (req, res) => {
  const { type, category } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${category}?api_key=${APIKey}&language=en-US&page=1`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getAllContentByCategory = async (req, res) => {
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKey}&language=en-US`);

    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSeasonDetails = async (req, res) => {
  const { type, id, seasonNumber } = req.params;
  console.log(id, seasonNumber);
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${APIKey}&language=en-US`);
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}
