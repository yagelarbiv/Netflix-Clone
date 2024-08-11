import express from 'express';
import { getSeasonDetails, getSimilarContent, getTrendingContent, getContentByCategory, getContentDetails, getContentTrailers } from '../controllers/contentController.js';

const contentRouter = express.Router();
contentRouter.get('/trending/:type', getTrendingContent);
contentRouter.get('/:id/trailers/:type', getContentTrailers);
contentRouter.get('/:id/details/:type', getContentDetails);
contentRouter.get('/:id/similar/:type', getSimilarContent);
contentRouter.get('/:category/:type', getContentByCategory);
contentRouter.get('/:id/season/:seasonNumber', getSeasonDetails);

export default contentRouter;