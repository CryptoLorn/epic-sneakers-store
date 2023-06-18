import Joi from "joi";

import {EMAIL_REGEX} from "../constants/regex.enum";

export const AuthValidator = Joi.object({
    email: Joi.string()
        .regex(new RegExp(EMAIL_REGEX))
        .required()
        .messages({
            'string.empty': '"email" cannot be empty',
            'string.pattern.base': 'Invalid email'
        }),
    password: Joi.string()
        .min(3)
        .max(15)
        .required()
        .messages({
            'string.empty': '"password" cannot be empty',
            'string.min': '"password" length must be from 3-15 characters',
            'string.max': '"password" can be a max of 15 characters'
        })
})