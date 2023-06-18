import Joi from "joi";

import {EMAIL_REGEX} from "../constants/regex.enum";

export const EmailValidator = Joi.object({
    email: Joi.string()
        .regex(new RegExp(EMAIL_REGEX))
        .required()
        .messages({
            'string.empty': '"email" cannot be empty',
            'string.pattern.base': 'Invalid email'
        })
})