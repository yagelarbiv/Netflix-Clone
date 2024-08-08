import express from "express";
import cors from "cors";
import userRouter from './routes/userRouter.js';
import seedRouter from './routes/seedRouter.js';
import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";
import contentRouter from "./routes/contentRoute.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
import searchRoutes from "./routes/searchRoute.js";

const PORT = ENV_VARS.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routers
app.use('/api/v1/seed',seedRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/content', protectRoute, contentRouter);
app.use("/api/v1/search", protectRoute, searchRoutes);

//not found handler
app.use((err,req,res,next)=> {
    res.status(500).send({message: err.message});
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
    connectDB();
});