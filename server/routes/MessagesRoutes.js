import {Router} from "express";
import { verifyUser } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import multer from "multer";

const messagesRouter=Router();

const upload=multer({dest:"uploads/files/"})

messagesRouter.post("/get-messages",verifyUser,getMessages)

messagesRouter.post("/upload-file",verifyUser,
    upload.single("file"),
    uploadFile)

export default messagesRouter;