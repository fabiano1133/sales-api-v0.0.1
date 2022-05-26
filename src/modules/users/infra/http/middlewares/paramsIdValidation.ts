import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const paramsIdValidation = celebrate(
    {
        params: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);
