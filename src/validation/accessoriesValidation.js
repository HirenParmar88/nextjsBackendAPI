// src/validation/accessoriesValidation.js

import Joi from "@hapi/Joi"

const authSchemaAccessories = Joi.object({
    accessory_name: Joi.string().required(), 
    product_id: Joi.number().required()
})

const updateSchemaAccessories = Joi.object({
    accessory_name: Joi.string().required(), 
    //product_id: Joi.number().required()
})

export{authSchemaAccessories,updateSchemaAccessories}

