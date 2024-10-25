import {Router} from "express"
import {addProfileImage, getUserInfo, login, removeProfileImage, signup, updateUserInfo} from "../controllers/AuthController.js"
import { verifyUser } from "../middlewares/AuthMiddleware.js";
import multer from "multer"

const authRouter=Router();

const upload=multer({dest:"uploads/profiles/"})

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/user-info",verifyUser,getUserInfo);
authRouter.post("/update-profile",verifyUser,updateUserInfo)
authRouter.post("/add-profile-image",verifyUser,
    upload.single("profile-image"),
    addProfileImage)

authRouter.delete("/remove-profile-image",verifyUser,removeProfileImage)

export default authRouter;


