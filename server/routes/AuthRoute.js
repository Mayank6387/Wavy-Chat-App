import {Router} from "express"
import {getUserInfo, login, signup, updateUserInfo} from "../controllers/AuthController.js"
import { verifyUser } from "../middlewares/AuthMiddleware.js";

const authRouter=Router();

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/user-info",verifyUser,getUserInfo);
authRouter.post("/update-profile",verifyUser,updateUserInfo)

export default authRouter;


