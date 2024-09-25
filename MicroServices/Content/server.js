import express from "express";
import cors from "cors";
import { ENV_VARS } from "./config/envVars.js";
import contentRouter from "./routes/contentRoute.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
import searchRoutes from "./routes/searchRoute.js";
import connectDB from "./config/db.js";

const PORT = ENV_VARS.PORT;
const app = express();

app.use(cors({
    origin: [
        'http://frontend:5173',
        'http://localhost:5173',
        'http://backend:8081',
        'http://localhost:8081',
        // 'https://netflix-clone-front-amber.vercel.app',
        // 'https://netflix-clone-backend-alpha.vercel.app',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routers
app.use('/Items', protectRoute, contentRouter);
app.use("/search", protectRoute, searchRoutes);

//not found handler
app.use((err,req,res,next)=> {
    res.status(500).send({message: err.message});
});

app.get("/", (req, res) => {
    res.send("Welcome to Content MicroService");
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
    connectDB();
});