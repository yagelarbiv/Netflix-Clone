import express from "express";
import {
	searchContent,
	searchPerson,
  getContentByGenre
} from "../controllers/searchController.js";

const searchRoutes = express.Router();

searchRoutes.get("/person/:query", searchPerson);
searchRoutes.get("/content/:type/:query", searchContent);
searchRoutes.get('/:type/:genre', getContentByGenre);


export default searchRoutes;