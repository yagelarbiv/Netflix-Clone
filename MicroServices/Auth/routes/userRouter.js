import express from "express"
import expressAsyncHandler from "express-async-handler"
import { forgotPassword, logout, refreshToken, signin, signup, updateUser } from "../controllers/userController.js";


const userRouter = express.Router();
userRouter.post("/login", expressAsyncHandler(signin));
userRouter.post("/signup", expressAsyncHandler(signup));
userRouter.post("/logout", expressAsyncHandler(logout));
userRouter.post("/refresh", expressAsyncHandler(refreshToken));
userRouter.post('/update', expressAsyncHandler(updateUser));
userRouter.post('/forgot-password', expressAsyncHandler(forgotPassword));


export default userRouter;