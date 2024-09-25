import express, { urlencoded } from "express";
import cors from "cors";
import { corsConfiguration } from "./configurations/cors.js";
import recommenderRouter from "./routers/recommender-router.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(cors(corsConfiguration()));
app.use(express.json());
app.use("/api", recommenderRouter);
app.get("/", (req, res) => {
  res.send("Welcome to Recommender MicroService");
});

export default app;
