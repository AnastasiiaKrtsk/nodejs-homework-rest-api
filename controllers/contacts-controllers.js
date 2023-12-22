import * as contactsService from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSheme, contactUpdateScheme } from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  const total = await Contact.countDocuments({ owner });

  res.json({ result, total });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });

  // const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = contactUpdateScheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id, owner }, req.body);
  if (!result) {
    throw HttpError(400, error.message);
  }
  res.json({
    message: "Delete success",
  });
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
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
