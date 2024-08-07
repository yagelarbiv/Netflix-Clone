import express from "express";
import {getContentById, getContents, getContentCategories, getProductsByQuery} from "../controllers/contentController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();
productRouter.get("/",expressAsyncHandler(getContents));
productRouter.get("/categories",expressAsyncHandler(getContentCategories));
// productRouter.get("/search",expressAsyncHandler(getProductsByQuery));
productRouter.get("/:id",expressAsyncHandler(getContentById));

export default productRouter;