import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const bodyFieldValidation = celebrate(
    {
        body: Joi.object().keys({
            name: Joi.string().trim().min(3).max(30).required(),
            email: Joi.string().trim().min(2).max(30).email().required(),
            password: Joi.string()
                .required()
                .pattern(
                    new RegExp(
                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])'
                    )
                ),
            avatar: Joi.string(),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);
