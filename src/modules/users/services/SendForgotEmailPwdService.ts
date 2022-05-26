import AppError from '@shared/errors/AppError';
import path from 'path';
import EtherealMail from '@config/mail/EtherealMail';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../domain/repositories/IUsersTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotEmailPwdService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not Found');
        }

        const token = await this.usersTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        );

        await EtherealMail.enviaEmail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: `TOKEN PARA RECUPERAÇÃO DE SENHA`,
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
                },
            },
        });
    }
}

export default SendForgotEmailPwdService;
