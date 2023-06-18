import Joi from "joi";

export const PasswordValidator = Joi.object({
    password: Joi.string()
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.empty': '"password" cannot be empty',
            'string.min': '"password" length must be from 3-15 characters',
            'string.max': '"password" can be a max of 15 characters'
        }),
    confirm_password: Joi.string()
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.empty': '"password" cannot be empty',
            'string.min': '"password" length must be from 3-15 characters',
            'string.max': '"password" can be a max of 15 characters'
        })
})