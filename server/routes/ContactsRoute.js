import { Router } from "express";
import { verifyUser } from "../middlewares/AuthMiddleware.js";
import { searchContacts } from "../controllers/ContactsController.js";

const contactsRouter=Router();

contactsRouter.post("/searchContacts",verifyUser,searchContacts);


export default contactsRouter;
