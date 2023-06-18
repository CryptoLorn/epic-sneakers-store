import Joi from "joi";

import {MODEL_REGEX} from "../constants/regex.enum";

export const SneakersValidator = Joi.object({
    model: Joi.string()
        .regex(MODEL_REGEX)
        .required()
        .messages({
            'string.pattern.base': 'please use only Latin letters and length must be from 2-30 characters',
            'string.empty': 'model cannot be empty'
        }),
    price: Joi.number()
        .min(0)
        .max(100000)
        .required()
        .messages({
            'number.min': 'price cannot be less than 0',
            'number.max': 'the price cannot be more than 100000'
        }),
    color: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'string.empty': 'color cannot be empty',
            'string.min': 'color length must be from 2-30 characters',
            'string.max': 'color can be a max of 30 characters'
        }),
    material: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            'string.empty': 'material cannot be empty',
            'string.min': 'material length must be from 2-30 characters',
            'string.max': 'material can be a max of 30 characters'
        }),
    description: Joi.string()
        .max(250)
        .required()
        .messages({
            'string.empty': 'description cannot be empty',
            'string.max': 'description can be a max of 250 characters'
        })
})