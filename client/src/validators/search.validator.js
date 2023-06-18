import Joi from "joi";

export const SearchValidator = Joi.object({
    search: Joi.string()
        .min(1)
        .max(30)
        .required()
        .messages({
            'string.empty': 'cannot be empty',
            'string.min': 'length must be from 1-30 characters',
            'string.max': 'can be a max of 30 characters'
        })
})