import express from "express";
import contactController from "../../controllers/contacts-controllers.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import { contactAddSheme, contactUpdateScheme } from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";
const contactsRouter = express.Router();

contactsRouter.use(authenticate);
contactsRouter.get("/", contactController.getAll);
contactsRouter.get("/:id", isValidId, contactController.getById);
contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSheme),
  contactController.add
);
contactsRouter.delete("/:id", isValidId, contactController.deleteById);
contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateScheme),
  contactController.updateById
);

export default contactsRouter;
