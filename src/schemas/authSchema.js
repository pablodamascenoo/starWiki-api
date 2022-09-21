import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.required": "passwords must match" }),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
