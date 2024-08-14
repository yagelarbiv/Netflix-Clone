import express from "express";
import cors from "cors";
import userRouter from './routes/userRouter.js';
import seedRouter from './routes/seedRouter.js';
import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const PORT = ENV_VARS.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routers
app.use('/seed',seedRouter);
app.use('/users', userRouter);

//not found handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Pass to default error handler if headers are already sent
    }
    res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`server running on: http://localhost:${PORT}`);
    connectDB();
});