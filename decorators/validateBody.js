import { HttpError } from "../helpers/index.js";
import { contactAddSheme } from "../models/Contact.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = contactAddSheme.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
export default validateBody;
