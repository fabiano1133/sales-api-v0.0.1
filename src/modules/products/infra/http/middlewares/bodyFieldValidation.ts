import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const bodyFieldValidation = celebrate(
    {
        body: Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);
