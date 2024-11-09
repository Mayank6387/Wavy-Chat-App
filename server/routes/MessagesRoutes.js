import {Router} from "express";
import { verifyUser } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessagesController.js";

const messagesRouter=Router();

messagesRouter.post("/get-messages",verifyUser,getMessages)

export default messagesRouter;