import Joi from "joi";

export const TypeBrandValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'string.empty': '"name" cannot be empty',
            'string.min': '"name" length must be from 2-30 characters',
            'string.max': '"name" can be a max of 30 characters'
        })
})