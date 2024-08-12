import { fetchFromTMDB } from "../services/tmdb.js";

export const getTrendingContent = async (req, res) => {
  const { type } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`);
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
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentDetails = async (req, res) => {
  const { type, id } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`);
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSimilarContent = async (req, res) => {
  const { type, id } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getContentByCategory = async (req, res) => {
  const { type, category } = req.params;
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`);
    res.status(200).send({ content: data.results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getSeasonDetails = async (req, res) => {
  const { id, seasonNumber } = req.params;
  console.log(id, seasonNumber);
  try {
    const { data } = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`);
    res.status(200).send({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}
