import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import contentRouter from "./routes/contentRouter.js";
import userRouter from './routes/userRouter.js';
import seedRouter from './routes/seedRouter.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
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
mongoose
.connect('mongodb+srv://yagelarbiv2:Ya123456@cluster0.vlxquk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err.message);
});