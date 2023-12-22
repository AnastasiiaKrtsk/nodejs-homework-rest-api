// import { boolean } from "joi";
import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleSaveError } from "./hooks.js";
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      requered: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError); //adding

contactSchema.pre("findOneAndUpdate", addUpdateSettings); //updating
contactSchema.post("findOneAndUpdate", addUpdateSettings);

export const contactAddSheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean,
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean,
});

const Contact = model("contact", contactSchema);
export default Contact;
