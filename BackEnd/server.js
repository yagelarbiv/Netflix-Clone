import express from "express";
import cors from "cors";
import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";

const PORT = ENV_VARS.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routers
// app.use('/api/v1/seed',seedRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/content', protectRoute, contentRouter);
// app.use("/api/v1/search", protectRoute, searchRoutes);

//Microservices
const auth = proxy("https://netflix-clone-two-eosin.vercel.app")
const content = proxy("netflix-clone-content.vercel.app")
app.use('/api/v2/auth', auth);
app.use('/api/v2/Content', content);


//not found handler
app.use((err,req,res,next)=> {
    res.status(500).send({message: err.message});
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
    connectDB();
});