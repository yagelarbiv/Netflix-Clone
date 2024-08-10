import express from "express"
import expressAsyncHandler from "express-async-handler"
import { logout, refreshToken, signin, signup } from "../controllers/userController.js";


const userRouter = express.Router();
userRouter.post("/login", expressAsyncHandler(signin));
userRouter.post("/signup", expressAsyncHandler(signup));
userRouter.post("/logout", expressAsyncHandler(logout));
userRouter.post("/refresh", expressAsyncHandler(refreshToken));


export default userRouter;