import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class CreateSessionService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ email, password }: IRequest): Promise<IUserAuthenticated> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or Password Incorrect!', 401);
        }

        const passwordConfirmed = await this.hashProvider.compareHash(
            password,
            user.password
        );

        if (!passwordConfirmed) {
            throw new AppError('Email or Password Incorrect!', 401);
        }

        const token = sign(/*payload*/ {}, /*hash*/ auth.jwt.secret as Secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default CreateSessionService;
