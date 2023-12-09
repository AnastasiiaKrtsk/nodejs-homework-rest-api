import * as contactsService from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSheme, contactUpdateScheme } from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};
const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { error } = contactUpdateScheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(400, error.message);
  }
  res.json({
    message: "Delete success",
  });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(400, error.message);
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
