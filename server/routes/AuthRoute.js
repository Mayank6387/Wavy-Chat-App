import {Router} from "express"
import {addProfileImage, getUserInfo, login, logOut, removeProfileImage, signup, updateUserInfo} from "../controllers/AuthController.js"
import { verifyUser } from "../middlewares/AuthMiddleware.js";
import multer from "multer"

const authRouter=Router();

const upload=multer({dest:"uploads/profiles/"})

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/user-info",verifyUser,getUserInfo);
authRouter.post("/update-profile",verifyUser,updateUserInfo)

authRouter.post("/add-profile-image",verifyUser,
    upload.single("profile-image"),   //profile-image =>name of the input field given in frontend
    addProfileImage)

authRouter.delete("/remove-profile-image",verifyUser,removeProfileImage)
authRouter.post('/logout',logOut)

export default authRouter;


