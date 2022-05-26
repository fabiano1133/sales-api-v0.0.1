import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const bodyFieldValidation = celebrate(
    {
        body: Joi.object().keys({
            name: Joi.string().trim().min(3).max(30).required(),
            email: Joi.string().trim().min(2).max(30).email().required(),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);
