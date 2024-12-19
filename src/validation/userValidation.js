// src/validation/userValidation.js

import Joi from "@hapi/Joi"

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().max(20).min(8).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
})
const updateSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().max(20).min(8).required(),
    email: Joi.string().email().lowercase().required(),
})

export {authSchema,updateSchema}