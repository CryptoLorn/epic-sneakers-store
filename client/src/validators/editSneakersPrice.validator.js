import Joi from "joi";

export const EditSneakersPriceValidator = Joi.object({
    price: Joi.number()
        .min(0)
        .max(100000)
        .required()
        .messages({
            'number.min': 'price cannot be less than 0',
            'number.max': 'the price cannot be more than 100000'
        })
})