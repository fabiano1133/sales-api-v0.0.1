import { celebrate, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

export const resetPasswordValidation = celebrate(
    {
        body: Joi.object().keys({
            token: Joi.string().uuid().required(),
            password: Joi.string().min(3).max(8).required(),
            password_confirmation: Joi.any()
                .equal(Joi.ref('password'))
                .label('Password Confirmation')
                .required()
                .options({
                    messages: {
                        'any.only': '{{#label}} does not match',
                    },
                }),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);
