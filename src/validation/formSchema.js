import BaseJoi from "joi";
import JoiDate from "@joi/date";

const Joi = BaseJoi.extend(JoiDate);

const formSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email().required(),
  birthday: Joi.date().required(),
});

export default formSchema;