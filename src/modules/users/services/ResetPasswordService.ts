import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../domain/repositories/IUsersTokensRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exist');
        }

        const user = await this.usersRepository.findById(userToken!.user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const tokenCreatedAt = userToken!.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired!');
        }

        user.password = await hash(password, 8);

        await this.usersRepository.save(user);

        await this.usersTokensRepository.deleteById(userToken!.id);
    }
}

export default ResetPasswordService;
