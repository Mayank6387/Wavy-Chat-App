import { Router } from "express";
import { verifyUser } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";

const contactsRouter=Router();

contactsRouter.post("/searchContacts",verifyUser,searchContacts);
contactsRouter.get("/get-contacts-for-dm",verifyUser,getContactsForDMList)

export default contactsRouter;
