import { IUpdateUser } from '@modules/customers/domain/models/IUpdateUser';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider
    ) {}

    public async execute({
        id,
        name,
        email,
        password,
        avatar,
    }: IUpdateUser): Promise<IUser> {
        const user = await this.usersRepository.findById(id);

        const emailAlreadyExists = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found');
        }
        if (emailAlreadyExists && email !== user.email) {
            throw new AppError('Email already exists');
        }

        const hashedPassword = await this.hashProvider.generateHash(password!);

        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.avatar = avatar;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
