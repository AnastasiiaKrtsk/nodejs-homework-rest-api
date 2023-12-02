import express from "express";
import contactController from "../../controllers/contacts-controllers.js";
import { isEmptyBody } from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAll);
contactsRouter.get("/:id", contactController.getById);
contactsRouter.post("/", isEmptyBody, contactController.add);
contactsRouter.delete("/:id", contactController.deleteById);
contactsRouter.put("/:id", isEmptyBody, contactController.updateById);

export default contactsRouter;
