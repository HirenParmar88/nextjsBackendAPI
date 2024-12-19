// src/validation/productValidation.js

import Joi from "@hapi/Joi"

const authSchemaProduct = Joi.object({
    description : Joi.string().required(),
    product_name: Joi.string().required(),
    price: Joi.number().required(),
    userId: Joi.number().required()
})

const updateSchemaProduct = Joi.object({
    product_name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
})

export{authSchemaProduct,updateSchemaProduct}