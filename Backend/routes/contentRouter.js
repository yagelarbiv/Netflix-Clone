import express from "express";
import {getContentById, getContents, getContentCategories} from "../controllers/contentController.js";
import expressAsyncHandler from "express-async-handler";

const contentRouter = express.Router();
contentRouter.get("/",expressAsyncHandler(getContents));
contentRouter.get("/categories",expressAsyncHandler(getContentCategories));
// contentRouter.get("/search",expressAsyncHandler(getProductsByQuery));
contentRouter.get("/:id",expressAsyncHandler(getContentById));

export default contentRouter;