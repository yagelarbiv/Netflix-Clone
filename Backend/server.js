import express from "express";
import cors from "cors";
import contentRouter from "./routes/contentRouter.js";
import userRouter from './routes/userRouter.js';
import seedRouter from './routes/seedRouter.js';
import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";

const PORT = ENV_VARS.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routers
app.use('/api/v1/seed',seedRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/content', contentRouter);

//not found handler
app.use((err,req,res,next)=> {
    res.status(500).send({message: err.message});
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
    connectDB();
});