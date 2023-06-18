import Joi from "joi";

import {EMAIL_REGEX} from "../constants/regex.enum";

export const EditUserValidator = Joi.object({
    email: Joi.string()
        .regex(new RegExp(EMAIL_REGEX))
        .required()
        .messages({
            'string.empty': '"email" cannot be empty',
            'string.pattern.base': 'Invalid email'
        }),
    role: Joi.string()
        .min(1)
        .messages({
            'string.empty': '"role" cannot be empty'
        }),
    status: Joi.string()
        .min(1)
        .messages({
            'status.empty': 'status cannot be empty'
        })
})