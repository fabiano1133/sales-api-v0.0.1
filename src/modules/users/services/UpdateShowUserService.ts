import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateShowUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IUpdateShowUser): Promise<IUser> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(`User does not exist`);
        }

        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userEmailAlreadyExists && userEmailAlreadyExists.id !== user_id) {
            throw new AppError(`This email ${email} already exists`);
        }

        if (password && !old_password) {
            throw new AppError(`Old password is required!`);
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError(`Old password does not match!`);
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateShowUserService;
